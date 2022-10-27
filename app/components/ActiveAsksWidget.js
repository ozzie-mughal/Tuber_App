import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../styles/colors'
import Moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimerWidget from './TimerWidget';


const ActiveAsksWidget = () => {

const arrowRight = <MaterialIcons name={"keyboard-arrow-right"} color={colors.startup_purple} size={30}/>;
const randomAvatar = 'https://i.pravatar.cc/300';


  return (
    <TouchableOpacity>
        <View style={styles.content_card_live_msgbox}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between"}}>
                <View style={{flexDirection: "row"}}>
                    <Image 
                        source={{uri:randomAvatar}}
                        style={styles.viewImage}/>
                    <View style={{paddingLeft:3}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{
                                fontWeight:"600",
                                paddingRight:3}}>
                                Ossama
                            </Text>
                            <Image 
                                source={require('../assets/green-dot.png')}
                                style={styles.viewImage_small}/>
                        </View>
                        <Text numberOfLines={1} style={{width:150}}>Yep, the answer is 5.</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', 
                    justifyContent:'flex-start',alignItems:'center'
                    }}>
                    <TimerWidget pillContainerVisible={true}/>
                    <TouchableOpacity style={styles.openbutton}>
                            {arrowRight}
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    </TouchableOpacity>
  )
}

export default ActiveAsksWidget

const styles = StyleSheet.create({
    content_card_live_msgbox: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        margin: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowOffset : { width: 0, height: 0}
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
        width: 12,
        height: 12,
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