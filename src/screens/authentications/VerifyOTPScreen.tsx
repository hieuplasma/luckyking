import {useVerifyOtp} from '@hooks';
import {AuthenticationStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, InputComponent, Label, ShadowView, translate} from '@shared';
import {Color, Style} from '@styles';
import React, {useCallback, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';

type NavigationProp = StackNavigationProp<
  AuthenticationStackParamList,
  'VerifyOTP'
>;

type NavigationRoute = RouteProp<AuthenticationStackParamList, 'VerifyOTP'>;

export interface VerifyOTPScreenRouteParams {}

export interface VerifyOTPScreenProps {}

export const VerifyOTPScreen = React.memo((props?: VerifyOTPScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const verifyOtpHooks = useVerifyOtp();

  useEffect(verifyOtpHooks.countingTime, [
    verifyOtpHooks.incrementTimeSend,
    verifyOtpHooks.forceUpdate,
  ]);

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
        style={[Style.Space.MarginTop.large_16]}
        // onPress={onResendOtp}
      >
        <Label.Widget
          style={[
            Style.Label.Regular.PrimaryHeading_18,
            Style.Label.Align.Center,
            // Style.Size.MatchParent,
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
              {color: Color.black},
            ]}>
            {translate('label.otp')}
          </Label.Widget>
        </View>
        {renderOtpInput()}
        {renderTimer()}
      </ShadowView>
    </View>
  );
});
