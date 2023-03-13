import {RootStackParamsList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';

type NavigationProp = StackNavigationProp<RootStackParamsList, 'SplashScreen'>;
type NavigationRoute = RouteProp<RootStackParamsList, 'SplashScreen'>;
export interface SplashScreenRouteParams {}

export const SplashScreen = React.memo(() => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();

  return <View style={[{flex: 1, backgroundColor: 'red'}]}></View>;
});
