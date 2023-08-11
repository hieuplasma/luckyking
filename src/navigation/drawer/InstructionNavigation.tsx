import { createStackNavigator } from '@react-navigation/stack';
import {
    InstructionKeno, InstructionKenoParamsList,
    InstructionMax3D,
    InstructionMax3DParamsList,
    InstructionMax3DPro,
    InstructionMax3dProParamsList,
    InstructionMega,
    InstructionMegaParamsList,
    InstructionPower,
    InstructionPowerParamsList,
    InstructionScreen, InstructionScreenParamsList
} from '@screen';
import React from 'react';

export type InstructionStackParamList = {
    InstructionScreen: InstructionScreenParamsList;
    InstructionKeno: InstructionKenoParamsList;
    InstructionPower: InstructionPowerParamsList;
    InstructionMega: InstructionMegaParamsList;
    InstructionMax3D: InstructionMax3DParamsList;
    InstructionMax3DPro: InstructionMax3dProParamsList
};

const InstructionStack = createStackNavigator<InstructionStackParamList>();

export function InstructionNavigation() {
    return (
        <InstructionStack.Navigator initialRouteName={'InstructionScreen'}>
            <InstructionStack.Screen
                name={'InstructionScreen'}
                component={InstructionScreen}
                options={{ headerShown: false, title: undefined }}
            />
            <InstructionStack.Screen
                name={'InstructionKeno'}
                component={InstructionKeno}
                options={{ headerShown: false, title: undefined }}
            />
            <InstructionStack.Screen
                name={'InstructionPower'}
                component={InstructionPower}
                options={{ headerShown: false, title: undefined }}
            />
            <InstructionStack.Screen
                name={'InstructionMega'}
                component={InstructionMega}
                options={{ headerShown: false, title: undefined }}
            />
            <InstructionStack.Screen
                name={'InstructionMax3D'}
                component={InstructionMax3D}
                options={{ headerShown: false, title: undefined }}
            />
            <InstructionStack.Screen
                name={'InstructionMax3DPro'}
                component={InstructionMax3DPro}
                options={{ headerShown: false, title: undefined }}
            />
        </InstructionStack.Navigator>
    );
}
