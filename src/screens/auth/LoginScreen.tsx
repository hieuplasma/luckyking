import { AuthenticationStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useBase } from '@shared';
import { NavigationUtils, doNotExits, isVietnamesePhoneNumber } from '@utils'
import { Color, Style } from '@styles';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Platform, KeyboardAvoidingView, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button } from '@widgets';
import DeviceInfo from 'react-native-device-info';
import { authApi } from '@api';
import { useDispatch } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements'
import { IText, ImageHeader, InputComponent } from '@components';
import { Image, Images } from '@assets';
import { FORM_ERROR } from '@common';
import { RequestType } from './VerifyOTPScreen';
import { ModalConfirmSendOTP } from './component/ModalConfirmSendOTP';

type NavigationProp = StackNavigationProp<AuthenticationStackParamList, 'Login'>;
type NavigationRoute = RouteProp<AuthenticationStackParamList, 'Login'>;

export interface LoginScreenRouteParams {
  disableGoBack?: boolean;
}

export interface LoginScreenProps { }

export const LoginWidget = React.memo((props: any) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const dispatch = useDispatch()
  const height = useHeaderHeight()

  const [password, setPassword] = useState<string | undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<| { phonenumber?: string; password?: string; } | undefined>(undefined);
  const { isLoading, setLoading } = useBase();

  const [visible, setIsVisible] = useState(false)

  const [priorityNumber, setPriorityNumber] = useState<string[]>([])
  const getPriorityNumber = useCallback(async () => {
    const res = await authApi.getPriorityNumber()
    if (res) {
      setPriorityNumber(res.data)
    }
  }, [])
  useEffect(() => {
    getPriorityNumber()
  }, [])

  const onLoginPress = useCallback(async () => {
    const deviceId = await DeviceInfo.getUniqueId()
    if (doNotExits(phoneNumber)) {
      setErrorMessage({ phonenumber: FORM_ERROR.EMPTY_PHONE })
      return 0;
    }

    // Dành cho các số điện thoại ưu tiên
    if (!phoneNumber) { }
    else {
      const tmpPhone: string = phoneNumber?.trim()
      const deviceId = await DeviceInfo.getUniqueId()
      if (priorityNumber.includes(tmpPhone)) {
        const body = {
          phoneNumber: phoneNumber,
          password: password,
          deviceId: deviceId,
        }
        setLoading(true);
        const res = await authApi.login(body)
        if (res) {
          NavigationUtils.navigate(navigation, ScreenName.Authentications.AgreeTerms,
            {
              authInfo: {
                token: res.data.accessToken,
                phoneNumber: phoneNumber,
                password: password
              }
            })
        }
        setLoading(false);
        return 0;
      }
    }

    if (!isVietnamesePhoneNumber(phoneNumber)) {
      setErrorMessage({ phonenumber: FORM_ERROR.INVALID_PHONE })
      return 0;
    }

    if (doNotExits(password)) {
      setErrorMessage({ password: FORM_ERROR.EMPTY_PASS })
      return 0;
    }

    setErrorMessage(undefined)
    setLoading(true);

    const body = {
      phoneNumber: phoneNumber,
      password: password,
      deviceId: deviceId,
    }
    const res = await authApi.unverifiedLogin(body)
    if (res?.data) {
      if (res.data.accessToken) {
        NavigationUtils.navigate(navigation, ScreenName.Authentications.AgreeTerms,
          {
            authInfo: {
              token: res.data.accessToken,
              phoneNumber: phoneNumber,
              password: password
            }
          })
      }
      else setIsVisible(true)
    }
    setLoading(false)
  }, [phoneNumber, password, priorityNumber])

  const onChangePhoneNumber = useCallback((phoneNumber?: string) => {
    setPhoneNumber(phoneNumber);
  }, []);

  const onChangePassword = useCallback((password?: string) => {
    setPassword(password);
  }, []);

  const onViewSignup = useCallback(() => {
    NavigationUtils.navigate(navigation, ScreenName.Authentications.SignUp);
  }, [navigation]);

  const onViewForgetPassword = useCallback(() => {
    NavigationUtils.navigate(navigation, ScreenName.Authentications.Forget);
  }, [navigation]);

  const onConfirm = useCallback(async () => {
    setIsVisible(false)
    const deviceId = await DeviceInfo.getUniqueId()
    NavigationUtils.navigate(navigation, ScreenName.Authentications.VerifyOTP, {
      body: {
        phoneNumber: phoneNumber,
        password: password,
        deviceId: deviceId
      },
      type: RequestType.login
    });
  }, [navigation, phoneNumber, password])

  const onCancel = useCallback(() => {
    setIsVisible(false)
  }, [])

  const renderNumberInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="phone-pad"
        value={phoneNumber}
        placeholder={'Nhập số điện thoại của quý khách'}
        label={"Số điện thoại"}
        onChangeText={onChangePhoneNumber}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={errorMessage?.phonenumber}
      />
    );
  }, [phoneNumber, errorMessage?.phonenumber]);

  const renderPasswordInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="default"
        value={password}
        placeholder={'Nhập mật khẩu'}
        label={"Mật khẩu"}
        onChangeText={onChangePassword}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={errorMessage?.password}
        secureTextEntry={true}
      />
    );
  }, [password, errorMessage?.password]);

  const renderSignupButton = useCallback(() => {
    return (
      <IText
        onPress={onViewSignup}
        style={styles.signupTxt}>
        {"Đăng ký"}
      </IText>
    );
  }, [onViewSignup]);

  const renderForgetPasswordButton = useCallback(() => {
    return (
      <IText
        onPress={onViewForgetPassword}
        style={styles.signupTxt}
      >
        {"Quên mật khẩu"}
      </IText>
    );
  }, [onViewForgetPassword]);

  const renderLoginButton = useCallback(() => {
    return (
      <Button.Widget
        text={'button.login'}
        type="primary"
        style={[
          Style.Self.Center,
          { backgroundColor: Color.vietlott, width: '100%', marginTop: 50 },
        ]}
        onClicked={onLoginPress}
        isLoading={isLoading}
      />
    );
  }, [onLoginPress, isLoading, phoneNumber, password]);

  return (
    <View style={styles.container}>
      <ImageHeader />
      <KeyboardAvoidingView
        keyboardVerticalOffset={height}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.body}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={Images.logo_lkk_login} style={styles.logo} />
          {renderNumberInput()}
          {renderPasswordInput()}
          {renderLoginButton()}
          <View
            style={[
              Style.Space.MarginTop.large_16,
              Style.Size.FlexRow,
              { justifyContent: 'space-between', paddingHorizontal: 4 },
            ]}>
            {renderForgetPasswordButton()}
            {renderSignupButton()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ModalConfirmSendOTP
        visible={visible}
        phoneNumber={phoneNumber}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </View>
  );
});

export const LoginScreen = LoginWidget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white
  },
  body: {
    padding: 16
  },
  logo: {
    width: '100%', height: 98
  },
  signupTxt: { fontStyle: 'italic', fontWeight: 'bold', color: Color.blue }
})