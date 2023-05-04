import { createStackNavigator } from '@react-navigation/stack';
import {
    HistoryBasicScreen, HistoryBasicScreenParamsList,
    OrderBasicScreen,
    OrderBasicScreenParamsList, 
} from '@screen';
import React from 'react';

export type HistoryBasicStackParamList = {
    HistoryBasicScreen: HistoryBasicScreenParamsList,
    OrderBasicScreen: OrderBasicScreenParamsList
};

const Stack = createStackNavigator<HistoryBasicStackParamList>();

export function HistoryBasicNavigation() {
    return (
        <Stack.Navigator initialRouteName={'HistoryBasicScreen'}>
            <Stack.Screen
                name={'HistoryBasicScreen'}
                component={HistoryBasicScreen}
                options={{ headerShown: false, title: undefined }}
            />
            <Stack.Screen
                name={'OrderBasicScreen'}
                component={OrderBasicScreen}
                options={{ headerShown: false, title: undefined }}
            />
        </Stack.Navigator>
    );
}