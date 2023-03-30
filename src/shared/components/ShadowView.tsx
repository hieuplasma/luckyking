import React from 'react';
import {
  View,
  ViewProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import {Style} from '@styles';
import {isEqual} from 'lodash';
import { ShadowStyles } from '@styles';

export interface ShadowViewProps extends ViewProps {
  onPress?: () => void;
  touchableStyle?: StyleProp<ViewStyle>;
  enableTouchable?: boolean;
  touchableProps?: TouchableOpacityProps;
}

export const ShadowView = React.memo(
  (props?: React.PropsWithChildren<ShadowViewProps>) => {
    const {style, children, touchableProps, enableTouchable, onPress, ...rest} = props ?? {};
    if (enableTouchable) {
      return (
        <TouchableOpacity
          {...touchableProps}
          onPress={onPress}
          style={[ShadowStyles.Standard.default, Style.Space.Padding.Medium_12, style]}>
          {children}
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          {...props}
          style={[ShadowStyles.Standard.default, Style.Space.Padding.Medium_12, style]}>
          {children}
        </View>
      );
    }
  },
  (prev, next) => isEqual(prev, next),
);
