import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen, SplashScreenRouteParams} from '@screen';
import React from 'react';
import {
  AuthenticationNavigation,
 type AuthenticationStackParamList,
} from './Authentication';
import {MainNavigation} from './MainNavigation';
import {ScreenName} from './ScreenName';

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
  }
}

export function RootNavigation(params?: {}) {

  return (
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
  );
}
export * from './MainNavigation';
export * from './HomeNavigation';
export * from './LiveNavigation';
export * from './ResultNavigation';
export * from './StatisticalNavigation';
export * from './ScanNavigation'
export {AuthenticationStackParamList};
export {ScreenName}
