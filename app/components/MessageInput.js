import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

const plus_icon = <FontAwesome name={"plus-circle"} color={colors.skyblue_crayola} size={40} style={{marginHorizontal: 5}}/>;
const camera_icon = <Feather name={"camera"} color={colors.skyblue_crayola} size={30} style={{marginHorizontal: 5}}/>;
const microphone_icon = <Feather name={"mic"} color={colors.skyblue_crayola} size={30} style={{marginHorizontal: 5}}/>;
const smile_icon = <SimpleLineIcons name={"emotsmile"} color={colors.skyblue_crayola} size={30} style={{marginHorizontal: 5}}/>;
const send_icon = <Ionicons name={"send"} color={colors.skyblue_crayola} size={30} style={{marginHorizontal: 5}}/>;

const MessageInput = () => {

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        console.warn("sending: ",message);;

        setMessage('');
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
        {smile_icon}
        <TextInput 
            style={styles.input}
            placeholder="Type message"
            value={message}
            onChangeText={setMessage}/>
        {camera_icon}
        {microphone_icon}
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
        flex: 1
    },
    icon: {
        marginHorizontal: 5
    }
})