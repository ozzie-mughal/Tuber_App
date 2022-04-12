import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { Fragment, useState, useEffect } from 'react'
import Message from '../components/Message'
import { ChatRoom, ChatRoomUser, User } from '../../src/models'
import ChatData from '../assets/dummy-data/Chats'
import MessageInput from '../components/MessageInput'
import { useRoute, useNavigation } from '@react-navigation/core';
import { Ionicons, Feather } from '@expo/vector-icons';
import TimerWidget from '../components/TimerWidget'
import colors from '../styles/colors'
import elements from '../styles/elements'
import { Auth, DataStore } from 'aws-amplify';
import ChatScreenMenu from './ChatScreenMenu'
import { MenuProvider } from 'react-native-popup-menu';

const ChatRoomScreenHeader = ({ id, children }) => {

    const timer_icon = <Ionicons name={"ios-timer-outline"} 
        color={colors.skyblue_crayola} size={25} style={{marginHorizontal: 5}}/>;
    const call_icon = <Ionicons name={"call"} 
        color={'white'} size={30} style={{marginHorizontal: 10}}/>;
    const video_icon = <Ionicons name={"videocam"} 
        color={'white'} size={30} style={{marginHorizontal: 10}}/>;
    const more_icon = <Feather name={"more-vertical"} 
        color={'white'} size={30} style={{marginHorizontal: 10}}/>;

    const [user, setUser] = useState(); //The user displayed as having a chat with

    useEffect(() => {
        if (!id) {
            return; //Don't do anything until chatRoom ID is recieved
        }
        const fetchUsers = async () => {
          const authUser = await Auth.currentAuthenticatedUser();
          const fetchedUsers = (await DataStore.query(ChatRoomUser))
            .filter(chatRoomUser => chatRoomUser.chatRoom.id === id)
            .map(chatRoomUser => chatRoomUser.user);
    
          //console.log(fetchedUsers);
          //setUsers(fetchedUsers);
          setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null);
        };
        fetchUsers();
      },[])

    return (
        <MenuProvider>
        <View style={styles.chatRoomScreenHeaderContainer}>
            <View style={styles.headerAvatar}>
                <Image source={{uri: user?.avatarImage}} style={styles.avatarimage}/>
                <Text style={styles.headerText}>{user?.givenName}</Text>
            </View>
                <View style={{left: 30, flexDirection: 'row',justifyContent:'flex-end'}}>

                    <TouchableOpacity>
                        {call_icon}
                    </TouchableOpacity>

                    <TouchableOpacity>
                        {video_icon}
                    </TouchableOpacity>

                    {/* <TouchableOpacity>
                        {more_icon}
                    </TouchableOpacity> */}
                    <ChatScreenMenu moreButton={more_icon}/>
                </View>
        </View>
        </MenuProvider>
    )
    }

export default ChatRoomScreenHeader

const styles = StyleSheet.create({
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
})