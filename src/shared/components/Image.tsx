import React from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';

export interface ImageProps extends FastImageProps {}
export class Image extends React.Component<ImageProps> {
  render() {
    return <FastImage {...this.props} />;
  }
}
