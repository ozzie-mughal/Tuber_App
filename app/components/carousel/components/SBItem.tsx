import React from 'react';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { Image, Button, View, Text, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { SBImageItem } from './SBImageItem';
import { SBTextItem } from './SBTextItem';
//import Constants from 'expo-constants';
import Animated, { AnimateProps } from 'react-native-reanimated';
import type { StyleProp, ViewStyle, ImageStyle } from 'react-native';
import type { ViewProps } from 'react-native';
import colors from '../../../styles/colors';

interface Props extends AnimateProps<ViewProps> {
    style?: StyleProp<ImageStyle>;
    index: number;
    refData: Array<Object>;
}

//Banner BG assets are hard-coded here for now on account of require() needing to compile before <Image>
//component is loaded. Need to refactor to dynamic reference in assets directory
const bannerBGImages = [
    {index: 0, ref: require('../../../assets/banners/WelcomeTourBanner.png'), 
    buttonXLoc: 'right', buttonText: 'Start Tour'},
    {index: 1, ref: require('../../../assets/banners/ReferAFriendBanner.png'), 
    buttonXLoc: 'left', buttonText: 'Refer Now'},
    {index: 2, ref: require('../../../assets/banners/BecomeATutorBanner.png'), 
    buttonXLoc: 'right', buttonText: 'Apply Now'},
  ]

export const SBItem: React.FC<Props> = (props) => {
    const { style, index, refData, ...animatedViewProps } = props;
    // @ts-ignore
    var refItem = bannerBGImages[index].ref;
    var refItemText = bannerBGImages[index].buttonText;
    var refItemLoc = bannerBGImages[index].buttonXLoc;

    return (
            <Animated.View style={{ flex: 1 }} {...animatedViewProps}>
                <ImageBackground source={refItem}
                    style={[style,styles.imageBackgroundShadow,{justifyContent:'flex-end'}]}>
                <View style={{flexDirection:'row',justifyContent:
                    refItemLoc === 'left' ? 'flex-start' : 'flex-end',
                    }}>
                    <Pressable style={styles.secondaryButtonInline} onPress={()=>{
                        console.log('Banner pressed for ',index)}}>
                        <Text style={styles.secondaryButtonInlineText}>{refItemText}</Text>
                    </Pressable>
                </View>
                </ImageBackground>
            </Animated.View>
    );
};

const styles = StyleSheet.create({
    secondaryButtonInline: {
        width: '20%',
        padding: 2,
        borderRadius: 25,
        backgroundColor: colors.turquoise_green_light,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 15,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset : { width: 0, height: 1}
    },
    secondaryButtonInlineText: {
        fontSize: 12,
        fontWeight: "500",
    },
    imageBackgroundShadow: {
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    }
})