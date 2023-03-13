import {AuthenticationStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';

type NavigationProp = StackNavigationProp<
  AuthenticationStackParamList,
  'VerifyOTP'
>;

type NavigationRoute = RouteProp<AuthenticationStackParamList, 'VerifyOTP'>;

export interface VerifyOTPScreenRouteParams {
  accoutRegisterInfo?: any;
}

export interface VerifyOTPScreenProps {}

export const VerifyOTPScreen = React.memo((props?: VerifyOTPScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();

  return <View style={{flex: 1, backgroundColor: 'black'}}></View>;
});
