import { AuthenticationStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  useBase,
} from '@shared';
import { NavigationUtils, doNotExits, isVietnamesePhoneNumber } from '@utils'
import { Color, Style } from '@styles';
import React, { useCallback, useState } from 'react';
import { View, Platform, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { Button } from '@widgets';
import DeviceInfo from 'react-native-device-info';
import { authApi } from '@api';
import { useDispatch } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements'
import { IText, ImageHeader, InputComponent } from '@components';
import { Image, Images } from '@assets';
import { FORM_ERROR } from '@common';


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

  const onLoginPress = useCallback(async () => {
    if (doNotExits(phoneNumber)) {
      setErrorMessage({ phonenumber: FORM_ERROR.EMPTY_PHONE })
      return 0;
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
      deviceId: await DeviceInfo.getUniqueId(),
    }
    const res = await authApi.login(body)
    if (res?.data?.accessToken) {
      // dispatch(updateToken(res.data.accessToken))
      // NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.SplashScreen);
      NavigationUtils.navigate(navigation, ScreenName.Authentications.AgreeTerms,
        {
          authInfo: {
            token: res.data.accessToken,
            phoneNumber: phoneNumber,
            password: password
          }
        })
    }
    setLoading(false)
  }, [phoneNumber, password])

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