import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import React from "react";
import Image, { FastImageProps } from "react-native-fast-image";

export class ImageZoom extends React.Component<FastImageProps> {
    render() {
        return (
            <ReactNativeZoomableView zoomStep={2.5} minZoom={1} maxZoom={2.5}>
                <Image {...this.props} resizeMode="contain"/>
            </ReactNativeZoomableView>
        );
    }
}