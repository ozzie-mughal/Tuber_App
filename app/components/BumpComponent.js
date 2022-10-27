import React, { useState } from 'react';
import { View } from 'react-native';
import NewAsk from './NewAsk';

const BumpComponent = ({ navigation }) => {


  const [showNewAsk, setShowNewAsk] = useState(true);

  return (
      <NewAsk showNewAsk={showNewAsk} setShowNewAsk={setShowNewAsk} navigation={navigation}/>

  )
}

export default BumpComponent
