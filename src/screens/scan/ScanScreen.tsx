import {ScanStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<ScanStackParamList, 'Scan'>;
type NavigationRoute = RouteProp<ScanStackParamList, 'Scan'>;

export interface ScanScreenParamsList {}

export const ScanScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();

  return <></>;
};
