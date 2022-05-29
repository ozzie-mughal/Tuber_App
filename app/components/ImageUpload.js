import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import SecondaryButtonInline from './SecondaryButtonInline';
import takePhoto from '../functions/takePhoto';
import pickImage from '../functions/pickImage';
import icons from '../styles/icons';
import colors from '../styles/colors';
import * as ImagePicker from 'expo-image-picker';

const ImageUpload = ({ imageUpload, setImageUpload }) => {

    //Check image permissions
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const cameraRollResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const cameraResponse = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraRollResponse.status !== 'granted' || cameraResponse.status !== 'granted') {
                    alert('Sorry, we need camera/microphone permissions to make this work!');
                }
            }
        })();
    },[]);

    const takePhotoPress = () => {
        takePhoto(setImageUpload);
    }
    const pickImagePress = () => {
        pickImage(setImageUpload);
    }

  return (
    <View style={styles.container}>
        {imageUpload && 
        <View style={styles.sendPreviewContainer}>
            <View style={{flexDirection:'row', marginBottom: 5}}>
                <Image source={{uri: imageUpload}} style={{width: 100, height: 100, borderRadius: 10}}/>
                <TouchableOpacity onPress={()=>setImageUpload(null)}>
                    {icons.close}
                </TouchableOpacity>
            </View>
        </View>}
        {!imageUpload && <View style={{flexDirection:'row', alignContent:'space-between'}}>
            <SecondaryButtonInline title='Upload image' onPress={pickImagePress}/>
            <SecondaryButtonInline title='Take picture' onPress={takePhotoPress}/>
        </View>}
    </View>
  )
}

export default ImageUpload

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    input: {
        paddingHorizontal: 15,
        //width: {width} ? {width} : '100%'
    },
    errorText: {
        color: 'red',
        paddingTop: 5
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
})