import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, HomeScreenParamsList, PowerScreen } from '@screen';
import React from 'react';
import { PowerScreenParamsList } from '@screen';

export type HomeStackParamList = {
  HomeScreen: HomeScreenParamsList;
  PowerScreen: PowerScreenParamsList
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
    </HomeStack.Navigator>
    
  );
}
