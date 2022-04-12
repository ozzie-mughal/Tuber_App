import { StyleSheet, Text, View, TextInput, Pressable, 
    TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesome, SimpleLineIcons, Feather, Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import { Auth, DataStore, Storage } from 'aws-amplify';
import { ChatRoom, Message as MessageModel} from '../../src/models';
import EmojiSelector from 'react-native-emoji-selector'
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const plus_icon = <FontAwesome name={"plus-circle"} 
    color={colors.turquoise} size={40} style={{marginHorizontal: 5}}/>;
const image_icon = <Feather name={"image"} 
    color={colors.grey} size={30} style={{marginHorizontal: 5}}/>;
const camera_icon = <Feather name={"camera"} 
    color={colors.grey} size={30} style={{marginHorizontal: 5}}/>;
const microphone_icon = <Feather name={"mic"} 
    color={colors.grey} size={30} style={{marginHorizontal: 5}}/>;
const smile_icon = <SimpleLineIcons name={"emotsmile"} 
    color={colors.grey} size={30} style={{marginHorizontal: 5}}/>;
const send_icon = <Ionicons name={"send"} 
    color={colors.turquoise} size={30} style={{marginHorizontal: 5}}/>;
const close_icon = <Ionicons name={"close-circle-outline"} 
    color={colors.grey} size={30} style={{marginHorizontal: 5}}/>;

const MessageInput = ({ chatRoom }) => {

    //Set states of each text type
    const [message, setMessage] = useState('');
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    //Reset fields on send
    const resetFields = () => {
        setMessage('');
        setImage(null);
        setEmojiPickerOpen(false);
        setProgress(0);
    }
    
    //Image Picker
    //Check image permissions
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const cameraRollResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const cameraResponse = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraRollResponse.status !== 'granted' || cameraResponse.status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    },[]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.cancelled) {
        setImage(result.uri);
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.cancelled) {
        setImage(result.uri);
        }
    };

    const progressCallback = (progress) => {
        setProgress(progress.loaded / progress.total);
    }

    const sendImage = async () => {
        if (!image) {
            return;
        }
        const blob = await getImageBlob();
        //UUID is used to create unique image ID
        const { key } = await Storage.put(uuidv4()+'.png',blob, { progressCallback }); 

        //Display uploaded image in chat
        const senderUser = await Auth.currentAuthenticatedUser();
        const newMessage = await DataStore.save(new MessageModel({
            content: message,
            image: key,
            userID: senderUser.attributes.sub,
            chatroomID: chatRoom?.id,
        }))

        updateLastMessage(newMessage);
        resetFields();
    }

    //Image URI needs to be converted to BLOB for S3 storage
    const getImageBlob = async () => {
        if (!image) {
            return;
        }
        const response = await fetch(image);
        const blob = response.blob();
        return blob;
    }

    //Audio Maker
    const [audio, setAudio] = useState(null);


    //Message Sender
    const sendMessage = async () => {
        const senderUser = await Auth.currentAuthenticatedUser();
        const newMessage = await DataStore.save(new MessageModel({
            content: message,
            userID: senderUser.attributes.sub,
            chatroomID: chatRoom?.id,
        }))

        updateLastMessage(newMessage);
        resetFields();
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
        if (image) {
            sendImage();
        } else if (audio) {
            sendAudio();
        } else if (message) {
            sendMessage();
        } else {
            onPlusPress();
        }
    };
  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    style={[styles.root, {height: emojiPickerOpen ? '50%' : 'auto'}]}
    keyboardVerticalOffset={100}>

        {/*Image Preview (if selected) */}
        {image && 
        <View style={styles.imagePreviewContainer}>
            <View style={{flexDirection:'row', marginBottom: 5}}>
                <Image source={{uri: image}} style={{width: 100, height: 100, borderRadius: 10}}/>
                <TouchableOpacity onPress={()=>setImage(null)}>
                    {close_icon}
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor:colors.turquoise, 
                height: 4, width: (progress * 100)+'%'}}/>
        </View>}

        {/*Message Input */}
        <View style={{flexDirection:'row'}}>
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={()=> 
                    setEmojiPickerOpen((currentValue) => !currentValue)}>
                {smile_icon}
                </TouchableOpacity>

                <TextInput 
                    style={styles.input}
                    placeholder="Type message"
                    value={message}
                    onChangeText={setMessage}/>

                <TouchableOpacity onPress={pickImage}>
                {image_icon}
                </TouchableOpacity>

                <TouchableOpacity onPress={takePhoto}>
                {camera_icon}
                </TouchableOpacity>
                
                <TouchableOpacity>
                {microphone_icon}
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                onPress={onSendPress}
                style={styles.buttonContainer}>
                {message || image ? send_icon : plus_icon}
            </TouchableOpacity>
        </View>
        {emojiPickerOpen && <EmojiSelector onEmojiSelected={emoji => 
            setMessage(currentMessage => currentMessage + emoji)}
            columns={8} />}

    </KeyboardAvoidingView>
  )
}

export default MessageInput

const styles = StyleSheet.create({
    root: {
        //flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        borderTopWidth: 1,
        borderColor: colors.grey_light,
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
    imagePreviewContainer: {
        borderRadius: 10,
        borderColor: colors.grey_light,
        borderWidth: 1,
        backgroundColor: 'whitesmoke',
        padding: 5,
        marginBottom: 5,
        //flexDirection:'row'

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