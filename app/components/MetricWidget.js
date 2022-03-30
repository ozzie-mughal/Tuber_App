import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MetricWidget = ({headingText, subHeadingText, subSubHeadingText, seeMoreText}) => {

    const arrowRight = <MaterialIcons name={"keyboard-arrow-right"} color={'black'} size={30}/>;


    return (
        <TouchableOpacity>
            <View style={{alignItems:'flex-start', marginBottom: 5}}>
                <Text style={styles.headingText}>
                    {headingText}
                </Text>
                <Text style={styles.subHeadingText}>
                    {subHeadingText}
                </Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
                <Text style={styles.subSubHeadingText}>
                {subSubHeadingText}
            </Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
                <View style={styles.openbutton}>
                    {arrowRight}
                </View>
            </View>
        </TouchableOpacity>
  )
}

export default MetricWidget

const styles = StyleSheet.create({
    cellContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        margin: 5,
    },
    headingText: {
        fontSize:48,
        fontWeight: '700',
        color:'white'
    },
    subHeadingText: {
        fontSize:16,
        fontWeight: '700',
        color:'white'

    },
    subSubHeadingText: {
        fontSize:12,
        fontWeight: '700',
        textAlign:'right'
    },
    openbutton: {
        justifyContent:'flex-end',
        alignItems:'flex-end',
        //borderRadius: 25,
        marginTop: 5,
    },
    openbutton_text: {
        fontWeight: "800",
        fontSize: 12,
        padding: 2,
        color: 'black'
    }
})