/**
 * Created by hieutm on Thu Apr 06 2023
 * Copyright (c) 2023 https://gitlab.com/h1eu_traN
 */

import { API_HOST } from '@api';
import { Image, Images } from '@assets';
import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { Color } from '@styles';
import { IText } from '@components';
import { openZalo } from '@utils';

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
                            position: 'absolute'
                        }} onPress={this._hide}>
                        </TouchableOpacity>
                        <View style={{
                            position: 'absolute',
                            top: 150,
                            left: 15,
                            right: 15,
                            bottom: 150,
                            backgroundColor: 'orange',
                            borderRadius: 20,
                            borderTopLeftRadius: 5
                        }}>
                            <ReactNativeZoomableView
                                maxZoom={10}
                                minZoom={0.5}
                                zoomStep={0.5}
                                initialZoom={1}
                                style={{ borderRadius: 20 }}
                            >
                                <Image source={uri ? { uri: API_HOST + uri } : Images.no_picture} style={{
                                    width: windowWidth - 30,
                                    height: windowHeight - 300
                                }} resizeMode='contain' />
                            </ReactNativeZoomableView>
                            <TouchableOpacity style={styles.btnErr} onPress={() => openZalo()}>
                                <IText style={{ color: Color.white }}>{"Báo khi vé lỗi"}</IText>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
            </>
        );
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    btnErr: {
        paddingVertical: 5, paddingHorizontal: 10,
        borderRadius: 5, backgroundColor: Color.luckyKing,
        position: 'absolute',
        top: 5, left: 5
    }
})