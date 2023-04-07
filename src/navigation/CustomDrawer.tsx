import { useNavigation } from '@react-navigation/native';
import { NavigationUtils, printMoney } from '@utils';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../redux/reducer/auth';
import { ScreenName } from './ScreenName';
import auth from '@react-native-firebase/auth';
import { removeCart, removeUser, updateUser } from '@redux';
import { useEffect, useState } from 'react';
import { Image, Images } from '@assets';
import { Color } from '@styles';
import { userApi } from '@api';

const PADDING_TOP = 60

function DrawerCustom(props: any) {
  const navigation = props.navigation
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.userReducer)

  const [loading, setLoading] = useState(false)

  const logOut = () => {
    dispatch(removeToken())
    dispatch(removeUser())
    dispatch(removeCart())
    props.navigation?.closeDrawer();
    NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication);
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  return (
    <View style={{ flex: 1 }}>

      {/* Drawer Heaer */}
      <Image source={Images.draw_top} style={{ paddingTop: PADDING_TOP, padding: 8, width: '100%', height: PADDING_TOP + 76 + 8, flexDirection: 'row' }}>
        <Image source={user.avatar != "" ? { uri: user.avatar } : Images.default_avatar} style={{ width: 76, height: 76 }}></Image>
        <TouchableOpacity style={{ flexDirection: 'row' }} activeOpacity={0.7} onPress={() => NavigationUtils.navigate(navigation, ScreenName.Drawer.UserStack)}>
          <View style={{ marginLeft: 8, justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Color.white }}>{user.fullName}</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: Color.white, marginTop: 7 }}>{user.personNumber}</Text>
          </View>
          <View style={{ marginLeft: 16, justifyContent: 'center' }}>
            <Image style={{ width: 12, height: 24 }} source={Images.right_arrow}></Image>
          </View>
        </TouchableOpacity>
      </Image>

      {/* Drawer Body */}
      <ScrollView style={{ padding: 16, paddingTop: 5 }}>
        <View style={styles.lineItem1}>
          <Image source={Images.wallet} style={{ width: 26, height: 26 }}></Image>
          <Text style={styles.textMoney}>{`${printMoney(user.luckykingBalance)}đ`}</Text>
          <Image source={Images.eye_open} style={styles.eye}></Image>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>{"NẠP"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lineItem1}>
          <Image source={Images.trophy} style={{ width: 44, height: 35, marginLeft: -8, marginRight: -10 }}></Image>
          <Text style={styles.textMoney}>{`${printMoney(user.rewardWalletBalance)}đ`}</Text>
          <Image source={Images.eye_open} style={styles.eye}></Image>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.button} activeOpacity={0.6}>
            <Text style={styles.textButton}>{"ĐỔI"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.lineItem2, { borderColor: Color.luckyKing }]} activeOpacity={.6} onPress={() => NavigationUtils.navigate(navigation, ScreenName.BottomTab)}>
          <Image source={Images.home} style={styles.icon_default}></Image>
          <Text style={styles.aloneText}>{"Trang chủ"}</Text>
          <View style={{ flex: 1 }} />
          <Image source={Images.right_arrow} style={styles.icon_arrow} tintColor={Color.luckyKing}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={styles.lineItem2} activeOpacity={.6}>
          <Image source={Images.history_note} style={styles.icon_history}></Image>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.aboveText}>{"Lịch sử đặt vé Keno"}</Text>
            <Text style={styles.underText}>{"(Keno, bao Keno, nuôi Keno)"}</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Image source={Images.right_arrow} style={styles.icon_arrow} tintColor={Color.black}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lineItem2} activeOpacity={.6}>
          <Image source={Images.history_note} style={styles.icon_history}></Image>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.aboveText}>{"Lịch sử đặt vé cơ bản"}</Text>
            <Text style={styles.underText}>{"(Power, Mega, Max3D/3D+, Max3DPro)"}</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Image source={Images.right_arrow} style={styles.icon_arrow} tintColor={Color.black}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lineItem2} activeOpacity={.6}>
          <Image source={Images.history_note} style={styles.icon_history}></Image>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.aboveText}>{"Lịch sử chơi nhóm"}</Text>
            <Text style={styles.underText}>{"(Power, Mega, Max3D/3D+nhóm)"}</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Image source={Images.right_arrow} style={styles.icon_arrow} tintColor={Color.black}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={styles.lineItem2} activeOpacity={.6}>
          <Image source={Images.contact} style={styles.icon_default}></Image>
          <Text style={styles.aloneText}>{"Liên hệ"}</Text>
          <View style={{ flex: 1 }} />
          <Image source={Images.right_arrow} style={styles.icon_arrow} tintColor={Color.black}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lineItem2} activeOpacity={.6}>
          <Image source={Images.dieu_khoan} style={styles.icon_default}></Image>
          <Text style={styles.aloneText}>{"Điều khoản sử dụng"}</Text>
          <View style={{ flex: 1 }} />
          <Image source={Images.right_arrow} style={styles.icon_arrow} tintColor={Color.black}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lineItem2} activeOpacity={.6}>
          <Image source={Images.chia_se} style={styles.icon_default}></Image>
          <Text style={styles.aloneText}>{"Giới thiệu bạn bè"}</Text>
          <View style={{ flex: 1 }} />
          <Image source={Images.right_arrow} style={styles.icon_arrow} tintColor={Color.black}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lineItem2} activeOpacity={.6}>
          <Image source={Images.setting} style={styles.icon_default}></Image>
          <Text style={styles.aloneText}>{"Cài đặt"}</Text>
          <View style={{ flex: 1 }} />
          <Image source={Images.right_arrow} style={styles.icon_arrow} tintColor={Color.black}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16, alignItems: 'center' }}
          onPress={() => logOut()}>
          <Text style={{ fontSize: 14 }}>{"Đăng xuất"}</Text>
          <Image source={Images.logout} style={{ width: 25, height: 25, marginLeft: 4 }}></Image>
        </TouchableOpacity>


        <View style={{ height: 40 }} />
      </ScrollView>

    </View>
  )
}
export default DrawerCustom

const styles = StyleSheet.create({
  lineItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36, marginVertical: 5
  },
  textMoney: { fontSize: 16, fontWeight: '600', color: Color.luckyKing, marginLeft: 6, width: 100 },
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