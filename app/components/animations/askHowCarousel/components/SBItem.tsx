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
const askHowOptions = [
    {index: 0, ref: 'Text'},
    {index: 1, ref: 'Audio Text'},
    {index: 2, ref: 'Video'},
    {index: 3, ref: 'Group Call'},
  ]

export const SBItem: React.FC<Props> = (props) => {
    const { style, index, refData, ...animatedViewProps } = props;
    // @ts-ignore
    var refItem = askHowOptions[index].ref;

    return (
            <Animated.View style={{ flex: 1 }} {...animatedViewProps}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>{refItem}</Text>
                </View>
            </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        //width: '20%',
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,.2)',
        //opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        //marginVertical: 10,
        //marginHorizontal: 15,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color:'white'
    },
    imageBackgroundShadow: {
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    }
})