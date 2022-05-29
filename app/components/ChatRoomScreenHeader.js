import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { Fragment, useState, useEffect } from 'react';
import Message from '../components/Message';
import { ChatRoom, ChatRoomUser, User } from '../../src/models';
import ChatData from '../assets/dummy-data/Chats';
import MessageInput from '../components/MessageInput';
import { useRoute, useNavigation } from '@react-navigation/core';
import { Ionicons, Feather } from '@expo/vector-icons';
import TimerWidget from '../components/TimerWidget';
import colors from '../styles/colors';
import elements from '../styles/elements';
import { Auth, DataStore } from 'aws-amplify';
import getLastOnlineParser from '../functions/getLastOnlineParser';
import ActiveIndicator from './ActiveIndicator';

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
    const [lastOnlineAtText, setLastOnlineAtText] = useState();

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

      useEffect(() => {
        const interval = setInterval(()=> {
            const lastOnlineAt = getLastOnlineParser(user);
            setLastOnlineAtText(lastOnlineAt);
        }, 5000);
        return () => clearInterval(interval);
      },[user])

    return (
        <View style={styles.chatRoomScreenHeaderContainer}>
            <View style={styles.headerAvatar}>
                <Image source={{uri: user?.avatarImage}} style={styles.avatarimage}/>
                <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles.headerText}>{user?.givenName}</Text>
                        {lastOnlineAtText==='Online' ? <ActiveIndicator/> : null}
                    </View>
                    <Text style={{color:'white'}}>
                        {lastOnlineAtText}
                    </Text>
                </View>
            </View>
                <View style={{position: 'absolute', right: 50, flexDirection: 'row',justifyContent:'flex-end'}}>

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

export default ChatRoomScreenHeader

const styles = StyleSheet.create({
    chatRoomScreenHeaderContainer: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 40,
        alignItems: 'center',
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
        color: 'white',
        paddingRight: 5
    },
})