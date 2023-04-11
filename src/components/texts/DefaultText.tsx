import { Color } from "@styles";
import React from "react";
import { StyleSheet, Text, TextProps } from 'react-native'

export interface DefaultTextProps extends TextProps {
    uppercase?: boolean,
    fontFamily?: string
}

class DefaultText extends React.Component<DefaultTextProps> {
    render() {
        let { style, fontFamily } = this.props;
        return (
            <Text {...this.props} style={[styles.default, { fontFamily: fontFamily || undefined }, style]}>
                {this.getChildText()}
            </Text>
        );
    }

    getChildText() {
        let { children, uppercase } = this.props;
        if (
            (children instanceof Array && children.every(child => typeof child === 'string')) ||
            typeof children === 'string'
        ) {
            var text = children;
            if (typeof text === 'string') {
                if (uppercase) {
                    text = text.toUpperCase();
                }
                return text
            }
            return text;
        } else {
            return this.props.children;
        }
    }
}

export { DefaultText }

const styles = StyleSheet.create({
    default: {
        fontSize: 14,
        lineHeight: 20,
        marginTop: 2,
        color: Color.black
    }
})