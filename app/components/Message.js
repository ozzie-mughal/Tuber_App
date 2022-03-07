import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const myID = 'u1';

const Message = ({ message }) => {

    const isMe = message.user.id === myID;


  return (
    <View style={isMe ? styles.rightContainer : styles.leftContainer}>
      <Text style={{color: isMe ? 'white' : 'black'}}>{message.content}</Text>
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
        maxWidth: '70%',
        backgroundColor: 'dodgerblue',
        marginLeft: 'auto',
        marginRight: 10,
    },
    text: {
        color: 'black'
    }
})