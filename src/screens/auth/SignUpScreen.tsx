import { AuthenticationStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, Style } from '@styles';
import { Button } from '@widgets';
import React, { useCallback, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { NavigationUtils, checkIdentify, doNotExits, isValidPassword, isVietnamesePhoneNumber } from '@utils';
import { Image, Images } from '@assets';
import { useHeaderHeight } from '@react-navigation/elements';
import { authApi } from '@api';
import { IText, ImageHeader, InputComponent } from '@components';
import { ScrollView } from 'react-native';
import { FORM_ERROR } from '@common';
import { RequestType } from './VerifyOTPScreen';
import { ModalConfirmSendOTP } from './component/ModalConfirmSendOTP';
import DeviceInfo from 'react-native-device-info';


type NavigationProp = StackNavigationProp<AuthenticationStackParamList, 'SignUp'>;
type NavigationRoute = RouteProp<AuthenticationStackParamList, 'SignUp'>;

export interface SignUpScreenRouteParams { }

export interface SignUpScreenProps { }

interface ErrorBody {
  phonenumber?: string;
  password?: string;
  repeatpassword?: string;
  fullName?: string;
  identify?: string;
  email?: string;
  address?: string
}

export const SignUpScreen = React.memo((props?: SignUpScreenProps) => {
  const height = useHeaderHeight();
  const navigation = useNavigation<NavigationProp>();

  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [repeatPassword, setRepeatPassword] = useState<string | undefined>(undefined);
  const [fullName, setFullName] = useState<string | undefined>(undefined);
  const [identify, setIdentify] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);

  const [errorMessage, setErrorMessage] = useState<| ErrorBody | undefined>(undefined);

  const [visible, setIsVisible] = useState(false)

  const onChangePhoneNumber = useCallback((phoneNumber?: string) => {
    setPhoneNumber(phoneNumber);
  }, []);
  const onChangePassword = useCallback((password?: string) => {
    setPassword(password);
  }, []);
  const onChangeRepeatPassword = useCallback((password?: string) => {
    setRepeatPassword(password);
  }, []);
  const onChangeFullName = useCallback((fullName?: string) => {
    setFullName(fullName)
  }, [])
  const onChangeIdentify = useCallback((identify?: string) => {
    setIdentify(identify)
  }, [])
  const onChangeEmail = useCallback((email?: string) => {
    setEmail(email?.toLowerCase())
  }, [])
  const onChangeAddress = useCallback((address?: string) => {
    setAddress(address)
  }, [])

  const onSignupClick = async () => {
    let check = true
    const error: ErrorBody = {}
    if (doNotExits(phoneNumber)) {
      error.phonenumber = FORM_ERROR.EMPTY_PHONE
      check = false
    }
    if (!isVietnamesePhoneNumber(phoneNumber)) {
      error.phonenumber = FORM_ERROR.INVALID_PHONE
      check = false
    }
    if (doNotExits(password)) {
      error.password = FORM_ERROR.EMPTY_PASS
      check = false
    }
    if (password != repeatPassword) {
      error.repeatpassword = FORM_ERROR.NOT_MATCH_REPEATE_PASS
      check = false
    }
    if (!isValidPassword(password)) {
      error.password = FORM_ERROR.INVALID_PASS
      check = false
    }
    if (doNotExits(fullName)) {
      error.fullName = FORM_ERROR.EMPTY_NAME
      check = false
    }
    if (doNotExits(identify)) {
      error.identify = FORM_ERROR.EMPTY_IDENTIFY
      check = false
    }
    if (!checkIdentify) {
      error.identify = FORM_ERROR.INVALID_IDENTIFY
      check = false
    }

    if (!check) {
      setErrorMessage(error)
      return 0
    }

    window.loadingIndicator.show()
    const res = await authApi.checkPhoneNumber({ phoneNumber: phoneNumber })
    window.loadingIndicator.hide()
    if (res) {
      if (res.data.registered) {
        return Alert.alert('Lỗi', 'Số điện thoại này đã được đăng ký!');
      }
      else setIsVisible(true)
    }
  };

  const onConfirm = useCallback(async () => {
    setIsVisible(false)
    const deviceId = await DeviceInfo.getUniqueId()
    NavigationUtils.navigate(navigation, ScreenName.Authentications.VerifyOTP, {
      body: {
        phoneNumber: phoneNumber,
        password: password,
        fullName: fullName,
        identify: identify,
        email: email,
        address: address,
        deviceId: deviceId
      },
      type: RequestType.singup
    });
  }, [navigation, phoneNumber, password, fullName, identify, address, email])

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
        onChangeText={onChangePhoneNumber}
        containerStyle={[Style.Space.MarginTop.large_16]}
        errorMessage={errorMessage?.phonenumber}
        force={true}
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
        onChangeText={onChangePassword}
        containerStyle={[Style.Space.MarginTop.large_16]}
        errorMessage={errorMessage?.password}
        secureTextEntry={true}
        textContentType="oneTimeCode"
        force={true}
      />
    );
  }, [password, errorMessage?.password]);

  const renderRepeatPasswordInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="default"
        value={repeatPassword}
        placeholder={'Nhập lại mật khẩu'}
        onChangeText={onChangeRepeatPassword}
        containerStyle={[Style.Space.MarginTop.large_16]}
        errorMessage={errorMessage?.repeatpassword}
        secureTextEntry={true}
        textContentType="oneTimeCode"
        force={true}
      />
    );
  }, [repeatPassword, errorMessage?.password]);

  const renderFullNameInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="default"
        value={fullName}
        placeholder={'Nhập họ tên'}
        onChangeText={onChangeFullName}
        containerStyle={[Style.Space.MarginTop.large_16]}
        errorMessage={errorMessage?.fullName}
        force={true}
      />
    );
  }, [fullName, errorMessage?.fullName]);

  const renderIdentifyInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType='phone-pad'
        value={identify}
        placeholder={'Nhập số CCCD'}
        onChangeText={onChangeIdentify}
        containerStyle={[Style.Space.MarginTop.large_16]}
        errorMessage={errorMessage?.identify}
        force={true}
      />
    );
  }, [identify, errorMessage?.identify]);

  const renderEmailInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType='default'
        value={email}
        placeholder={'Nhập Email (nếu có)'}
        onChangeText={onChangeEmail}
        containerStyle={[Style.Space.MarginTop.large_16]}
        errorMessage={errorMessage?.email}
      />
    );
  }, [email, errorMessage?.email]);

  const renderAddressInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType='default'
        value={address}
        placeholder={'Nhập địa chỉ (nếu có)'}
        onChangeText={onChangeAddress}
        containerStyle={[Style.Space.MarginTop.large_16]}
        errorMessage={errorMessage?.address}
      />
    );
  }, [address, errorMessage?.address]);

  const renderSignupButton = useCallback(() => {
    return (
      <Button.Widget
        text={'button.signUp'}
        type="primary"
        style={[
          Style.Self.Center,
          Style.Space.MarginTop.large_16,
          { backgroundColor: Color.luckyKing, width: '100%' },
        ]}
        onClicked={onSignupClick}
      />
    );
  }, [onSignupClick]);

  return (
    <View style={styles.container}>
      <ImageHeader title='Đăng ký tài khoản' navigation={navigation} />
      <KeyboardAvoidingView
        keyboardVerticalOffset={height}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.body}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={Images.logo_lkk_login} style={styles.logo} />
          {renderNumberInput()}
          {renderPasswordInput()}
          {renderRepeatPasswordInput()}
          {renderFullNameInput()}
          {renderIdentifyInput()}
          {renderEmailInput()}
          {renderAddressInput()}
          <IText style={{ fontStyle: 'italic', marginTop: 8, marginHorizontal: 4 }}>
            {"Lưu ý: Quý khách cần nhập đầy đủ và chính xác thông tin để việc trả thưởng được chính xác và an toàn."}
          </IText>
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        style={[
          Style.Space.MarginTop.large_16,
          Style.Size.FlexRow,
          { justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 32 },
        ]}>
        {renderSignupButton()}
      </View>

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
  logo: {
    width: '100%', height: 98
  },
  signupTxt: { fontStyle: 'italic', fontWeight: 'bold', color: Color.blue }
})