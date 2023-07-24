import { NavigationUtils, printMoney } from '@utils';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../redux/reducer/auth';
import { ScreenName } from './ScreenName';
import auth from '@react-native-firebase/auth';
import { removeCart, removeUser, updateUser } from '@redux';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Images } from '@assets';
import { Color } from '@styles';
import { userApi } from '@api';
import { IText } from '@components';
import { VERSION } from '@common';

const DrawerCustom = React.memo((props: any) => {

  const navigation = props.navigation
  const dispatch = useDispatch();

  const [currentIdScreen, setCurrentId] = useState(0)
  useEffect(() => {
    setCurrentId(props.state.index)
  }, [props?.state?.index])

  const navigateTo = useCallback((screen: any) => {
    NavigationUtils.navigate(navigation, screen)
  }, [props?.state?.index])

  const [loading, setLoading] = useState(false)
  const onRefresh = useCallback(async () => {
    setLoading(true)
    const res = await userApi.getuserInfo()
    if (res?.data) {
      dispatch(updateUser(res.data))
    }
    setLoading(false)
  }, [])

  const logOut = useCallback(async () => {
    dispatch(removeToken())
    dispatch(removeUser())
    dispatch(removeCart())
    navigation?.closeDrawer();
    NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication);
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }, [auth, removeToken, removeCart, removeUser])

  return (
    <View style={{ flex: 1 }}>
      <HeaderDrawer navigateTo={navigateTo} />
      <ScrollView style={{ padding: 8, paddingTop: 5 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        {
          listItem1.map((item: any) => {
            return (
              <LineItem1
                key={item.screen}
                icon={item.icon}
                icStyle={item.icStyle}
                money={item.money}
                navigateTo={navigateTo}
                screen={item.screen}
                btn={item.btn}
              />
            )
          })
        }
        {
          listItem2.map((item: any) => {
            return (
              <LineItem2
                key={item.title}
                icon={item.icon}
                icStyle={item.icStyle}
                title={item.title}
                subTitle={item.subTitle}
                navigateTo={navigateTo}
                screen={item.screen}
                focusing={currentIdScreen == item.screenId ? true : false}
              />
            )
          })
        }
        <LogOut logOut={logOut} />
        <View style={{ height: 40 }} />
      </ScrollView>
      <IText style={{ textAlign: 'center', marginBottom: 15, fontWeight: 'bold' }}>{'Phiên bản: ' + VERSION}</IText>
    </View>
  )
})

export default DrawerCustom

const HeaderDrawer = React.memo(({ navigateTo }: any) => {
  const user = useSelector((state: any) => state.userReducer)
  return (
    <Image source={Images.draw_top} style={styles.imgAvatar}>
      <Image source={user.avatar != "" ? { uri: user.avatar } : Images.default_avatar} style={{ width: 76, height: 76 }}></Image>
      <TouchableOpacity style={{ flexDirection: 'row' }} activeOpacity={0.7} onPress={() => navigateTo(ScreenName.Drawer.UserStack)}>
        <View style={{ marginLeft: 8, justifyContent: 'center' }}>
          <IText style={{ fontSize: 18, fontWeight: 'bold', color: Color.white }}>{user.fullName}</IText>
          <IText style={{ fontSize: 15, fontWeight: 'bold', color: Color.white, marginTop: 7 }}>{user.phoneNumber}</IText>
        </View>
        <View style={{ marginLeft: 16, justifyContent: 'center' }}>
          <Image style={{ width: 12, height: 24 }} source={Images.right_arrow}></Image>
        </View>
      </TouchableOpacity>
    </Image>
  )
})

const LineItem1 = React.memo(({ navigateTo, icon, icStyle, money, screen, btn }: any) => {
  const user = useSelector((state: any) => state.userReducer)
  const handlePress = useCallback(() => {
    navigateTo(screen)
  }, [])

  const [sercure, setSercure] = useState(false)
  const toggleSercure = useCallback(() => {
    setSercure(!sercure)
  }, [sercure])
  return (
    <View style={styles.lineItem1}>
      <Image source={icon} style={icStyle} tintColor={Color.luckyKing}></Image>
      <IText style={styles.textMoney}>{`${sercure ? '******' : printMoney(user[money])}đ`}</IText>
      <TouchableOpacity onPress={toggleSercure}>
        <Image source={sercure ? Images.eye_close : Images.eye_open} style={styles.eye}></Image>
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handlePress}>
        <IText style={styles.textButton}>{btn}</IText>
      </TouchableOpacity>
    </View>
  )
})

