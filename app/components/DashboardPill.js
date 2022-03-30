import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../styles/colors';

const DashboardPill = ({icon, title, onPress, 
    backgroundColor}) => {
    return (
        <TouchableOpacity style={[
            styles.content_card_half,
            {backgroundColor: backgroundColor}]}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5}}>
                {icon}
                <Text style={{
                    paddingLeft: 7,
                    paddingRight: 14,
                    fontWeight: "600"}}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
  )
}

export default DashboardPill

const styles = StyleSheet.create({
    content_card_half: {
        borderRadius: 20,
        marginBottom: 15,
        marginRight: 10,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 7,
        shadowOffset : { width: 2, height: 1}
    },
})