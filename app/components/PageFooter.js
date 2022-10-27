import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import colors from '../styles/colors';
import elements from '../styles/elements';
import PrimaryActionButton from './PrimaryActionButton';
import SecondaryActionButton from './SecondaryActionButton';

const PageFooter = ({ primaryButtonTitle, secondaryButtonTitle,
  primaryOnPress, secondaryOnPress, 
  primaryDisabled, secondaryDisabled}) => {
  return (
    <View style={styles.footer_container}>   
      <SecondaryActionButton title={secondaryButtonTitle} onPress={secondaryOnPress} disabled={secondaryDisabled}/>
      <PrimaryActionButton title={primaryButtonTitle} onPress={primaryOnPress} disabled={primaryDisabled}/>
    </View>
  )
}

export default PageFooter
const styles = StyleSheet.create({
  footer_container: {
        paddingVertical: 15,
        marginTop: 15,
        borderTopWidth:1,
        borderColor: colors.grey_light,
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20
      },
})