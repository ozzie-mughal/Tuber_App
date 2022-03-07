import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { auth, db } from '../../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';


const ChatScreen = () => {

    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     setMessages([
    //     {
    //         _id: 1,
    //         text: 'Hello developer',
    //         createdAt: new Date(),
    //         user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //         },
    //     },
    //     ])
    // }, [])

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').orderBy
        ('createdAt','desc').onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
                }))
        ))
        return unsubscribe;
    })

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

        const {
            _id,
            createdAt,
            text,
            user
        }=messages[0]

        db.collection('chats').add({
            _id,
            createdAt,
            text,
            user
        })
    }, [])

    const renderBubble = () => {
        return <Bubble {...props} containerStyle={{
            left: {backgroundColor:'black'}
        }
        }
        />
    }

  return (
         
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      isTyping={true}
      isLoadingEarlier={true}
      showUserAvatar={true}
      //renderBubble={() => {renderBubble(props)}}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL
      }}
    />
    
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        //backgroundColor: "#FFFFFF"
    }
})