import { authApi } from '@api';
import { useBase } from '@shared';
import { useCallback, useMemo, useState } from 'react';
import DeviceInfo from 'react-native-device-info';

export const useLogin = () => {
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<
    | {
      phonenumber?: string;
      password?: string;
    }
    | undefined
  >(undefined);
  const { isLoading, setLoading } = useBase();

  const deviceId = DeviceInfo.getDeviceId();

  const onLoginPress = useCallback(async () => {
    setLoading(true);
    const res = await authApi
      .login({
        phoneNumber: phoneNumber,
        password: password,
        deviceId: deviceId,
      })
    return res
  }, [phoneNumber, password, deviceId]);

  const onChangePhoneNumber = useCallback((phoneNumber?: string) => {
    setPhoneNumber(phoneNumber);
  }, []);

  const onChangePassword = useCallback((password?: string) => {
    setPassword(password);
  }, []);

  return {
    isLoading,
    password,
    phoneNumber,
    errorMessage,
    onLoginPress,
    onChangePhoneNumber,
    onChangePassword,
  };
};
