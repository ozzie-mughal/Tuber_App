import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Message from '../components/Message'
import ChatData from '../assets/dummy-data/Chats'
import MessageInput from '../components/MessageInput'
import { useRoute, useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors'

const timer_icon = <Ionicons name={"ios-timer-outline"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;

const TimerWidget = (props) => {

    const [dt, setDt] = useState(new Date().getSeconds());

    useEffect(() => {
        let secTimer = setInterval( () => {
        setDt(new Date().getSeconds())
        },1000)

        return () => clearInterval(secTimer);
    }, []);


    return (
        <View style={styles.chatRoomScreenHeaderContainer}>
            <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                <View style={styles.headerTimer}>
                    {timer_icon}
                    {dt<10 && <Text style={styles.timerText}>00:0{dt}</Text>}
                    {dt>=10 && <Text style={styles.timerText}>00:{dt}</Text>}
                </View>
            </View>
        </View>
    )
    }


export default TimerWidget

const styles = StyleSheet.create({
    chatRoomScreenHeaderContainer: {
        flexDirection: 'row',
        //marginLeft: 50,
        marginHorizontal:5,
        justifyContent: 'flex-end',
        alignItems:'flex-end',
    },
    timerText: {
        fontSize: 14,
        fontWeight: '600'
    },
    headerTimer: {
        padding: 5,
        backgroundColor: colors.grey_light,
        width: 70,
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
})