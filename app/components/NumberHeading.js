import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../styles/colors'

const NumberHeading = ({title, number}) => {
  return (
    <View style={styles.container}>
        <View style={styles.numberContainer}>
            <Text style={styles.numberHeadingText}>{number}</Text>
        </View>
        <View>
        <Text style={styles.headingText}>{title}</Text>
        </View>
    </View>
  )
}

export default NumberHeading

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection:'row',
        alignItems:'center'
    },
    numberContainer: {
        backgroundColor:colors.baby_blue_light, 
        width: 40,
        height: 40,
        //padding: 20,
        borderRadius: 70,
        justifyContent:'center',
        alignItems:'center' ,
        marginRight: 10
    },
    headingText: {
        fontSize: 24, 
        fontWeight:'600'
    },
    numberHeadingText: {
        fontSize: 30, 
        fontWeight:'400',
    }
})