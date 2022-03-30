import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import elements from '../styles/elements';

const PrimaryActionButtonWide = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[style, elements.primaryActionButtonWide]} onPress={onPress}>
        <Text style={elements.primaryActionButtonTextWide}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryActionButtonWide