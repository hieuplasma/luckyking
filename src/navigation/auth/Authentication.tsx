import { createStackNavigator } from '@react-navigation/stack';
import {
  AgreeTermScreenParamsList,
  AgreeTermsScreen,
  ForgetPassword,
  ForgetScreenRouteParams,
  LoginScreen,
  LoginScreenRouteParams,
  SignUpScreen,
  SignUpScreenRouteParams,
  VerifyOTPScreen,
  VerifyOTPScreenRouteParams,
} from '@screen';
import React from 'react';
import { renderDefaultHeader } from '../HeaderConfig';

export type AuthenticationStackParamList = {
  Login: LoginScreenRouteParams;
  SignUp: SignUpScreenRouteParams;
  VerifyOTP: VerifyOTPScreenRouteParams;
  Forget: ForgetScreenRouteParams;
  AgreeTerms: AgreeTermScreenParamsList
};

const AuthenticationStack = createStackNavigator<AuthenticationStackParamList>();

export function AuthenticationNavigation() {
  return (
    <AuthenticationStack.Navigator
      initialRouteName={'Login'}
      screenOptions={({ navigation }) => renderDefaultHeader(navigation, false)}>
      <AuthenticationStack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{
          headerShown: false,
          title: '',
          animationEnabled: true,
        }}
      />
      <AuthenticationStack.Screen
        name={'SignUp'}
        component={SignUpScreen}
        options={{
          headerShown: false,
          title: '',
          animationEnabled: true,
        }}
      />
      <AuthenticationStack.Screen
        name={'VerifyOTP'}
        component={VerifyOTPScreen}
        options={{
          headerShown: false,
          title: '',
          animationEnabled: true,
        }}
      />
      <AuthenticationStack.Screen
        name={'Forget'}
        component={ForgetPassword}
        options={{
          headerShown: false,
          title: '',
          animationEnabled: true,
        }}
      />
       <AuthenticationStack.Screen
        name={'AgreeTerms'}
        component={AgreeTermsScreen}
        options={{
          headerShown: false,
          title: '',
          animationEnabled: true,
        }}
      />
    </AuthenticationStack.Navigator>
  );
}
