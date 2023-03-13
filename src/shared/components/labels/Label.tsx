import {translate} from '../../i18n';
import React from 'react';
import {Text, TextProps} from 'react-native';

export interface Props extends TextProps {
  autoTranslate?: boolean;
  uppercase?: boolean;
  /**
   * This can be one of the following values:
   * - `primary` - rgb 29 29 29
   * - `secondary` - rgb 104 111 121
   * - `text-primary` - rgb 74 144 226
   * - `red` - rgb 238 62 57
   * - `hint` - rgb 191 195 201
   * - The default is `content`.
   */
  // textColor?: 'primary' | 'secondary' | 'text-primary' | 'red' | 'hint' | 'white';
  // marginVertical?: Style.SpaceStyles.MarginType;
  // marginHorizontal?: Style.SpaceStyles.MarginType;
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
  // size?: Style.Label.LabelSize
  // fontStyle?: Font.FontFamily
}

class Widget extends React.Component<Props> {
  render() {
    let {style} = this.props;
    return (
      <Text {...this.props} style={[style]}>
        {this.getChildText()}
      </Text>
    );
  }

  getChildText() {
    let {children, autoTranslate, uppercase} = this.props;
    if (
      (children instanceof Array && children.every(child => typeof child === 'string')) ||
      typeof children === 'string'
    ) {
      var text;
      if (autoTranslate) {
        text = translate(children);
      } else {
        text = children;
      }
      if (typeof text === 'string') {
        if (uppercase) {
          text = text.toUpperCase();
        }
        return text.trim();
      }
      return text;
    } else {
      return this.props.children;
    }
  }
}

export {Widget};
