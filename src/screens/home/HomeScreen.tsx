import { CartIcon, HomeTicketLongFormComponent, IText, ModalAlert, ModalContact } from '@components';
import { useBackButtonWithNavigation } from '@hooks';
import { HomeStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SimpleHeaderView, translate } from '@shared';
import { Icon, Image, Images } from '@assets'
import { Color, Style } from '@styles';
import { dateConvert, NavigationUtils, printMoney, ScreenUtils } from '@utils';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { LotteryType } from '@common';
import { saveAlertTesting } from '@redux';
import { lotteryApi } from '@api';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'HomeScreen'>;

export interface HomeScreenParamsList { navToKenoStack?: any, navToBasicStack?: any }

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

  const jackpots = useSelector((state: any) => state.drawReducer.jackpots)

  const currentPopupId = useSelector((state: any) => state.systemReducer.popupId)
  const kenoSalesStoppageTime = useSelector((state: any) => state.systemReducer.kenoSalesStoppageTime)

  const [contactVisible, setContactVisible] = useState(false)
  const [popupVisisble, setPopupVisisble] = useState(false)
  const [popupContent, setPopupContent] = useState('')
  const [popupId, setPopupId] = useState(0)

  const getCurrentPopup = useCallback(async () => {
    const popup = await lotteryApi.getPopup()
    if (popup) {
      if (currentPopupId < popup.data.id) {
        setPopupVisisble(popup.data.show)
        setPopupContent(popup.data.content)
        setPopupId(popup.data.id)
      }
    }
  }, [currentPopupId])

  useEffect(() => {
    getCurrentPopup()
  }, [])

  useBackButtonWithNavigation(
    React.useCallback(() => {
      return true;
    }, []),
  );

  // useEffect(() => {
  //   if (alertTesting) {
  //     Alert.alert("Lưu ý", "Hiện sản phẩm đang trong giai đoạn thử nghiệm nên sẽ chỉ mở bán trong khoảng thời gian từ 8h - 17h hàng ngày, mong Quý khách thông cảm.",
  //       [{
  //         text: 'Không hiển thị lần sau',
  //         onPress: () => dispatch(saveAlertTesting({ expand: false }))
  //       },
  //       {
  //         text: 'Đã hiểu',
  //         onPress: () => console.log('cancel')
  //       }])
  //   }
  // }, [])

  useEffect(() => {
    if (route?.params?.navToKenoStack) {
      const navTo = route.params.navToKenoStack;
      navigation.navigate(navTo.screen, navTo.params);
    }
    if (route?.params?.navToBasicStack) {
      const navTo = route.params.navToBasicStack;
      navigation.navigate(navTo.screen, navTo.params);
    }
  }, [route]);

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
        {/* <Icon.Button
          name="ic_notification"
          size={'large'}
          color={Color.white}
          style={[Style.Space.PaddingHorizontal.Medium_12]}
        /> */}
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
        // source={Images.good_luck}
        source={Images.luckyking_banner}
        resizeMode='cover'
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
        targetTime={kenoFirstDraw ? new Date(new Date(kenoFirstDraw.drawTime).getTime() - kenoSalesStoppageTime * 1000) : undefined}
        action={() => NavigationUtils.navigate(navigation, ScreenName.HomeChild.KenoScreen)}
        jackpot='Lên đến 10 tỷ '
      />
    );
  }, [kenoFirstDraw, kenoSalesStoppageTime]);

  const renderMegaTicket = useCallback(() => {
    return (
      <HomeTicketLongFormComponent
        image="https://media.vietlott.vn//main/06.2018/cms/game/mega-645_full-color_cut-copy.png"
        type={LotteryType.Mega}
        targetTime={megaFirstDraw ? new Date(megaFirstDraw.drawTime) : undefined}
        action={() => NavigationUtils.navigate(navigation, ScreenName.HomeChild.MegaScreen)}
        nextDate={megaFirstDraw ? dateConvert(new Date(megaFirstDraw.drawTime)) : ""}
        QSMT={'T4, T6, CN'}
        jackpot={`${printMoney(jackpots.JackPotMega)}`}
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
        jackpot='x100.000 lần'
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
        jackpot={`${printMoney(jackpots.JackPot1Power)}đ`}
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
        jackpot='x200.000 lần'
      />
    );
  }, [max3dProFirstDraw]);

  // const renderInstructionBlock = useCallback(() => {
  //   return (
  //     <TouchableOpacity style={styles.instruction} activeOpacity={1}
  //       onPress={() => NavigationUtils.navigate(navigation, ScreenName.Drawer.InstructionStack)}>
  //       <IText style={{ fontWeight: 'bold', color: Color.white, fontSize: 16 }}>
  //         {"Hướng dẫn chơi"}
  //       </IText>
  //     </TouchableOpacity>
  //   )
  // }, [])

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
          {/* {renderInstructionBlock()} */}
          <View style={{ height: 50 }} />
        </ScrollView>

        <TouchableOpacity style={styles.btnContact} onPress={() => setContactVisible(!contactVisible)} activeOpacity={1}>
          <Image source={Images.cskh} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>

        <ModalContact visible={contactVisible} onCancel={() => setContactVisible(false)} />
        <ModalAlert
          visible={popupVisisble}
          alertContent={popupContent}
          typeAlert='popup'
          popupId={popupId} />
      </Image>
    </>
  );
});

const styles = StyleSheet.create({
  btnContact: {
    width: 50, height: 50,
    backgroundColor: Color.white,
    borderRadius: 99,
    position: 'absolute',
    right: 25, bottom: 75
  },
  instruction: {
    marginTop: 16,
    width: '100%', height: 40,
    backgroundColor: Color.transparent,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: Color.white,
    borderRadius: 10
  }
})