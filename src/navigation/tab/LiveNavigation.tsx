import {createStackNavigator} from '@react-navigation/stack';
import {LiveScreen, LiveScreenParamsList} from '@screen';
import React from 'react';

export type LiveStackParamList = {
  LiveScreen: LiveScreenParamsList;
};

const LiveStack = createStackNavigator<LiveStackParamList>();

export function LiveNavigation() {
  return (
    <LiveStack.Navigator initialRouteName={'LiveScreen'}>
      <LiveStack.Screen
        name={'LiveScreen'}
        component={LiveScreen}
        options={{headerShown: false, title: undefined}}
      />
    </LiveStack.Navigator>
  );
}
