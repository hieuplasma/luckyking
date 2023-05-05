/**
 * Created by hieutm on Thu Apr 06 2023
 * Copyright (c) 2023 https://gitlab.com/h1eu_traN
 */

import { API_HOST } from '@api';
import { Image, Images } from '@assets';
import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';

export class ImageFullScreen extends PureComponent {
    state = {
        showing: false,
        uri: ""
    };

    _show = (uri: string) => {
        this.setState({
            showing: true,
            uri: uri
        });
    };
    _hide = () => {
        this.setState({
            showing: false,
            uri: false
        });
    };

    componentDidMount() {
        window.image = {
            show: this._show,
            hide: this._hide,
        };
    }

    render() {
        const { showing, uri } = this.state;
        console.log(API_HOST + uri)

        return (
            <>
                {!showing ? (
                    <></>
                ) : (
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <TouchableOpacity style={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            position:'absolute'
                        }} onPress={this._hide}>
                        </TouchableOpacity>
                        <Image source={uri ? { uri: API_HOST + uri } : Images.no_picture} style={{
                            position: 'absolute',
                            top: 150,
                            left: 15,
                            right: 15,
                            bottom: 150,
                            backgroundColor: 'orange',
                            borderRadius: 20
                        }} resizeMode='contain' />

                    </View>
                )}
            </>
        );
    }
}
