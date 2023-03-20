import {useBase} from '@shared';
import {useCallback, useState} from 'react';

export const useVerifyOtp = () => {
  const [otp, setOtp] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<
    | {
        otp?: string;
      }
    | undefined
  >(undefined);
  const {isLoading, setLoading} = useBase();
  const [timeResend, setTimeResend] = useState(30);
  const [forceUpdate, setForceUpdate] = useState(true);

  const onResendOtp = useCallback(() => {}, []);

  const onVerifyOtp = useCallback(() => {}, [otp]);

  const onChangeOtp = useCallback((otp?: string) => {
    setOtp(otp);
  }, []);

  const incrementTimeSend = useCallback(() => {
    setTimeResend(timeResend => +timeResend - 1);
  }, [timeResend]);

  function countingTime() {
    if (!timeResend) return setTimeResend(0);
    const to = setTimeout(incrementTimeSend, 1000);
    return () => {
      clearTimeout(to);
    };
  }

  function getTimeToString(time: number) {
    if (!time) return '';
    // let min: number | string = Math.floor(time / 60);
    // if (min < 10) min = '0' + min;
    let sec: number | string = time % 60;
    if (sec < 10) sec = '0' + sec;
    // return `${min}:${sec}`;
    return `${sec}`;
  }

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
  };
};
