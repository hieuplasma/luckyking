import { lotteryApi, userApi } from '@api';
import { LotteryType } from '@common';
import { RootStackParamsList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getCart, getJackpot, getKenoDraw, getMax3dDraw, getMax3dProDraw, getMegaDraw, getPowerDraw, updateUser } from '@redux';
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

  const dispatch = useDispatch()

  async function intiApp() {
    if (doNotExits(token))
      NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication);
    else {
      const user = await userApi.getuserInfo()
      if (user?.data) {
        dispatch(updateUser(user.data))
      }
      else return NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication);

      const cart = await lotteryApi.getListItemCart()
      if (cart) {
        dispatch(getCart(cart.data))
      }

      const listPower = await lotteryApi.getSchedulePower({ take: 6, skip: 0 })
      if (listPower) {
        if (listPower.data.length > 0) {
          dispatch(getPowerDraw(listPower.data))
        }
      }

      const listMega = await lotteryApi.getScheduleMega({ take: 6, skip: 0 })
      if (listMega) {
        if (listMega.data.length > 0) {
          dispatch(getMegaDraw(listMega.data))
        }
      }

      const listMax3d = await lotteryApi.getScheduleMax3d({ type: LotteryType.Max3D, take: 6, skip: 0 })
      if (listMax3d) {
        if (listMax3d.data.length > 0) {
          dispatch(getMax3dDraw(listMax3d.data))
        }
      }

      const listMax3dPro = await lotteryApi.getScheduleMax3d({ type: LotteryType.Max3DPro, take: 6, skip: 0 })
      if (listMax3dPro) {
        if (listMax3dPro.data.length > 0) {
          dispatch(getMax3dProDraw(listMax3dPro.data))
        }
      }

      const FIRST_TAKE_KENO = 400
      const listKeno = await lotteryApi.getScheduleKeno({ type: LotteryType.Keno, take: 20, skip: 0 })
      if (listKeno) {
        if (listKeno.data.length > 0) {
          dispatch(getKenoDraw(listKeno.data))
        }
      }

      const jackpots = await lotteryApi.getJackpot()
      if (jackpots) {
        dispatch(getJackpot(jackpots.data))
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
