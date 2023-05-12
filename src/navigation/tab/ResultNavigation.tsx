import { createStackNavigator } from '@react-navigation/stack';
import {
  DetailResultKeno, DetailResultMax3d, DetailResultMega,
  DetailResultPower, ResultKenoParamsList,
  ResultMax3dParamsList,
  ResultMegaParamsList,
  ResultPowerParamsList,
  ResultScreen, ResultScreenParamsList
} from '@screen';
import React from 'react';

export type ResultStackParamList = {
  Result: ResultScreenParamsList;
  DetailKeno: ResultKenoParamsList,
  DetailMega: ResultMegaParamsList,
  DetailPower: ResultPowerParamsList,
  DetailMax3d: ResultMax3dParamsList
};

const Stack = createStackNavigator<ResultStackParamList>();

export function ResultNavigation() {
  return (
    <Stack.Navigator initialRouteName={'Result'}>
      <Stack.Screen
        name={'Result'}
        component={ResultScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <Stack.Screen
        name={'DetailKeno'}
        component={DetailResultKeno}
        options={{ headerShown: false, title: undefined }}
      />
      <Stack.Screen
        name={'DetailMega'}
        component={DetailResultMega}
        options={{ headerShown: false, title: undefined }}
      />
      <Stack.Screen
        name={'DetailPower'}
        component={DetailResultPower}
        options={{ headerShown: false, title: undefined }}
      />
      <Stack.Screen
        name={'DetailMax3d'}
        component={DetailResultMax3d}
        options={{ headerShown: false, title: undefined }}
      />
    </Stack.Navigator>
  );
}
