import { lotteryApi } from '@api';
import { LotteryType } from '@common';
import { getKenoDraw } from '@redux';
import { Label } from '@shared';
import { Style } from '@styles';
import { printNumber } from '@utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleProp, TextStyle, View, ViewProps } from 'react-native';
import { useDispatch } from 'react-redux';

export interface HomeCountdownClockComponentProps extends ViewProps {
  targetTime: Date;
  timeStyle?: StyleProp<TextStyle>;
  type?: LotteryType
}

export const HomeCountdownClockComponent = React.memo(
  (props: HomeCountdownClockComponentProps) => {
    const [timeRemaining, setTimeRemaining] = useState<any | undefined>(
      undefined,
    );

    const dispatch = useDispatch()

    const resetScheduleKeno = useCallback(async (interval: any) => {
      console.log("dkm")
      const listKeno = await lotteryApi.getScheduleKeno({ type: LotteryType.Keno, take: 20, skip: 0 })
      console.log("listKeno", listKeno)
      if (listKeno) {
        if (listKeno.data.length > 0) {
          dispatch(getKenoDraw(listKeno.data))
        }
        else {
          clearInterval(interval);
          setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      }
      else {
        clearInterval(interval);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, [])

    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = props.targetTime.getTime() - now;
        if (distance < 0) {
          if (props.type == LotteryType.Keno) resetScheduleKeno(interval)
          else {
            clearInterval(interval);
            setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          }
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeRemaining({ days, hours, minutes, seconds });
        }
        () => {
          clearInterval(interval);
        };
      }, 1000);

      return () => clearInterval(interval);
    }, [props?.targetTime]);

    return (
      <View style={[props?.style]}>
        <Label.Widget
          style={[
            Style.Label.Bold.GrayContentXL_16,
            Style.Space.MarginTop.small_8,
            { fontSize: 13 },
            props?.timeStyle,
            { fontFamily: 'digital-7' }
          ]}>
          {printNumber(timeRemaining?.days)} :{' '}{printNumber(timeRemaining?.hours)} :{' '}
          {printNumber(timeRemaining?.minutes)} : {printNumber(timeRemaining?.seconds)}
        </Label.Widget>
      </View>
    );
  },
);
