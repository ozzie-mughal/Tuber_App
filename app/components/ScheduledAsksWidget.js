import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../styles/colors'
import Moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimerWidget from './TimerWidget';


const ScheduledAsksWidget = () => {

const arrowRight = <MaterialIcons name={"keyboard-arrow-right"} color={colors.turquoise} size={30}/>;
const randomAvatar = 'https://i.pravatar.cc/300';


  return (
        <View >
            <View style={{
                flexDirection: "row",
                justifyContent: "center"}}>
                <Text style={{color:colors.grey}}>
                    No scheduled Asks.
                </Text>
            </View>
        </View>

  )
}

export default ScheduledAsksWidget

const styles = StyleSheet.create({
    content_card_live_msgbox: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        margin: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset : { width: 0, height: 2}
    },
    openbutton: {
        justifyContent:'center',
        alignItems:'center',
    },
    openbutton_text: {
        fontWeight: "600",
        fontSize: 12,
        //padding: 4,
        color: 'white'
    },
    viewImage: {
        resizeMode: "contain",
        width: 35,
        height: 35,
        justifyContent: "flex-end",
        borderRadius: 18
    },
    viewImage_small: {
        resizeMode: "contain",
        width: 16,
        height: 16,
        justifyContent: "flex-end"
    },
    viewImage_medium: {
        resizeMode: "contain",
        width: 64,
        height: 64,
        justifyContent: "flex-end",
        margin: 10,
        borderRadius: 32
    },
})