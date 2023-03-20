import {Dimensions, Platform, StatusBar} from 'react-native';

export const ScreenUtils = {
  getSizeByHorizontal(designWidth: number) {
    return Dimensions.get('window').width / (375 / designWidth);
  },
  getSizeByVertical(designHeight: number) {
    return Dimensions.get('window').height / (812 / designHeight);
  },

  getSizeWith169Ratio() {
    const screenSize = Dimensions.get('window');
    if (screenSize.width < screenSize.height) {
      return {
        height: (9 * screenSize.width) / 16,
        width: screenSize.width,
      };
    } else {
      return {
        height: (9 * screenSize.height) / 16,
        width: screenSize.height,
      };
    }
  },
  getStatusBarHeight(skipAndroid: boolean = true) {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;

    const XSMAX_WIDTH = 414;
    const XSMAX_HEIGHT = 896;
    let isIPhoneX = false;
    const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

    if (Platform.OS === 'ios') {
      isIPhoneX =
        (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
        (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT);
    }

    return Platform.select({
      ios: isIPhoneX ? 44 : 20,
      android: skipAndroid ? 0 : StatusBar.currentHeight,
      default: 0,
    });
  },

  isIphoneX() {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;

    const XSMAX_WIDTH = 414;
    const XSMAX_HEIGHT = 896;
    let isIPhoneX = false;
    const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

    if (Platform.OS === 'ios') {
      isIPhoneX =
        (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
        (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT);
    }
    return isIPhoneX;
  },

  getHeaderHeight() {
    return Platform.OS === 'ios' ? 56 : 64;
    // return 44;
  },
};
