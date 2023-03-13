import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen, SplashScreenRouteParams} from '@screen';
import React from 'react';
import {
  AuthenticationNavigation,
  AuthenticationStackParamList,
} from './Authentication';
import {ScreenName} from './ScreenName';
import {MainNavigation} from './MainNavigation';
import {HomeNavigation} from './HomeNavigation';

export type RootStackParamsList = {
  SplashScreen: SplashScreenRouteParams;
  Authentication: {};
  Main: {};
  HomeNavigation: {};
};

const RootStack = createStackNavigator<RootStackParamsList>();

export function RootNavigation(params?: {}) {
  return (
    <RootStack.Navigator
      initialRouteName={'Main'}
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
      <RootStack.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{headerShown: false, title: undefined}}></RootStack.Screen>
    </RootStack.Navigator>
  );
}
export type {AuthenticationStackParamList, ScreenName};
export * from './MainNavigation';
export * from './HomeNavigation';
