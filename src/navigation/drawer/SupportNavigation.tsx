import { createStackNavigator } from '@react-navigation/stack';
import { SupportScreen, SupportScreenParamsList } from '@screen';
import React from 'react';

export type SupportStackParamList = {
    SupportScreen: SupportScreenParamsList;
};

const SupportStack = createStackNavigator<SupportStackParamList>();

export function SupportNavigation() {
    return (
        <SupportStack.Navigator initialRouteName={'SupportScreen'}>
            <SupportStack.Screen
                name={'SupportScreen'}
                component={SupportScreen}
                options={{ headerShown: false, title: undefined }}
            />
        </SupportStack.Navigator>
    );
}
