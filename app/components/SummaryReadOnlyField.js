import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../styles/colors'

const SummaryReadOnlyField = ({ icon, label, value }) => {
  return (
    <View style={{flexDirection:'row', alignItems:'center', 
    justifyContent:'space-between', marginVertical:5}}>
        <Text style={styles.fieldLabel}>{label} </Text>
        <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
            <View style={styles.valueContainer}>
                <View style={styles.iconContainer}>
                {icon}
                </View>
                <Text style={styles.fieldValue}>{value}</Text>
            </View>
        </View>
    </View>
  )
}

export default SummaryReadOnlyField

const styles = StyleSheet.create({
    page: {
      //flex: 1,
      backgroundColor: 'white'
    },
    fieldLabel: {
        fontFamily:'Nunito-Bold', 
        color: colors.secondary
    },
    fieldValue: {
        fontFamily:'Nunito-Medium', 
        color: colors.secondary
    },
    iconContainer: {
        marginRight: 15
    },
    header_container: {
      marginVertical: 30
    },
    segControl_container: {
      paddingHorizontal: 15,
      //width: "100%",
      //height: "10%",
  
    },
    timerText: {
      fontSize: 14,
      fontWeight: '600'
    },
    valueContainer: {
      padding: 5,
      backgroundColor: colors.grey_light,
      //width: 120,
      flexDirection: 'row',
      borderRadius: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })