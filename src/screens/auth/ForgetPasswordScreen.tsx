import { AuthenticationStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  translate,
} from '@shared';
import { NavigationUtils, doNotExits, isValidPassword, isVietnamesePhoneNumber } from '@utils';
import { Color, Style } from '@styles';
import { Button } from '@widgets';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, View, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import { Icon, Image, Images } from '@assets';
import { useHeaderHeight } from '@react-navigation/elements'
import { IText, ImageHeader, InputComponent } from '@components';
import { FORM_ERROR, RES_MES } from '@common';
import { API_URI } from 'src/api/config';
import { RequestType } from './VerifyOTPScreen';
import { ModalConfirmSendOTP } from './component/ModalConfirmSendOTP';
import { authApi } from '@api';


type NavigationProp = StackNavigationProp<AuthenticationStackParamList, 'Forget'>;
type NavigationRoute = RouteProp<AuthenticationStackParamList, 'Forget'>;

export interface ForgetScreenRouteParams {
  token?: string
}
export interface ForgetScreenProps { }

interface ErrorBody {
  phonenumber?: string;
  password?: string;
  repeatpassword?: string;
}

export const ForgetPassword = React.memo(() => {
  const height = useHeaderHeight()
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>()

  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [repeatPassword, setRepeatPassword] = useState<string | undefined>(undefined);

  const [errorMessage, setErrorMessage] = useState<| ErrorBody | undefined>(undefined);

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

  const onSubmit = useCallback(async () => {
    if (doNotExits(phoneNumber)) {
      setErrorMessage({ phonenumber: FORM_ERROR.EMPTY_PHONE })
      return 0;
    }
    if (!isVietnamesePhoneNumber(phoneNumber)) {
      // Dành cho các số điện thoại ưu tiên
      if (phoneNumber && !priorityNumber.includes(phoneNumber)) {
        setErrorMessage({ phonenumber: FORM_ERROR.INVALID_PHONE })
        return 0;
      }
    }

    if (route.params?.token) {
      if (doNotExits(password)) {
        setErrorMessage({ password: FORM_ERROR.EMPTY_PASS })
        return 0;
      }
      if (password != repeatPassword) {
        setErrorMessage({ repeatpassword: FORM_ERROR.NOT_MATCH_REPEATE_PASS })
        return 0;
      }
      if (!isValidPassword(password)) {
        setErrorMessage({ password: FORM_ERROR.INVALID_PASS })
        return 0;
      }
    }

    setErrorMessage(undefined)

    if (route.params?.token) {
      const body = {
        phoneNumber: phoneNumber,
        newPassword: password
      }
      const res = await authApi.verifiedForgotPass(body, route.params?.token)
      if (res) {
        Alert.alert("Thông báo", "Đã đổi mật khẩu thành công!")
        NavigationUtils.navigate(navigation, ScreenName.Authentications.Login)
      }
    }

    else {
      window.loadingIndicator.show()
      const res = await authApi.checkPhoneNumber({ phoneNumber: phoneNumber })
      window.loadingIndicator.hide()
      if (res) {
        if (!res.data.registered) {
          return Alert.alert('Thông báo', RES_MES.NOT_EXIST_PHONE);
        }
        else setIsVisible(true)
      }
    }

  }, [navigation, phoneNumber, password, repeatPassword]);

  const onConfirm = useCallback(() => {
    setIsVisible(false)
    NavigationUtils.navigate(navigation, ScreenName.Authentications.VerifyOTP, {
      body: {
        phoneNumber: phoneNumber,
        newPassword: password
      },
      type: RequestType.changepass
    });
  }, [navigation, phoneNumber, password, route.params?.token])

  const onCancel = useCallback(() => {
    setIsVisible(false)
  }, [])

  const onChangePhoneNumber = useCallback((phoneNumber?: string) => {
    setPhoneNumber(phoneNumber);
  }, []);
  const onChangePassword = useCallback((password?: string) => {
    setPassword(password);
  }, []);
  const onChangeRepeatPassword = useCallback((password?: string) => {
    setRepeatPassword(password);
  }, []);

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
        placeholder={"Nhập mật khẩu mới"}
        label={"Mật khẩu mới"}
        onChangeText={onChangePassword}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={errorMessage?.password}
        secureTextEntry={true}
        textContentType="oneTimeCode"
      />
    );
  }, [password, errorMessage?.password]);

  const renderRepeatPasswordInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="default"
        value={repeatPassword}
        placeholder={translate('input.repeatPassword')}
        label={translate('input.repeatPassword')}
        onChangeText={onChangeRepeatPassword}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={errorMessage?.repeatpassword}
        secureTextEntry={true}
        textContentType="oneTimeCode"
      />
    );
  }, [repeatPassword, errorMessage?.repeatpassword]);

  const renderConfirmButton = useCallback(() => {
    return (
      <Button.Widget
        disableTranslate={true}
        text={route.params?.token ? 'Cập nhật mật khẩu' : 'Xác thực bằng mã OTP'}
        type="primary"
        style={[
          Style.Self.Center,
          { backgroundColor: Color.vietlott, width: '100%', marginTop: 50 },
        ]}
        onClicked={onSubmit}
      />
    );
  }, [onSubmit, route.params?.token]);

  return (
    <View style={styles.container}>
      <ImageHeader navigation={navigation} title='Thiết lập lại mật khẩu' />
      <KeyboardAvoidingView
        keyboardVerticalOffset={height}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.body}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: '100%', marginTop: 37, alignItems: 'center' }}>
            <Image source={Images.big_lock} style={{ width: 65, height: 65 }}></Image>
          </View>
          {
            route.params?.token ?
              <IText style={{ fontWeight: 'bold', marginTop: 32, fontSize: 18 }}>
                {"Số điện thoại: " + phoneNumber}
              </IText>
              : renderNumberInput()
          }
          {
            route.params?.token ?
              <>
                {renderPasswordInput()}
                {renderRepeatPasswordInput()}
                <IText style={{ fontSize: 14, color: Color.luckyKing, marginTop: 16, marginLeft: 8 }}>
                  {"Chú ý: Độ dài mật khẩu phải từ 6 - 16 kí tự"}
                </IText>
              </>
              : <></>
          }
          {renderConfirmButton()}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white
  },
  body: {
    flex: 1, padding: 16
  },
  signupTxt: { fontStyle: 'italic', fontWeight: 'bold', color: Color.blue }
})