import {createStackNavigator} from '@react-navigation/stack';
import {StatisticalScreen, StatisticalScreenParamsList} from '@screen';
import React from 'react';

export type StatisticalStackParamList = {
  Statistical: StatisticalScreenParamsList;
};

const HomeStack = createStackNavigator<StatisticalStackParamList>();

export function StatisticalNavigation() {
  return (
    <HomeStack.Navigator initialRouteName={'Statistical'}>
      <HomeStack.Screen
        name={'Statistical'}
        component={StatisticalScreen}
        options={{headerShown: false, title: undefined}}
      />
    </HomeStack.Navigator>
  );
}
