import { lotteryApi } from '@api';
import { Icon, Images, Image } from '@assets';
import { BasicHeader, ImageHeader, IText } from '@components';
import { ScreenName, WithdrawStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { updateUser } from '@redux';
import { Color, Style } from '@styles';
import { doNotExits, NavigationUtils, printMoney, ScreenUtils } from '@utils';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { DocTienBangChu } from './docTien';

type NavigationProp = StackNavigationProp<WithdrawStackParamList, 'LuckyKingWithdrawScreen'>;
type NavigationRoute = RouteProp<WithdrawStackParamList, 'LuckyKingWithdrawScreen'>;

export interface LuckyKingWithdrawScreenParamsList { }

// const list = [10000, 30000, 100000, 1000000]

export const LuckyKingWithdrawScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const dispatch = useDispatch()
    let docTien = new DocTienBangChu();


    const user = useSelector((state: any) => state.userReducer)

    const rewardWalletBalance = useSelector((state: any) => state.userReducer.rewardWalletBalance)
    const luckykingBalance = useSelector((state: any) => state.userReducer.luckykingBalance)

    const [amount, setAmount]: any = useState("")
    const [disable, setDisable] = useState(true)
    const [list, setList] = useState<number[]>([])

    useEffect(() => {
        if (doNotExits(amount)) setDisable(true)
        else {
            const tmp = parseInt(amount)
            if (tmp <= 0) setDisable(true)
            else setDisable(false)
        }
    }, [amount])

    const onChangeText = useCallback((text: string) => {
        setAmount(text)
        if (!doNotExits(text)) {
            const number = parseInt(text)
            if (number > 0) {
                let tmp = []
                let curr = number
                while (curr < 1000000000) {
                    if (curr >= 1000) {
                        tmp.push(curr)
                    }
                    curr = curr * 10
                }
                // if (!tmp.includes(rewardWalletBalance)) tmp.push(rewardWalletBalance)
                setList(tmp)
            }
        }
        else setList([])
    }, [])

    const withdraw = async () => {
        const money = parseInt(amount)
        if (money < 1000)
            return Alert.alert("Thông báo", "Số tiền phải lớn hơn 1000!")
        if (money % 1000 != 0)
            return Alert.alert("Thông báo", "Số tiền phải chia hết cho 1000!")
        if (money > rewardWalletBalance)
            return Alert.alert("Thông báo", "Số tiền thưởng không đủ!")

        window.loadingIndicator.show()
        const res = await lotteryApi.withdrawLuckyKing({ amount: money })
        if (res) {
            if (res.data?.payment) {
                Alert.alert("Đổi thưởng thành công!")
                dispatch(updateUser({
                    rewardWalletBalance: res.data.rewardWalletBalance,
                    luckykingBalance: res.data.luckykingBalance
                }))
                setAmount("")
            }
        }
        window.loadingIndicator.hide()
    }

    return (
        <View style={styles.container}>
            <BasicHeader navigation={navigation} title={"Đổi thưởng về TK đặt vé"} />

            <View style={styles.body}>
                <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 8 }}>
                    <Image source={Images.trophy} style={{ width: 40, height: 40 }} tintColor={Color.luckyKing} />
                    <View style={{ marginLeft: 8 }}>
                        <IText style={{ lineHeight: 16.8 }}>{"Tiền thưởng"}</IText>
                        <IText style={{ lineHeight: 16.8, color: Color.luckyKing }}>{`${printMoney(rewardWalletBalance)}đ`}</IText>
                    </View>
                </View>

                <View style={styles.line} />

                <View style={styles.borderItem}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={Images.wallet} style={{ width: 40, height: 40 }} />
                        <View style={{ marginLeft: 8 }}>
                            <IText style={{ lineHeight: 16.8 }}>{"Số dư TK LuckyKing"}</IText>
                            <IText style={{ lineHeight: 16.8, color: Color.luckyKing }}>{`${printMoney(luckykingBalance)}đ`}</IText>
                        </View>
                    </View>
                </View>

                <View style={[styles.borderItem, { paddingHorizontal: 16 }]}>
                    <TextInput
                        style={{
                            flex: 1, fontFamily: 'myriadpro-regular',
                            fontSize: 18, color: Color.black
                        }}
                        placeholder={"Nhập số tiền thưởng"}
                        value={amount}
                        onChangeText={onChangeText}
                        keyboardType="decimal-pad"
                    />
                </View>

                {!doNotExits(amount) ?
                    <IText style={{ marginLeft: 16, fontStyle: 'italic' }}>
                        {docTien.doc(amount)}
                    </IText>
                    : <></>}

                <View style={{ marginHorizontal: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        list.length > 0 ? list.map((number: number) => {
                            return (
                                <TouchableOpacity activeOpacity={0.7} key={number} style={styles.boxChoose} onPress={() => onChangeText(number.toString())}>
                                    <IText style={{ fontSize: 16 }}>{printMoney(number)}</IText>
                                </TouchableOpacity>
                            )
                        })
                            : <></>
                    }
                    <TouchableOpacity activeOpacity={0.7} style={styles.boxChoose} onPress={() => onChangeText(rewardWalletBalance.toString())}>
                        <IText style={{ fontSize: 16 }}>{'Tất cả'}</IText>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.button, { opacity: disable ? 0.6 : 1 }]} disabled={disable} onPress={withdraw}>
                    <IText uppercase style={{ fontWeight: 'bold', fontSize: 16, color: Color.white }}>{"ĐỔI THƯỞNG"}</IText>
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
        width: windowWidth - 24, marginHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1, borderColor: '#DADADA',
        alignItems: 'center',
        flexDirection: 'row', paddingHorizontal: 10,
        marginTop: 8, paddingVertical: 8, height: 56
    },
    rightArrow: { width: 10, height: 20 },
    button: {
        width: windowWidth - 24, height: 44,
        backgroundColor: Color.luckyKing, borderRadius: 10, marginTop: 12, marginHorizontal: 12,
        justifyContent: 'center', alignItems: 'center'
    },
    boxChoose: {
        width: 100, height: 30,
        justifyContent: 'center', alignItems: 'center',
        marginTop: 10, marginHorizontal: 4,
        backgroundColor: "#DADADA", borderRadius: 5
    }
})