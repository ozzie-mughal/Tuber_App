import { StyleSheet, Text, View, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Auth, DataStore } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react-native'
import { Message as MessageModel, User} from '../../src/models';
import colors from '../styles/colors';

const Message = ({ message }) => {

  const [user, setUser] = useState(); //set user that message belongs to
  const [isMe, setIsMe] = useState(false) //set toggle for if message belongs to me or other user
  const { width } = useWindowDimensions();

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

  //Show loading during user load
  if (!user) {
    return <ActivityIndicator/>
  }

  return (
    <View style={isMe ? styles.rightContainer : styles.leftContainer}>
      {!!message.content && (<Text style={[styles.messageText, {color: isMe ? 'white' : 'black'}]}>
        {message.content}
      </Text>)}
      {message.image && <S3Image imgKey={message.image} 
        style={{width: width*0.7, marginTop: message.content ? 5 : 0, aspectRatio: 4/3}}
        resizeMode='contain'/>}
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
    leftContainer: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '70%',
        backgroundColor: 'gainsboro',
        marginLeft: 10,
        marginRight:'auto',
    },
    rightContainer: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '90%',
        backgroundColor: colors.slate_blue_light,
        marginLeft: 'auto',
        marginRight: 10,
    },
    messageText: {
        fontSize: 16
    }
})