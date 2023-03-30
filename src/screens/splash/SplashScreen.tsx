import { RootStackParamsList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationUtils } from '@utils';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<RootStackParamsList, 'SplashScreen'>;
type NavigationRoute = RouteProp<RootStackParamsList, 'SplashScreen'>;
export interface SplashScreenRouteParams { }

export const SplashScreen = React.memo(() => {

  const token = useSelector((state: any) => state.authReducer.accessToken);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();

  useEffect(() => {
    if (token != null && token != undefined && token != "")
      NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Main);
    else
      NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication);
  }, [])

  return <View style={[{ flex: 1, backgroundColor: 'yellow' }]}></View>;
});
