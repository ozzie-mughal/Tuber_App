import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import elements from '../../../styles/elements';

const AskNowPrimaryButton = ({title, onPress, showLoading}) => {

  //const [showLoading, setShowLoading] = useState(false);

  return (
    <TouchableOpacity style={[elements.askNowPrimaryButton, {flexDirection:'row'}]} onPress={onPress}>
        {showLoading && 
        <ActivityIndicator style={{paddingHorizontal:10}}/>
        }
        <Text style={elements.askNowPrimaryButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AskNowPrimaryButton