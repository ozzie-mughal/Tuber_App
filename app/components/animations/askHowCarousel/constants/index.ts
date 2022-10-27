import type { ScaledSize } from 'react-native';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';

 const isIos = Platform.OS === 'ios';
 const isAndroid = Platform.OS === 'android';
 const isWeb = Platform.OS === 'web';

export const ElementsText = {
    AUTOPLAY: 'AutoPlay',
};

export const window: ScaledSize = isWeb
    ? {
          ...Dimensions.get('window'),
          width: 375,
      }
    : Dimensions.get('window');