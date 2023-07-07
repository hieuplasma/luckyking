import 'react-native-reanimated'
import { runOnJS } from 'react-native-reanimated';
import { ScanStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import { scanBarCode } from './barcode';
import { IText, ImageHeader } from '@components';
import { NavigationUtils } from '@utils';

import { useCameraDevices, Camera, useFrameProcessor } from 'react-native-vision-camera';
import { BarcodeFormat, scanBarcodes } from "vision-camera-code-scanner";
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

export const ScanScreenVisionCamera = React.memo(() => {

    useBackButtonWithNavigation(
        React.useCallback(() => {
            return true;
        }, []),
    );

    const navigation = useNavigation<NavigationProp>();
    const isFocused = useIsFocused();

    const [hasPermission, setHasPermission] = React.useState(false);
    const devices = useCameraDevices();
    const device = devices.back;
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = ({ data }: any) => {
        let tmp = scanBarCode(data)
        console.log(tmp)
        if (tmp.message == "success") {
            setScanned(true);
            NavigationUtils.navigate(navigation, ScreenName.ScanChild.ScanResult, { data: tmp })
        }
        else {
            alert(tmp.message)
        }
    }

    const frameProcessor = useFrameProcessor((frame) => {
        "worklet";
        const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.PDF417], {
            checkInverted: true,
        });
        if (detectedBarcodes?.length !== 0) {
            console.log(detectedBarcodes[0])
            runOnJS(handleBarCodeScanned)({ data: detectedBarcodes[0].displayValue })
        }
    }, [handleBarCodeScanned])

    React.useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    const touchableTest = useCallback(() => {
        handleBarCodeScanned({ data: TEST })
    }, [])


    return (
        <View style={styles.container}>
            <ImageHeader title={"Quét vé"} />
            <View style={{ flex: 1 }}>
                {
                    (hasPermission === null) && <IText style={styles.noPermission}>{"Đang yêu cầu quyền truy cập Camera!"}</IText>
                }
                {
                    (hasPermission === false)
                    && <IText style={styles.noPermission}>
                        {"Không có quyền truy cập Camera"}
                    </IText>
                }
                {
                    !device ?
                        <IText style={styles.noPermission}>{"Thiết bị không có Camera sau!"}</IText>
                        : <></>
                }
                {
                    (device != null && hasPermission && isFocused) ?
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
                        : <></>
                }
                {
                    (device != null && hasPermission) ?
                        <Camera
                            // style={StyleSheet.absoluteFill}
                            style={{
                                flex: 1,
                                zIndex: -10,
                            }}
                            device={device}
                            isActive={isFocused}
                            frameProcessor={frameProcessor}
                            frameProcessorFps={3}
                            // enableHighQualityPhotos={true}
                            zoom={2}
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
    noPermission: {
        textAlign: 'center', fontWeight: 'bold', fontSize: 15,
        margin: 30, color: Color.luckyKing, marginTop: 30
    }
}); 