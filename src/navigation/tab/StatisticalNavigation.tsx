import { createStackNavigator } from '@react-navigation/stack';
import {
  CartScreen,
  CartScreenParamsList,
  DetailResultMax3d,
  DetailResultMega,
  DetailResultPower,
  KenoScreen,
  KenoScreenParamsList,
  Max3dProScreen,
  Max3dProScreenParamsList,
  Max3dScreen,
  Max3dScreenParamsList,
  MegaScreen,
  MegaScreenParamsList,
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
  StatisticalMax3DProTab,
  StatisticalMax3dParamsList,
  StatisticalMax3dProParamsList,
  StatisticalMax3dTab,
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
  StatisticalMax3d: StatisticalMax3dParamsList;
  StatisticalMax3dPro: StatisticalMax3dProParamsList;

  KenoScreen: KenoScreenParamsList;
  MegaScreen: MegaScreenParamsList;
  PowerScreen: PowerScreenParamsList;
  Max3dScreen: Max3dScreenParamsList;
  Max3dProScreen: Max3dProScreenParamsList;

  // DetailMega: ResultMegaParamsList,
  // DetailPower: ResultPowerParamsList,
  // DetailMax3d: ResultMax3dParamsList,

  // OrderKenoScreen: OrderKenoScreenParamsList,
  // OrderBasicScreen: OrderBasicScreenParamsList

  OrderScreen: OrderScreenParamsList;
  CartScreen: CartScreenParamsList;

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
        name={'StatisticalMax3d'}
        component={StatisticalMax3dTab}
        options={{ headerShown: false, title: undefined }}
      />
      <StatisticalStack.Screen
        name={'StatisticalMax3dPro'}
        component={StatisticalMax3DProTab}
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
        name={'MegaScreen'}
        component={MegaScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <StatisticalStack.Screen
        name={'Max3dScreen'}
        component={Max3dScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <StatisticalStack.Screen
        name={'Max3dProScreen'}
        component={Max3dProScreen}
        options={{ headerShown: false, title: undefined }}
      />

      {/* <StatisticalStack.Screen
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
      /> */}

      <StatisticalStack.Screen
        name={'OrderScreen'}
        component={OrderScreen}
        options={{ headerShown: false, title: undefined }}
      />
       <StatisticalStack.Screen
        name={'CartScreen'}
        component={CartScreen}
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
