import {ResultStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<ResultStackParamList, 'Result'>;
type NavigationRoute = RouteProp<ResultStackParamList, 'Result'>;

export interface ResultScreenParamsList {}

export const ResultScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();

  return <></>;
};
