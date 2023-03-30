import { translate} from '@shared';
import {Color, Dimension, Font, Style} from '@styles';
import { ScreenUtils } from '@utils';
import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacityProps,
} from 'react-native';

export interface CustomizeStyle {
  backgroundColor?: string;
  textColor?: string;
}

export interface Props extends TouchableOpacityProps {
  text?: string;
  type?: 'primary' | 'secondary' | 'link' | 'disable' | 'none';
  sizeType?: 'medium' | 'small' | 'mediumMatchParent' | 'smallMatchParent' | 'none';
  textStyle?: StyleProp<TextStyle>;
  textProps?: Props;
  disableTranslate?: Boolean;
  onClicked?: () => void;
  isLoading?: boolean;
  loadingIndicator?: ActivityIndicatorProps;
  disabled?: boolean;
  customizeStyle?: CustomizeStyle;
  uppercase?: boolean;
  hide?: boolean;
  /**
   * This can be one of the following values:
   *
   * - `heading` - 18
   * - `headingL` - 20
   * - `headingXL` - 24
   * - `headingXXL` - 28
   * - `content` - 13
   * - `contentL` - 14
   * - `contentXL` - 14
   * - `tab` - 12
   * - The default is `text-primary`.
   */
  // textSize?: Style.Label.LabelSize;
  // fontStyle?: Font.FontFamily;
}

interface State {
  isPress: boolean;
}

class Widget extends React.PureComponent<Props, State> {
  readonly defaultOpcavity = 1;

  render() {
    const {style, customizeStyle, hide} = this.props;
    let backgroundContainer =
      customizeStyle && customizeStyle.backgroundColor
        ? {backgroundColor: customizeStyle?.backgroundColor}
        : null;
    return !hide ? (
      <TouchableOpacity
        {...this.props}
        style={[
          defaultStyles.container,
          this.getContainerMinHeight(),
          this.getContainerStyle(),
          backgroundContainer,
          style,
        ]}
        activeOpacity={this.defaultOpcavity}
        onPress={() => {
          this.onPress();
        }}
        onPressIn={() => {
          this.onPressIn();
        }}
        onPressOut={() => {
          this.onPressOut();
        }}
        disabled={this.isDisable()}>
        {this.renderBackgroundSelectorLayer()}
        <View style={{flexDirection: 'row'}}>
          <View>
            {this.renderText(this.getTextStyle())}
            {this.renderTextSelector()}
          </View>
          {this.renderLoadingIndicator()}
        </View>
      </TouchableOpacity>
    ) : (
      null
    );
  }

  isDisable() {
    let {disabled, isLoading} = this.props;
    return disabled || isLoading;
  }

  renderLoadingIndicator() {
    let {isLoading, loadingIndicator, customizeStyle} = this.props;
    var ret;
    if (isLoading) {
      ret = (
        <ActivityIndicator
          style={defaultStyles.loadingIndicator}
          size={'small'}
          color={customizeStyle?.textColor || Color.white}
          {...loadingIndicator}
        />
      );
    }
    return ret;
  }

  /**
   * get press layer
   */
  renderBackgroundSelectorLayer() {
    let type = this.props.type || 'primary';
    const {activeOpacity} = this.props;
    var ret;
    if (this.state && this.state.isPress && (type === 'primary' || type === 'none')) {
      ret = (
        <TouchableOpacity
          style={[
            defaultStyles.selectorLayer,
            defaultStyles.container,
            activeOpacity ? {opacity: activeOpacity} : undefined,
          ]}
        />
      );
    }
    return ret;
  }

  /**
   * reder text selector style
   */
  renderTextSelector() {
    let type = this.props.type || 'primary';
    var ret;
    if (this.state && this.state.isPress) {
      if (type === 'link' || type === 'secondary') {
        ret = this.renderText(defaultStyles.textSelector);
      }
    }
    return ret;
  }

  /**
   * remder a text view
   * @param additionalStyle
   */
  renderText(additionalStyle: TextStyle) {
    const {textStyle, text, textProps, disableTranslate, uppercase} = this.props;
    var contentText = disableTranslate ? text : translate(text);
    contentText = uppercase ? contentText?.toUpperCase() : contentText;
    return (
      <Text
        style={[defaultStyles.textStyle, additionalStyle, Font.FontStyleSheet.Button, textStyle]}
        {...textProps}>
        {contentText}
      </Text>
    );
  }

  onPress = () => {
    let {onClicked} = this.props;
    if (onClicked) {
      onClicked();
    }
  };

  onPressIn() {
    this.setState({
      isPress: true,
    });
  }

  onPressOut() {
    this.setState({
      isPress: false,
    });
  }

