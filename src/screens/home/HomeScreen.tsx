import {AuthenticationStackParamList, HomeStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Label} from '@shared';
import {Style} from '@styles';
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'Home'>;

export interface HomeScreenParamsList {}

export interface HomeScreenProps {}

export const HomeScreen = React.memo((props?: HomeScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={{flex: 1}}>
      <Label.Widget
        style={[Style.Label.Bold.RedContentXL_16, Style.Label.Align.Center]}>
        {'Home home'}
      </Label.Widget>
    </View>
  );
});
