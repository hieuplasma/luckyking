import {LiveStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<LiveStackParamList, 'Live'>;
type NavigationRoute = RouteProp<LiveStackParamList, 'Live'>;

export interface LiveScreenParamsList {}

export const LiveScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();

  return <></>;
};
