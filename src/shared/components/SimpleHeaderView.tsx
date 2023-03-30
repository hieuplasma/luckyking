import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
  Platform,
} from 'react-native';
import {ScreenUtils} from '@utils';
import {LineSeparator} from '..';
import {useCallback} from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface SimpleHeaderViewProps extends ViewProps {
  title?: string;
  subTitle?: string;
  leftView?: JSX.Element | null;
  rightView?: JSX.Element | null;
  titleView?: JSX.Element | null;
  titleStyle?: StyleProp<TextStyle>;
  statusBarStyle?: StyleProp<ViewStyle>;
  disableRenderStatusBarView?: boolean;
  disabled?: boolean;
  showLineSeparator?: boolean;
}

export const SimpleHeaderView = React.memo((props?: SimpleHeaderViewProps) => {
  const inssts = useSafeAreaInsets()
  const {
    style,
    rightView,
    titleView,
    leftView,
    disableRenderStatusBarView,
    showLineSeparator,
    statusBarStyle,
    title,
    titleStyle,
  } = props ?? {};

  const renderStatusBarView = useCallback(() => {
    return (
      <View
        style={[
          {
            height: Platform.OS === 'ios' ? inssts.top : 0,
            backgroundColor: 'white',
          },
          statusBarStyle,
        ]}></View>
    );
  }, [statusBarStyle,inssts.top]);

  const renderTitle = useCallback(() => {
    const {title, titleStyle} = props ?? {};
    return (
      <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.headerText, titleStyle]}>
        {title}
      </Text>
    );
  }, [title, titleStyle]);

  return (
    <>
      {!disableRenderStatusBarView ? renderStatusBarView() : null}
      <View style={[styles.headerContainer, style]}>
        {leftView ? leftView : null}
        {titleView ? titleView : renderTitle()}
        {rightView ? rightView : null}
      </View>
      {showLineSeparator ? <LineSeparator /> : null}
    </>
  );
});

const styles = StyleSheet.create({
  separator: {
    marginVertical: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    height: ScreenUtils.getHeaderHeight(),
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    flex: 1,
    marginHorizontal: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
