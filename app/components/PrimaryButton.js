import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import elements from '../styles/elements';

const PrimaryButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={elements.primaryButton} onPress={onPress}>
        <Text style={elements.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton