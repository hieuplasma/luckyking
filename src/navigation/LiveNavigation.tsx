import {createStackNavigator} from '@react-navigation/stack';
import {LiveScreen, LiveScreenParamsList} from '@screen';
import React from 'react';

export type LiveStackParamList = {
  Live: LiveScreenParamsList;
};

const HomeStack = createStackNavigator<LiveStackParamList>();

export function LiveNavigation() {
  return (
    <HomeStack.Navigator initialRouteName={'Live'}>
      <HomeStack.Screen
        name={'Live'}
        component={LiveScreen}
        options={{headerShown: false, title: undefined}}
      />
    </HomeStack.Navigator>
  );
}
