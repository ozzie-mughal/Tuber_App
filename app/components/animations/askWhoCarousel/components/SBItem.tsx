import React from 'react';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { Image, Button, View, Text, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { SBImageItem } from './SBImageItem';
import { SBTextItem } from './SBTextItem';
//import Constants from 'expo-constants';
import Animated, { AnimateProps } from 'react-native-reanimated';
import type { StyleProp, ViewStyle, ImageStyle } from 'react-native';
import type { ViewProps } from 'react-native';
import colors from '../../../../styles/colors';

interface Props extends AnimateProps<ViewProps> {
    style?: StyleProp<ImageStyle>;
    index: number;
    refData: Array<Object>;
}

//Banner BG assets are hard-coded here for now on account of require() needing to compile before <Image>
//component is loaded. Need to refactor to dynamic reference in assets directory
const askWhoOptions = [
    {index: 0, ref: 'https://i.pravatar.cc/300'},
    {index: 1, ref: 'https://i.pravatar.cc/300'},
    {index: 2, ref: 'https://i.pravatar.cc/300'},
    {index: 3, ref: 'https://i.pravatar.cc/300'},
    {index: 4, ref: 'https://i.pravatar.cc/300'},
    {index: 5, ref: 'https://i.pravatar.cc/300'},
    {index: 6, ref: 'https://i.pravatar.cc/300'},
    {index: 7, ref: 'https://i.pravatar.cc/300'},
    {index: 8, ref: 'https://i.pravatar.cc/300'},
    {index: 9, ref: 'https://i.pravatar.cc/300'},
  ]

export const SBItem: React.FC<Props> = (props) => {
    const { style, index, refData, ...animatedViewProps } = props;
    // @ts-ignore
    var refItem = askWhoOptions[index].ref;

    return (
            <Animated.View style={{ flex: 1 }} {...animatedViewProps}>
                <View style={styles.avatarContainer}>
                        <Image 
                            source={{uri:refItem}}
                            style={styles.viewImage}/>
                    </View>
            </Animated.View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        justifyContent: "center",
        alignItems:'center',
        marginHorizontal: 5,
        //width:'20%'
    },
    viewImage: {
        resizeMode: "contain",
        width: 35,
        height: 35,
        borderRadius: 18
    },
})