  /**
   *  get min height of container, default is medium size
   */
  getContainerMinHeight() {
    let sizeType = this.props.sizeType || 'medium';
    var ret;
    switch (sizeType) {
      case 'small': {
        ret = [defaultStyles.containerHeightSmall, defaultStyles.containerWrapContent];
        break;
      }
      case 'medium': {
        ret = [defaultStyles.containerHeightMedium, defaultStyles.containerWrapContent];
        break;
      }
      case 'mediumMatchParent':
        {
          ret = [
            defaultStyles.containerHeightMedium,
            defaultStyles.containerMatchParent,
            Style.Size.WidthMatchParent,
          ];
        }
        break;
      case 'smallMatchParent':
        {
          ret = [
            defaultStyles.containerHeightSmall,
            defaultStyles.containerMatchParent,
            Style.Size.WidthMatchParent,
          ];
        }
        break;
      case 'none': {
        ret = undefined;
      }
    }
    return ret;
  }

  /**
   * get style of container by type (include background color ... ),
   * default is primary style
   */
  getContainerStyle = (): ViewStyle => {
    let {type} = this.props;
    var ret: ViewStyle;
    ret = defaultStyles.containerPrimary;
    if (type) {
      switch (type) {
        case 'primary': {
          ret = defaultStyles.containerPrimary;
          break;
        }
        case 'disable': {
          ret = defaultStyles.containerDisable;
          break;
        }
        case 'link': {
          ret = defaultStyles.containerLink;
          break;
        }
        case 'secondary': {
          ret = defaultStyles.containerSecondary;
          break;
        }
        case 'none': {
          ret = defaultStyles.containerNone;
          break;
        }
        default: {
          ret = defaultStyles.containerPrimary;
        }
      }
    }
    return ret;
  };

  getTextStyle = (): TextStyle => {
    let {type} = this.props;
    var ret: TextStyle;
    ret = defaultStyles.textPrimary;
    if (type) {
      switch (type) {
        case 'primary': {
          ret = defaultStyles.textPrimary;
          break;
        }
        case 'disable': {
          ret = defaultStyles.textDisable;
          break;
        }
        case 'link': {
          ret = defaultStyles.textLink;
          break;
        }
        case 'secondary': {
          ret = defaultStyles.textSecondary;
          break;
        }
        case 'none': {
          ret = defaultStyles.textNone;
          break;
        }
        default: {
          ret = defaultStyles.textPrimary;
          break;
        }
      }
    }
    return ret;
  };
}

const defaultStyles = StyleSheet.create({
  // container style
  container: {
    paddingHorizontal: ScreenUtils.getSizeByHorizontal(Dimension.xLargeMargin),
    minWidth: ScreenUtils.getSizeByHorizontal(Dimension.buttonMinWidth),
    borderRadius: Dimension.buttonCornerRadius,
    borderWidth: Dimension.buttonBorderWidth,
    borderColor: Color.seperate,
  },
  containerWrapContent: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline',
  },
  containerMatchParent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectorLayer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.blackStandard,
    opacity: 0.13,
  },
  containerHeightSmall: {
    minHeight: ScreenUtils.getSizeByHorizontal(Dimension.buttonMinHeightSmall),
  },
  containerHeightMedium: {
    minHeight: ScreenUtils.getSizeByHorizontal(Dimension.buttonMinHeightMedium),
  },
  containerPrimary: {
    backgroundColor: Color.primary,
    borderWidth: 0,
  },
  containerLink: {
    backgroundColor: Color.transparent,
    borderRadius: 0,
    borderColor: Color.transparent,
  },
  containerDisable: {
    backgroundColor: Color.disableBackground,
  },
  containerSecondary: {
    backgroundColor: Color.white,
  },
  containerNone: {
    backgroundColor: Color.white,
    borderRadius: 0,
    borderColor: Color.transparent,
  },
  // text style
  textPrimary: {
    color: Color.white,
  },
  textLink: {
    color: Color.primary,
    opacity: 1,
  },
  textNone: {
    color: Color.primary,
    opacity: 1,
  },
  textLinkPress: {
    color: Color.primary,
    opacity: 0.2,
  },
  textDisable: {
    color: Color.gray,
  },
  textSecondary: {
    color: Color.primary,
    opacity: 1,
  },
  textSecondaryPress: {
    color: Color.primary,
    opacity: 0.2,
  },
  textStyle: {
    textAlign: 'center',
  },
  textSelector: {
    color: Color.blackStandard,
    opacity: 0.2,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  loadingIndicator: {
    marginHorizontal: Dimension.tinyMargin,
  },
});

export {Widget};
