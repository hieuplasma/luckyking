import { Label } from '@shared';
import { Style } from '@styles';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleProp, TextStyle, View, ViewProps } from 'react-native';

export interface HomeCountdownClockComponentProps extends ViewProps {
  targetTime: Date;
  timeStyle?: StyleProp<TextStyle>;
}

export const HomeCountdownClockComponent = React.memo(
  (props: HomeCountdownClockComponentProps) => {
    const [timeRemaining, setTimeRemaining] = useState<any | undefined>(
      undefined,
    );
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = props.targetTime.getTime() - now;
        if (distance < 0) {
          clearInterval(interval);
          setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
          ]}>
          {timeRemaining?.days} {' '}{timeRemaining?.hours} :{' '}
          {timeRemaining?.minutes} : {timeRemaining?.seconds} s
        </Label.Widget>
      </View>
    );
  },
);
