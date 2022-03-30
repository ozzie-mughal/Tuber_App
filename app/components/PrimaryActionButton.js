import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import elements from '../styles/elements';

const PrimaryActionButton = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[style, elements.primaryActionButton]} onPress={onPress}>
        <Text style={elements.primaryActionButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryActionButton