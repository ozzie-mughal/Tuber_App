import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../styles/colors';
import SecondaryButtonInline from './SecondaryButtonInline';
import NewAsk from './NewAsk';
import AskHowText from './animations/AskHowText';

const AskNowWidget = ({ navigation }) => {

    const [showNewAsk, setShowNewAsk] = useState(false);

  return (
    <View style={[styles.container,styles.cardShadow]}>
            <LinearGradient
                // Background Linear Gradient
                colors={[colors.turquoise_blue,colors.pastel_blue,colors.turquoise_blue]}
                start={{x:0.2,y:0.1}}
                end={{x:0.3,y:0.9}}
                locations={[0.1,0.6,1]}
                style={[styles.background]}
            />
        <View style={styles.header}>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.headerText}>I want to </Text>
            <View style={{width:50}}>
                <AskHowText/>
            </View>
            <Text style={styles.headerText}> an Ask about</Text>
            </View>
        </View>
        <View style={styles.cardInnerContainer}>
            <SecondaryButtonInline title='Ask Now >' onPress={()=> {setShowNewAsk(true)}}/>
        </View>
        <NewAsk showNewAsk={showNewAsk} setShowNewAsk={setShowNewAsk} navigation={navigation}/>
    </View>
  )
}

export default AskNowWidget

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        borderRadius: 10
    },

    container: {
        marginHorizontal: 5,
        marginVertical: 10,
        width: 275
    },
 
    cardShadow: {
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius:3,
        shadowOffset : { width: 0, height: 3},
        
        //borderWidth: 1,
        //borderColor: colors.grey_light
    },
    cardInnerContainer: {
        //backgroundColor: '#EDEDED',
        borderRadius: 10,
        flexDirection:'row',
        justifyContent:'flex-end'
        //borderWidth: 1,
        //borderColor: colors.grey_light
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        flexWrap:'wrap'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '500'
    },
})