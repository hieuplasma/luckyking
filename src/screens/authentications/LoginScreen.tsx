import { useLogin } from '@hooks';
import { AuthenticationStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  InputComponent,
  Label,
  NavigationUtils,
  RootNavigationUtils,
  ShadowView,
  translate,
  useBase,
} from '@shared';
import { Color, Style } from '@styles';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Button as ButtonRN, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@widgets';
import DeviceInfo from 'react-native-device-info';
import { authApi } from '@api';
import { useDispatch } from 'react-redux';
import { updateToken } from '../../redux/reducer/auth';

type NavigationProp = StackNavigationProp<AuthenticationStackParamList, 'Login'>;
type NavigationRoute = RouteProp<AuthenticationStackParamList, 'Login'>;

export interface LoginScreenRouteParams {
  disableGoBack?: boolean;
}

export interface LoginScreenProps { }

export const LoginWidget = React.memo((props: any) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();
  const dispatch = useDispatch()


  const [password, setPassword] = useState<string | undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<| { phonenumber?: string; password?: string; } | undefined>(undefined);
  const { isLoading, setLoading } = useBase();

  const deviceId = DeviceInfo.getDeviceId();

  const onLoginPress = useCallback(async () => {
    setLoading(true);
    const body = {
      phoneNumber: phoneNumber,
      password: password,
      deviceId: deviceId,
    }
    console.log(body)
    const res = await authApi.login(body)
    if (res) {
      console.log(res.data)
      dispatch(updateToken(res.data.accessToken))
      NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Main);
    }
    setLoading(false)
  }, [phoneNumber, password, deviceId]);

  const onChangePhoneNumber = useCallback((phoneNumber?: string) => {
    setPhoneNumber(phoneNumber);
  }, []);

  const onChangePassword = useCallback((password?: string) => {
    setPassword(password);
  }, []);

  const onLoginClick = useCallback(() => {
    onLoginPress()
  }, [navigation, password, phoneNumber]);

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
        placeholder={translate('input.phoneNumber')}
        label={translate('input.phoneNumber')}
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
        placeholder={translate('input.password')}
        label={translate('input.password')}
        onChangeText={onChangePassword}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={errorMessage?.password}
        secureTextEntry={true}
      />
    );
  }, [password, errorMessage?.password]);

  const renderSignupButton = useCallback(() => {
    return (
      <Label.Widget
        onPress={onViewSignup}
        style={[Style.Label.Regular.PrimaryContentL_14]}>
        {translate('button.signUp')}
      </Label.Widget>
    );
  }, [onViewSignup]);

  const renderForgetPasswordButton = useCallback(() => {
    return (
      <Label.Widget
        style={[Style.Label.Regular.PrimaryContentL_14]}
        // onPress={onViewForgetPassword}
        onPress={() => { }}
      >
        {translate('button.forgetPassword')}
      </Label.Widget>
    );
  }, [onViewForgetPassword]);

  const renderLoginButton = useCallback(() => {
    return (
      <Button.Widget
        text={'button.login'}
        type="primary"
        style={[
          Style.Self.Center,
          Style.Space.MarginTop.large_16,
          { backgroundColor: Color.vietlott },
        ]}
        onClicked={onLoginClick}
        isLoading={isLoading}
      />
    );
  }, [onLoginPress, isLoading, phoneNumber, password]);

  return (
    <View
      style={[
        Style.Size.MatchParent,
        Style.Background.Red,
        Style.Space.PaddingHorizontal.large_16,
        Style.Content.CenterInVertical,
      ]}>
      <ShadowView>
        <Label.Widget
          uppercase
          style={[
            Style.Label.Regular.WhiteContentXL_16,
            Style.Label.Align.Center,
            { color: Color.black },
          ]}>
          {translate('label.login')}
        </Label.Widget>
        {renderNumberInput()}
        {renderPasswordInput()}
        <View
          style={[
            Style.Space.MarginTop.large_16,
            Style.Size.FlexRow,
            { justifyContent: 'space-between' },
          ]}>
          {renderSignupButton()}
          {renderForgetPasswordButton()}
        </View>
        {renderLoginButton()}
      </ShadowView>
    </View>
  );
});

export const LoginScreen = LoginWidget;
