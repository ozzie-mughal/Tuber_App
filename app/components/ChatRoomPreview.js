import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import ChatRooms from '../assets/dummy-data/ChatRooms';
import { useNavigation } from '@react-navigation/core'
import colors from '../styles/colors';

const ChatRoomPreview = ({ chatRoom }) => {

  const senderAvatarImage = chatRoom.users[1].imageUri;
  const senderName = chatRoom.users[1].name;
  const lastMessageTimestamp = chatRoom.lastMessage.createdAt;
  const lastMessageContent = chatRoom.lastMessage.content; 
  const newMessages = chatRoom.newMessages;
  const active = chatRoom.active;

  const navigation = useNavigation();

  const onChatRoomPress = () => {
          navigation.navigate('ChatRoom', { id: chatRoom.id, name: senderName, avatarImage: senderAvatarImage });  
        }

  return (
    <TouchableOpacity onPress={onChatRoomPress} style={styles.container}>

      <Image style={styles.avatarimage} source={{uri: senderAvatarImage}}/>

      {newMessages ? 
      <View style={styles.badge_container}>
        <Text style={styles.badge_text}>{newMessages}</Text>
      </View>
      : null}

      {active ? 
      <View style={styles.activebadge_container}/>
      : null}

      <View style={styles.preview_container}>
        <View style={styles.row}>
          <Text style={styles.name_text}>{senderName}</Text>
          <Text style={newMessages ? styles.timestamp_text_unread: styles.timestamp_text_read }>{lastMessageTimestamp}</Text>
        </View>
        <View>
          <Text numberOfLines={1} style={newMessages ? styles.message_text_unread: styles.message_text_read }>
            {lastMessageContent}
          </Text>
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
      backgroundColor: colors.med_turquoise,
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 40,
      top: 10
    },
    badge_text: {
      color: "white",
      fontWeight: '600'
    },
    activebadge_container: {
      backgroundColor: "lawngreen",
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 40,
      top: 40
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