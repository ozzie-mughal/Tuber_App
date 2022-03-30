import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import elements from '../styles/elements';


const SecondaryActionButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={elements.secondaryActionButton} onPress={onPress}>
        <Text style={elements.secondaryActionButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default SecondaryActionButton