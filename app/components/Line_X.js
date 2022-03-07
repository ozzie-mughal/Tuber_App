import React from 'react';
import { View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

export default function Line_X({
  customStyles,
  customHeight,
  customWidth,
  customPaddingHorizontal,
  customPaddingVertical,
  customColor,
  customX1,
  customY1,
  customX2,
  customY2
}) {
  return (
    <View style={{
      paddingVertical:customPaddingVertical,
      paddingHorizontal: customPaddingHorizontal,
      justifyContent: 'center'}}>
      <Svg
        height={customHeight}
        width={customWidth}
        //viewBox="0 0 140 20"
        //style={{ position: 'absolute', top: 50 }}
      >
        <Line x1={customX1} y1={customY1} x2={customX2} y2={customY2} stroke={customColor} strokeWidth="5" />
      </Svg>
    </View>
  );
}
