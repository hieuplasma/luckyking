import {createStackNavigator} from '@react-navigation/stack';
import {LiveScreen, LiveScreenParamsList} from '@screen';
import React from 'react';

export type LiveStackParamList = {
  Live: LiveScreenParamsList;
};

const LiveStack = createStackNavigator<LiveStackParamList>();

export function LiveNavigation() {
  return (
    <LiveStack.Navigator initialRouteName={'Live'}>
      <LiveStack.Screen
        name={'Live'}
        component={LiveScreen}
        options={{headerShown: false, title: undefined}}
      />
    </LiveStack.Navigator>
  );
}
