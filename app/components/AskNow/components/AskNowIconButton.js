import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import elements from '../../../styles/elements';

const AskNowIconButton = ({icon, onPress, showLoading}) => {

  //const [showLoading, setShowLoading] = useState(false);

  return (
    <TouchableOpacity style={[elements.askNowIconContainer, {flexDirection:'row'}]} onPress={onPress}>
        {showLoading && 
        <ActivityIndicator style={{paddingHorizontal:10}}/>
        }
        {icon}
    </TouchableOpacity>
  )
}

export default AskNowIconButton