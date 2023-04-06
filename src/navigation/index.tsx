import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingIndicator, SplashScreen, SplashScreenRouteParams } from '@screen';
import { RootNavigationUtils } from '@utils';
import React from 'react';
import { View } from 'react-native';
import {
  AuthenticationNavigation,
  type AuthenticationStackParamList,
} from './Authentication';
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
export * from './HomeNavigation';
export * from './LiveNavigation';
export * from './ResultNavigation';
export * from './StatisticalNavigation';
export * from './ScanNavigation'
export { AuthenticationStackParamList };
export { ScreenName }
