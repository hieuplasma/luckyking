import {useSignup} from '@hooks';
import {AuthenticationStackParamList, ScreenName} from '@navigation';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Icon,
  InputComponent,
  Label,
  NavigationUtils,
  ShadowView,
  translate,
} from '@shared';
import {Color, Style} from '@styles';
import {Button} from '@widgets';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<
  AuthenticationStackParamList,
  'SignUp'
>;

type NavigationRoute = RouteProp<AuthenticationStackParamList, 'SignUp'>;

export interface SignUpScreenRouteParams {}

export interface SignUpScreenProps {}

export const SignUpScreen = React.memo((props?: SignUpScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const safeAreaInsets = useSafeAreaInsets();
  const signupHooks = useSignup();

  const onSignupClick = useCallback(() => {
    // signupHooks
    //   .onSignupPress()
    //   .then(() => {
    //     NavigationUtils.navigate(navigation, ScreenName.Main);
    //   })
    //   .catch();
    NavigationUtils.navigate(navigation, ScreenName.Authentications.VerifyOTP);
  }, [signupHooks.onSignupPress, navigation]);

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderNumberInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="phone-pad"
        value={signupHooks.phoneNumber}
        placeholder={translate('input.phoneNumber')}
        label={translate('input.phoneNumber')}
        onChangeText={signupHooks.onChangePhoneNumber}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={signupHooks.errorMessage?.phonenumber}
      />
    );
  }, [signupHooks.phoneNumber, signupHooks.errorMessage?.phonenumber]);

  const renderPasswordInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="default"
        value={signupHooks.password}
        placeholder={translate('input.password')}
        label={translate('input.password')}
        onChangeText={signupHooks.onChangePassword}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={signupHooks.errorMessage?.password}
        secureTextEntry={true}
      />
    );
  }, [signupHooks.password, signupHooks.errorMessage?.password]);

  const renderRepeatPasswordInput = useCallback(() => {
    return (
      <InputComponent
        editable={true}
        keyboardType="default"
        value={signupHooks.repeatPassword}
        placeholder={translate('input.repeatPassword')}
        label={translate('input.repeatPassword')}
        onChangeText={signupHooks.onChangeRepeatPassword}
        containerStyle={[Style.Space.MarginTop.xLarge_24]}
        errorMessage={signupHooks.errorMessage?.password}
        secureTextEntry={true}
      />
    );
  }, [signupHooks.repeatPassword, signupHooks.errorMessage?.password]);

  const renderSignupButton = useCallback(() => {
    return (
      <Button.Widget
        text={'button.signUp'}
        type="primary"
        style={[
          Style.Self.Center,
          Style.Space.MarginTop.large_16,
          {backgroundColor: Color.vietlott},
        ]}
        onClicked={onSignupClick}
        isLoading={signupHooks.isLoading}
      />
    );
  }, [onSignupClick, signupHooks.isLoading]);

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
