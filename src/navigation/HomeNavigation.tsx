import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, HomeScreenParamsList} from '@screen';
import React from 'react';

export type HomeStackParamList = {
  Home: HomeScreenParamsList;
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export function HomeNavigation() {
  return (
    <HomeStack.Navigator initialRouteName={'Home'}>
      <HomeStack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{headerShown: false, title: undefined}}
      />
    </HomeStack.Navigator>
  );
}
