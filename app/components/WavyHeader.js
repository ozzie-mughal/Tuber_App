import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function WavyHeader({
  customStyles,
  customHeight,
  customTop,
  customBgColor,
  customWavePattern,
  customFill,
}) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: customBgColor, height: customHeight, width: 450 }}>
        <Svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1520 1520"
          >
          <Path
            fill={customFill}
            d= {customWavePattern}
          />
        </Svg>
      </View>
    </View>
  );
}
