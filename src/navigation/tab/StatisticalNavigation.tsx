import { createStackNavigator } from '@react-navigation/stack';
import {
  KenoScreen,
  KenoScreenParamsList,
  OrderScreen,
  OrderScreenParamsList,
  StatisticalKenoParamsList, StatisticalKenoTab,
  StatisticalScreen, StatisticalScreenParamsList
} from '@screen';
import React from 'react';
// import { HomeNavigation, HomeStackParamList } from './HomeNavigation';

export type StatisticalStackParamList = {
  Statistical: StatisticalScreenParamsList;
  StatisticalKeno: StatisticalKenoParamsList;

  KenoScreen: KenoScreenParamsList;

  OrderScreen: OrderScreenParamsList;

};

const StatisticalStack = createStackNavigator<StatisticalStackParamList>();

export function StatisticalNavigation() {
  return (
    <StatisticalStack.Navigator initialRouteName={'Statistical'}>
      <StatisticalStack.Screen
        name={'Statistical'}
        component={StatisticalScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <StatisticalStack.Screen
        name={'StatisticalKeno'}
        component={StatisticalKenoTab}
        options={{ headerShown: false, title: undefined }}
      />

      <StatisticalStack.Screen
        name={'KenoScreen'}
        component={KenoScreen}
        options={{ headerShown: false, title: undefined }}
      />

      <StatisticalStack.Screen
        name={'OrderScreen'}
        component={OrderScreen}
        options={{ headerShown: false, title: undefined }}
      />

    </StatisticalStack.Navigator>
  );
}
