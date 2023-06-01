import { ScanStackParamList, ScreenName } from '@navigation';
import { RouteProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { scanBarCode } from './barcode';
import { IText, ImageHeader } from '@components';
import { NavigationUtils } from '@utils';
import { Color } from '@styles';
import { Image, Images } from '@assets';

type NavigationProp = StackNavigationProp<ScanStackParamList, 'Scan'>;
type NavigationRoute = RouteProp<ScanStackParamList, 'Scan'>;

export interface ScanScreenParamsList { }

export const ScanScreenExpo = React.memo(() => {

  const isFocused = useIsFocused()
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
    let tmp = scanBarCode(data)
    if (tmp.message == "success") {
      setScanned(true);
      NavigationUtils.navigate(navigation, ScreenName.ScanChild.ScanResult, { data: tmp })
    }
    else {
      alert(tmp.message)
    }
  }

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
            {"Không có quyền truy cập Camera!"}
          </IText>
        }
        {
          (hasPermission && isFocused) ?
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
          (hasPermission && isFocused) ?
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={{ flex: 1 , zIndex: -10}}
            />
            : <></>
        }
      </View>
    </View>
  );
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