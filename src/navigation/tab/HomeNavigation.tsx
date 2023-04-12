import { createStackNavigator } from '@react-navigation/stack';
import {
  CartScreen, CartScreenParamsList,
  HomeScreen, HomeScreenParamsList,
  MegaScreen, MegaScreenParamsList,
  PowerScreen, PowerScreenParamsList,
  Max3dScreen, Max3dScreenParamsList
} from '@screen';
import React from 'react';

export type HomeStackParamList = {
  HomeScreen: HomeScreenParamsList;
  PowerScreen: PowerScreenParamsList;
  MegaScreen: MegaScreenParamsList;
  Max3dScreen: Max3dScreenParamsList
  CartScreen: CartScreenParamsList
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export function HomeNavigation() {
  return (
    <HomeStack.Navigator initialRouteName={'HomeScreen'}>
      <HomeStack.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'PowerScreen'}
        component={PowerScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'CartScreen'}
        component={CartScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'MegaScreen'}
        component={MegaScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'Max3dScreen'}
        component={Max3dScreen}
        options={{ headerShown: false, title: undefined }}
      />
    </HomeStack.Navigator>

  );
}
