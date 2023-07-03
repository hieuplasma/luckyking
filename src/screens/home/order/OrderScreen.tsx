import { lotteryApi, userApi } from '@api';
import { Icon, Images, Image } from '@assets';
import { LotteryType, OrderMethod, SUCCESS_MES } from '@common';
import { BasicHeader, ImageHeader, IText } from '@components';
import { HomeStackParamList, ScreenName, WithdrawStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { removeCart, updateUser } from '@redux';
import { Color, Style } from '@styles';
import { calSurcharge, doNotExits, NavigationUtils, printMoney, ScreenUtils } from '@utils';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'OrderScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'OrderScreen'>;

export interface OrderScreenParamsList {
    body: any
}

export const OrderScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const dispatch = useDispatch()

    const user = useSelector((state: any) => state.userReducer)
    const rewardWalletBalance = useSelector((state: any) => state.userReducer.rewardWalletBalance)
    const luckykingBalance = useSelector((state: any) => state.userReducer.luckykingBalance)

    const [bodyPay, setBody] = useState(route.params.body)
    const [surcharge, setSurcharge] = useState(0)

    useEffect(() => {
        console.log("bodyPay", bodyPay)
        setSurcharge(calSurcharge(bodyPay.amount))
    }, [bodyPay])

    const syncBalance = useCallback(async () => {
        const resBalance = await userApi.getBalance()
        if (resBalance) {
            dispatch(updateUser(resBalance.data))
        }
    }, [])

    useEffect(() => {
        syncBalance()
    }, [navigation])

    const [payment, setPayment] = useState("Tài khoản đặt vé LuckyKing")

    const handleChargePress = useCallback(() => {
        NavigationUtils.navigate(navigation, ScreenName.Drawer.RechargeStack)
    }, [])

    const handlePay = useCallback(async () => {
        let tmp = { ...bodyPay }
        tmp.surcharge = calSurcharge(bodyPay.amount)
        tmp.method = OrderMethod.Keep
        window.loadingIndicator.show()
        let res = null
        switch (bodyPay.lotteryType) {
            case LotteryType.Keno:
                res = await lotteryApi.bookLotteryKeno(tmp)
                break;
            case LotteryType.Power:
            case LotteryType.Mega:
                res = await lotteryApi.bookLotteryPowerMega(tmp)
                break;
            case LotteryType.Max3D:
            case LotteryType.Max3DPlus:
            case LotteryType.Max3DPro:
                res = await lotteryApi.bookLotteryMax3d(tmp)
                break;
            case LotteryType.Cart:
                res = await lotteryApi.bookLotteryCart(tmp)
            default:
                break;
        }
        if (res) {
            dispatch(updateUser({ luckykingBalance: luckykingBalance - tmp.surcharge - tmp.amount }))
            if (bodyPay.lotteryType == LotteryType.Cart) dispatch(removeCart())
            window.myalert.show({
                title: SUCCESS_MES.BOOKED_LOTTEY,
                btnLabel: "OK",
                alertType: 'success',
                onPress: () => {
                    if (bodyPay.lotteryType == LotteryType.Keno) {
                        navigation.navigate('HomeScreen', {
                            navToKenoStack: {
                                screen: ScreenName.Drawer.HistoryKenoStack,
                                params: {}
                            }
                        })
                    }
                    else {
                        navigation.navigate('HomeScreen', {
                            navToBasicStack: {
                                screen: ScreenName.Drawer.HistoryBasicStack,
                                params: {}
                            }
                        })
                    }
                }
            })
        }
        window.loadingIndicator.hide()
    }, [bodyPay])

    return (
        <View style={styles.container}>
            <BasicHeader navigation={navigation} title={"Thanh toán"} />

            <View style={styles.body}>
                <IText style={{ fontWeight: 'bold' }} uppercase>
                    {"Thông tin khách hàng:"}
                </IText>

                <View style={styles.borderItem}>
                    <IText style={{ fontWeight: '600' }}>{"Tên người nhận vé"}</IText>
                    <IText>{user.fullName}</IText>
                </View>
                <View style={styles.borderItem}>
                    <IText style={{ fontWeight: '600' }}>{"Số điện thoại"}</IText>
                    <IText>{user.phoneNumber}</IText>
                </View>
                <View style={styles.borderItem}>
                    <IText style={{ fontWeight: '600' }}>{"Số CMND/CCCD"}</IText>
                    <IText>{user.identify}</IText>
                </View>

                <IText style={{ fontWeight: 'bold', marginTop: 26 }} uppercase>
                    {"Hình thức thanh toán"}
                </IText>

                <TouchableOpacity style={[styles.lineItem2, { borderColor: Color.luckyKing }]} activeOpacity={.6} onPress={() => setPayment("Tài khoản đặt vé LuckyKing")}>
                    <Image source={Images.luckyking_logo} style={styles.icon_default}></Image>
                    <View style={{ marginLeft: 8, justifyContent: 'center' }}>
                        <IText style={{ fontWeight: 'bold' }}>{"Tài khoản đặt vé LuckyKing"}</IText>
                        <IText style={{ fontStyle: 'italic' }}>{`Số dư: ${printMoney(luckykingBalance)}đ`}
                            {
                                bodyPay.amount > luckykingBalance ?
                                    <IText>
                                        {" ("}
                                        <IText style={{ color: Color.luckyKing }}>
                                            {"không đủ"}
                                        </IText>
                                        {")"}
                                    </IText>
                                    : <></>
                            }
                        </IText>
                    </View>
                    <View style={{ flex: 1 }} />
                    {
                        bodyPay.amount > luckykingBalance ?
                            <TouchableOpacity style={styles.btnCharge} onPress={handleChargePress}>
                                <IText style={{ fontWeight: 'bold', color: Color.white }}>{"Nạp"}</IText>
                            </TouchableOpacity>
                            : <></>
                    }
                    <Image source={Images.right_arrow} style={styles.icon_arrow} tintColor={Color.luckyKing}></Image>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.lineItem2]} activeOpacity={.6} onPress={() => { }}>
                    <Image source={Images.momo} style={styles.icon_default}></Image>
                    <View style={{ marginLeft: 8, justifyContent: 'center' }}>
                        <IText style={{ fontWeight: 'bold' }}>{"Ví MoMo"}</IText>
                        <IText style={{ fontStyle: 'italic' }}>{`Phí dịch vụ: 2%`}</IText>
                    </View>
                    <View style={{ flex: 1 }} />
                    <Image source={Images.right_arrow} style={styles.icon_arrow}></Image>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <IText>{"Tiền vé"}</IText>
                    <IText style={{ color: Color.luckyKing }}>{printMoney(bodyPay.amount) + "đ"}</IText>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <IText>{"Phí dịch vụ"}</IText>
                    <IText style={{ color: Color.luckyKing }}>{printMoney(surcharge) + "đ"}</IText>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <IText style={{ fontSize: 18, fontWeight: 'bold' }}>{"Tổng cộng"}</IText>
                    <IText style={{ color: Color.luckyKing, fontSize: 18, fontWeight: 'bold' }}>{printMoney(bodyPay.amount + surcharge) + "đ"}</IText>
                </View>

                <TouchableOpacity
                    style={[styles.confirmButton, { opacity: bodyPay.amount > luckykingBalance ? 0.4 : 1 }]}
                    onPress={handlePay}
                    activeOpacity={0.7}
                    disabled={bodyPay.amount > luckykingBalance}
                >
                    <IText uppercase style={styles.textConfirm}>{"THANH TOÁN"}</IText>
                </TouchableOpacity>
            </View>
        </View>
    )
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.buyLotteryBackGround
    },
    body: {
        paddingBottom: 30, padding: 16, flex: 1
    },
    borderItem: {
        width: windowWidth - 32,
        // shadow
        shadowOffset: { width: 6, height: 5 },
        shadowRadius: 15,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOpacity: 0.2,
        elevation: 3,
        // borderWidth: 1,
        borderColor: '#A0A0A0',
        marginTop: 16,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 16, flexDirection: 'row',
        justifyContent: 'space-between'
    },
    lineItem2: {
        width: windowWidth - 32,
        height: 50, flexDirection: 'row',
        paddingHorizontal: 12, alignItems: 'center',
        borderRadius: 10, borderColor: '#E7E3E3',
        borderWidth: 1, marginTop: 12
    },
    icon_default: { width: 28, height: 28 },
    icon_arrow: { width: 6, height: 12 },
    btnCharge: {
        // justifyContent:'center', alignItems:'center',
        // height: 24, width: 40,
        paddingHorizontal: 10, paddingVertical: 0,
        backgroundColor: Color.luckyKing,
        borderRadius: 10,
        marginRight: 10
    },
    confirmButton: {
        backgroundColor: Color.luckyKing, borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        height: 44, width: windowWidth - 32, marginTop: 8
    },
    textConfirm: {
        color: Color.white,
        fontSize: 16,
        fontWeight: 'bold',
    }
})