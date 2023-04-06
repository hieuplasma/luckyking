/**
 * Created by hieutm on Thu Apr 06 2023
 * Copyright (c) 2023 https://gitlab.com/h1eu_traN
 */

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export class LoadingIndicator extends PureComponent {
    state = {
        loading: false,
    };

    _show = () => {
        this.setState({
            loading: true,
        });
    };
    _hide = () => {
        this.setState({
            loading: false,
        });
    };

    componentDidMount() {
        window.loadingIndicator = {
            show: this._show,
            hide: this._hide,
        };
    }

    render() {
        const { loading } = this.state;
        // if (!loading) {
        //     return null
        // }

        return (
            <>
                {!loading ? (
                    <></>
                ) : (
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'transparent',
                            // backgroundColor: '#101010',
                            // opacity: 0.2,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                minHeight: 100,
                                minWidth: 100,
                                borderRadius: 8,
                                shadowColor: "#f2f2f2",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 4.65,
                            }}>
                            {/* <ActivityIndicator size="large" color={'white'} /> */}
                            <LottieView source={require('./loading.json')}
                                autoPlay style={{ height: 100, width: 100 }} />
                        </View>
                    </View>
                )}
            </>
        );
    }
}
