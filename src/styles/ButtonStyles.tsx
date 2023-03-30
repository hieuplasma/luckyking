import { StyleSheet } from 'react-native';
import Color from './colors';
import Dimension from './dimens';
import * as Font from './fonts';
import * as BorderStyles from './BorderStyles';

export const Regular = StyleSheet.create({
  HeadingXL_24: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.headingXL,
  },
  WhiteHeading_18: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.heading,
    color: Color.white,
  },
});

export const Bold = StyleSheet.create({
  Heading_18: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.heading,
  },
});

export const Border = StyleSheet.create({
  Primary_Border_5: {
    ...BorderStyles?.generateBorderStyle({
      borderRadius: 5,
    }),
    backgroundColor: Color.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  Primary_Border_10: {
    ...BorderStyles?.generateBorderStyle({
      borderRadius: 10,
      borderColor: Color.white,
    }),
    backgroundColor: Color.primary,
  },
  White_Border_10: {
    ...BorderStyles?.generateBorderStyle({
      borderRadius: 10,
      borderColor: Color.white,
    }),
    backgroundColor: Color.white,
  },
});
