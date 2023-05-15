import { createStackNavigator } from '@react-navigation/stack';
import { ScanResultScreen, ScanResultScreenParamsList, ScanScreen, ScanScreenParamsList } from '@screen';
import React from 'react';

export type ScanStackParamList = {
  Scan: ScanScreenParamsList;
  ScanResult: ScanResultScreenParamsList
};

const HomeStack = createStackNavigator<ScanStackParamList>();

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
