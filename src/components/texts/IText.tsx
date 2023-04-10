import React from "react";
import { DefaultText, DefaultTextProps } from "./DefaultText";

export class IText extends React.Component<DefaultTextProps> {
    render() {
        return (
            <DefaultText fontFamily="myriadpro-regular" {...this.props} />
        );
    }
}