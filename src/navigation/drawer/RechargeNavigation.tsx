import { createStackNavigator } from '@react-navigation/stack';
import {
    RechargeScreen, RechargeScreenParamsList,
    BankRechargeScreen, BankRechargeScreenParamsList
} from '@screen';
import React from 'react';

export type RechargeStackParamList = {
    RechargeScreen: RechargeScreenParamsList,
    BankRechargeScreen: BankRechargeScreenParamsList
};

const RechargeStack = createStackNavigator<RechargeStackParamList>();

export function RechargeNavigation() {
    return (
        <RechargeStack.Navigator initialRouteName={'RechargeScreen'}>
            <RechargeStack.Screen
                name={'RechargeScreen'}
                component={RechargeScreen}
                options={{ headerShown: false, title: undefined }}
                initialParams={{ expandHistory: false }}
            />
            <RechargeStack.Screen
                name={'BankRechargeScreen'}
                component={BankRechargeScreen}
                options={{ headerShown: false, title: undefined }}
            />
        </RechargeStack.Navigator>
    );
}
