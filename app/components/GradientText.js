import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from 'expo-linear-gradient';
import colors from "../styles/colors";
    
const GradientText = (props) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
                    // Background Linear Gradient
                    // colors={[colors.skyblue_crayola
                    //     , colors.turquoise
                    //     , colors.aquamarine]}
                    colors={['black','black','black']}
                    start={{x:0.2,y:0.1}}
                    end={{x:0.7,y:0.9}}
                    locations={[0.1, 0.3, 0.8]}
                    //style={[styles.background]}
                >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;