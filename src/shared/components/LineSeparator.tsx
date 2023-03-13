import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

export interface LineSeparatorProps extends ViewProps {
  isHide?: boolean
}
export class LineSeparator extends React.Component<LineSeparatorProps> {
  render() {
    let {style, isHide} = this.props;
    return isHide ? null : <View style={[styles.default, style]} />;
  }
}

const styles = StyleSheet.create({
  default: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: '#E6E7EA',
  },
});
