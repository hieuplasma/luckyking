import { createStackNavigator } from '@react-navigation/stack';
import {
  DetailResultMax3d,
  DetailResultMega,
  DetailResultPower,
  KenoScreen,
  KenoScreenParamsList,
  // OrderBasicScreen,
  // OrderBasicScreenParamsList,
  // OrderKenoScreen,
  // OrderKenoScreenParamsList,
  OrderScreen,
  OrderScreenParamsList,
  PowerScreen,
  PowerScreenParamsList,
  ResultMax3dParamsList,
  ResultMegaParamsList,
  ResultPowerParamsList,
  StatisticalKenoParamsList, StatisticalKenoTab,
  StatisticalMegaParamsList,
  StatisticalMegaTab,
  StatisticalPowerParamsList,
  StatisticalPowerTab,
  StatisticalScreen, StatisticalScreenParamsList
} from '@screen';
import React from 'react';
// import { HomeNavigation, HomeStackParamList } from './HomeNavigation';

export type StatisticalStackParamList = {
  Statistical: StatisticalScreenParamsList;

  StatisticalKeno: StatisticalKenoParamsList;
  StatisticalPower: StatisticalPowerParamsList;
  StatisticalMega: StatisticalMegaParamsList;

  KenoScreen: KenoScreenParamsList;
  PowerScreen: PowerScreenParamsList;

  DetailMega: ResultMegaParamsList,
  DetailPower: ResultPowerParamsList,
  DetailMax3d: ResultMax3dParamsList,

  // OrderKenoScreen: OrderKenoScreenParamsList,
  // OrderBasicScreen: OrderBasicScreenParamsList

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
        name={'StatisticalPower'}
        component={StatisticalPowerTab}
        options={{ headerShown: false, title: undefined }}
      />
      <StatisticalStack.Screen
        name={'StatisticalMega'}
        component={StatisticalMegaTab}
        options={{ headerShown: false, title: undefined }}
      />

      <StatisticalStack.Screen
        name={'KenoScreen'}
        component={KenoScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <StatisticalStack.Screen
        name={'PowerScreen'}
        component={PowerScreen}
        options={{ headerShown: false, title: undefined }}
      />

      <StatisticalStack.Screen
        name={'DetailPower'}
        component={DetailResultPower}
        options={{ headerShown: false, title: undefined }}
      />
      <StatisticalStack.Screen
        name={'DetailMega'}
        component={DetailResultMega}
        options={{ headerShown: false, title: undefined }}
      />
      <StatisticalStack.Screen
        name={'DetailMax3d'}
        component={DetailResultMax3d}
        options={{ headerShown: false, title: undefined }}
      />

      <StatisticalStack.Screen
        name={'OrderScreen'}
        component={OrderScreen}
        options={{ headerShown: false, title: undefined }}
      />

      {/* <StatisticalStack.Screen
        name={'OrderKenoScreen'}
        component={OrderKenoScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <StatisticalStack.Screen
        name={'OrderBasicScreen'}
        component={OrderBasicScreen}
        options={{ headerShown: false, title: undefined }}
      /> */}
    </StatisticalStack.Navigator>
  );
}
