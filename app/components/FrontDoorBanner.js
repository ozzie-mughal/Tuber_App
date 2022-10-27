import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native';
import WavyHeader from '../components/WavyHeader';
import elements from '../styles/elements';
import colors from '../styles/colors'; 
import { LinearGradient } from 'expo-linear-gradient';

const FrontDoorBanner = ({heading, subHeading}) => {
  return (
        <View style={elements.screenHeaderContainer}>   
            <View style={{justifyContent: 'center',alignItems: 'center',}}>
                <Image 
                    source={require('../assets/brand/nimble_icononly.png')}
                    style={{resizeMode:'contain',width: 150, height: 150}}
                />  
            </View>
            <View style={{marginLeft:20}}>
                <Text style={elements.contentHeading_text}>
                    {heading}
                </Text>
                <Text style={elements.contentSubheading_text}>
                    {subHeading}
                </Text>
            </View>
        </View>
  )
}

export default FrontDoorBanner

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      paddingBottom: 50,
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