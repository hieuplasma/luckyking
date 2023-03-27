import {useLogin} from '@hooks';
import {AuthenticationStackParamList, ScreenName} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  InputComponent,
  Label,
  NavigationUtils,
  RootNavigationUtils,
  ShadowView,
  translate,
} from '@shared';
import {Color, Style} from '@styles';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Button as ButtonRN, Alert} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '@widgets';
import auth from '@react-native-firebase/auth';
import {TextInput} from 'react-native';

type NavigationProp = StackNavigationProp<
  AuthenticationStackParamList,
  'Login'
>;
type NavigationRoute = RouteProp<AuthenticationStackParamList, 'Login'>;

export interface LoginScreenRouteParams {
  disableGoBack?: boolean;
}

export interface LoginScreenProps {}

export const LoginWidget = React.memo((props?: LoginScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();
  const loginHooks = useLogin();

  const onLoginClick = useCallback(() => {
    loginHooks.onLoginPress().then(() => {
      NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Main);
    }).catch((err)=>{
      console.log('err',err);
      Alert.alert("Error")
    })
  }, [loginHooks.onLoginPress, navigation]);

  const onViewSignup = useCallback(() => {
    NavigationUtils.navigate(navigation, ScreenName.Authentications.SignUp);
  }, [navigation]);

  const renderNumberInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="phone-pad"
        value={loginHooks.phoneNumber}
        placeholder={translate('input.phoneNumber')}
        label={translate('input.phoneNumber')}
        onChangeText={loginHooks.onChangePhoneNumber}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={loginHooks.errorMessage?.phonenumber}
      />
    );
  }, [loginHooks.phoneNumber, loginHooks.errorMessage?.phonenumber]);

  const renderPasswordInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="default"
        value={loginHooks.password}
        placeholder={translate('input.password')}
        label={translate('input.password')}
        onChangeText={loginHooks.onChangePassword}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={loginHooks.errorMessage?.password}
        secureTextEntry={true}
      />
    );
  }, [loginHooks.password, loginHooks.errorMessage?.password]);

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
      <Label.Widget style={[Style.Label.Regular.PrimaryContentL_14]}>
        {translate('button.forgetPassword')}
      </Label.Widget>
    );
  }, []);

  const renderLoginButton = useCallback(() => {
    return (
      <Button.Widget
        text={'button.login'}
        type="primary"
        style={[
          Style.Background.Primary,
          Style.Self.Center,
          Style.Space.MarginTop.large_16,
        ]}
        onClicked={onLoginClick}
        isLoading={loginHooks.isLoading}
      />
    );
  }, [loginHooks.onLoginPress, loginHooks.isLoading]);

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
            {color: Color.black},
          ]}>
          {translate('label.login')}
        </Label.Widget>
        {renderNumberInput()}
        {renderPasswordInput()}
        <View
          style={[
            Style.Space.MarginTop.large_16,
            Style.Size.FlexRow,
            {justifyContent: 'space-between'},
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

function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user) {
    console.log('user', user);

    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('confirmation', confirmation);

    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <ButtonRN
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+84357799922')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <ButtonRN title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}
