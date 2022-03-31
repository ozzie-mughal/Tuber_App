import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import elements from '../styles/elements';

const PrimaryActionListButton = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[style, elements.primaryActionListButton]} onPress={onPress}>
        <Text style={elements.primaryActionListButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryActionListButton