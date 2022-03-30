import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import elements from '../styles/elements';

const ShowMore = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[style, elements.showMoreButton]} onPress={onPress}>
        <Text style={elements.showMoreButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ShowMore