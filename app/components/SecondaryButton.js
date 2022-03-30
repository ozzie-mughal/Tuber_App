import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import elements from '../styles/elements';


const SecondaryButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={elements.secondaryButton} onPress={onPress}>
        <Text style={elements.secondaryButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default SecondaryButton