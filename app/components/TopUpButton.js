import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import elements from '../styles/elements';
import colors from '../styles/colors';


const TopUpButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.secondaryButtonInline} onPress={onPress}>
        <Text style={styles.secondaryButtonInlineText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default TopUpButton

const styles = StyleSheet.create({
  secondaryButtonInline: {
    //width: '20%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 25,
    //borderWidth: 1,
    //borderColor: colors.lavender,
    backgroundColor: colors.yellow_sun,
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 10,
    //borderWidth: 3
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset : { width: 0, height: 3}
  },
  secondaryButtonInlineText: {
    fontSize: 18,
    fontWeight: "500",
  }
})