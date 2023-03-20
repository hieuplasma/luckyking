import {createStackNavigator} from '@react-navigation/stack';
import {ResultScreen, ResultScreenParamsList} from '@screen';
import React from 'react';

export type ResultStackParamList = {
  Result: ResultScreenParamsList;
};

const HomeStack = createStackNavigator<ResultStackParamList>();

export function ResultNavigation() {
  return (
    <HomeStack.Navigator initialRouteName={'Result'}>
      <HomeStack.Screen
        name={'Result'}
        component={ResultScreen}
        options={{headerShown: false, title: undefined}}
      />
    </HomeStack.Navigator>
  );
}
