import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import elements from '../styles/elements';

const PrimaryButton = ({title, onPress, showLoading}) => {

  //const [showLoading, setShowLoading] = useState(false);

  return (
    <TouchableOpacity style={[elements.primaryButton, {flexDirection:'row'}]} onPress={onPress}>
        {showLoading && 
        <ActivityIndicator style={{paddingHorizontal:10}}/>
        }
        <Text style={elements.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton