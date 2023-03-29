import {useBase} from '@shared';
import {useCallback, useMemo, useState} from 'react';

export const useVerifyOtp = () => {
  const [otp, setOtp] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<
    | {
        otp?: string;
      }
    | undefined
  >(undefined);
  const {isLoading, setLoading} = useBase();
  const [timeResend, setTimeResend] = useState(59);
  const [forceUpdate, setForceUpdate] = useState(true);

  const onResendOtp = useCallback(() => {
    setTimeResend(59)
  }, [forceUpdate]);

  const onVerifyOtp = useCallback(() => {}, [otp]);

  const onChangeOtp = useCallback((otp?: string) => {
    setOtp(otp);
  }, []);

  const incrementTimeSend = useCallback(() => {
    setTimeResend(timeResend => +timeResend - 1);
  }, [timeResend]);

  const countingTime = useCallback(() => {
    if (!timeResend) return setTimeResend(0);
    const to = setTimeout(incrementTimeSend, 1000);
    return () => {
      clearTimeout(to);
    };
  }, [timeResend]);

  const getTimeToString = useCallback((time?: number) => {
    if (!time) return '';
    let sec: number | string = time % 60;
    if (sec < 10) sec = '0' + sec;
    return `${sec}`;
  }, []);

  return {
    isLoading,
    errorMessage,
    onResendOtp,
    onVerifyOtp,
    otp,
    onChangeOtp,
    forceUpdate,
    incrementTimeSend,
    countingTime,
    getTimeToString,
    timeResend,
    setLoading
  };
};