const LineItem2 = React.memo(({ navigateTo, icon, icStyle, title, subTitle, screen, focusing }: any) => {
  const handlePress = useCallback(() => {
    navigateTo(screen)
  }, [])
  return (
    <TouchableOpacity
      style={[styles.lineItem2, { borderColor: focusing ? Color.luckyKing : '#E7E3E3' }]}
      activeOpacity={.6}
      onPress={handlePress}
    >
      <Image source={icon} style={icStyle}></Image>
      {
        subTitle ?
          <View style={{ justifyContent: 'center' }}>
            <IText style={styles.aboveText}>{title}</IText>
            <IText style={styles.underText}>{subTitle}</IText>
          </View>
          : <IText style={styles.aloneText}>{title}</IText>
      }
      <View style={{ flex: 1 }} />
      <Image source={Images.right_arrow} style={styles.icon_arrow} tintColor={Color.black}></Image>
    </TouchableOpacity>
  )
})

const LogOut = React.memo(({ logOut }: any) => {
  return (
    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16, }}
      onPress={logOut}>
      <IText style={{ fontSize: 14 }}>{"Đăng xuất"}</IText>
      <Image source={Images.logout} style={{ width: 25, height: 25, marginLeft: 4 }}></Image>
    </TouchableOpacity>
  )
})

const PADDING_TOP = 60

const styles = StyleSheet.create({
  imgAvatar: {
    paddingTop: PADDING_TOP, padding: 8,
    width: '100%', height: PADDING_TOP + 76 + 8,
    flexDirection: 'row',
  },
  lineItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36, marginVertical: 5
  },
  textMoney: { fontSize: 16, fontWeight: 'bold', color: Color.luckyKing, marginLeft: 6, width: 100 },
  eye: { width: 32, height: 32, opacity: 0.8 },
  button: {
    width: 79, height: 36, justifyContent: 'center', alignItems: 'center',
    borderRadius: 10,
    borderColor: Color.luckyKing,
    borderWidth: 1
  },
  textButton: {
    color: Color.luckyKing, fontWeight: 'bold', fontSize: 14
  },

  lineItem2: {
    width: '100%',
    height: 46, flexDirection: 'row',
    paddingHorizontal: 12, alignItems: 'center',
    borderRadius: 10, borderColor: '#E7E3E3',
    borderWidth: 1, marginTop: 12
  },
  aloneText: { fontSize: 14, fontWeight: '400', marginLeft: 8 },
  aboveText: { fontSize: 12, fontWeight: '400', marginLeft: 8 },
  underText: { fontSize: 12, fontWeight: '400', marginLeft: 8, fontStyle: 'italic' },
  icon_default: { width: 24, height: 24 },
  icon_history: { width: 41, height: 33, margin: -9 },
  icon_arrow: { width: 6, height: 12 }
})


const listItem1 = [
  {
    screenId: 2,
    icon: Images.wallet,
    icStyle: { width: 26, height: 26 },
    money: 'luckykingBalance',
    screen: ScreenName.Drawer.RechargeStack,
    btn: "NẠP"
  },
  {
    screenId: 3,
    icon: Images.trophy,
    icStyle: { width: 26, height: 26, tintColor: Color.luckyKing },
    money: 'rewardWalletBalance',
    screen: ScreenName.Drawer.WithDrawStack,
    btn: "ĐỔI",
  }
]

const listItem2 = [
  {
    screenId: 0,
    icon: Images.home,
    icStyle: styles.icon_default,
    title: "Trang chủ",
    subTitle: undefined,
    screen: ScreenName.BottomTab
  },
  {
    screenId: 4,
    icon: Images.history_note,
    icStyle: styles.icon_history,
    title: "Lịch sử đặt vé Keno",
    subTitle: "(Keno, bao Keno, nuôi Keno)",
    screen: ScreenName.Drawer.HistoryKenoStack
  },
  {
    screenId: 5,
    icon: Images.history_note,
    icStyle: styles.icon_history,
    title: "Lịch sử đặt vé cơ bản",
    subTitle: "(Power, Mega, Max3D/3D+, Max3DPro)",
    screen: ScreenName.Drawer.HistoryBasicStack
  },
  // {
  //   screenId: undefined,
  //   icon: Images.history_note,
  //   icStyle: styles.icon_history,
  //   title: "Lịch sử chơi nhóm",
  //   subTitle: "(Power, Mega, Max3D/3D+nhóm)",
  //   screen: undefined
  // },
  {
    screenId: 6,
    icon: Images.contact,
    icStyle: styles.icon_default,
    title: "Trung tâm hỗ trợ",
    // subTitle: '(Liên hệ với chúng tôi)',
    screen: ScreenName.Drawer.SupportStack
  },
  {
    screenId: 7,
    icon: Images.dieu_khoan,
    icStyle: styles.icon_default,
    title: "Điều khoản sử dụng",
    subTitle: undefined,
    screen: ScreenName.Drawer.TermsStack
  },
  // {
  //   screenId: undefined,
  //   icon: Images.chia_se,
  //   icStyle: styles.icon_default,
  //   title: "Giới thiệu bạn bè",
  //   subTitle: undefined,
  //   screen: undefined
  // },
  // {
  //   screenId: undefined,
  //   icon: Images.setting,
  //   icStyle: styles.icon_default,
  //   title: "Cài đặt",
  //   subTitle: undefined,
  //   screen: undefined
  // }
]
