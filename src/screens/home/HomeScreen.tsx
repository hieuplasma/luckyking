import { CartIcon, HomeTicketLongFormComponent } from '@components';
import { useBackButtonWithNavigation } from '@hooks';
import { HomeStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SimpleHeaderView, translate } from '@shared';
import { Icon, Image, Images } from '@assets'
import { Color, Style } from '@styles';
import { dateConvert, NavigationUtils, ScreenUtils } from '@utils';
import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { LotteryType } from '@common';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'HomeScreen'>;

export interface HomeScreenParamsList { }

export interface HomeScreenProps { }

export const HomeScreen = React.memo((props?: HomeScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();
  const dispatch = useDispatch()

  const powerFirstDraw = useSelector((state: any) => state.drawReducer.powerFirstDraw)
  const megaFirstDraw = useSelector((state: any) => state.drawReducer.megaFirstDraw)
  const max3dFirstDraw = useSelector((state: any) => state.drawReducer.max3dFirstDraw)
  const max3dProFirstDraw = useSelector((state: any) => state.drawReducer.max3dProFirstDraw)
  const kenoFirstDraw = useSelector((state: any) => state.drawReducer.kenoFirstDraw)

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
      <View style={[Style.Size.FlexRow, { alignItems: 'center' }]}>
        <Icon.Button
          name="ic_notification"
          size={'large'}
          color={Color.white}
          style={[Style.Space.PaddingHorizontal.Medium_12]}
        />
        <CartIcon navigation={navigation} badgeStyle={{ backgroundColor: "#FDB703" }} tintColor={Color.white} />
      </View>
    );
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <SimpleHeaderView
        disableRenderStatusBarView={true}
        leftView={renderHeaderLeftView()}
        rightView={renderHeaderRightView()}
        title={"TRANG CHỦ"}
        titleStyle={{ color: Color.white, fontSize: 16, fontWeight: 'bold' }}
        style={[
          Style.Background.Transparent,
          Style.Space.PaddingHorizontal.large_16,
          { marginTop: safeAreaInsets.top, justifyContent: 'space-between' },
        ]}
      />
    );
  }, []);

  const renderBanner = useCallback(() => {
    return (
      <Image
        source={Images.good_luck}
        resizeMode='contain'
        style={[
          Style.Background.White,
          Style.Size.WidthMatchParent,
          Style.Space.MarginTop.large_16,
          Style.Border.Standard.dialog,
          Style.Space.PaddingHorizontal.Medium_12,
          { height: ScreenUtils.getSizeByHorizontal(120) }
        ]}
      />
    );
  }, []);

  const renderKenoTicket = useCallback(() => {
    return (
      <HomeTicketLongFormComponent
        image="https://media.vietlott.vn//main/06.2018/cms/game/keno.png"
        type={LotteryType.Keno}
        targetTime={kenoFirstDraw ? new Date(kenoFirstDraw.drawTime) : undefined}
        action={() => NavigationUtils.navigate(navigation, ScreenName.HomeChild.KenoScreen)}
      />
    );
  }, [kenoFirstDraw]);

  const renderMegaTicket = useCallback(() => {
    return (
      <HomeTicketLongFormComponent
        image="https://media.vietlott.vn//main/06.2018/cms/game/mega-645_full-color_cut-copy.png"
        type={LotteryType.Mega}
        targetTime={megaFirstDraw ? new Date(megaFirstDraw.drawTime) : undefined}
        action={() => NavigationUtils.navigate(navigation, ScreenName.HomeChild.MegaScreen)}
        nextDate={megaFirstDraw ? dateConvert(new Date(megaFirstDraw.drawTime)) : ""}
        QSMT={'T4, T6, CN'}
      />
    );
  }, [megaFirstDraw]);

  const renderMaxTicket = useCallback(() => {
    return (
      <HomeTicketLongFormComponent
        image="https://media.vietlott.vn//main/04.2019/bcc/game/thumbnail_max3d-01.jpg"
        type={LotteryType.Max3D}
        targetTime={max3dFirstDraw ? new Date(max3dFirstDraw.drawTime) : undefined}
        action={() => NavigationUtils.navigate(navigation, ScreenName.HomeChild.Max3dScreen)}
        nextDate={max3dFirstDraw ? dateConvert(new Date(max3dFirstDraw.drawTime)) : ""}
        QSMT={'T2, T4, T6'}
      />
    );
  }, [max3dFirstDraw]);

  const renderPowerTicket = useCallback(() => {
    return (
      <HomeTicketLongFormComponent
        image="https://media.vietlott.vn//main/06.2018/cms/game/Power655.png"
        type={LotteryType.Power}
        targetTime={powerFirstDraw ? new Date(powerFirstDraw.drawTime) : undefined}
        action={() => NavigationUtils.navigate(navigation, ScreenName.HomeChild.PowerScreen)}
        nextDate={powerFirstDraw ? dateConvert(new Date(powerFirstDraw.drawTime)) : ""}
        QSMT={'T3, T5, T7'}
      />
    );
  }, [powerFirstDraw]);

  const renderMax3dProTicket = useCallback(() => {
    return (
      <HomeTicketLongFormComponent
        image="https://media.vietlott.vn//main/logo/logomax3dpro.png"
        type={LotteryType.Max3DPro}
        targetTime={max3dProFirstDraw ? new Date(max3dProFirstDraw.drawTime) : undefined}
        action={() => NavigationUtils.navigate(navigation, ScreenName.HomeChild.Max3dProScreen)}
        nextDate={max3dProFirstDraw ? dateConvert(new Date(max3dProFirstDraw.drawTime)) : ""}
        QSMT={'T3, T5, T7'}
      />
    );
  }, [max3dProFirstDraw]);

  return (
    <>
      <Image style={[Style.Size.MatchParent, Style.Background.Red]}
        source={Images.image_background}>
        {renderHeader()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[Style.Space.MarginHorizontal.large_16]}>
          {renderBanner()}
          {renderKenoTicket()}
          {renderPowerTicket()}
          {renderMegaTicket()}
          {renderMaxTicket()}
          {renderMax3dProTicket()}
        </ScrollView>
      </Image>
    </>
  );
});
