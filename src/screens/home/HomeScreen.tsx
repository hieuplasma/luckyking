import {HomeTicketLongFormComponent} from '@components';
import {useBackButtonWithNavigation} from '@hooks';
import {HomeStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, SimpleHeaderView} from '@shared';
import {Color, Style} from '@styles';
import { ScreenUtils } from '@utils';
import React, {useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'Home'>;

export interface HomeScreenParamsList {}

export interface HomeScreenProps {}

export const HomeScreen = React.memo((props?: HomeScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();

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
        onPressed= {()=> navigation.toggleDrawer()}
      />
    );
  }, []);

  const renderHeaderRightView = useCallback(() => {
    return (
      <View style={[Style.Size.FlexRow]}>
        <Icon.Button
          name="ic_cart"
          size={'large'}
          color={Color.white}
          style={[Style.Space.PaddingHorizontal.Medium_12]}
        />
        <Icon.Button
          name="ic_notification"
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
        style={[
          Style.Background.Red,
          Style.Space.PaddingHorizontal.large_16,
          {marginTop: safeAreaInsets.top, justifyContent: 'space-between'},
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
          {height: ScreenUtils.getSizeByHorizontal(120)},
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
