import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import colors from '../styles/colors';
import { Hub, Auth, DataStore } from 'aws-amplify';
import { ChatRoomUser, ChatRoom, User, Message as MessageModel } from '../../src/models';
import Moment from 'moment';
import setUnreadMessages from '../functions/setUnreadMessages';

const ChatRoomPreview = ({ chatRoom }) => {
  ///////////////////////////////////////////////////////
  //STATE
  const navigation = useNavigation();

  const [user, setUser] = useState(); //The user displayed as having a chat with
  const [senderAvatarImage, setSenderAvatarImage] = useState(); //The user displayed as having a chat with
  const [senderGivenName, setSenderGivenName] = useState(); //The user displayed as having a chat with
  const [senderFamilyName, setSenderFamilyName] = useState(); //The user displayed as having a chat with

  const [lastMessage, setLastMessage] = useState() //The last message for a given chatRoom
  const [lastMessageUser, setLastMessageUser] = useState() //The last message for a given chatRoom
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState() //The last message for a given chatRoom
  const [sinceLastMessageTimestamp, setSinceLastMessageTimestamp] = useState() //The last message for a given chatRoom
  const [lastMessageUserGivenName, setLastMessageUserGivenName] = useState() //The last message for a given chatRoom

  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [newMessages, setNewMessages] = useState();
  const [topic, setTopic] = useState();
  const [active, setActive] = useState();

  ///////////////////////////////////////////////////////
  //LOCAL FUNCTIONS
  //Set preview variables
  const setUserPreviewVariables = async (chatRoom) => {
    if (!user) {
      return;
    }
    setSenderAvatarImage(user?.avatarImage);
    setSenderGivenName(user?.givenName);
    setSenderFamilyName(user?.familyName);
    setTopic(chatRoom?.topic);
    setActive(chatRoom?.active);
  }
  const setLastMessagePreviewVariables = async (chatRoom) => {
    if (!lastMessage) {
      return;
    }
    setLastMessageTimestamp(lastMessage?.createdAt);
    setSinceLastMessageTimestamp(Moment(lastMessageTimestamp).from(Moment()));
    setLastMessageUserGivenName(lastMessageUser?.givenName); 
    setNewMessages(chatRoom?.newMessages);
  }
  //Fetch chatroom users (that are not current user)
  const fetchUsers = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter(chatRoomUser => chatRoomUser.chatRoom.id === chatRoom.id)
      .map(chatRoomUser => chatRoomUser.user);
    setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null);
  };
  //Fetch last message for each chatRoom
  const fetchLastMessage = async (chatRoom) => {
  if (!chatRoom.chatRoomLastMessageId) { return }
    await DataStore.query(MessageModel,chatRoom.chatRoomLastMessageId).then((value) => {
      setLastMessage(value)
      DataStore.query(User,value?.userID).then(setLastMessageUser);
    });
  }
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

  const setNewMessagesCount = async (count) => {
    try {
      if (count === unreadMessagesCount) {
        return;
      }   
      await DataStore.save(
        ChatRoom.copyOf(chatRoom, (updated) => {
          updated.newMessages= parseInt(count)
        }
        ) 
      )
    }
    catch (e) {
      console.log('Error in saving message count ',e)
    }
    finally {
    //console.log('updated unread message count in DB to ',count)
    }
  }
  
  //On chatRoom preview press
  const onChatRoomPress = () => {
    navigation.navigate('ChatRoom', { id: chatRoom.id, name: senderGivenName, avatarImage: senderAvatarImage });  
  }

  ///////////////////////////////////////////////////////
  //USEEFFECT HOOKS
  //Fetch chatrooms, that current user belongs to, and their users, on component mount
  useEffect(() => {
    fetchUsers();
    fetchLastMessage(chatRoom);
  },[])

  //Set chatroom preview variables, on chatroom user or last message change
  useEffect(() => {
    setUserPreviewVariables(chatRoom);
    setLastMessagePreviewVariables(chatRoom);
  },[user, lastMessage, lastMessageUser, chatRoom])

  //Subscribe to chatRoom updates
  useEffect(() => {
  if (!chatRoom) {
    return;
  }
  const subscription = DataStore.observe(ChatRoom, chatRoom.id).subscribe((updatedChatRoom) => {
    if (updatedChatRoom.model === ChatRoom && updatedChatRoom.opType === "UPDATE" && updatedChatRoom.element.active === true){
        //console.log('chatroom is updated for chatroom ID ',chatRoom.id)
        try {
          fetchLastMessage(updatedChatRoom.element)
        }
        finally {
          // setUnreadMessages(user,updatedChatRoom.element)
          //   .then(value => setUnreadMessagesCount(value));
          if (!user) {
            //console.log('could not find user')
            return ; //return if chatRoom value still hasn't been retrieved
          }

          //const [unreadCount, setUnreadCount] = useState(0);
          //const [lastUnreadMessage, setLastUnreadMessage] = useState();
          const setUnreadMessages = async () => {
          const fetchedMessages = await DataStore.query(MessageModel,
              message => message
                          .chatroomID("eq", chatRoom.id)
                          .status("eq","DELIVERED")
                          )
          const deliveredMessagesCount = fetchedMessages.length;
          if (deliveredMessagesCount === unreadMessagesCount) {
            //console.log('previous unread count is ',unreadMessagesCount, 'and latest count is ',deliveredMessagesCount, 'so function is returned')
            return;
          }          
          //console.log('unread message count is ',deliveredMessagesCount)
          //setNewMessagesCount(deliveredMessagesCount);

          setUnreadMessagesCount(deliveredMessagesCount);
        }
        setUnreadMessages();

          //console.log(user)
          //console.log('updated chatroom details are ',updatedChatRoom.element)
        }
        
      }
  });

  return () => subscription.unsubscribe();
  }, [chatRoom.chatRoomLastMessageId,user]);

  useEffect(() => {
    setNewMessagesCount(unreadMessagesCount)
  },[unreadMessagesCount])
  



// useEffect(() => {
//   //Create listener
//   const listener = Hub.listen('datastore', async hubData => {
//     const { event, data } = hubData.payload;
//     console.log(event, data)
//     if (event === 'outboxMutationProcessed' && data.model === ChatRoom) {
//       const setUnreadMessages = async () => {
//         const fetchedMessages = await DataStore.query(MessageModel,
//             message => message
//                         .chatroomID("eq", chatRoom.id)
//                         .status("eq","DELIVERED")
//                         )
//         const deliveredMessagesCount = fetchedMessages.length;
//         if (deliveredMessagesCount === unreadMessagesCount) {
//           return;
//         }
//         DataStore.save(
//           ChatRoom.copyOf(data.element, (updated) => {
//             updated.newMessages= deliveredMessagesCount
//           }
//         )
//         )
//         console.log('unread message count is ',unreadMessagesCount)
//         }
//         setUnreadMessages();

//         // Set unread message count (messages delivered)
//     }})
//     //Remove listener
//     return () => listener();
// },[])

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