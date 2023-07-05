import { createStackNavigator } from '@react-navigation/stack';
import {
  ScanResultScreen, ScanResultScreenParamsList,
  ScanScreenExpo,
  ScanScreenVisionCamera,
  ScanScreenParamsList
} from '@screen';
import React from 'react';
import { Platform } from 'react-native';

export type ScanStackParamList = {
  Scan: ScanScreenParamsList;
  ScanResult: ScanResultScreenParamsList
};

const HomeStack = createStackNavigator<ScanStackParamList>();

const ScanScreen = Platform.OS == 'ios' ? ScanScreenExpo : ScanScreenVisionCamera
// const ScanScreen = ScanScreenVisionCamera

export function ScanNavigation() {
  return (
    <HomeStack.Navigator initialRouteName={'Scan'}>
      <HomeStack.Screen
        name={'Scan'}
        component={ScanScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'ScanResult'}
        component={ScanResultScreen}
        options={{ headerShown: false, title: undefined }}
      />
    </HomeStack.Navigator>
  );
}
