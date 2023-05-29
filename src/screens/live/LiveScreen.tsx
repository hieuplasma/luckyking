import { ImageHeader } from '@components';
import { useBackButtonWithNavigation } from '@hooks';
import { LiveStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<LiveStackParamList, 'LiveScreen'>;
type NavigationRoute = RouteProp<LiveStackParamList, 'LiveScreen'>;

export interface LiveScreenParamsList { }

export const LiveScreen = React.memo(() => {

  useBackButtonWithNavigation(
    React.useCallback(() => {
      return true;
    }, []),
  );
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageHeader title={"Trực tiếp"} />
    </View>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})