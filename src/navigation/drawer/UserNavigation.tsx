import { createStackNavigator } from '@react-navigation/stack';
import {
    ChangePassScreen, ChangePassScreenParamsList,
    UserScreen, UserScreenParamsList
} from '@screen';
import React from 'react';

export type UserStackParamList = {
    UserScreen: UserScreenParamsList;
    ChangePassScreen: ChangePassScreenParamsList
};

const UserStack = createStackNavigator<UserStackParamList>();

export function UserNavigation() {
    return (
        <UserStack.Navigator initialRouteName={'UserScreen'}>
            <UserStack.Screen
                name={'UserScreen'}
                component={UserScreen}
                options={{ headerShown: false, title: undefined }}
            />
            <UserStack.Screen
                name={'ChangePassScreen'}
                component={ChangePassScreen}
                options={{ headerShown: false, title: undefined }}
            />
        </UserStack.Navigator>
    );
}
