import { lotteryApi, userApi } from '@api';
import { RootStackParamsList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getCart, updateUser } from '@redux';
import { Color } from '@styles';
import { doNotExits, NavigationUtils } from '@utils';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<RootStackParamsList, 'SplashScreen'>;
type NavigationRoute = RouteProp<RootStackParamsList, 'SplashScreen'>;
export interface SplashScreenRouteParams { }

export const SplashScreen = React.memo(() => {

  const token = useSelector((state: any) => state.authReducer.accessToken);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();

  const dispatch = useDispatch()

  async function intiApp() {
    if (doNotExits(token))
      NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication);
    else {
      const user = await userApi.getuserInfo()
      if (user?.data) {
        dispatch(updateUser(user.data))
      }
      const cart = await lotteryApi.getListItemCart()
      if (cart) {
        dispatch(getCart(cart.data))
      }
      NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Main);
    }
  }

  useEffect(() => {
    intiApp()
  }, [token])

  return <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        minHeight: 100,
        minWidth: 100,
        borderRadius: 8,
      }}>
      <ActivityIndicator size="large" color={Color.luckyKing} />
    </View>
  </View>
});
