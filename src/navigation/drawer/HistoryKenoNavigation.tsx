import { createStackNavigator } from '@react-navigation/stack';
import {
    HistoryKenoScreen, HistoryKenocreenParamsList,
    OrderKenoScreen, OrderKenoScreenParamsList,
    DetailResultKeno, ResultKenoParamsList
} from '@screen';
import React from 'react';

export type HistoryKenoStackParamList = {
    HistoryKenoScreen: HistoryKenocreenParamsList,
    OrderKenoScreen: OrderKenoScreenParamsList,
    DetailKeno: ResultKenoParamsList
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
        </Stack.Navigator>
    );
}