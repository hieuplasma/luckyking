import { ScanStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { scanBarCode } from './barcode';
import { IText } from '@components';
import { NavigationUtils } from '@utils';

type NavigationProp = StackNavigationProp<ScanStackParamList, 'Scan'>;
type NavigationRoute = RouteProp<ScanStackParamList, 'Scan'>;

export interface ScanScreenParamsList { }

export const ScanScreen = React.memo(() => {

  const navigation = useNavigation<NavigationProp>();

  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log(status, scanned)
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    console.log(data)
    alert(`Data scan được\n${scanBarCode(data)}`)

    // NavigationUtils.navigate(navigation, ScreenName.ScanChild.ScanResult, { data: scanBarCode(data) })
  }

  if (hasPermission === null) {
    return <IText>Requesting for camera permission</IText>;
  }
  if (hasPermission === false) {
    return <IText>No access to camera</IText>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        // style={StyleSheet.absoluteFillObject}
        style={{ flex: 1 }}
        // barCodeTypes={BarCodeScanner.Constants.BarCodeType.pdf417}
      />
      {scanned && <Button title={'Nhấn để scan lại'} onPress={() => setScanned(false)} />}
    </View>
  );
})

const styles = StyleSheet.create({
  container: { flex: 1 }
}); 