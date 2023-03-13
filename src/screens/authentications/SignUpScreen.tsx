import {AuthenticationStackParamList} from '@navigation';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<
  AuthenticationStackParamList,
  'SignUp'
>;

type NavigationRoute = RouteProp<AuthenticationStackParamList, 'SignUp'>;

export interface SignUpScreenRouteParams {}

export interface SignUpScreenProps {}

export const SignUpScreen = React.memo((props?: SignUpScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const safeAreaInsets = useSafeAreaInsets();

  return <View style={{flex: 1, backgroundColor: 'pink'}}></View>;
});
