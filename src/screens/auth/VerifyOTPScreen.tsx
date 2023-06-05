import { useVerifyOtp } from '@hooks';
import { AuthenticationStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  InputComponent,
  Label,
  translate,
  ShadowView
} from '@shared';
import { Color, Style } from '@styles';
import { Button } from '@widgets';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import { updateToken } from '../../redux/reducer/auth';
import { API_URI } from '../../api/config';
import { NavigationUtils, ScreenUtils } from '@utils';
import { Icon } from '@assets';
import { useHeaderHeight } from '@react-navigation/elements'


type NavigationProp = StackNavigationProp<AuthenticationStackParamList, 'VerifyOTP'>;
type NavigationRoute = RouteProp<AuthenticationStackParamList, 'VerifyOTP'>;

export interface VerifyOTPScreenRouteParams {
  type?: string;
  phoneNumber: string,
  password: string
}

export interface VerifyOTPScreenProps { }

export const VerifyOTPScreen = React.memo((props?: any) => {
  const height = useHeaderHeight()
  const dispatch = useDispatch()
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const verifyOtpHooks = useVerifyOtp();
  const [confirm, setConfirm]: any = useState(null)

  useEffect(verifyOtpHooks.countingTime, [
    verifyOtpHooks.incrementTimeSend,
    verifyOtpHooks.forceUpdate,
    verifyOtpHooks.countingTime,
  ]);

  const confirmCode = useCallback(async () => {
    try {
      verifyOtpHooks.setLoading(true)
      await confirm.confirm(verifyOtpHooks.otp);
      verifyOtpHooks.setLoading(false)
    } catch (error) {
      Alert.alert("Lỗi", "Mã OTP không đúng")
      verifyOtpHooks.setLoading(false)
      // verifyOtpHooks.setLoading(true)
      // const type = route.params.type
      // let uri: string = API_URI.CHEATE_REGISTER
      // if (type == 'forgetPassword') uri = API_URI.CHEATE_FORGET_PASSWORD
      // let body = {
      //   phoneNumber: route.params.phoneNumber,
      //   password: route.params.password,
      //   deviceId: DeviceInfo.getDeviceId(),
      // }
      // if (type == 'forgetPassword') body = {
      //   phoneNumber: route.params.phoneNumber,
      //   //@ts-ignore
      //   newPassword: route.params.password
      // }
      // const res = await window.connection.requestApi("POST", uri, body, null, null, '')
      // // console.log(res)
      // if (res) {
      //   if (type == 'signUp') {
      //     dispatch(updateToken(res.data.accessToken))
      //     NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.SplashScreen);
      //   }
      //   else {
      //     Alert.alert("Thông báo", "Đã đổi mật khẩu thành công!")
      //     NavigationUtils.navigate(navigation, ScreenName.Authentications.Login)
      //   }
      // }
      // verifyOtpHooks.setLoading(false)
    }
  }, [verifyOtpHooks.otp, confirm, navigation, route.params]);

  const signInWithPhoneNumber = useCallback(async () => {
    try {
      let tmp = route.params.phoneNumber.trim()
      if (tmp.charAt(0) == '0') tmp = tmp.replace('0', '+84')
      // Alert.alert("sdt", tmp)
      const confirm = await auth().signInWithPhoneNumber(tmp)
      setConfirm(confirm)
      verifyOtpHooks.onResendOtp()
    } catch (error) {
      Alert.alert("Lỗi", JSON.stringify(error))
    }
  }, [verifyOtpHooks.onResendOtp, setConfirm, route.params.phoneNumber])

  useEffect(() => {
    signInWithPhoneNumber()
  }, [])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const confirmOTPSuccess = async (user: any) => {
    verifyOtpHooks.setLoading(true)
    const type = route.params.type

    let uri: string = API_URI.REGISTER
    if (type == 'forgetPassword') uri = API_URI.FORGET_PASSWORD

    let body = {
      phoneNumber: route.params.phoneNumber,
      password: route.params.password,
      deviceId: DeviceInfo.getDeviceId(),
    }
    if (type == 'forgetPassword') body = {
      phoneNumber: route.params.phoneNumber,
      //@ts-ignore
      newPassword: route.params.password
    }

    const token = await user.getIdToken()
    const res = await window.connection.requestApi("POST", uri, body, null, null, token)
    if (res) {
      if (type == 'signUp') {
        dispatch(updateToken(res.data.accessToken))
        NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.SplashScreen);
      }
      else {
        Alert.alert("Thông báo", "Đã đổi mật khẩu thành công!")
        NavigationUtils.navigate(navigation, ScreenName.Authentications.Login)
      }
    }
    verifyOtpHooks.setLoading(false)
    // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
    // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
    // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
    // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
  }

  // Handle login
  async function onAuthStateChanged(user: any) {
    console.log('user', user);
    if (user) await confirmOTPSuccess(user)
  }

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(() => { }, []);

  const renderOtpInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="phone-pad"
        value={verifyOtpHooks.otp}
        label={translate('label.otp')}
        onChangeText={verifyOtpHooks.onChangeOtp}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={verifyOtpHooks.errorMessage?.otp}
      />
    );
  }, [verifyOtpHooks.otp, verifyOtpHooks.errorMessage?.otp]);

  const renderTimer = useCallback(() => {
    return (
      <TouchableOpacity
        disabled={verifyOtpHooks.timeResend !== 0}
        style={[
          Style.Space.MarginTop.large_16,
          Style.Content.CenterInVertical,
          Style.Self.Center,
          verifyOtpHooks.timeResend !== 0
            ? [
              {
                height: ScreenUtils.getSizeByHorizontal(32),
                width: ScreenUtils.getSizeByHorizontal(32),
                borderRadius: ScreenUtils.getSizeByHorizontal(16),
                borderColor: Color.black,
                borderWidth: 1,
              },
            ]
            : undefined,
        ]}
        onPress={signInWithPhoneNumber}>
        <Label.Widget
          style={[
            Style.Label.Regular.RedContentXL_16,
            Style.Label.Align.Center,
          ]}>
          {verifyOtpHooks.timeResend !== 0
            ? verifyOtpHooks.getTimeToString(verifyOtpHooks.timeResend)
            : translate('button.resendOtp')}
        </Label.Widget>
      </TouchableOpacity>
    );
  }, [
    verifyOtpHooks.timeResend,
    navigation,
    verifyOtpHooks.otp,
    verifyOtpHooks.onResendOtp,
  ]);

  const renderSubmitButton = useCallback(() => {
    return (
      <Button.Widget
        text={'button.submit'}
        type="primary"
        style={[
          Style.Self.Center,
          Style.Space.MarginTop.large_16,
          { backgroundColor: Color.vietlott },
        ]}
        onClicked={confirmCode}
        isLoading={verifyOtpHooks.isLoading}
      />
    );
  }, [onSubmit, verifyOtpHooks.isLoading, confirm, verifyOtpHooks.otp]);

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={height + 45} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        Style.Size.MatchParent,
        Style.Background.Red,
        Style.Space.PaddingHorizontal.large_16,
        Style.Content.CenterInVertical,
      ]}>
      <ShadowView>
        <View style={[Style.Size.FlexRow]}>
          <Icon.Button
            size={'small'}
            color={Color.gray}
            name="ic_back"
            style={[Style.Space.Padding.Zero]}
            onPressed={onGoBack}
          />
          <Label.Widget
            uppercase
            style={[
              Style.Size.MatchParent,
              Style.Label.Regular.WhiteContentXL_16,
              Style.Label.Align.Center,
              Style.Space.MarginRight.largeMargin_16,
              { color: Color.black },
            ]}>
            {translate('label.otp')}
          </Label.Widget>
        </View>
        {renderOtpInput()}
        {renderTimer()}
        {renderSubmitButton()}
      </ShadowView>
    </KeyboardAvoidingView>
  );
}
)