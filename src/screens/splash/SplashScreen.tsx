import { authApi, lotteryApi, userApi } from '@api';
import { LotteryType } from '@common';
import { IText } from '@components';
import { useBackButtonWithNavigation } from '@hooks';
import { RootStackParamsList, ScreenName } from '@navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  getCart, getJackpot,
  getKenoDraw, getMax3dDraw,
  getMax3dProDraw, getMegaDraw,
  getPowerDraw, updateToken, updateUser
} from '@redux';
import { Color } from '@styles';
import { doNotExits, NavigationUtils } from '@utils';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<RootStackParamsList, 'SplashScreen'>;
type NavigationRoute = RouteProp<RootStackParamsList, 'SplashScreen'>;
export interface SplashScreenRouteParams { }

const FIRST_TAKE_KENO = 40

export const SplashScreen = React.memo(() => {

  useBackButtonWithNavigation(
    React.useCallback(() => {
      return true;
    }, []),
  );

  const token = useSelector((state: any) => state.authReducer.accessToken);
  const phoneNumber = useSelector((state: any) => state.authReducer.phoneNumber)
  const password = useSelector((state: any) => state.authReducer.password)

  const navigation = useNavigation<NavigationProp>();

  const dispatch = useDispatch()
  async function intiApp() {

    if (doNotExits(token))
      NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication);
    else {
      await Promise.all([
        userApi.getuserInfo().then(user => { if (user) dispatch(updateUser(user.data)) }),
        lotteryApi.getListItemCart().then(cart => { if (cart) dispatch(getCart(cart.data)) }),

        lotteryApi.getSchedulePower({ take: 6, skip: 0 })
          .then(listPower => { if (listPower?.data?.length > 0) dispatch(getPowerDraw(listPower.data)) }),

        lotteryApi.getScheduleMega({ take: 6, skip: 0 })
          .then(listMega => { if (listMega?.data?.length > 0) dispatch(getMegaDraw(listMega.data)) }),

        lotteryApi.getScheduleMax3d({ type: LotteryType.Max3D, take: 6, skip: 0 })
          .then(listMax3d => { if (listMax3d?.data?.length > 0) dispatch(getMax3dDraw(listMax3d.data)) }),

        lotteryApi.getScheduleMax3d({ type: LotteryType.Max3DPro, take: 6, skip: 0 })
          .then(listMax3dPro => { if (listMax3dPro?.data?.length > 0) dispatch(getMax3dProDraw(listMax3dPro.data)) }),

        lotteryApi.getScheduleKeno({ type: LotteryType.Keno, take: FIRST_TAKE_KENO, skip: 0 })
          .then(listKeno => { if (listKeno?.data?.length > 0) dispatch(getKenoDraw(listKeno.data)) }),

        lotteryApi.getJackpot().then(jackpots => { if (jackpots) dispatch(getJackpot(jackpots.data)) })
      ])

      NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Main);
    }
  }

  useEffect(() => {
    intiApp()
  }, [doNotExits(token)])

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
        // flexDirection: 'row',
        backgroundColor: 'white',
        minHeight: 100,
        minWidth: 100,
        borderRadius: 8,
        padding: 16
      }}>
      <ActivityIndicator size="large" color={Color.luckyKing} />
      <IText style={{ fontWeight: 'bold', color: Color.luckyKing, marginTop: 12 }}>{"Đang đồng bộ dữ liệu"}</IText>
    </View>
  </View>
});
