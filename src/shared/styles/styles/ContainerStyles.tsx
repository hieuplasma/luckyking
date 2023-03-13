import * as SpaceStyles from './SpaceStyles';
import {StyleSheet} from 'react-native';
import {Color} from '@styles';

export const ContentStyles = StyleSheet.create({
  Center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline',
  },
  CenterInParent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  CenterInVertical: {
    justifyContent: 'center',
  },
  CenterInHorizontal: {
    alignItems: 'center',
  },
  JustifyContentEnd: {
    justifyContent: 'flex-end',
  },
  Right: {
    alignItems: 'flex-end',
  },
  Left: {
    alignItems: 'flex-start',
  },
  WrapContent: {
    alignSelf: 'baseline',
  },
});

export const ContentFlexRowStyles = StyleSheet.create({
  CenterInVertical: {
    alignItems: 'center',
  },
  CenterInHorizontal: {
    justifyContent: 'center',
  },
  Bottom: {
    alignItems: 'flex-end',
  },
  Right: {
    justifyContent: 'flex-end',
  },
  Left: {
    justifyContent: 'flex-start',
  },
});

export const AbsolutePositionStyles = StyleSheet.create({
  MatchParent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  Bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  BottomRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  Right: {
    position: 'absolute',
    right: 0,
  },
  RightTop: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  Top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  LeftTop: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export const SizeStyles = StyleSheet.create({
  WidthMatchParent: {
    width: '100%',
  },
  HeightMatchParent: {
    height: '100%',
  },
  MatchParent: {
    flex: 1,
  },
  MatchParentRow: {
    flex: 1,
    flexDirection: 'row',
  },
  FlexWrap: {
    flexWrap: 'wrap',
  },
  FlexRow: {
    flexDirection: 'row',
  },
  EnableFlexGrow: {
    flexGrow: 1,
  },
  DisableFlexGrow: {
    flexGrow: undefined,
  },
});

export const SelfStyles = StyleSheet.create({
  Center: {
    alignSelf: 'center',
  },
  End: {
    alignSelf: 'flex-end',
  },
  Start: {
    alignSelf: 'flex-start',
  },
});

export const BackgroundStyles = StyleSheet.create({
  Primary: {
    backgroundColor: Color.primary,
  },
  White: {
    backgroundColor: Color.white,
  },
  Seperator: {
    backgroundColor: Color.seperate,
  },
  Seperator2: {
    backgroundColor: Color.seperate2,
  },
  Red: {
    backgroundColor: Color.red,
  },
  DisableBackground: {
    backgroundColor: Color.disableBackground,
  },
  Green2: {
    backgroundColor: Color.green2,
  },
  Green: {
    backgroundColor: Color.green,
  },
  Transparent: {
    backgroundColor: Color.transparent,
  },
  Gray: {
    backgroundColor: Color.gray,
  },
  Gray2: {
    backgroundColor: Color.gray2,
  },
  Black: {
    backgroundColor: Color.black,
  },
  Orange: {
    backgroundColor: Color.orange,
  },
  TextHint: {
    backgroundColor: Color.textHint,
  },
  Accessory: {
    backgroundColor: Color.accessory,
  },
  TableHeader: {
    backgroundColor: Color.tableHeader,
  },
  Gray3: {
    backgroundColor: Color.disableBackground,
  },
  Gray4: {
    backgroundColor: Color.gray4,
  },
  Green3: {
    backgroundColor: Color.green3,
  },
  Green4: {
    backgroundColor: Color.green4,
  },
  Green5: {
    backgroundColor: Color.green5,
  },
  Yellow2: {
    backgroundColor: Color.yellow2,
  },
  Gray5: {
    backgroundColor: Color.gray5,
  },
  PrimaryBackground: {
    backgroundColor: Color.primaryBackground,
  },
  captcha: {
    backgroundColor: Color.captcha
  }
});

export const ScreenStyles = StyleSheet.create({
  Root: {
    ...SpaceStyles.PaddingHorizontal.large_16,
    ...SpaceStyles.PaddingVerical.large_16,
  },
});
