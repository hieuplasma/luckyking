import { useVerifyOtp } from '@hooks';
import { AuthenticationStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Label,
  translate,
  ShadowView
} from '@shared';
import { Color, Style } from '@styles';
import { Button } from '@widgets';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import { NavigationUtils, ScreenUtils, doNotExits } from '@utils';
import { Icon } from '@assets';
import { useHeaderHeight } from '@react-navigation/elements'
import { IText, InputComponent } from '@components';
import { authApi } from '@api';
import { HOT_LINE } from '@common';
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<AuthenticationStackParamList, 'VerifyOTP'>;
type NavigationRoute = RouteProp<AuthenticationStackParamList, 'VerifyOTP'>;

export enum RequestType {
  singup = 'singup',
  changepass = 'changepass',
  login = 'login'
}

export interface VerifyOTPScreenRouteParams {
  body?: any,
  uri?: string,
  type: RequestType
}

export interface VerifyOTPScreenProps { }

//@ts-ignore
const hotline = HOT_LINE.replaceAll('.', '')

export const VerifyOTPScreen = React.memo((props?: any) => {
  const height = useHeaderHeight()
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const verifyOtpHooks = useVerifyOtp();
  const otpSender = useSelector((state: any) => state.systemReducer.otpSender)

  const [keySession, setKeySession] = useState<any>(false)

  useEffect(verifyOtpHooks.countingTime, [
    verifyOtpHooks.incrementTimeSend,
    verifyOtpHooks.forceUpdate,
    verifyOtpHooks.countingTime,
  ]);

  const signInWithPhoneNumber = useCallback(async () => {
    const res = await authApi.createOTP({ phoneNumber: route.params.body.phoneNumber, otpSender: otpSender })
    if (res) {
      setKeySession(res.data.id)
    }
    verifyOtpHooks.onResendOtp()
  }, [verifyOtpHooks.onResendOtp, route.params.body.phoneNumber, otpSender])

  useEffect(() => {
    signInWithPhoneNumber()
  }, [])

  const confirmCode = useCallback(async () => {
    if (doNotExits(verifyOtpHooks.otp)) {
      return Alert.alert("Lỗi", "Bạn chưa nhập mã OTP!")
    }
    const res = await authApi.confirmOTP({
      key: keySession,
      otp: verifyOtpHooks.otp
    })

    if (res) {
      confirmOTPSuccess(res.data.token)
    }
  }, [verifyOtpHooks.otp, navigation, route.params]);

  const confirmOTPSuccess = async (token: string) => {

    verifyOtpHooks.setLoading(true)

    if (route.params.type == RequestType.singup) {
      const res = await authApi.verifiedRegister(route.params.body, token)
      if (res) {
        NavigationUtils.navigate(navigation, ScreenName.Authentications.AgreeTerms,
          {
            authInfo: {
              token: res.data.accessToken,
              phoneNumber: route.params.body.phoneNumber,
              password: route.params.body.password
            }
          })
      }
    }

    if (route.params.type == RequestType.changepass) {
      // const res = await authApi.verifiedForgotPass(route.params.body, token)
      // if (res) {
      //   Alert.alert("Thông báo", "Đã đổi mật khẩu thành công!")
      //   NavigationUtils.navigate(navigation, ScreenName.Authentications.Login)
      // }
      NavigationUtils.navigate(navigation, ScreenName.Authentications.Forget, { token: token })
    }

    if (route.params.type == RequestType.login) {
      const res = await authApi.verifiedLogin(route.params.body, token)
      if (res) {
        NavigationUtils.navigate(navigation, ScreenName.Authentications.AgreeTerms,
          {
            authInfo: {
              token: res.data.accessToken,
              phoneNumber: route.params.body.phoneNumber,
              password: route.params.body.password
            }
          })
      }
    }

    verifyOtpHooks.setLoading(false)
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
  }, [onSubmit, verifyOtpHooks.isLoading, verifyOtpHooks.otp, keySession]);

  const call = useCallback(() => {
    let url = hotline

    if (Platform.OS !== 'android') {
      url = `telprompt:${hotline}`;
    }
    else {
      url = `tel:${hotline}`;
    }

    if (Platform.OS == 'android') {
      Linking.openURL(url);
    }
    else {
      Linking.canOpenURL(url)
        .then(supported => {
          if (!supported) {
            Alert.alert('Số điện thoại không tồn tại!');
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.log(err));
    }
  }, [])

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
              { color: Color.black, lineHeight: 20 },
            ]}>
            {translate('label.otp')}
          </Label.Widget>
        </View>
        {renderOtpInput()}
        {renderTimer()}
        {
          verifyOtpHooks.timeResend !== 0 ?
            renderSubmitButton() : <></>
        }
        <IText style={{ marginTop: 8, textAlign: 'center' }}>
          {"Vui lòng gọi Hotline "}
          <IText style={{ color: Color.blue, textDecorationLine: 'underline' }}
            onPress={call}>
            {HOT_LINE}
          </IText>
          <IText>{" để được hỗ trợ"}</IText>
        </IText>
      </ShadowView>
    </KeyboardAvoidingView>
  );
}
)