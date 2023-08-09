import { lotteryApi } from '@api';
import { LotteryType } from '@common';
import { deleteFirstDrawKeno, getKenoDraw, getMax3dDraw, getMax3dProDraw, getMegaDraw, getPowerDraw } from '@redux';
import { Label } from '@shared';
import { Style } from '@styles';
import { printNumber } from '@utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleProp, TextStyle, View, ViewProps } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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

    const listDrawKeno = useSelector((state: any) => state.drawReducer.kenoListDraw)

    const dispatch = useDispatch()

    const resetScheduleKeno = useCallback(async (interval: any) => {
      try {
        if (listDrawKeno.length < 20) {
          lotteryApi.getScheduleKeno({ type: LotteryType.Keno, take: 40, skip: 0 })
            .then(listKeno => { if (listKeno?.data?.length > 0) dispatch(getKenoDraw(listKeno.data)) })
        }
        else {
          dispatch(deleteFirstDrawKeno())
        }
      } catch (error) {
        clearInterval(interval);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, [])

    const resetScheduleOther = useCallback(async (interval: any) => {
      try {
        lotteryApi.getSchedulePower({ take: 6, skip: 0 })
          .then(listPower => { if (listPower?.data?.length > 0) dispatch(getPowerDraw(listPower.data)) }),

          lotteryApi.getScheduleMega({ take: 6, skip: 0 })
            .then(listMega => { if (listMega?.data?.length > 0) dispatch(getMegaDraw(listMega.data)) }),

          lotteryApi.getScheduleMax3d({ type: LotteryType.Max3D, take: 6, skip: 0 })
            .then(listMax3d => { if (listMax3d?.data?.length > 0) dispatch(getMax3dDraw(listMax3d.data)) }),

          lotteryApi.getScheduleMax3d({ type: LotteryType.Max3DPro, take: 6, skip: 0 })
            .then(listMax3dPro => { if (listMax3dPro?.data?.length > 0) dispatch(getMax3dProDraw(listMax3dPro.data)) })
      }
      catch (error) {
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
          else resetScheduleOther(interval)
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
