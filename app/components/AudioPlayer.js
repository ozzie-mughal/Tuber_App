import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../styles/colors'
import icons from '../styles/icons'
import getCountDown from '../functions/getCountDown'
import { Audio } from 'expo-av';


const AudioPlayer = ({ soundURI, setSoundURI, setAudio, deleteButton }) => {
    //Set states
    const [audioProgress, setAudioProgress] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);
    const [sound, setSound] = useState(null);
    const [paused, setPaused] = useState(true);
    const [finish, setFinish] = useState(false)

    useEffect(() => {
        loadSound();
        () => {
            if (sound) {
                sound.unloadAsync();
            }
        }
    },[soundURI]);

    const loadSound = async () => {
        if (!soundURI) {
            return;
        }
        const { sound } = await Audio.Sound.createAsync({ uri: soundURI }, {}, onPlaybackStatusUpdate);
        setSound(sound);
    };

    const onPlaybackStatusUpdate = (status) => {
        if (!status.isLoaded) {
            return;
        }
        setAudioProgress(status.positionMillis / status.durationMillis);
        setPaused(!status.isPlaying);
        setFinish(status.didJustFinish);
        const currentDurationFormatted = getCountDown(status.positionMillis,status.durationMillis);
        setAudioDuration(currentDurationFormatted);
    };

    const playPauseSound = async () => {
        if (!sound) {
          return;
        }
        if (paused){
          //setPaused(false);
          await sound.playFromPositionAsync(0);
        } 
        else {
          //setPaused(true)
          await sound.pauseAsync();
        }
    }

    const getCountDown = (millis, totalMillis) => {
        const remainingMillis = totalMillis - millis;
        const minutes = remainingMillis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `-${minutesDisplay}:${secondsDisplay}`;
    }

  return (
    <View style={styles.sendPreviewContainer}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={playPauseSound}>
                    {paused? icons.play : icons.pause}
                </TouchableOpacity>
                <View style={styles.audioPlaybackBar}>
                    <View style={[styles.audioPlaybackSlider, {left: (audioProgress * 100)+'%'}]}/>
                </View>
                <Text style={{marginLeft: 10, color: colors.grey}}>
                    {audioDuration}
                </Text>
                {deleteButton &&
                <TouchableOpacity onPress={()=>{
                    setSound(null)
                    setAudio(null)
                    setSoundURI(null)}}>
                    {icons.close}
                </TouchableOpacity>}
            </View>
        </View>
  )
}

export default AudioPlayer

const styles = StyleSheet.create({
    sendPreviewContainer: {
        borderRadius: 10,
        borderColor: colors.grey_light,
        borderWidth: 1,
        backgroundColor: 'whitesmoke',
        padding: 5,
        marginBottom: 5,
        //flexDirection:'row'
    },
    audioPlaybackBar: {
        backgroundColor:colors.grey_light, 
        borderRadius: 10, 
        height: 4, 
        flex:1, 
        marginHorizontal:10
    },
    audioPlaybackSlider: {
        backgroundColor: colors.primary, 
        borderRadius: 15, 
        height: 15,
        width: 15, 
        position: 'absolute',
        top: -5
    }
})