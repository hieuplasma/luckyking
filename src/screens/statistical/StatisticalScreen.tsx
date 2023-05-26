import { useBackButtonWithNavigation } from '@hooks';
import { StatisticalStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<StatisticalStackParamList, 'Statistical'>;
type NavigationRoute = RouteProp<StatisticalStackParamList, 'Statistical'>;

export interface StatisticalScreenParamsList { }

export const StatisticalScreen = () => {

  useBackButtonWithNavigation(
    React.useCallback(() => {
      return true;
    }, []),
  );

  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();

  return <></>;
};
