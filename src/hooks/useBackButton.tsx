import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';
import {BackHandler, Platform, NativeEventSubscription} from 'react-native';

export const useBackButtonWithNavigation = (onBackEvent?: () => boolean) => {
  const handleBackEvent = () => {
    const isHandleEvent = onBackEvent?.() ?? false;
    return isHandleEvent;
  };

  useFocusEffect(
    useCallback(() => {
      var  backHandler : NativeEventSubscription | undefined
      if (Platform.OS === 'android'){
        backHandler =  BackHandler.addEventListener('hardwareBackPress', handleBackEvent);
      }
      return () => {
        if (Platform.OS === 'android'){
          backHandler?.remove()
        }
      };
    },[onBackEvent]),
  );
};

export function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => BackHandler.removeEventListener('hardwareBackPress', handler)
  }, [handler])
}
