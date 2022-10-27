import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../styles/colors';

const DashboardPill = ({icon, title, onPress, 
    backgroundColor, titleStyle}) => {
    return (
        <TouchableOpacity style={[
            styles.content_card_half,
            {backgroundColor: backgroundColor}]}>
            <View style={{
                flexDirection: "row",
                justifyContent:'flex-start',
                alignItems: "center",
                padding: 5}}>
                {icon}
                <Text style={[{
                    paddingLeft: 7,
                    paddingRight: 14,
                    fontFamily:'Nunito-Bold',
                    color:'white'},titleStyle]}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
  )
}

export default DashboardPill

const styles = StyleSheet.create({
    content_card_half: {
        justifyContent:'flex-start',
        //alignItems:'center',

    },
})