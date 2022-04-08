import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { Fragment, useState, useEffect } from 'react'
import Message from '../components/Message'
import { ChatRoom, Message as MessageModel } from '../../src/models'
import ChatData from '../assets/dummy-data/Chats'
import MessageInput from '../components/MessageInput'
import { useRoute, useNavigation } from '@react-navigation/core';
import { Ionicons, Feather } from '@expo/vector-icons';
import TimerWidget from '../components/TimerWidget'
import colors from '../styles/colors'
import elements from '../styles/elements'
import { DataStore } from '@aws-amplify/datastore'

const timer_icon = <Ionicons name={"ios-timer-outline"} 
    color={colors.skyblue_crayola} size={25} style={{marginHorizontal: 5}}/>;
const call_icon = <Ionicons name={"call"} 
    color={'white'} size={30} style={{marginHorizontal: 10}}/>;
const video_icon = <Ionicons name={"videocam"} 
    color={'white'} size={30} style={{marginHorizontal: 10}}/>;
const more_icon = <Feather name={"more-vertical"} 
    color={'white'} size={30} style={{marginHorizontal: 10}}/>;


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
        if (!chatRoom) {
            return ; //return if chatRoom value still hasn't been retrieved
        }

        const chatRoomID = chatRoom?.id;

        const subscription = DataStore.observe(MessageModel,chatRoomID=chatRoomID).subscribe(msg => {
            if (msg.model === MessageModel && msg.opType === "INSERT") {
                setMessages(existingMessages => [msg.element,...existingMessages])
            }
        })

        return () => subscription.unsubscribe();
    },[])

    navigation.setOptions({ headerTitle: () => <ChatRoomScreenHeader avatarImage={avatarImage} name={name}/>})

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

const ChatRoomScreenHeader = (props) => {

    return (
        <View style={styles.chatRoomScreenHeaderContainer}>
            <View style={styles.headerAvatar}>
                <Image source={{uri: props.avatarImage}} style={styles.avatarimage}/>
                <Text style={styles.headerText}>{props.name}</Text>
            </View>
                <View style={{left: 30, flexDirection: 'row',justifyContent:'flex-end'}}>

                    <TouchableOpacity>
                        {call_icon}
                    </TouchableOpacity>

                    <TouchableOpacity>
                        {video_icon}
                    </TouchableOpacity>

                    <TouchableOpacity>
                        {more_icon}
                    </TouchableOpacity>
                </View>
        </View>
    )
    }


export default ChatRoomScreen

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.orange,
        flex: 1
    },
    pageContent: {
        backgroundColor: 'white',
        flex: 1,
        top: 10,
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30 
    },
    chatRoomScreenHeaderContainer: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 50,
        alignItems: 'center',
        //backgroundColor: colors.orange
    },
    headerAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
        right: 50,
        //backgroundColor: colors.orange
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarimage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
      },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white'
    },
    timerText: {
        fontSize: 16,
        fontWeight: '600'
    },
    headerTimer: {
        width: 100,
        height: 30,
        backgroundColor: '#FCF57E',
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    timerContainer: {
        backgroundColor:colors.grey_light,
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})