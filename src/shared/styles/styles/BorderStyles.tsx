import {StyleSheet} from 'react-native';
import {Color} from '@styles';

export class BorderConfig {
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  borderRightWidth?: number;
  borderLeftWidth?: number;
}

export const generateBorderStyle = (config?: BorderConfig) => {
  const shadowStyle = {
    borderColor: config?.borderColor ?? 'rgb(230,231,234)',
    borderRadius: config?.borderRadius ?? 2,
    borderWidth: config?.borderWidth ?? 1,
  };
  return shadowStyle;
};

export const Standard = StyleSheet.create({
  default: generateBorderStyle(),
  discount: generateBorderStyle({
    borderRadius: 5,
    borderWidth: 0,
    borderColor: Color.transparent,
  }),
  coupon: generateBorderStyle({
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.seperate,
  }),
  couponError: generateBorderStyle({
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.red,
  }),
  dialog: generateBorderStyle({
    borderRadius: 12,
  }),
  image: generateBorderStyle({
    borderRadius: 10,
  }),
  imageTop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  textInput: generateBorderStyle({
    borderRadius: 10,
  }),
  textInputError: generateBorderStyle({
    borderRadius: 10,
    borderColor: 'rgb(238,62,57)',
  }),
  disappear: generateBorderStyle({
    borderRadius: 0,
    borderColor: 'transparent',
  }),
  labelBorderLeft: {
    borderLeftWidth: 1,
    borderColor: Color.gray,
  },
  labelBorderRight: {
    borderRightWidth: 1,
    borderColor: Color.seperate,
  },
  buttonSmall: generateBorderStyle({
    borderColor: Color.transparent,
    borderWidth: 0,
  }),
  viewBottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  searchBar: generateBorderStyle({
    borderRadius: 20,
  }),
  topColorBorderWithOneRadiusNone: {
    borderTopWidth: 0.5,
    borderTopColor: Color.seperate,
  },
});
