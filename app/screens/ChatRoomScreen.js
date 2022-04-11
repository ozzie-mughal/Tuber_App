import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { Fragment, useState, useEffect } from 'react'
import Message from '../components/Message'
import { ChatRoom, Message as MessageModel } from '../../src/models'
import MessageInput from '../components/MessageInput'
import { useRoute, useNavigation } from '@react-navigation/core';
import TimerWidget from '../components/TimerWidget'
import colors from '../styles/colors'
import elements from '../styles/elements'
import { DataStore } from '@aws-amplify/datastore'

const ChatRoomScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const id = route.params?.id;
    const name = route.params?.name;
    const avatarImage = route.params?.avatarImage

    const [messages, setMessages] = useState([]); //Set messages per chatRoom
    const [chatRoom, setChatRoom] = useState(null); //Set chatroom to map messages to

    //Fetch chatRoom

    useEffect(() => {
        fetchChatRoom();
    },[]);

    const fetchChatRoom = async () => {
        if (!route.params?.id) {
            console.warn("No chatroom id provided via route");
            return;
        }

        const chatRoom = await DataStore.query(ChatRoom, route.params.id);

        if (!chatRoom) {
            console.error("No chatRoom found in DB with this id")
        } else {
            setChatRoom(chatRoom);
        }
    }

    //Fetch Messages (based on chatRoom retrieved)
    useEffect(() => {
    fetchMessages();
    },[chatRoom]);

    const fetchMessages = async () => {
        if (!chatRoom) {
            return <ActivityIndicator/>; //return if chatRoom value still hasn't been retrieved
        }
        const fetchedMessages = await DataStore.query(MessageModel,
            message => message.chatroomID("eq", chatRoom?.id),
            {
                sort: message => message.createdAt({sortDirection: "DESCENDING"})
            });

        setMessages(fetchedMessages);
    }

    //Subscribe to incoming messages
    useEffect(() => {

        //console.log(chatRoom?.id)
        const subscription = DataStore.observe(MessageModel).subscribe(msg => {
            //console.log(msg.element)
            if (msg.model === MessageModel && msg.opType === "INSERT") {
                setMessages(existingMessages => [msg.element,...existingMessages])
            }
        })

        return () => subscription.unsubscribe();
    },[])

    //navigation.setOptions({ headerTitle: () => <ChatRoomScreenHeader avatarImage={avatarImage} name={name}/>})

  return (
    <Fragment>
        <SafeAreaView style={styles.page}>
            <View style={styles.pageContent}>
                <View style={styles.timerContainer}>
                    <TimerWidget/>
                </View>
                <FlatList 
                    data={messages}
                    renderItem={({item}) => <Message message={item}/>}
                    inverted
                    />
                <MessageInput chatRoom={chatRoom}/>
            </View>
        </SafeAreaView>
        <SafeAreaView style={{backgroundColor:'white'}}/>
    </Fragment>
  )
}




export default ChatRoomScreen

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.slate_blue,
        flex: 1
    },
    pageContent: {
        backgroundColor: 'white',
        flex: 1,
        top: 10,
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30 
    },
    timerContainer: {
        backgroundColor:colors.grey_light,
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset : { width: 0, height: 10},
    }
})