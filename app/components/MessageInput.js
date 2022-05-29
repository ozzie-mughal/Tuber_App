import { StyleSheet, Text, View, TextInput, Pressable, 
    TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../styles/colors';
import icons from '../styles/icons';
import { Auth, DataStore, Storage } from 'aws-amplify';
import { ChatRoom, Message as MessageModel} from '../../src/models';
import EmojiSelector from 'react-native-emoji-selector'
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Audio } from 'expo-av';
import AudioPlayer from './AudioPlayer';
import getBlob from '../functions/getBlob';
import takePhoto from '../functions/takePhoto';
import pickImage from '../functions/pickImage';


const MessageInput = ({ chatRoom }) => {
    
    //Set states of each text type
    const [message, setMessage] = useState('');
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(0);
    const [soundURIUploadProgress, setSoundURIUploadProgress] = useState(0);
    const [recording, setRecording] = useState(null);
    const [audio, setAudio] = useState(null);
    const [soundURI, setSoundURI] = useState(null);


    //Reset fields on send
    const resetFields = () => {
        setMessage('');
        setImage(null);
        setEmojiPickerOpen(false);
        setImageUploadProgress(0);
        setSoundURIUploadProgress(0);
        setSoundURI(null);
        setAudio(null);
    }
    
    //Check image and audio permissions
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const cameraRollResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const cameraResponse = await ImagePicker.requestCameraPermissionsAsync();
                const audioResponse = await Audio.requestPermissionsAsync();
                if (cameraRollResponse.status !== 'granted' || cameraResponse.status !== 'granted'
                    || audioResponse.status !== 'granted') {
                    alert('Sorry, we need camera/microphone permissions to make this work!');
                }
            }
        })();
    },[]);

    
    //Image Picker

    const takePhotoMessage = () => {
        takePhoto(setImage);
    }
    const pickImageMessage = () => {
        pickImage(setImage);
    }

    const progressCallback = (progress) => {
        if (image) {
            setImageUploadProgress(progress.loaded / progress.total);
        } else if (soundURI) {
            setSoundURIUploadProgress(progress.loaded / progress.total);
        }
    }

    const sendImage = async () => {
        if (!image) {
            return;
        }
        const blob = await getBlob(image);
        //UUID is used to create unique image ID
        const { key } = await Storage.put(uuidv4()+'.png',blob, { progressCallback }); 

        //Display uploaded image in chat
        const senderUser = await Auth.currentAuthenticatedUser();
        const newMessage = await DataStore.save(new MessageModel({
            content: message,
            image: key,
            userID: senderUser.attributes.sub,
            chatroomID: chatRoom?.id,
            status: "SENT"
        }))

        updateLastMessage(newMessage);
        resetFields();
    }

    //Audio Maker
    async function startRecording() {
        try {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          }); 
          const { recording } = await Audio.Recording.createAsync(
             Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          setRecording(recording);
        } catch (err) {
          console.error('Failed to start recording', err);
        }
    }
    
      async function stopRecording() {
        if (!recording) {
            return;
        }
        setRecording(null);
        await recording.stopAndUnloadAsync();

        setSoundURI(recording.getURI()); 
        setAudio(true)
      }

      const sendAudio = async () => {
        if (!soundURI) {
            return;
        }
        const blob = await getBlob(soundURI);
        //UUID is used to create unique audio ID
        const { key } = await Storage.put(uuidv4()+'.m4a',blob, { progressCallback }); 

        //Display uploaded image in chat
        const senderUser = await Auth.currentAuthenticatedUser();
        const newMessage = await DataStore.save(new MessageModel({
            content: message,
            audio: key,
            userID: senderUser.attributes.sub,
            chatroomID: chatRoom?.id,
            status: "SENT"
        }))

        updateLastMessage(newMessage);
        resetFields();
    }


    //Message Sender
    const sendMessage = async () => {
        const senderUser = await Auth.currentAuthenticatedUser();
        const newMessage = await DataStore.save(new MessageModel({
            content: message,
            userID: senderUser.attributes.sub,
            chatroomID: chatRoom?.id,
            status: "SENT"
        }))

        updateLastMessage(newMessage);
        resetFields();
    }

    const updateLastMessage = async (newMessage) => {
        //Create copy of chatroom (to update lastMessage) as entity is immutable
        await DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
            updatedChatRoom.LastMessage = newMessage;
        }))
    }

    const onPlusPress = () => {
        console.warn("on plus clicked");
    }

    const onSendPress = () => {
        if (image) {
            sendImage();
        } else if (soundURI) {
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
        <View style={styles.sendPreviewContainer}>
            <View style={{flexDirection:'row', marginBottom: 5}}>
                <Image source={{uri: image}} style={{width: 100, height: 100, borderRadius: 10}}/>
                <TouchableOpacity onPress={()=>setImage(null)}>
                    {icons.close}
                </TouchableOpacity>
            </View>
            {/*Upload progress bar */}
            <View style={{backgroundColor:colors.turquoise, 
                height: 4, width: (imageUploadProgress * 100)+'%'}}/>
        </View>}

        {/*Audio Recording in Progress Alert (if selected) */}
        {recording && <View style={styles.sendPreviewContainer}>
            <View style={{flexDirection:'row', marginBottom: 5}}>
                <Text>Recording in progress. Release to preview.</Text>
            </View>
        </View>}
        {/*Audio Preview (if selected) */}
        {audio && <AudioPlayer soundURI={soundURI} setAudio={setAudio} deleteButton={true} setSoundURI={setSoundURI}/>}
        {/*Upload progress bar */}
        {audio && 
            <View style={{backgroundColor:colors.turquoise, 
                height: 4, marginVertical: 5, width: (soundURIUploadProgress * 100)+'%'}}/>}

        {/*Message Input */}
        <View style={{flexDirection:'row'}}>
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={()=> 
                    setEmojiPickerOpen((currentValue) => !currentValue)}>
                {emojiPickerOpen ? icons.smile_selected : icons.smile}
                </TouchableOpacity>

                <TextInput 
                    style={styles.input}
                    placeholder="Type message..."
                    value={message}
                    onChangeText={setMessage}/>

                <TouchableOpacity onPress={pickImageMessage}>
                {icons.image}
                </TouchableOpacity>

                <TouchableOpacity onPress={takePhotoMessage}>
                {icons.camera}
                </TouchableOpacity>
                

            </View>
            <TouchableOpacity 
                onPress={onSendPress}
                style={styles.buttonContainer}>
                {message || image || soundURI ? icons.send : 
                    <Pressable onPressIn={startRecording} onPressOut={stopRecording}
                        style={recording ? styles.micButtonPressed : styles.micButton}>
                        {recording ? icons.microphone_selected : icons.microphone}
                    </Pressable>}
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
        marginTop: 5,
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
    sendPreviewContainer: {
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
    audioPlaybackBar: {
        backgroundColor:colors.grey_light, 
        borderRadius: 10, 
        height: 4, 
        flex:1, 
        marginHorizontal:10
    },
    audioPlaybackSlider: {
        backgroundColor: colors.turquoise, 
        borderRadius: 15, 
        height: 15,
        width: 15, 
        position: 'absolute',
        top: -5
    },
    micButton: {
        backgroundColor:'whitesmoke',
        padding: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.turquoise,
        justifyContent: 'center',
        alignItems:'center'
    },
    micButtonPressed: {
        backgroundColor: colors.turquoise,
        padding: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.turquoise,
        justifyContent: 'center',
        alignItems:'center'
    }
})