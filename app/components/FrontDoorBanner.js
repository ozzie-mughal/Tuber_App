import React from 'react'
import { StyleSheet, View, Image } from 'react-native';
import WavyHeader from '../components/WavyHeader';
import elements from '../styles/elements';
import colors from '../styles/colors'; 
import { LinearGradient } from 'expo-linear-gradient';

const FrontDoorBanner = () => {
  return (
    <View>
        <View style={elements.screenHeaderContainer}>                
            <LinearGradient
                // Background Linear Gradient
                colors={[colors.turquoise_green, colors.turquoise_blue]}
                locations={[0.3,1.0]}
                style={[styles.background]}
            />
        
            <Image 
                source={require('../assets/nemo-bannerlogo.png')}
                style={{resizeMode: 'contain', flex:1, width: 500, height: 500,}}
            />
        </View>
        <View style={{
            height: 30,
        }}>
            <WavyHeader
                customHeight={250}
                customFill={colors.turquoise_blue}
                customBgColor="transparent"
                customWavePattern="m0 0 48 26.7C96 53 192 107 288 144s192 59 288 48 192-53 288-80 192-37 288-26.7c96 10.7 192 42.7 240 58.7l48 16V0H0Z"
            />
        </View>
    </View>
  )
}

export default FrontDoorBanner

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      paddingBottom: 150,
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: "100%",
      //backgroundColor: "#FFFFFF"
  },
  });