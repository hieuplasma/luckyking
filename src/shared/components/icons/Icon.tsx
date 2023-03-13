import {isEqual} from 'lodash';
import React from 'react';
import {
  StyleProp,
  Text,
  TextProps as TextPropsRN,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {ContentStyles, Dimension, SpaceStyles} from '../../styles';
import config from './selection.json';
const VectorIcon = createIconSetFromIcoMoon(
  config,
  'LuckyKingIcon',
  'LuckyKingIcon.ttf',
);

export type IconSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'xxxlarge'
  | 'tiny'
  | number;
export interface IconProps extends ViewProps {
  name?: string;
  size?: IconSize;
  color?: string;
}

const Default = React.memo(
  (props?: IconProps) => {
    const getSize = () => {
      let size = props?.size || 'medium';
      var ret: number;
      if (typeof size == 'number') {
        ret = size;
      } else {
        switch (size) {
          case 'small':
            ret = Dimension.iconSmall;
            break;
          case 'medium':
            ret = Dimension.iconMedium;
            break;
          case 'large':
            ret = Dimension.iconLarge;
            break;
          case 'xlarge':
            ret = Dimension.iconXLarge;
            break;
          case 'xxlarge':
            ret = Dimension.iconXXLarge;
            break;
          case 'xxxlarge':
            ret = Dimension.iconXXXLarge;
            break;
          case 'tiny':
            ret = Dimension.iconTiny;
            break;
          default:
            ret = Dimension.iconMedium;
            break;
        }
      }
      return ret;
    };
    return props?.name ? (
      <View {...props} style={[SpaceStyles.Padding.Medium_12, props?.style]}>
        <VectorIcon
          name={props?.name ?? ''}
          color={props?.color || 'white'}
          size={getSize()}
        />
      </View>
    ) : null;
  },
  (prev, next) => isEqual(prev, next),
);

export interface ButtonProps extends IconProps {
  onPressed?: () => void;
  pressContainerProps?: TouchableOpacityProps;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Button = React.memo(
  (props?: ButtonProps) => {
    const {
      containerStyle,
      disabled,
      style,
      pressContainerProps,
      onPressed,
      ...rest
    } = props ?? {};
    return (
      <View style={[containerStyle]}>
        <TouchableOpacity
          disabled={disabled}
          {...pressContainerProps}
          style={[ContentStyles.Center, SpaceStyles.Padding.Medium_12, style]}
          onPress={onPressed}>
          <Default style={[SpaceStyles.Padding.Zero]} {...rest} />
        </TouchableOpacity>
      </View>
    );
  },
  (prev, next) => isEqual(prev, next),
);

export interface CircleIconProps extends IconProps {
  circleRadius?: number;
  circleBackground?: string;
  circleSize?: number;
  onPressed?: Function;
}

const Circle = React.memo(
  (props?: CircleIconProps) => {
    const {style, circleSize, circleRadius, circleBackground, ...rest} =
      props ?? {};
    return (
      <View
        style={[
          ContentStyles.CenterInParent,
          {
            width: circleSize ?? 8,
            height: circleSize ?? 8,
            backgroundColor: circleBackground,
            borderRadius: circleRadius ?? 8,
          },
          style,
        ]}>
        <Default style={[SpaceStyles.Padding.Zero]} {...rest} />
      </View>
    );
  },
  (prev, next) => isEqual(prev, next),
);

export interface CircleIconButtonProps extends IconProps {
  circleRadius?: number;
  circleBackground?: string;
  circleSize?: number;
  onPressed?: () => void;
  disabled?: boolean;
}

const CircleButton = React.memo(
  (props?: CircleIconButtonProps) => {
    const {
      style,
      circleSize,
      circleRadius,
      circleBackground,
      onPressed,
      disabled,
      ...rest
    } = props ?? {};
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          ContentStyles.CenterInParent,
          {
            width: circleSize,
            height: circleSize,
            backgroundColor: circleBackground,
            borderRadius: circleRadius,
          },
          style,
        ]}
        onPress={() => {
          onPressed ? onPressed() : null;
        }}>
        <Default style={[SpaceStyles.Padding.Zero]} {...rest} />
      </TouchableOpacity>
    );
  },
  (prev, next) => isEqual(prev, next),
);

export interface TextProps extends IconProps {
  text?: string | null;
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextPropsRN;
  onPressed?: () => void;
  touchableOpacityProps?: TouchableOpacityProps;
  disabled?: boolean;
}

const TextButton = React.memo(
  (props?: TextProps) => {
    const {
      style,
      text,
      textStyle,
      textProps,
      onPressed,
      touchableOpacityProps,
      disabled,
      ...rest
    } = props ?? {};
    return (
      <TouchableOpacity
        style={[
          ContentStyles.CenterInParent,
          {
            flexDirection: 'row',
          },
          style,
        ]}
        onPress={() => {
          onPressed ? onPressed() : null;
        }}
        disabled={disabled}
        {...touchableOpacityProps}>
        <Default style={[SpaceStyles.Padding.Zero]} {...rest} />
        <Text {...textProps} style={[{marginHorizontal: 4}, textStyle]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  },
  (prev, next) => isEqual(prev, next),
);

export {Button, Default, Circle, CircleButton, TextButton, IconSize};
