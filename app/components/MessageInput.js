import { StyleSheet, Text, View, TextInput, Pressable, 
    TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome, SimpleLineIcons, Feather, Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, Message as MessageModel} from '../../src/models';

const plus_icon = <FontAwesome name={"plus-circle"} 
    color={colors.skyblue_crayola} size={40} style={{marginHorizontal: 5}}/>;
const camera_icon = <Feather name={"camera"} 
    color={colors.skyblue_crayola} size={30} style={{marginHorizontal: 5}}/>;
const microphone_icon = <Feather name={"mic"} 
    color={colors.skyblue_crayola} size={30} style={{marginHorizontal: 5}}/>;
const smile_icon = <SimpleLineIcons name={"emotsmile"} 
    color={colors.skyblue_crayola} size={30} style={{marginHorizontal: 5}}/>;
const send_icon = <Ionicons name={"send"} 
    color={colors.skyblue_crayola} size={30} style={{marginHorizontal: 5}}/>;

const MessageInput = ({ chatRoom }) => {

    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        const senderUser = await Auth.currentAuthenticatedUser();
        const newMessage = await DataStore.save(new MessageModel({
            content: message,
            userID: senderUser.attributes.sub,
            chatroomID: chatRoom?.id,
        }))

        updateLastMessage(newMessage);
        setMessage('');
    }

    const updateLastMessage = async (newMessage) => {
        //Create copy of chatroom (to update lastMessage) as entity is immutable
        DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
            updatedChatRoom.LastMessage = newMessage;
        }))
    }

    const onPlusPress = () => {
        console.warn("on plus clicked");
    }

    const onSendPress = () => {
        if (message) {
            sendMessage();
        } else {
            onPlusPress();
        }
    };
  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    style={styles.root}
    keyboardVerticalOffset={100}>
      <View style={styles.inputContainer}>
        <TouchableOpacity>
        {smile_icon}
        </TouchableOpacity>

        <TextInput 
            style={styles.input}
            placeholder="Type message"
            value={message}
            onChangeText={setMessage}/>

        <TouchableOpacity>
        {camera_icon}
        </TouchableOpacity>
        
        <TouchableOpacity>
        {microphone_icon}
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        onPress={onSendPress}
        style={styles.buttonContainer}>
        {message? send_icon : plus_icon}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default MessageInput

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        borderTopWidth: 1,
        borderColor: colors.grey_light
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: 'whitesmoke',
        flex: 1,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#DEDEDE',
        padding: 5,
        alignItems: 'center'
    },
    buttonContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 35,
    },
    input: {
        marginHorizontal:10,
        flex: 1,
    },
    icon: {
        marginHorizontal: 5
    }
})