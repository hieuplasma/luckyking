import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeStackParamList} from '@navigation';
import {} from 'react-native'

type NavigationProp = StackNavigationProp<HomeStackParamList, 'CartScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'CartScreen'>;

export interface CartScreenParamsList {}

export const CartScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();

  return <></>;
};

