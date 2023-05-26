import { ScanStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import { scanBarCode } from './barcode';
import { IText, ImageHeader } from '@components';
import { NavigationUtils } from '@utils';

import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { useBackButtonWithNavigation } from '@hooks';
import { Images, Image } from '@assets';
import { Color } from '@styles';

type NavigationProp = StackNavigationProp<ScanStackParamList, 'Scan'>;
type NavigationRoute = RouteProp<ScanStackParamList, 'Scan'>;

const POWER_NOT_DRAW = "AicMSIk/uKCgAawuhBOpHSAAbwMAALAuAgZkCACAAAAJCACBAA=="
const POWER_DRAWN = 'AiAEKCGNgcIBAawobyRiEyAApwEAAKwoAQZkCIAAAgAkIAAFAIACAQACRBAAAA=='
const KENO_NOT_DRAW = "AgIIyB+WkTDAAYsuRRapHQQA8v8BAIsuAQpkDQAAAAAZWgCAABIAAAEK"
const KENO_DRAWN = 'AggAQ8lPLdDCAYUqsiMjJgQA39IAAIUqAQpkDQAAAAEAAAAAAAAAAAUQAAAAAgAAAAAAAAAABRE='
const KENO_DRAWN2 = 'AgIIyB+WkTDAAYsuRRapHQQA8v8BAIsuAQpkDQAAAAAZWgCAABIAAAEK'
const MEGA_DRAWN = 'AgqETWoiweYCASohMxUIEggAGAAAACshAQZkCICAFAQABBAAAA=='
const MAX3D_PRO = 'AgZKs5VDEFAyAZgu5BSpHQAI+wAAAJkuAANkBwECAA8CwQMB'
const MAX3D_DRAWN = 'AgiIUtJAiiAoAZQmuBPbFAACAQAAAJYmAANkB4EBAF4DAAAB'
const KENO_NOT_EXITS = 'AgZK7JdGolAUAZsuVBapHQQA5QsCAJsuAQpkDQACCEAAAhCAAAQAAAEH'
const TEST = KENO_NOT_EXITS

export interface ScanScreenParamsList { }

export const ScanScreen = React.memo(() => {

    useBackButtonWithNavigation(
        React.useCallback(() => {
            return true;
        }, []),
    );

    const navigation = useNavigation<NavigationProp>();
    const isFocused = useIsFocused();
    // const isFocused = true

    const [hasPermission, setHasPermission] = React.useState(false);
    const devices = useCameraDevices();
    const device = devices.back;
    const [scanned, setScanned] = useState(false);

    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.PDF417], { checkInverted: true });

    React.useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    React.useEffect(() => {
        if (barcodes[0])
            handleBarCodeScanned({ data: barcodes[0].displayValue })
    }, [barcodes]);

    // React.useEffect(()=> {
    //     if (isFocused) setScanned(false)
    // }, [isFocused])

    const handleBarCodeScanned = ({ data }: any) => {
        let tmp = scanBarCode(data)
        if (tmp.message == "success") {
            setScanned(true);
            NavigationUtils.navigate(navigation, ScreenName.ScanChild.ScanResult, { data: tmp })
        }
        else {
            alert(tmp.message)
        }
    }

    const touchableTest = useCallback(() => {
        handleBarCodeScanned({ data: TEST })
    }, [])

    if (hasPermission === null) {
        return <IText>Requesting for camera permission</IText>;
    }
    if (hasPermission === false) {
        return <IText>No access to camera</IText>;
    }

    return (
        <View style={styles.container}>
            <ImageHeader title={"Quét vé"} />
            <View style={{ flex: 1 }}>
                <Image
                    source={Images.scanner} 
                    tintColor={'#1cc74a'}
                    // tintColor={Color.luckyKing}
                    resizeMode='contain'
                    style={{
                        position: 'absolute',
                        top: 50, bottom: 50, right: -20, left: -20, opacity: 0.5
                    }}
                />
                {
                    (device != null && hasPermission) ?
                        <Camera
                            // style={StyleSheet.absoluteFill}
                            style={{
                                flex: 1,
                                zIndex: -10,
                                // width: isFocused ? windowWidth : 0
                            }}
                            device={device}
                            isActive={isFocused}
                            frameProcessor={frameProcessor}
                            frameProcessorFps={3}
                        />
                        : <></>
                }
            </View>
            {/* <TouchableOpacity style={{ flex: 1 }} onPress={touchableTest}></TouchableOpacity> */}
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: { flex: 1, zIndex: -1 },
    barcodeTextURL: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
}); 