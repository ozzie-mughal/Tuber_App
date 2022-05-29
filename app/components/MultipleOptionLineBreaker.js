import { StyleSheet, Text, View, Dimensions} from 'react-native'
import React from 'react'
import Line_X from './Line_X'

const MultipleOptionLineBreaker = () => {

    const {height, width} = Dimensions.get('window');

  return (
    <View style={{flexDirection:'row', paddingVertical: 5, marginHorizontal: 10,justifyContent:'center'}}>
        <Line_X customColor="grey" customWidth={0.2*width} customHeight={5}
            customX1={0} customY1={0} customX2={130} customY2={0}/>
        <Text style={{marginHorizontal:10, color: 'grey', fontSize: 14}}>
            or
        </Text>
        <Line_X customColor="grey" customWidth={0.2*width} customHeight={5}
            customX1={0} customY1={0} customX2={130} customY2={0}/>
    </View>
  )
}

export default MultipleOptionLineBreaker
