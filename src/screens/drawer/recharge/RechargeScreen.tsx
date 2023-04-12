import { Icon, Images, Image } from '@assets';
import { ImageHeader, IText } from '@components';
import { MainDrawerParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, Style } from '@styles';
import { NavigationUtils, printMoney, ScreenUtils } from '@utils';
import { useCallback } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<MainDrawerParamList, 'RechargeStack'>;
type NavigationRoute = RouteProp<MainDrawerParamList, 'RechargeStack'>;

export interface RechargeScreenParamsList { }

export const RechargeScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const luckykingBalance = useSelector((state: any) => state.userReducer.luckykingBalance)

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"NẠP TIỀN"} />

            <View style={styles.body}>
                <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 8 }}>
                    <Image source={Images.wallet} style={{ width: 40, height: 40 }} />
                    <View style={{ marginLeft: 8 }}>
                        <IText style={{ lineHeight: 16.8 }}>{"Số dư"}</IText>
                        <IText style={{ lineHeight: 16.8, color: Color.luckyKing }}>{`${printMoney(luckykingBalance)}đ`}</IText>
                    </View>
                </View>

                <View style={styles.line} />

                <IText style={{ marginTop: 16, marginLeft: 8 }}>{"Các hình thức nạp tiền:"}</IText>
                <View style={{ height: 8 }} />

                <TouchableOpacity style={styles.borderItem} onPress={()=> NavigationUtils.navigate(navigation, ScreenName.Drawer.BankRechargeScreen)}>
                    <Image source={Images.bank_center} style={{ width: 28, height: 28 }} />
                    <IText style={{ marginLeft: 16 }}>{"Chuyển khoản ngân hàng"}</IText>
                    <View style={{ flex: 1 }} />
                    <Image source={Images.right_arrow} style={styles.rightArrow} tintColor={Color.black} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.borderItem}>
                    <Image source={Images.momo} style={{ width: 28, height: 28 }} />
                    <IText style={{ marginLeft: 16 }}>{"Nạp tiền bằng ví Momo"}</IText>
                    <View style={{ flex: 1 }} />
                    <Image source={Images.right_arrow} style={styles.rightArrow} tintColor={Color.black} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.borderItem}>
                    <Image source={Images.vnpay} style={{ width: 35, height: 35 }} />
                    <View style={{ marginLeft: 16 }}>
                        <IText>{"Nạp tiền qua cổng thanh toán VNPay"}</IText>
                        <IText style={{ fontStyle: 'italic' }}>{"(Internet - Mobile Banking, Thẻ tín dụng)"}</IText>
                    </View>
                    <View style={{ flex: 1 }} />
                    <Image source={Images.right_arrow} style={styles.rightArrow} tintColor={Color.black} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.buyLotteryBackGround
    },
    body: {

    },
    line: {
        height: 1, backgroundColor: '#A0A0A0', opacity: 0.2,
        width: '100%', marginTop: 8
    },
    borderItem: {
        width: windowWidth - 32, marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1, borderColor: '#DADADA',
        alignItems: 'center', justifyContent: 'space-between',
        flexDirection: 'row', paddingHorizontal: 10,
        marginVertical: 4, paddingVertical: 8,
    },
    rightArrow: { width: 10, height: 20 }
})