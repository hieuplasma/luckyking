import {HomeCountdownClockComponent} from '@components';
import {BorderComponent, Icon, Image, Label} from '@shared';
import {Color, Style} from '@styles';
import { ScreenUtils } from '@utils';
import React, {useCallback, useMemo} from 'react';
import {TouchableOpacity, View, ViewProps} from 'react-native';

export interface HomeTicketLongFormComponent extends ViewProps {
  image?: string;
  title?: string;
  totalPrize?: string;
  countdownTime?: string;

  leftView?: () => JSX.Element;
  rightView?: () => JSX.Element;
  centerView?: () => JSX.Element;
  type?: 'none' | 'max' | 'mega' | 'power' | 'max-pro' | 'keno' | 'group';
}

export const HomeTicketLongFormComponent = React.memo(
  (props?: HomeTicketLongFormComponent) => {
    const mainColor = useMemo(() => {
      switch (props?.type) {
        case 'max': {
          return Color.purple;
        }
        case 'mega': {
          return Color.red;
        }
        case 'power': {
          return Color.yellow;
        }
        case 'max-pro': {
          return Color.black;
        }
        case 'keno': {
          return Color.orange;
        }
        default: {
          return Color.green;
        }
      }
    }, [props?.type]);

    const renderImage = useCallback(() => {
      return (
        <View
          style={[
            Style.Space.Padding.Medium_12,
            Style.Background.White,
            {
              height: ScreenUtils.getSizeByHorizontal(90),
              width: ScreenUtils.getSizeByHorizontal(90),
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            },
          ]}>
          <Image
            source={{
              uri: props?.image,
            }}
            style={[Style.Size.WidthMatchParent, Style.Size.HeightMatchParent]}
            resizeMode="contain"
          />
          <BorderComponent
            width={20}
            height={20}
            borderStyle={[{backgroundColor: Color.red, borderColor: Color.red}]}
            style={[
              Style.AbsolutePosition.LeftTop,
              {
                transform: [{rotate: '0deg'}],
              },
            ]}
          />
          <BorderComponent
            width={20}
            height={20}
            borderStyle={[{backgroundColor: Color.red, borderColor: Color.red}]}
            style={[
              {
                position: 'absolute',
                left: 0,
                bottom: 0,
                transform: [{rotate: '270deg'}],
              },
            ]}
          />
        </View>
      );
    }, [props?.image]);

    const renderDescription = useCallback(() => {
      return (
        <View>
          <View
            style={[Style.Size.FlexRow, Style.ContentFlexRow.CenterInVertical]}>
            <Label.Widget style={[Style.Label.Regular.GrayContent_13]}>
              {props?.type !== 'keno'
                ? 'Kỳ QSMT 14/03/2023'
                : 'Keno/Bao Keno/AI Keno'}
            </Label.Widget>
            <Label.Widget
              style={[
                Style.Label.Regular.RedContent_13,
                {color: mainColor},
                Style.Space.PaddingHorizontal.Small_8,
                Style.Space.MarginLeft.medium_12,
                Style.Border.generateBorderStyle({
                  borderColor: mainColor,
                  borderRadius: 9,
                  borderWidth: 1,
                }),
              ]}>
              {props?.type !== 'keno' ? 'T4, T6, CN' : 'Cả tuần'}
            </Label.Widget>
          </View>
          <Label.Widget
            style={[
              Style.Label.Bold.GrayContentXL_16,
              Style.Space.MarginTop.small_8,
              {color: mainColor},
            ]}>
            {'56.487.021.150 đ'}
          </Label.Widget>
          <HomeCountdownClockComponent
            targetTime={new Date('2023-03-15T18:00:00Z')}
          />
        </View>
      );
    }, [mainColor]);

    const renderRightView = useCallback(() => {
      return (
        <Icon.Default
          name="ic_arrow"
          size={'small'}
          color={mainColor}
          style={[Style.Space.Padding.Zero, Style.Space.PaddingRight.Tiny_4]}
        />
      );
    }, [mainColor]);

    return (
      <TouchableOpacity
        style={[
          Style.Size.MatchParentRow,
          Style.Space.MarginTop.medium_12,
          Style.ContentFlexRow.CenterInVertical,
          Style.Space.MarginBottom.small_8,
          props?.style,
        ]}>
        {props?.leftView ? props?.leftView() : renderImage()}
        <View
          style={[
            Style.Size.MatchParentRow,
            Style.ContentFlexRow.CenterInVertical,
            Style.Background.White,
            Style.Space.PaddingLeft.Small_8,
            {
              justifyContent: 'space-between',
              height: ScreenUtils.getSizeByHorizontal(90),
              marginLeft: 0.5,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
          ]}>
          {props?.centerView ? props?.centerView() : renderDescription()}
          {props?.rightView ? props?.rightView() : renderRightView()}
          <BorderComponent
            width={20}
            height={20}
            borderStyle={[{backgroundColor: Color.red, borderColor: Color.red}]}
            style={[
              Style.AbsolutePosition.RightTop,
              {
                transform: [{rotate: '90deg'}],
              },
            ]}
          />
          <BorderComponent
            width={20}
            height={20}
            borderStyle={[{backgroundColor: Color.red, borderColor: Color.red}]}
            style={[
              Style.AbsolutePosition.BottomRight,
              {
                transform: [{rotate: '180deg'}],
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  },
);
