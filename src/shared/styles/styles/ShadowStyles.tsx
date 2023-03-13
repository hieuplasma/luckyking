import {StyleSheet} from 'react-native';
import {Dimension} from '..';

class ShadowOffset {
  width?: number = 0;
  height?: number = 1;
}
export class ShadowConfig {
  shadowRadius?: number;
  borderRadius?: number;
  backgroundColor?: string;
  shadowColor?: string;
  shadowOpacity?: number;
  elevation?: number;
  shadowOffset?: ShadowOffset = {
    width: 0,
    height: 1,
  };
}

export const generateShadowStyle = (config?: ShadowConfig) => {
  const shadowStyle = {
    backgroundColor: config?.backgroundColor || 'white',
    borderRadius: config?.borderRadius || 10,
    shadowColor: config?.shadowColor || 'rgb(24,24,24)',
    shadowOffset: {
      width: config?.shadowOffset?.width || 0,
      height: config?.shadowOffset?.height || 1,
    },
    shadowRadius: config?.shadowRadius || 10,
    shadowOpacity: config?.shadowOpacity || 0.1,
    elevation: config?.elevation ?? 3,
  };
  return shadowStyle;
};

export const Standard = {
  default: generateShadowStyle(),
  noShadow: generateShadowStyle({
    backgroundColor: 'white',
    borderRadius: 0,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    elevation: 0,
  }),
  top: {
    ...generateShadowStyle({
      shadowRadius: Dimension.contentXL,
    }),
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomStartRadius: 0,
  },
};
export const Content = StyleSheet.create({
  defaultCenter: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    padding: 16,
  },
});
