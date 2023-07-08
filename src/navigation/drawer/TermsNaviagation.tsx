import { createStackNavigator } from '@react-navigation/stack';
import { TermScreen, TermScreenParamsList } from '@screen';
import React from 'react';

export type TermsStackParamList = {
    TermsScreen: TermScreenParamsList;
};

const TermsStack = createStackNavigator<TermsStackParamList>();

export function TermsNavigation() {
    return (
        <TermsStack.Navigator initialRouteName={'TermsScreen'}>
            <TermsStack.Screen
                name={'TermsScreen'}
                component={TermScreen}
                options={{ headerShown: false, title: undefined }}
            />
        </TermsStack.Navigator>
    );
}
