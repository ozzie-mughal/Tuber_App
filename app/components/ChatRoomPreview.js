import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Pressable} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import colors from '../styles/colors';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoomUser, User, Message as MessageModel } from '../../src/models';
import Moment from 'moment';

const ChatRoomPreview = ({ chatRoom }) => {

  const navigation = useNavigation();

  //const [users, setUsers] = useState([]); //All users in chatroom
  const [user, setUser] = useState(); //The user displayed as having a chat with
  const [lastMessage, setLastMessage] = useState() //The last message for a given chatRoom
  const [lastMessageUser, setLastMessageUser] = useState() //The last message for a given chatRoom

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

  const setLastMessageSent = async (value) => {
    setLastMessage(value)
    DataStore.query(User,value.userID).then(setLastMessageUser);
  }

  //Fetch last message for each chatRoom
  useEffect(() => {
    const fetchLastMessage = async () => {
    if (!chatRoom.chatRoomLastMessageId) { return }
      await DataStore.query(MessageModel,chatRoom.chatRoomLastMessageId).then(setLastMessageSent);
      // if (!lastMessage.userID) { return }
      // await DataStore.query(User,lastMessage.userID).then(setLastMessageUser);
    }
    fetchLastMessage();
  },[])

  //Set preview variables
  const senderAvatarImage = user?.avatarImage;
  const senderGivenName = user?.givenName;
  const senderFamilyName = user?.familyName;
  const lastMessageTimestamp = lastMessage?.createdAt;
  const sinceLastMessageTimestamp = Moment(lastMessageTimestamp).from(Moment())
  const lastMessageUserGivenName = lastMessageUser?.givenName; 
  const newMessages = chatRoom?.newMessages;
  const topic = chatRoom?.topic;
  const active = chatRoom?.active;

  //Last message previewed (depending on last message type)
  const getLastMessage = () => {
    if (lastMessage?.content) {
      return lastMessage?.content
    } else if (lastMessage?.image) {
      return 'Image'
    } else if (lastMessage?.audio) {
      return 'Audio'
    } else {
      return 'No last message found.'
    }
  }

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
        <View style={active ? styles.topic_Active : styles.topic_Inactive}>
          <Text numberOfLines={1} style={(newMessages>0) ? styles.topic_text_unread: styles.topic_text_read}>
            {topic}
          </Text>
        </View>
          <Text style={(newMessages>0) ? styles.timestamp_text_unread: styles.timestamp_text_read }>
            {sinceLastMessageTimestamp}
          </Text>
        </View>
          <Text style={(newMessages>0) ? styles.name_text_unread: styles.name_text_read}>
            {lastMessageUserGivenName}
          </Text>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text numberOfLines={1} style={(newMessages>0) ? styles.message_text_unread: styles.message_text_read }>
            {getLastMessage()}
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
      borderColor: colors.grey_light,
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
    topic_Active: {
      backgroundColor: colors.slate_blue_light,
      borderRadius: 25,
      paddingHorizontal: 5,
      paddingVertical: 2,
      maxWidth: '65%'
    },
    topic_Inactive: {
      backgroundColor: colors.grey_light,
      borderRadius: 25,
      paddingHorizontal: 5,
      paddingVertical: 2,
      maxWidth: '65%'
    },
    topic_text_unread: {
      fontWeight: "bold",
      fontSize: 16,
      color: 'white'
    },
    topic_text_read: {
      //fontWeight: "bold",
      fontSize: 16,
      color: 'white'
    },
    name_text_unread: {
      fontWeight: "bold",
      fontSize: 16,
    },
    name_text_read: {
      //fontWeight: "bold",
      fontSize: 16
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
      fontSize: 14,
      fontWeight: "bold",
    },
    message_text_read: {
      color: "grey",
      fontSize: 14
    },
    row: {
      flexDirection:'row', 
      justifyContent:'space-between',
      marginBottom: 5
    }
  })