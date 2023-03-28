import {authApi} from '@api';
import {useBase} from '@shared';
import {useCallback, useMemo, useState} from 'react';
import DeviceInfo from 'react-native-device-info';

export const useForgetPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<
    | {
        phonenumber?: string;
      }
    | undefined
  >(undefined);
  const {isLoading, setLoading} = useBase();

  const deviceId = DeviceInfo.getDeviceId();

  const onChangePhoneNumber = useCallback((phoneNumber?: string) => {
    setPhoneNumber(phoneNumber);
  }, []);

  return {
    isLoading,
    phoneNumber,
    errorMessage,
    onChangePhoneNumber,
  };
};
