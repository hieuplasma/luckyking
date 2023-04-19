import {authApi} from '@api';
import {useBase} from '@shared';
import {useCallback, useMemo, useState} from 'react';
import DeviceInfo from 'react-native-device-info';

export const useSignup = () => {
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [repeatPassword, setRepeatPassword] = useState<string | undefined>(
    undefined,
  );
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<
    | {
        phonenumber?: string;
        password?: string;
        repeatpassword?: string;
      }
    | undefined
  >(undefined);
  const {isLoading, setLoading} = useBase();

  const deviceId = DeviceInfo.getDeviceId();

  const onSignupPress = useCallback(() => {
    setLoading(true);
    // return authApi
    //   .register({
    //     phoneNumber: phoneNumber,
    //     password: password,
    //     deviceId: deviceId,
    //   })
    //   .then(res => {
    //     // console.log('res', res);
    //     return Promise.resolve(res);
    //   })
    //   .catch(err => {
    //     // console.log('err', err);
    //     return Promise.reject(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, [phoneNumber, password, deviceId]);

  const onChangePhoneNumber = useCallback((phoneNumber?: string) => {
    setPhoneNumber(phoneNumber);
  }, []);

  const onChangePassword = useCallback((password?: string) => {
    setPassword(password);
  }, []);
  const onChangeRepeatPassword = useCallback((password?: string) => {
    setRepeatPassword(password);
  }, []);

  return {
    isLoading,
    password,
    phoneNumber,
    errorMessage,
    onSignupPress,
    onChangePhoneNumber,
    onChangePassword,
    repeatPassword,
    onChangeRepeatPassword,
  };
};
