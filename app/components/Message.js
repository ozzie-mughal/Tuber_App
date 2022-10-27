import { StyleSheet, Text, View, ActivityIndicator, useWindowDimensions, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Auth, DataStore, Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react-native'
import { Message as MessageModel, User} from '../../src/models';
import colors from '../styles/colors';
import AudioPlayer from './AudioPlayer';
import icons from '../styles/icons';
import Moment from 'moment';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Svg, Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';


const Message = ({ message }) => {

  const [user, setUser] = useState(); //set user that message belongs to
  const [isMe, setIsMe] = useState(null); //set toggle for if message belongs to me or other user
  const [isDeleted, setIsDeleted] = useState(false); //set toggle for if message is deleted or not
  const [status, setStatus] = useState(message.status); //set toggle for if message status is updated
  const [soundURI, setSoundURI] = useState(null);
  const { width } = useWindowDimensions();
  const messageTimestamp = Moment(message.createdAt).format("h:mm A");
  const { showActionSheetWithOptions } = useActionSheet(); //to toggle action menu on message options (eg. delete)

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

  //Subscribe to message status updates
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

  //Action sheet
  //Option functions

  const deleteMessage = () => {
    if (!isMe) {
      Alert.alert(
        'This message was not sent by you. You can only delete your own messages.'
      )
      return;
    }
    DataStore.delete(message);
    setIsDeleted(true);
  }
  const confirmDeleteMessage = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this message?',
      [
        {
          text: 'Delete',
          onPress: deleteMessage,
          style: 'destructive'
        },
        {
          text: 'Cancel',
        }
      ]
    )
  }
  
  const showActionSheet = () => {
    const options = ['Delete','Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    const onActionPress = (index) => {
      if (index===0) {
        confirmDeleteMessage();
      }
    }
    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
      },
      onActionPress);
  }

  return (
    <Pressable onLongPress={showActionSheet}
      style={[isMe ? styles.rightContainer : styles.leftContainer, {width: soundURI ? '75%' : 'auto'}]}
    >
      {isMe && <LinearGradient
                // Background Linear Gradient
                colors={[colors.primary,colors.primary]}
                start={{x:0.1,y:0}}
                end={{x:0.8,y:0.8}}
                locations={[0,1]}
                style={[styles.background]}
            />}

      {/*Timestamp*/}
      <View style={styles.timestampContainer}>
        <Text style={isMe ? styles.rightTimestampText : styles.leftTimestampText}>
          {messageTimestamp}
        </Text>
      </View>

      <View style={styles.body}>
        {/*Text Message*/}
        {!!message.content && !isDeleted && (<Text style={[isMe ? styles.rightMessageText : styles.leftMessageText, 
          {color: isMe ? 'black' : 'black'}]}>
          {message.content}
        </Text>)}

        {/*Image Message*/}
        {message.image && !isDeleted && (<S3Image imgKey={message.image} 
          style={{width: width*0.7, marginTop: message.content ? 5 : 0, aspectRatio: 4/3}}
          resizeMode='contain'/>)}

        {/*Audio Message*/}
        {message.audio && !isDeleted && <AudioPlayer soundURI={soundURI}/>}

        {/*Message deleted message (if message is deleted, show this)*/}
        {isDeleted && <Text style={[isMe ? styles.rightMessageText : styles.leftMessageText, 
          {color: isMe ? 'black' : 'black', fontStyle:'italic'}]}>
          message deleted
        </Text>}
      </View>



      {/*Message Status*/}
      {isMe && <View style={isMe && styles.messageStatus}>
        {status==='SENT' ? icons.sent_tick : null}
        {status==='DELIVERED' ? icons.delivered_tick : null}
        {status==='READ' ? icons.read_tick : null}
      </View>}

      <View
          style={[
            styles.arrowContainer,
            isMe ? styles.arrowRightContainer : styles.arrowLeftContainer,
          ]}
        >

           <Svg style={isMe ? styles.arrowRight : styles.arrowLeft} width={15.5} 
            height={17.5} viewBox="32.484 17.5 15.515 17.5"  
            enable-background="new 32.485 17.5 15.515 17.5">
                <Path
                    d={isMe ? "M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z" : "M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"}
                    fill={isMe ? colors.primary : "gainsboro"}
                    x={isMe ? "-0.35" : "0"}
                    y="0"
                />
            </Svg>
        </View>
    </Pressable>
  )
}

export default Message

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    borderRadius: 10
  },  
  leftContainer: {
      marginHorizontal: 10,
      marginVertical: 5,
      paddingBottom: 5,
      borderRadius: 10,
      minWidth: '20%',
      maxWidth: '90%',
      backgroundColor: 'gainsboro',
      marginLeft: 10,
      marginRight:'auto',
    },
    rightContainer: {
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 10,
      minWidth: '20%',
      maxWidth: '90%',
      //backgroundColor: colors.slate_blue_light,
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
      color: colors.grey,
      fontFamily: 'Nunito-Medium'
    },
    leftTimestampText: {
      color: 'white',
      fontFamily: 'Nunito-Medium'
    },
    rightMessageText: {
      fontSize: 16,
      textAlign:'right',
      fontFamily: 'Nunito-Medium'
    },
    leftMessageText: {
      fontSize: 16,
      textAlign:'left',
      paddingBottom: 5,
      fontFamily: 'Nunito-Medium'
    },
    arrowContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      flex: 1
    },
    arrowLeftContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },

    arrowRightContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    arrowLeft: {
        left: -6,
        bottom: -6
    },

    arrowRight: {
        right: -6,
        bottom: -6
    }
})