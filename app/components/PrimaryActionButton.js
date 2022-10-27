import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import elements from '../styles/elements';

const PrimaryActionButton = ({title, onPress, style, disabled}) => {
  return (
    <TouchableOpacity style={[style, elements.primaryActionButton, disabled ? {opacity:0.5} : null]} 
      onPress={onPress} disabled={disabled}>
        <Text style={elements.primaryActionButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryActionButton