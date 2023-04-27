import { createStackNavigator } from '@react-navigation/stack';
import {
    HistoryBasicScreen, HistoryKenocreenParamsList,
    OrderBasicScreen, OrderKenoScreenParamsList
} from '@screen';
import React from 'react';

export type HistoryBasicStackParamList = {
    HistoryBasicScreen: HistoryKenocreenParamsList,
    OrderBasicScreen: OrderKenoScreenParamsList
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