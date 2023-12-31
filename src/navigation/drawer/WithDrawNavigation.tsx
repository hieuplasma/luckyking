import { createStackNavigator } from '@react-navigation/stack';
import {
    BankWithdrawScreen,
    BankWithdrawScreenParamsList,
    LuckyKingWithdrawScreen, LuckyKingWithdrawScreenParamsList,
    WithdrawRequestScreen,
    WithdrawRequestScreenParamsList,
    WithdrawScreen, WithdrawScreenParamsList
} from '@screen';
import React from 'react';

export type WithdrawStackParamList = {
    WithdrawScreen: WithdrawScreenParamsList,
    LuckyKingWithdrawScreen: LuckyKingWithdrawScreenParamsList,
    BankWithdrawScreen: BankWithdrawScreenParamsList,
    WithdrawRequestScreen: WithdrawRequestScreenParamsList
};

const WithDrawStack = createStackNavigator<WithdrawStackParamList>();

export function WithDrawNavigation() {
    return (
        <WithDrawStack.Navigator initialRouteName={'WithdrawScreen'}>
            <WithDrawStack.Screen
                name={'WithdrawScreen'}
                component={WithdrawScreen}
                options={{ headerShown: false, title: undefined }}
            />
            <WithDrawStack.Screen
                name={'LuckyKingWithdrawScreen'}
                component={LuckyKingWithdrawScreen}
                options={{ headerShown: false, title: undefined }}
            />
            <WithDrawStack.Screen
                name={'BankWithdrawScreen'}
                component={BankWithdrawScreen}
                options={{ headerShown: false, title: undefined }}
            />
              <WithDrawStack.Screen
                name={'WithdrawRequestScreen'}
                component={WithdrawRequestScreen}
                options={{ headerShown: false, title: undefined }}
            />
        </WithDrawStack.Navigator>
    );
}
