import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../styles/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const NumberHeading = ({keyword, title, number, onPress}) => {

    const help_icon = <MaterialCommunityIcons name={"help-circle"} color={colors.grey} size={25}/>;

  return (
    <View style={styles.container}>
        <View style={styles.numberContainer}>
            <Text style={styles.numberHeadingText}>{number}</Text>
        </View>
        <View style={styles.headingContainer}>
            <Text>
                <Text style={styles.headingKeywordText}>{keyword}</Text>
                <Text style={styles.headingText}>{title}</Text>
            </Text>
        </View>
        <TouchableOpacity style={styles.helpContainer} onPress={onPress}>
            {help_icon}
        </TouchableOpacity>
    </View>
  )
}

export default NumberHeading

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection:'row',
        alignItems:'center',
    },
    numberContainer: {
        backgroundColor:colors.mint_green, 
        width: 40,
        height: 40,
        //padding: 20,
        borderRadius: 70,
        justifyContent:'center',
        alignItems:'center' ,
        marginRight: 10
    },
    headingContainer: {
        width: '70%'
    },
    helpContainer: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    headingText: {
        fontSize: 24, 
        fontWeight:'600'
    },
    headingKeywordText: {
        fontSize: 28, 
        fontWeight:'700',
        textDecorationLine:'underline'
    },
    numberHeadingText: {
        fontSize: 30, 
        fontWeight:'400',
    }
})