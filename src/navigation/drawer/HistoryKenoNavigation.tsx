import { createStackNavigator } from '@react-navigation/stack';
import {
    HistoryKenoScreen, HistoryKenocreenParamsList,
    OrderKenoScreen, OrderKenoScreenParamsList,
    DetailResultKeno, ResultKenoParamsList, ReorderScreenParamsList, ReorderScreen, OrderScreenParamsList, OrderScreen
} from '@screen';
import React from 'react';

export type HistoryKenoStackParamList = {
    HistoryKenoScreen: HistoryKenocreenParamsList,
    OrderKenoScreen: OrderKenoScreenParamsList,
    DetailKeno: ResultKenoParamsList,
    ReoderScreen: ReorderScreenParamsList,
    OrderScreen: OrderScreenParamsList
};

const Stack = createStackNavigator<HistoryKenoStackParamList>();

export function HistoryKenoNavigation() {
    return (
        <Stack.Navigator initialRouteName={'HistoryKenoScreen'}>
            <Stack.Screen
                name={'HistoryKenoScreen'}
                component={HistoryKenoScreen}
                options={{ headerShown: false, title: undefined }}
            />
            <Stack.Screen
                name={'OrderKenoScreen'}
                component={OrderKenoScreen}
                options={{ headerShown: false, title: undefined }}
            />
            <Stack.Screen
                name={'DetailKeno'}
                component={DetailResultKeno}
                options={{ headerShown: false, title: undefined }}
            />
            <Stack.Screen
                name={'ReoderScreen'}
                component={ReorderScreen}
                options={{ headerShown: false, title: undefined }}
            />
            <Stack.Screen
                name={'OrderScreen'}
                component={OrderScreen}
                options={{ headerShown: false, title: undefined }}
            />
        </Stack.Navigator>
    );
}