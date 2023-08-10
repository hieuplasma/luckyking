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
import PagerView from 'react-native-pager-view';
import Animated from 'react-native-reanimated';

const AnimatedPager = Animated.createAnimatedComponent(PagerView);
export class ImageFullScreen extends PureComponent {
    // myRef: React.RefObject<ReactNativeZoomableView>;
    // myRef2: React.RefObject<ReactNativeZoomableView>;

    constructor(props: any) {
        super(props);
        // this.myRef = React.createRef();
        // this.myRef2 = React.createRef()
    }
    state = {
        showing: false,
        uri: [],
        initIndex: 0
    };

    _show = (uri: string[], index = 0) => {
        this.setState({
            showing: true,
            uri: uri,
            initIndex: index
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
        const { showing, uri, initIndex } = this.state;

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
                        <AnimatedPager style={styles.pagerContainer}
                            scrollEnabled={true}
                            initialPage={initIndex}
                            pageMargin={10}
                            overdrag={false}
                        >
                            {
                                uri.map((item, index) => {
                                    return (
                                        <View style={styles.zoomImgContainer} key={item + index}>
                                            <ReactNativeZoomableView
                                                maxZoom={2.5}
                                                minZoom={1}
                                                zoomStep={2.5}
                                                initialZoom={1}
                                                style={{ borderRadius: 20, }}
                                            >
                                                <Image source={item ? { uri: API_HOST + item } : Images.no_picture}
                                                    style={{
                                                        width: windowWidth - 30,
                                                        height: windowHeight - 300,
                                                    }} resizeMode='contain' />
                                            </ReactNativeZoomableView>
                                            <TouchableOpacity style={styles.btnErr} onPress={() => openZalo()}>
                                                <IText style={{ color: Color.white }}>{"Báo khi vé lỗi"}</IText>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.btnQuit} onPress={this._hide}>
                                                <Image source={Images.exit} style={{ width: 20, height: 20 }} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }

                        </AnimatedPager>
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
    },
    btnQuit: {
        position: 'absolute',
        top: 0, right: 0,
        width: 40, height: 40,
        justifyContent: 'center', alignItems: 'center'
    },
    pagerContainer: {
        position: 'absolute',
        top: 150,
        bottom: 150,
        left: 15,
        right: 15,
    },
    zoomImgContainer: {
        // position: 'absolute',
        // top: 0,
        // bottom: 0,
        // left: 15,
        // right: 15,
        backgroundColor: 'orange',
        borderRadius: 20,
        borderTopLeftRadius: 5
    }
})