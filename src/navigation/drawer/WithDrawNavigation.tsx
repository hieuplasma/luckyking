import { createStackNavigator } from '@react-navigation/stack';
import {
    LuckyKingWithdrawScreen, LuckyKingWithdrawScreenParamsList,
    WithdrawScreen, WithdrawScreenParamsList
} from '@screen';
import React from 'react';

export type WithdrawStackParamList = {
    WithdrawScreen: WithdrawScreenParamsList,
    LuckyKingWithdrawScreen: LuckyKingWithdrawScreenParamsList
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
        </WithDrawStack.Navigator>
    );
}
