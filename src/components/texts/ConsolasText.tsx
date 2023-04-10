import React from "react";
import { DefaultText, DefaultTextProps } from "./DefaultText";

export class ConsolasText extends React.Component<DefaultTextProps> {
    render() {
        return (
            <DefaultText fontFamily="consolas" {...this.props} />
        );
    }
}