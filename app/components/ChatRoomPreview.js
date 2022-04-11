import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import ChatRooms from '../assets/dummy-data/ChatRooms';
import { useNavigation } from '@react-navigation/core'
import colors from '../styles/colors';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoomUser, User, Message as MessageModel } from '../../src/models';

const ChatRoomPreview = ({ chatRoom }) => {

  const navigation = useNavigation();

  //const [users, setUsers] = useState([]); //All users in chatroom
  const [user, setUser] = useState(); //The user displayed as having a chat with
  const [lastMessage, setLastMessage] = useState() //The last message for a given chatRoom

  //Fetch chatrooms, that current user belongs to, and their users
  useEffect(() => {
    const fetchUsers = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatRoom.id === chatRoom.id)
        .map(chatRoomUser => chatRoomUser.user);

      //console.log(fetchedUsers);
      //setUsers(fetchedUsers);
      setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null);
    };
    fetchUsers();
  },[])

  //Fetch last message for each chatRoom
  useEffect(() => {
    if (!chatRoom.chatRoomLastMessageId) { return }
    
    DataStore.query(MessageModel,chatRoom.chatRoomLastMessageId).then(setLastMessage);
  },[])

  //Set preview variables
  const senderAvatarImage = user?.avatarImage;
  const senderGivenName = user?.givenName;
  const senderFamilyName = user?.familyName;
  const lastMessageTimestamp = lastMessage?.createdAt;
  const lastMessageContent = lastMessage?.content; 
  const newMessages = chatRoom.newMessages;
  //const active = chatRoom.active;
  const active = true;

  //On chatRoom preview press
  const onChatRoomPress = () => {
          navigation.navigate('ChatRoom', { id: chatRoom.id, name: senderGivenName, avatarImage: senderAvatarImage });  
        }

  return (
    <TouchableOpacity onPress={onChatRoomPress} style={styles.container}>

      <Image style={styles.avatarimage} source={{uri: senderAvatarImage}}/>



      {active ? 
      <View style={styles.activebadge_container}/>
      : null}

      <View style={styles.preview_container}>
        <View style={styles.row}>
          <Text style={styles.name_text}>{senderGivenName} {senderFamilyName}</Text>
          <Text style={(newMessages>0) ? styles.timestamp_text_unread: styles.timestamp_text_read }>{lastMessageTimestamp}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text numberOfLines={1} style={(newMessages>0) ? styles.message_text_unread: styles.message_text_read }>
            {lastMessageContent}
          </Text>
          {newMessages ? 
          <View style={styles.badge_container}>
            <Text style={styles.badge_text}>{newMessages}</Text>
          </View>
          : null}
        </View>
      </View>

    </TouchableOpacity>
  )
}

export default ChatRoomPreview

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: colors.grey,
    },
    preview_container: {
      flex: 1,
      justifyContent: 'space-evenly'
    },
    badge_container: {
      backgroundColor: colors.skyblue_crayola,
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      justifyContent: 'center',
      alignItems: 'center',
    },
    badge_text: {
      color: "white",
      fontWeight: '600'
    },
    activebadge_container: {
      backgroundColor: "lawngreen",
      height: 15,
      width: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 45,
      top: 45
    },
    avatarimage:{
      width: 50,
      height: 50,
      borderRadius: 30,
      marginRight: 10
    },
    name_text: {
      fontWeight: "bold",
      fontSize: 18
    },
    timestamp_text_unread: {
      color: "black",
      fontWeight: "bold"
    },
    timestamp_text_read: {
      color: "grey"
    },
    message_text_unread: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
    },
    message_text_read: {
      color: "grey",
      fontSize: 16
    },
    row: {
      flexDirection:'row', 
      justifyContent:'space-between',
    }
  })