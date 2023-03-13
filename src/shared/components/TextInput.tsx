import {translate} from '../i18n';
import {Dimension, Font} from '../../styles';
import {Color, Style} from '@styles';
import React from 'react';
import {TextInputProps, View, ViewStyle, StyleProp} from 'react-native';
import {DefaultTheme, HelperText, TextInput} from 'react-native-paper';

interface CustomizeStyle {
  activeColor?: string;
  placeholderColor?: string;
  textColor?: string;
  errorColor?: string;
}

export interface Props extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  disableTranslate?: boolean;
  errorMessage?: string;
  haveError?: boolean;
  // onChangeText?: (content?: string) => void;
  customizeStyle?: CustomizeStyle;
  minePlaceHolder?: string;
  mineLabel?: string;
}

interface State {}

class Widget extends React.Component<Props, State> {
  render() {
    let {errorMessage, haveError, style, containerStyle, customizeStyle} =
      this.props;
    return (
      <View style={[{width: '100%'}, containerStyle]}>
        {/* <TextInput
          label={this.getLabel()}
          placeholder={this.getPlaceHolder()}
          theme={this.getTheme()}
          mode={'flat'}
          error={haveError || false}
          dense
          {...this.props}
          underlineColor={'#E6E7EA'}
          style={[style]}
        />
        <HelperText
          type="error"
          theme={this.getErrorTheme()}
          padding={'none'}
          style={[Style.Label.Regular.RedContent_13]}
          visible={haveError || errorMessage || false}>
          {errorMessage}
        </HelperText> */}
      </View>
    );
  }

  /**
   * get theme of text input
   */
  getTheme() {
    let {customizeStyle} = this.props;
    return Object.assign({}, DefaultTheme, {
      roundness: 0,
      colors: Object.assign({}, DefaultTheme.colors, {
        primary: customizeStyle?.activeColor || Color.primary,
        placeholder: customizeStyle?.placeholderColor || Color.gray,
        text: customizeStyle?.textColor || Color.textPrimary,
      }),
      fonts: this.getFontConfiguration(),
    });
  }

  getErrorTheme() {
    let {customizeStyle} = this.props;
    return Object.assign({}, DefaultTheme, {
      roundness: 0,
      colors: Object.assign({}, DefaultTheme.colors, {
        primary: customizeStyle?.errorColor || Color.red,
      }),
      fonts: this.getFontConfiguration(),
    });
  }

  getFontConfiguration() {
    return {
      regular: {
        ...Font.Config.TextInput.content,
        fontWeight: 'normal',
      },
      medium: {
        ...Font.Config.TextInput.content,
        fontWeight: 'normal',
      },
      light: {
        ...Font.Config.TextInput.content,
        fontWeight: 'normal',
      },
      thin: {
        ...Font.Config.TextInput.content,
        fontWeight: 'normal',
      },
    };
  }

  getPlaceHolder(): string | undefined {
    var ret;
    let {disableTranslate, minePlaceHolder} = this.props;
    ret = minePlaceHolder;
    if (minePlaceHolder) {
      if (disableTranslate) {
        ret = minePlaceHolder;
      } else {
        ret = translate(minePlaceHolder);
      }
    }
    return ret;
  }

  getLabel(): string | undefined {
    var ret;
    let {disableTranslate, mineLabel} = this.props;
    // TODO
    if (mineLabel) {
      if (disableTranslate) {
        ret = mineLabel;
      } else {
        ret = translate(mineLabel);
      }
    } else {
      ret = this.getPlaceHolder();
    }
    return ret;
  }
}

export {Widget};
