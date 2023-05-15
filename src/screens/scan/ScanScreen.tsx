import { ScanStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { scanBarCode } from './barcode';
import { IText } from '@components';
import { NavigationUtils } from '@utils';

import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
// import { useScanBarcodes, BarcodeFormat } from 'vision-camera-qrcode-scanner';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

type NavigationProp = StackNavigationProp<ScanStackParamList, 'Scan'>;
type NavigationRoute = RouteProp<ScanStackParamList, 'Scan'>;

export interface ScanScreenParamsList { }

export const ScanScreen = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();
    const isFocused = useIsFocused();

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
        console.log(barcodes)
        if (barcodes[0])
            handleBarCodeScanned({ data: barcodes[0].displayValue })
    }, [barcodes]);

    const handleBarCodeScanned = ({ data }: any) => {
        setScanned(true);
        NavigationUtils.navigate(navigation, ScreenName.ScanChild.ScanResult, { data: scanBarCode(data) })
    }

    if (hasPermission === null) {
        return <IText>Requesting for camera permission</IText>;
    }
    if (hasPermission === false) {
        return <IText>No access to camera</IText>;
    }

    return (
        <View style={styles.container}>
            {
                isFocused &&
                device != null &&
                hasPermission &&
                <>
                    <Camera
                        // style={StyleSheet.absoluteFill}
                        style={{ flex: 1 }}
                        device={device}
                        isActive={true}
                        frameProcessor={frameProcessor}
                        frameProcessorFps={1}
                    />
                    {/* {scanned && <Button title={'Nhấn để scan lại'} onPress={() => setScanned(false)} />} */}
                </>
            }
        </View>
    )
})

const styles = StyleSheet.create({
    container: { flex: 1 },
    barcodeTextURL: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
}); 