import { createStackNavigator } from '@react-navigation/stack';
import {
  CartScreen, CartScreenParamsList,
  HomeScreen, HomeScreenParamsList,
  MegaScreen, MegaScreenParamsList,
  PowerScreen, PowerScreenParamsList,
  Max3dScreen, Max3dScreenParamsList,
  Max3dProScreen, Max3dProScreenParamsList,
  KenoScreen, KenoScreenParamsList,
  OrderScreen, OrderScreenParamsList
} from '@screen';
import React from 'react';
import { RechargeNavigation, RechargeStackParamList } from '../drawer/RechargeNavigation';
import { HistoryBasicNavigation, HistoryBasicStackParamList } from '../drawer/HistoryBasicNavigation';
import { HistoryKenoNavigation, HistoryKenoStackParamList } from '../drawer/HistoryKenoNavigation';

export type HomeStackParamList = {
  HomeScreen: HomeScreenParamsList;
  PowerScreen: PowerScreenParamsList;
  MegaScreen: MegaScreenParamsList;
  Max3dScreen: Max3dScreenParamsList;
  Max3dProScreen: Max3dProScreenParamsList;
  KenoScreen: KenoScreenParamsList;
  CartScreen: CartScreenParamsList,
  OrderScreen: OrderScreenParamsList;

  RechargeStack: RechargeStackParamList,
  HistoryBasicStack: HistoryBasicStackParamList,
  HistoryKenoStack: HistoryKenoStackParamList
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
        name={'KenoScreen'}
        component={KenoScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'PowerScreen'}
        component={PowerScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'CartScreen'}
        component={CartScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'MegaScreen'}
        component={MegaScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'Max3dScreen'}
        component={Max3dScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'Max3dProScreen'}
        component={Max3dProScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'OrderScreen'}
        component={OrderScreen}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'RechargeStack'}
        component={RechargeNavigation}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'HistoryBasicStack'}
        component={HistoryBasicNavigation}
        options={{ headerShown: false, title: undefined }}
      />
      <HomeStack.Screen
        name={'HistoryKenoStack'}
        component={HistoryKenoNavigation}
        options={{ headerShown: false, title: undefined }}
      />
    </HomeStack.Navigator>

  );
}
