import * as Font from '../../shared/styles/fonts';
import Dimension from '../dimens';
import Color from '../colors';
import {StyleSheet} from 'react-native';

export const Tab = {
  inActive: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.tab,
    color: Color.primary,
  },
  active: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.tab,
    color: Color.tabInActive,
  },
};

export const Regular = {
  PrimaryHeading_18: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.heading,
    color: Color.textPrimary,
  },
  PrimaryContentXL_16: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentXL,
    color: Color.textPrimary,
  },
  OrangeContentXL_16: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentXL,
    color: Color.orange,
  },
  PrimaryContent_13: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.content,
    color: Color.textPrimary,
  },
  PrimaryContentL_14: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentL,
    color: Color.textPrimary,
  },
  PrimaryHeadingXL_24: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.headingXL,
    color: Color.textPrimary,
  },
  WhiteHeading_18: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.heading,
    color: Color.white,
  },
  GrayHeading_18: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.heading,
    color: Color.gray,
  },
  WhiteContentXL_16: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentXL,
    color: Color.white,
  },
  WhiteContent_13: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.content,
    color: Color.white,
  },
  GreenContent_13: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.content,
    color: Color.green,
  },
  OrangeContent_13: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.content,
    color: Color.orange,
  },
  GreenContentXL_16: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentXL,
    color: Color.green,
  },
  WhiteContentL_14: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentL,
    color: Color.white,
  },
  GrayContentXL_16: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentXL,
    color: Color.gray,
  },
  TextHintContentXL_16: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentXL,
    color: Color.textHint,
  },
  TextHintContenXL_16: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentXL,
    color: Color.textHint,
  },
  TextSecondaryContentXL_16: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentXL,
    color: Color.textSecondary,
  },
  TextSecondaryContentL_14: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentL,
    color: Color.textSecondary,
  },
  TextSecondaryContent_13: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.content,
    color: Color.textSecondary,
  },
  RedContentXL_16: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentXL,
    color: Color.red,
  },
  RedContent_13: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.content,
    color: Color.red,
  },
  GrayContentL_14: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentL,
    color: Color.gray,
  },
  GrayContent_13: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.content,
    color: Color.gray,
  },
  BlueContentL_14: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentL,
    color: Color.primary,
  },
  BlueContentXL_16: {
    ...Font.getFontType('regular'),
    fontSize: Dimension.contentXL,
    color: Color.primary,
  },
};

export const Bold = {
  PrimaryHeadingXL_24: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.headingXL,
    color: Color.textPrimary,
  },
  BlueHeadingXL_24: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.headingXL,
    color: Color.primary,
  },
  PrimaryHeadingXXL_28: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.headingXXL,
    color: Color.textPrimary,
  },
  PrimaryHeadingXXXL_32: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.headingXXXL,
    color: Color.textPrimary,
  },
  PrimaryHeadingL_20: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.headingL,
    color: Color.textPrimary,
  },
  PrimaryHeading_18: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.heading,
    color: Color.textPrimary,
  },
  BlueHeading_18: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.heading,
    color: Color.primary,
  },
  GreenHeading_18: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.heading,
    color: Color.green,
  },
  GreenContentXL_16: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentXL,
    color: Color.green,
  },
  GreenContentL_14: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentL,
    color: Color.green,
  },
  BlueContentXL_16: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentXL,
    color: Color.primary,
  },
  BlueContentL_14: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentL,
    color: Color.primary,
  },
  PrimaryContentXL_16: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentXL,
    color: Color.textPrimary,
  },
  PrimaryContentL_14: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentL,
    color: Color.textPrimary,
  },
  PrimaryContent_13: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.content,
    color: Color.textPrimary,
  },
  GrayContentXL_16: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentXL,
    color: Color.gray,
  },
  GrayHeading_18: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.heading,
    color: Color.gray,
  },
  WhiteHeadingL_20: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.headingL,
    color: Color.white,
  },
  WhiteHeadingXL_24: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.headingXL,
    color: Color.white,
  },
  WhiteHeading_18: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.heading,
    color: Color.white,
  },
  WhiteContentXL_16: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentXL,
    color: Color.white,
  },
  RedContentXL_16: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentXL,
    color: Color.red,
  },
  WhiteContent_13: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.content,
    color: Color.white,
  },
  SecondaryContentL_14: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentL,
    color: Color.textSecondary,
  },
  SecondaryContentXL_16: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentXL,
    color: Color.textSecondary,
  },
  SecondaryHeading_18: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.heading,
    color: Color.textSecondary,
  },
  SecondaryContent_13: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.content,
    color: Color.textSecondary,
  },
  YellowContent_16: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.contentXL,
    color: Color.yellow,
  },
  BlueHeadingXL_36: {
    ...Font.getFontType('bold'),
    fontSize: Dimension.headlingXXXVI,
    color: Color.primary,
  },
};

export const Align = StyleSheet.create({
  Center: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  Top: {
    textAlignVertical: 'top',
  },
  Bottom: {
    textAlignVertical: 'bottom',
  },
});

export const DecorationLine = StyleSheet.create({
  Underline: {
    textDecorationLine: 'underline',
  },
});

export const Html = {
  default: {
    fontSize: Dimension.contentXL,
    ...Font.getFontType('regular'),
    color: Color.textPrimary,
    lineHeight: Dimension.lineHeight,
  },
};
