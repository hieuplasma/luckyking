import { HomeTicketLongFormComponent } from '@components';
import { useBackButtonWithNavigation } from '@hooks';
import { HomeStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SimpleHeaderView, translate } from '@shared';
import { Icon } from '@assets'
import { Color, Style } from '@styles';
import { dateConvert, NavigationUtils, ScreenUtils } from '@utils';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { lotteryApi, userApi } from '@api';
import { updateUser } from '@redux';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'HomeScreen'>;

export interface HomeScreenParamsList { }

export interface HomeScreenProps { }

export const HomeScreen = React.memo((props?: HomeScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();
  const dispatch = useDispatch()

  const [firstDrawPower, setFirstDrawPower]: any = useState(false)

  async function getFirstDraw() {
    const res = await lotteryApi.getSchedulePower({ take: 1 })
    if (res) {
      if (res.data.length > 0) setFirstDrawPower(res.data[0])
    }
  }
  useEffect(() => {
    async function init() {
      getFirstDraw()
    }
    init()
  }, [])

  useBackButtonWithNavigation(
    React.useCallback(() => {
      return true;
    }, []),
  );

  const renderHeaderLeftView = useCallback(() => {
    return (
      <Icon.Button
        name="ic_menu"
        size={'large'}
        color={Color.white}
        style={[Style.Space.PaddingHorizontal.Zero]}
        //@ts-ignore
        onPressed={() => navigation.toggleDrawer()}
      />
    );
  }, []);

  const renderHeaderRightView = useCallback(() => {
    return (
      <View style={[Style.Size.FlexRow]}>
          <Icon.Button
          name="ic_notification"
          size={'large'}
          color={Color.white}
          style={[Style.Space.PaddingHorizontal.Medium_12]}
        />
        <Icon.Button
          name="ic_cart"
          size={'large'}
          color={Color.white}
          style={[Style.Space.PaddingHorizontal.Zero]}
        />
      </View>
    );
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <SimpleHeaderView
        disableRenderStatusBarView={true}
        leftView={renderHeaderLeftView()}
        rightView={renderHeaderRightView()}
        title={translate('tab.home')}
        titleStyle={[Style.Label.Bold.PrimaryHeadingXL_24, { color: Color.white }]}
        style={[
          Style.Background.Red,
          Style.Space.PaddingHorizontal.large_16,
          { marginTop: safeAreaInsets.top, justifyContent: 'space-between' },
        ]}
      />
    );
  }, []);

  const renderBanner = useCallback(() => {
    return (
      <View
        style={[
          Style.Background.White,
          Style.Size.WidthMatchParent,
          Style.Space.MarginTop.large_16,
          Style.Border.Standard.dialog,
          Style.Space.PaddingHorizontal.Medium_12,
          { height: ScreenUtils.getSizeByHorizontal(120) },
        ]}
      />
    );
  }, []);

  const renderKenoTicket = useCallback(() => {
    return (
      <HomeTicketLongFormComponent
        image="https://media.vietlott.vn//main/06.2018/cms/game/keno.png"
        type="keno"
      />
    );
  }, []);

  const renderMegaTicket = useCallback(() => {
    return (
      <HomeTicketLongFormComponent
        image="https://media.vietlott.vn//main/06.2018/cms/game/mega-645_full-color_cut-copy.png"
        type="mega"
      />
    );
  }, []);

  const renderMaxTicket = useCallback(() => {
    return (
      <HomeTicketLongFormComponent
        image="https://media.vietlott.vn//main/04.2019/bcc/game/thumbnail_max3d-01.jpg"
        type="max"
      />
    );
  }, []);

  const renderPowerTicket = useCallback(() => {
    return (
      <HomeTicketLongFormComponent
        image="https://media.vietlott.vn//main/06.2018/cms/game/Power655.png"
        type="power"
        targetTime={firstDrawPower ? new Date(firstDrawPower.drawTime) : undefined}
        action={() => NavigationUtils.navigate(navigation, ScreenName.HomeChild.PowerScreen)}
        nextDate={firstDrawPower ? dateConvert(new Date(firstDrawPower.drawTime)) : ""}
        QSMT={'T3, T5, T7'}
      />
    );
  }, []);

  const renderMaxPlusTicket = useCallback(() => {
    return (
      <HomeTicketLongFormComponent
        image="https://media.vietlott.vn//main/logo/logomax3dpro.png"
        type="max-pro"
      />
    );
  }, []);

  return (
    <>
      <View style={[Style.Size.MatchParent, Style.Background.Red]}>
        {renderHeader()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[Style.Space.MarginHorizontal.large_16]}>
          {renderBanner()}
          {renderKenoTicket()}
          {renderPowerTicket()}
          {renderMegaTicket()}
          {renderMaxTicket()}
          {renderMaxPlusTicket()}
        </ScrollView>
      </View>
    </>
  );
});
