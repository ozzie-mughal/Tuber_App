import { StyleSheet, Text, View, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Auth, DataStore, Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react-native'
import { Message as MessageModel, User} from '../../src/models';
import colors from '../styles/colors';
import AudioPlayer from './AudioPlayer';
import icons from '../styles/icons';
import Moment from 'moment';

const Message = ({ message }) => {

  const [user, setUser] = useState(); //set user that message belongs to
  const [isMe, setIsMe] = useState(null) //set toggle for if message belongs to me or other user
  const [status, setStatus] = useState(message.status) //set toggle for if message status is updated
  const [soundURI, setSoundURI] = useState(null);
  const { width } = useWindowDimensions();
  const messageTimestamp = Moment(message.createdAt).format("h:mm A");

  //Fetch user that owns the message
  useEffect(() => {
    const fetchUser = async () => {
    DataStore.query(User, message.userID).then(setUser);
    }
    fetchUser();
    //console.log(user);
  },[]);

  //Determine if message belongs to me (currentUser) or other user
  useEffect(() => {
    const checkIfMe = async () => {
      if (!user) {
        return; //user has not been determined yet
      }
      const currentUser = await Auth.currentAuthenticatedUser();
      setIsMe(user.id === currentUser.attributes.sub)
    }

    checkIfMe();
    //console.log(message);
  },[user]); 

  //Determine if message has been read by other user
  useEffect(()=> {
    setMessageRead();
  },[isMe])

  const setMessageRead = async () => {
    if (isMe===false && message.status!=='READ') {
      await DataStore.save(MessageModel.copyOf(message, (updated) => {
        updated.status = 'READ'}))
    }
  }

  //Subcribe to message status updates
  useEffect(() => {

    //console.log(chatRoom?.id)
    const subscription = DataStore.observe(MessageModel, message.id).subscribe(msg => {
        //console.log(msg.element)
        if (msg.model === MessageModel && msg.opType === "UPDATE") {
          setStatus(msg.element.status);
        }
    })

    return () => subscription.unsubscribe();
},[status])

  //Load audio message
  useEffect(() => {
    if (message.audio) {
      Storage.get(message.audio).then(setSoundURI);
    }
  }, [message]);

  //Show loading during user load
  if (!user) {
    return <ActivityIndicator/>
  }

  return (
    <View style={[isMe ? styles.rightContainer : styles.leftContainer, 
      {width: soundURI ? '75%' : 'auto'}]}>

      {/*Timestamp*/}
      <View style={styles.timestampContainer}>
        <Text style={isMe ? styles.rightTimestampText : styles.leftTimestampText}>
          {messageTimestamp}
        </Text>
      </View>

      <View style={styles.body}>
      {/*Text Message*/}
      {!!message.content && (<Text style={[isMe ? styles.rightMessageText : styles.leftMessageText, 
        {color: isMe ? 'white' : 'black'}]}>
        {message.content}
      </Text>)}

      {/*Image Message*/}
      {message.image && <S3Image imgKey={message.image} 
        style={{width: width*0.7, marginTop: message.content ? 5 : 0, aspectRatio: 4/3}}
        resizeMode='contain'/>}

      {/*Audio Message*/}
      {message.audio && <AudioPlayer soundURI={soundURI}/>}
      </View>

      {/*Message Status*/}
      {isMe && <View style={isMe && styles.messageStatus}>
        {status==='SENT' ? icons.sent_tick : null}
        {status==='DELIVERED' ? icons.delivered_tick : null}
        {status==='READ' ? icons.read_tick : null}
      </View>}
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
    leftContainer: {
      margin: 10,
      paddingBottom: 5,
      borderRadius: 10,
      minWidth: '20%',
      maxWidth: '90%',
      backgroundColor: 'gainsboro',
      marginLeft: 10,
      marginRight:'auto',
    },
    rightContainer: {
      margin: 10,
      borderRadius: 10,
      minWidth: '20%',
      maxWidth: '90%',
      backgroundColor: colors.slate_blue_light,
      marginLeft: 'auto',
      marginRight: 10,
    },
    body: {
      paddingHorizontal: 5,
      paddingTop: 5
    },
    messageStatus: {
      flexDirection: 'row',
      justifyContent:'flex-end',
      marginBottom: 5,
    },
    timestampContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 5,
      marginRight: 5
    },
    rightTimestampText: {
      color: colors.grey_light
    },
    leftTimestampText: {
      color: 'white'
    },
    rightMessageText: {
      fontSize: 16,
      textAlign:'right'
    },
    leftMessageText: {
      fontSize: 16,
      textAlign:'left'
    }
})