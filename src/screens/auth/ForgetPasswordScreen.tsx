import { useForgetPassword } from '@hooks';
import { AuthenticationStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  InputComponent,
  Label,
  ShadowView,
  translate,
} from '@shared';
import { NavigationUtils } from '@utils';
import { Color, Style } from '@styles';
import { Button } from '@widgets';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Icon } from '@assets';

type NavigationProp = StackNavigationProp<
  AuthenticationStackParamList,
  'Forget'
>;
type NavigationRoute = RouteProp<AuthenticationStackParamList, 'Forget'>;

export interface ForgetScreenRouteParams { }

export interface ForgetScreenProps { }

export const ForgetPassword = React.memo(() => {
  const navigation = useNavigation<NavigationProp>();
  const forgetPasswordHooks = useForgetPassword();

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onSubmit = useCallback(() => {
    NavigationUtils.navigate(navigation, ScreenName.Authentications.VerifyOTP, {
      type: 'forgetPassword',
    });
  }, [navigation]);

  const renderPhoneNumberInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="default"
        value={forgetPasswordHooks.phoneNumber}
        placeholder={translate('input.phoneNumber')}
        label={translate('input.phoneNumber')}
        onChangeText={forgetPasswordHooks.onChangePhoneNumber}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={forgetPasswordHooks.errorMessage?.phonenumber}
        secureTextEntry={true}
      />
    );
  }, [
    forgetPasswordHooks.phoneNumber,
    forgetPasswordHooks.errorMessage?.phonenumber,
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
        onClicked={onSubmit}
        isLoading={forgetPasswordHooks.isLoading}
      />
    );
  }, [onSubmit, forgetPasswordHooks.isLoading]);

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
            {translate('label.forget')}
          </Label.Widget>
        </View>
        {renderPhoneNumberInput()}
        {renderSubmitButton()}
      </ShadowView>
    </View>
  );
});
