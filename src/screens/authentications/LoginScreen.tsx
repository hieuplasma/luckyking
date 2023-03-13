import {AuthenticationStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Label} from '@shared';
import {Style} from '@styles';
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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

  return (
    <View style={{flex: 1}}>
      <Label.Widget
        style={[Style.Label.Bold.RedContentXL_16, Style.Label.Align.Center]}>
        {'hung'}
      </Label.Widget>
    </View>
  );
});

export const LoginScreen = LoginWidget;
