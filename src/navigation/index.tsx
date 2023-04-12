import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingIndicator, SplashScreen, SplashScreenRouteParams } from '@screen';
import { RootNavigationUtils } from '@utils';
import React from 'react';
import { View } from 'react-native';
import {
  AuthenticationNavigation,
  type AuthenticationStackParamList,
} from './auth/Authentication';
import { MainNavigation } from './MainNavigation';
import { ScreenName } from './ScreenName';

export type RootStackParamsList = {
  SplashScreen: SplashScreenRouteParams;
  Authentication: {};
  Main: {};
};

const RootStack = createStackNavigator<RootStackParamsList>();

declare global {
  interface Window {
    connection: any;
    _store: any;
    loadingIndicator: any;
  }
}

export function RootNavigation(params?: {}) {

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={RootNavigationUtils.navigationRef}>
        <RootStack.Navigator
          initialRouteName={'SplashScreen'}
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          <RootStack.Screen name={'SplashScreen'} component={SplashScreen} />
          <RootStack.Screen
            name={'Authentication'}
            component={AuthenticationNavigation}
          />
          <RootStack.Screen name={'Main'}>
            {props => <MainNavigation {...props} />}
          </RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
      <LoadingIndicator />
    </View>
  );
}

export * from './MainNavigation';

export * from './tab/HomeNavigation';
export * from './tab/LiveNavigation';
export * from './tab/ResultNavigation';
export * from './tab/StatisticalNavigation';
export * from './tab/ScanNavigation'

export * from './drawer/RechargeNavigation'
export * from './drawer/UserNavigation'
export * from './drawer/WithDrawNavigation'

export { AuthenticationStackParamList };
export { ScreenName }
