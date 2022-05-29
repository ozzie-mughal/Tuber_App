import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import elements from '../styles/elements';


const SecondaryButtonInline = ({title, onPress}) => {
  return (
    <TouchableOpacity style={elements.secondaryButtonInline} onPress={onPress}>
        <Text style={elements.secondaryButtonInlineText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default SecondaryButtonInline