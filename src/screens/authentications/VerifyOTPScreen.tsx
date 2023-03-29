import { useVerifyOtp } from '@hooks';
import { AuthenticationStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Icon,
  InputComponent,
  Label,
  NavigationUtils,
  ScreenUtils,
  ShadowView,
  translate,
} from '@shared';
import { Color, Style } from '@styles';
import { Button } from '@widgets';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { authApi } from '@api';
import DeviceInfo from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import { updateToken } from '../../redux/reducer/auth';
import { API_HOST } from '@configs';
import { API_URI } from '../../api/url';

type NavigationProp = StackNavigationProp<AuthenticationStackParamList, 'VerifyOTP'>;
type NavigationRoute = RouteProp<AuthenticationStackParamList, 'VerifyOTP'>;

export interface VerifyOTPScreenRouteParams {
  type?: string;
  phoneNumber: string,
  password: string
}

export interface VerifyOTPScreenProps { }

export const VerifyOTPScreen = React.memo((props?: any) => {
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
      await confirm.confirm(verifyOtpHooks.otp);
    } catch (error) {
      console.log('Invalid code.', error);
    }
  }, [verifyOtpHooks.otp, confirm, navigation]);

  useEffect(() => {
    async function signInWithPhoneNumber(phoneNumber: string) {
      setConfirm(await auth().signInWithPhoneNumber(phoneNumber.replace('0', '+84')))
    }
    signInWithPhoneNumber(route.params.phoneNumber)
  }, [])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle login
  async function onAuthStateChanged(user: any) {
    console.log('user', user);
    if (user) {
      console.log(user)
      console.log("firebaseTOken::::", await user.getIdToken())
      verifyOtpHooks.setLoading(true)
      const uri: string = API_URI.REGISTER
      const body = {
        phoneNumber: route.params.phoneNumber,
        password: route.params.password,
        deviceId: DeviceInfo.getDeviceId(),
      }
      const res = await window.connection.requestApi("POST", uri, body, null, null, await user.getIdToken())
      if (res) {
        console.log(res.data)
        dispatch(updateToken(res.data.accessToken))
        NavigationUtils.navigate(navigation, ScreenName.Main);
        verifyOtpHooks.setLoading(false)
      }
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
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
        onPress={verifyOtpHooks.onResendOtp}>
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
            {translate('label.otp')}
          </Label.Widget>
        </View>
        {renderOtpInput()}
        {renderTimer()}
        {renderSubmitButton()}
      </ShadowView>
    </View>
  );
}
)