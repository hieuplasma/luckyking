import React from 'react';
import { Props, Widget } from './Label';
export class Static extends React.Component<Props> {
  render(){
    return(
      <Widget autoTranslate {...this.props} />
    )
  }
}