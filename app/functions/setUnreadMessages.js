import React, { useState } from 'react'
import { ChatRoomUser, ChatRoom, User, Message as MessageModel } from '../../src/models';
import { DataStore } from 'aws-amplify';

const setUnreadMessages = async (senderUser,chatRoom) => {
    if (!senderUser) {
        console.log('could not find user')
        return ; //return if chatRoom value still hasn't been retrieved
    }
    if (!chatRoom) {
        console.log('could not find  chatroom ')
        return ; //return if chatRoom value still hasn't been retrieved
    }
    //const [unreadCount, setUnreadCount] = useState(0);
    //const [lastUnreadMessage, setLastUnreadMessage] = useState();

    const fetchedMessages = await DataStore.query(MessageModel,
        message => message
                    .chatroomID("eq", chatRoom?.id)
                    .userID("eq",senderUser?.id)
                    .status("eq","DELIVERED")
                    )
    const unreadMessagesCount = fetchedMessages.length;

    
    // //setUnreadCount(5);
    // console.log(unreadMessagesCount)
    //console.log(chatRoom)
    return 4;
}

export default setUnreadMessages
