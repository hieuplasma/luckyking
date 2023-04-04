import { createStackNavigator } from '@react-navigation/stack';
import {
  CartScreen, CartScreenParamsList,
  HomeScreen, HomeScreenParamsList,
  PowerScreen, PowerScreenParamsList
} from '@screen';
import React from 'react';

export type HomeStackParamList = {
  HomeScreen: HomeScreenParamsList;
  PowerScreen: PowerScreenParamsList;
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
    </HomeStack.Navigator>

  );
}
