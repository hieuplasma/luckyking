import React from "react";
import { DefaultText, DefaultTextProps } from "./DefaultText";

export class DigitalText extends React.Component<DefaultTextProps> {
    render() {
        return (
            <DefaultText fontFamily="digital-7" {...this.props} />
        );
    }
}