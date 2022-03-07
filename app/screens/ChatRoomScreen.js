import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from 'react-native'
import React from 'react'
import Message from '../components/Message'
import ChatData from '../assets/dummy-data/Chats'
import MessageInput from '../components/MessageInput'
import { useRoute, useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

const timer_icon = <Ionicons name={"ios-timer-outline"} color={"black"} size={25} style={{marginHorizontal: 5}}/>;
const call_icon = <Ionicons name={"call"} color={"black"} size={30} style={{marginHorizontal: 5}}/>;
const video_icon = <Ionicons name={"videocam"} color={"black"} size={30} style={{marginHorizontal: 5}}/>;


const ChatRoomScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const id = route.params?.id;
    const name = route.params?.name;
    const avatarImage = route.params?.avatarImage

    console.log('displaying chat room: ', name)

    navigation.setOptions({ headerTitle: () => <ChatRoomScreenHeader avatarImage={avatarImage} name={name}/>})

  return (
    <SafeAreaView style={styles.page}>
        <FlatList 
            data={ChatData.messages}
            renderItem={({item}) => <Message message={item}/>}
            inverted
            />
        <MessageInput/>
    </SafeAreaView>
  )
}

const ChatRoomScreenHeader = (props) => {

    return (
        <View style={styles.chatRoomScreenHeaderContainer}>
            <View style={styles.headerAvatar}>
                <Image source={{uri: props.avatarImage}} style={styles.avatarimage}/>
                <Text style={styles.headerText}>{props.name}</Text>
            </View>
                <View style={{right:40, flexDirection: 'row',justifyContent:'space-between'}}>
                <View style={styles.headerTimer}>
                    {timer_icon}
                    <Text style={styles.timerText}>00:36</Text>
                </View>
                    {call_icon}
                    {video_icon}
                </View>
        </View>
    )
    }


export default ChatRoomScreen

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1
    },
    chatRoomScreenHeaderContainer: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 50,
        alignItems: 'center',
    },
    headerAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
        right: 50,
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
        fontWeight: '600'
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
    }
})