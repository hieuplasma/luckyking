import Color from './colors'
import Dimension from './dimens'
import * as Font from './fonts'

import * as SpaceStyles from './SpaceStyles'
import * as ShadowStyles from './ShadowStyles'
import * as TextInputStyles from './TextInputStyles'
import * as BorderStyles from './BorderStyles'
import * as Button from './ButtonStyles';
import * as Label from './LabelStyles';
import * as Image from './ImageStyles';
import {
  AbsolutePositionStyles, BackgroundStyles,
  ContentFlexRowStyles, ContentStyles,
  ScreenStyles, SelfStyles, SizeStyles
} from './ContainerStyles'

const Content = ContentStyles
const AbsolutePosition = AbsolutePositionStyles
const Size = SizeStyles
const Self = SelfStyles
const Background = BackgroundStyles
const Screen = ScreenStyles
const Shadow = ShadowStyles
const Space = SpaceStyles
const TextInput = TextInputStyles
const ContentFlexRow = ContentFlexRowStyles
const Border = BorderStyles

export {
  Color,
  Dimension,
  Font,
  SpaceStyles,
  ShadowStyles,
  TextInputStyles,
  BorderStyles,
  ContentStyles
}

export const Style = {
  Button,
  Space,
  Shadow,
  Label,
  Image,
  Content,
  AbsolutePosition,
  Size,
  Self,
  Background,
  Screen,
  ContentFlexRow,
  TextInput,
  Border
}
