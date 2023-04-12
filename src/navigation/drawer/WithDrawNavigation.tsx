import { createStackNavigator } from '@react-navigation/stack';
import {
    WithdrawScreen, WithdrawScreenParamsList
} from '@screen';
import React from 'react';

export type WithdrawStackParamList = {
    WithdrawScreen: WithdrawScreenParamsList
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

        </WithDrawStack.Navigator>
    );
}
