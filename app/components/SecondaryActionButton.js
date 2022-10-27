import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import elements from '../styles/elements';


const SecondaryActionButton = ({title, onPress, style, disabled}) => {
  return (
    <TouchableOpacity style={[style, elements.secondaryActionButton, disabled ? {opacity:0.5} : null]} 
    onPress={onPress} disabled={disabled}>
        <Text style={elements.secondaryActionButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default SecondaryActionButton