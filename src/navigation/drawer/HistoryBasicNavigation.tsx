import { createStackNavigator } from '@react-navigation/stack';
import {
    DetailResultMax3d,
    DetailResultMega,
    DetailResultPower,
    HistoryBasicScreen, HistoryBasicScreenParamsList,
    OrderBasicScreen,
    OrderBasicScreenParamsList,
    ResultMax3dParamsList, ResultMegaParamsList, ResultPowerParamsList
} from '@screen';
import React from 'react';

export type HistoryBasicStackParamList = {
    HistoryBasicScreen: HistoryBasicScreenParamsList,
    OrderBasicScreen: OrderBasicScreenParamsList,
    DetailMega: ResultMegaParamsList,
    DetailPower: ResultPowerParamsList,
    DetailMax3d: ResultMax3dParamsList,
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
            <Stack.Screen
                name={'DetailMax3d'}
                component={DetailResultMax3d}
                options={{ headerShown: false, title: undefined }}
            />
            <Stack.Screen
                name={'DetailMega'}
                component={DetailResultMega}
                options={{ headerShown: false, title: undefined }}
            />
            <Stack.Screen
                name={'DetailPower'}
                component={DetailResultPower}
                options={{ headerShown: false, title: undefined }}
            />
        </Stack.Navigator>
    );
}