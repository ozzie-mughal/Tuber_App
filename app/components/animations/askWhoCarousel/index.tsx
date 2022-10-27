import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import SButton from './components/SButton';
import { SBItem } from './components/SBItem';
import { ElementsText, window } from './constants';
import colors from '../../../styles/colors';
import { bannerBGImages } from '../../../assets/banners/bannerReferenceData';

const PAGE_WIDTH = window.width;
const colorsDots = [
    colors.turquoise_blue,
    colors.turquoise_blue,
    colors.turquoise_blue,
    colors.turquoise_blue,
    colors.turquoise_blue,
    colors.turquoise_blue,
    colors.turquoise_blue,
    colors.turquoise_blue,
    colors.turquoise_blue,
    colors.turquoise_blue,
];

function Index() {
    const [isVertical, setIsVertical] = React.useState(true);
    const [autoPlay, setAutoPlay] = React.useState(true);
    const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
    const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
    const progressValue = useSharedValue<number>(0);
    const baseOptions = isVertical
        ? ({
              vertical: true,
              width: 40,
              height: 40,
          } as const)
        : ({
              vertical: false,
              width: PAGE_WIDTH * 0.9,
              height: PAGE_WIDTH * 0.4,
          } as const);

    return (
        <View
            style={{
                alignItems: 'center',
            }}
        >
            <Carousel
                {...baseOptions}
                loop
                pagingEnabled={pagingEnabled}
                snapEnabled={snapEnabled}
                autoPlay={autoPlay}
                autoPlayInterval={500}
                onProgressChange={(_, absoluteProgress) =>
                    (progressValue.value = absoluteProgress)
                }
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 5,
                }}
                data={colorsDots}
                //renderItem={({ index }) => <SBItem index={index} />}
                renderItem={({ index }) => <SBItem style={styles.bannerImage} index={index} refData={bannerBGImages}/>
                }
            />

        </View>
    );
}

const PaginationItem: React.FC<{
    index: number;
    backgroundColor: string;
    length: number;
    animValue: Animated.SharedValue<number>;
    isRotate?: boolean;
}> = (props) => {
    const { animValue, index, length, backgroundColor, isRotate } = props;
    const width = 10;

    const animStyle = useAnimatedStyle(() => {
        let inputRange = [index - 1, index, index + 1];
        let outputRange = [-width, 0, width];

        if (index === 0 && animValue?.value > length - 1) {
            inputRange = [length - 1, length, length + 1];
            outputRange = [-width, 0, width];
        }

        return {
            transform: [
                {
                    translateX: interpolate(
                        animValue?.value,
                        inputRange,
                        outputRange,
                        Extrapolate.CLAMP
                    ),
                },
            ],
        };
    }, [animValue, index, length]);
    return (
        <View
            style={{
                backgroundColor: 'white',
                width,
                height: width,
                borderRadius: 50,
                overflow: 'hidden',
                transform: [
                    {
                        rotateZ: isRotate ? '90deg' : '0deg',
                    },
                ],
            }}
        >
            <Animated.View
                style={[
                    {
                        borderRadius: 50,
                        backgroundColor,
                        flex: 1,
                    },
                    animStyle,
                ]}
            />
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    bannerImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,height:'100%', width: '100%'
    }
})