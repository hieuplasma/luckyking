
import {StyleSheet} from 'react-native'
import Dimension from './dimens'

// const FontFamily = {
//   italic: {
//     fontFamily: 'Bebeboo-Italic',
//   },
//   regular: {
//     fontFamily: 'Bebeboo-Regular',
//   },
//   bold: {
//     fontFamily: 'Bebeboo-SemiBold',
//   }
// } 

const FontFamily = {
  italic: {
    fontFamily: 'myriadpro-it',
  },
  regular: {
    fontFamily: 'myriadpro-regular',
  },
  bold: {
    fontFamily: 'myriadpro-bold',
  }
} 

const Button = {
  ...FontFamily.bold,
  fontSize: Dimension.heading
}

const TextInput = {
  content: {
    ...FontFamily.regular,
  }
}

const Label = FontFamily

const Header = {
  TitleBold: {
    ...FontFamily.bold,
    fontSize: Dimension.headingL
  }
}

export const FontStyleSheet = StyleSheet.create({
  Button: Button,
})

export const Config = {
  TextInput,
  Label: Label,
  Header
}


export type FontFamily = 'italic' | 'regular' | 'bold';

export const getFontType = (type:FontFamily = 'regular') => {
  var ret = FontFamily.regular;
  switch (type) {
    case 'italic':
      ret = FontFamily.italic;
      break;
    case 'bold':
      ret = FontFamily.bold;
      break;
  }
  return ret;
}

/**
 * List size of label
 * heading: 18, // semibold
  headingL: 20,// semibold
  headingXL: 24,// semibold
  headingXXL: 28,// semibold
  content: 13,// Regular
  contentL: 14,// Regular
  contentXL: 16, // Regular and semibold
  tab: 12,// Regular
 */
export type LabelSize = 'heading' | 'headingL' | 'headingXL' | 'headingXXL' | 'content' | 'contentL' | 'contentXL' | 'tab';

const renderFontSize = (value:number) => {
  return {
    fontSize: value
  }
}

export const getFontSize = (size?:LabelSize) => {
  var ret = Dimension.content;
  switch (size) {
    case 'heading':
      ret = Dimension.heading;
      break;
    case 'headingL':
      ret = Dimension.headingL;
      break;
    case 'headingXL':
      ret = Dimension.headingXL;
      break;
    case 'headingXXL':
      ret = Dimension.headingXXL;
      break;
    case 'contentL':
      ret = Dimension.contentL;
      break;
    case 'contentXL':
      ret = Dimension.contentXL;
      break;
    case 'tab':
      ret = Dimension.tab;
      break;
    default:
      ret = Dimension.content;
      break;
  }
  return renderFontSize(ret);
}


