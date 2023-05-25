import { useSignup } from '@hooks';
import { AuthenticationStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  InputComponent,
  Label,
  ShadowView,
  translate,
  useBase,
} from '@shared';
import { Color, Style } from '@styles';
import { Button } from '@widgets';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';
import { NavigationUtils } from '@utils';
import { Icon } from '@assets';

type NavigationProp = StackNavigationProp<AuthenticationStackParamList, 'SignUp'>;
type NavigationRoute = RouteProp<AuthenticationStackParamList, 'SignUp'>;

export interface SignUpScreenRouteParams { }

export interface SignUpScreenProps { }

export const SignUpScreen = React.memo((props?: SignUpScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const safeAreaInsets = useSafeAreaInsets();
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [repeatPassword, setRepeatPassword] = useState<string | undefined>(
    undefined,
  );
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<
    | {
      phonenumber?: string;
      password?: string;
      repeatpassword?: string;
    } | undefined>(undefined);
  const { isLoading, setLoading } = useBase();

  const onChangePhoneNumber = useCallback((phoneNumber?: string) => {
    setPhoneNumber(phoneNumber);
  }, []);

  const onChangePassword = useCallback((password?: string) => {
    setPassword(password);
  }, []);
  const onChangeRepeatPassword = useCallback((password?: string) => {
    setRepeatPassword(password);
  }, []);

  const onSignupClick = async () => {
    if (phoneNumber == "" || phoneNumber == undefined)
      return (Alert.alert("Lỗi", "Bạn chưa nhập số điện thoại"))
    if (password == "")
      return (Alert.alert("Lỗi", "Bạn chưa nhập mật khẩu"))
    if (password != repeatPassword)
      return (Alert.alert("Lỗi", "Mật khẩu và mật khẩu xác nhận phải giống nhau"))
    NavigationUtils.navigate(navigation, ScreenName.Authentications.VerifyOTP, {
      phoneNumber: phoneNumber, password: password, type: 'signUp'
    });
  }

  const onGoBack = useCallback(() => {
    navigation.goBack();
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
        errorMessage={errorMessage?.password}
        secureTextEntry={true}
        textContentType="oneTimeCode"
      />
    );
  }, [repeatPassword, errorMessage?.password]);

  const renderSignupButton = useCallback(() => {
    return (
      <Button.Widget
        text={'button.signUp'}
        type="primary"
        style={[
          Style.Self.Center,
          Style.Space.MarginTop.large_16,
          { backgroundColor: Color.vietlott },
        ]}
        onClicked={onSignupClick}
        isLoading={isLoading}
      />
    );
  }, [onSignupClick, isLoading]);

  return (
    <View
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
            {translate('label.signup')}
          </Label.Widget>
        </View>
        {renderNumberInput()}
        {renderPasswordInput()}
        {renderRepeatPasswordInput()}
        {renderSignupButton()}
      </ShadowView>
    </View>
  );
});
