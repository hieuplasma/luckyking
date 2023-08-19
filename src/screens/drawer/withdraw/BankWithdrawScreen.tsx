import { lotteryApi, userApi } from '@api';
import { Images, Image } from '@assets';
import { BasicHeader, IText } from '@components';
import { ScreenName, WithdrawStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { NavigationUtils, doNotExits, printMoney } from '@utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, TouchableOpacity, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements'
import { ChooseBankSheet } from './ChooseBankSheet';
import { DocTienBangChu } from './docTien';
import { updateUser } from '@redux';

type NavigationProp = StackNavigationProp<WithdrawStackParamList, 'LuckyKingWithdrawScreen'>;
type NavigationRoute = RouteProp<WithdrawStackParamList, 'LuckyKingWithdrawScreen'>;

export interface BankWithdrawScreenParamsList { }

export const BankWithdrawScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const height = useHeaderHeight()
    const dispatch = useDispatch()

    const user = useSelector((state: any) => state.userReducer)
    let docTien = new DocTienBangChu();

    const rewardWalletBalance = useSelector((state: any) => state.userReducer.rewardWalletBalance)
    const luckykingBalance = useSelector((state: any) => state.userReducer.luckykingBalance)

    const [disable, setDisable] = useState(true)

    const [amount, setAmount]: any = useState("")
    const [list, setList] = useState<number[]>([])
    const [listBank, setListBank] = useState(user.bankAccount)

    const syncBalance = useCallback(async () => {
        const resBalance = await userApi.getBalance()
        if (resBalance) {
            dispatch(updateUser(resBalance.data))
        }
    }, [])

    const getBank = useCallback(async () => {
        const res = await userApi.getAllBank()
        if (res) {
            setListBank(res.data)
        }
    }, [])
    useEffect(() => {
        getBank()
        syncBalance()
    }, [])

    const onChangeAmount = useCallback((text: string) => {
        setAmount(text)
        if (!doNotExits(text)) {
            const number = parseInt(text)
            if (number > 0) {
                let tmp = []
                let curr = number
                while (curr < 1000000000) {
                    if (curr >= 100000) {
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

    const [bank, setBank]: any = useState(false)
    const onChangeBank = useCallback((param: any) => {
        setBank(param)
        setAccountNumber(param.accountNumber)
        if (!doNotExits(param.userName)) setUserName(param.userName)
    }, [])

    const [userName, setUserName]: any = useState(user.fullName)
    const onChangeUserName = useCallback((text: string) => {
        setUserName(text)
    }, [])

    const [accountNumber, setAccountNumber]: any = useState('')
    const onChangeAccountNumber = useCallback((text: string) => {
        setAccountNumber(text)
    }, [])

    const [save, setSave] = useState(true)

    useEffect(() => {
        if (doNotExits(amount) || doNotExits(userName) || doNotExits(accountNumber)) setDisable(true)
        if (!bank) setDisable(true)
        else {
            const tmp = parseInt(amount)
            if (tmp <= 0) setDisable(true)
            else setDisable(false)
        }
    }, [amount, userName, accountNumber, bank])

    const withdraw = async () => {
        const money = parseInt(amount)
        if (money < 1000)
            return Alert.alert("Thông báo", "Số tiền phải lớn hơn 1000!")
        if (money % 1000 != 0)
            return Alert.alert("Thông báo", "Số tiền phải chia hết cho 1000!")
        if (money > rewardWalletBalance)
            return Alert.alert("Thông báo", "Số tiền thưởng không đủ!")
        if (doNotExits(userName))
            return Alert.alert("Thông báo", "Bạn chưa nhập tên chủ tài khoản!")
        if (doNotExits(accountNumber))
            return Alert.alert("Thông báo", "Bạn chưa nhập số tài khoản!")
        if (!bank)
            return Alert.alert("Thông báo", "Bạn chưa chọn ngân hàng!")

        const body = {
            "amount": money,
            "accountNumber": accountNumber,
            "status": "pending",
            "save": save,
            "name": bank.name,
            "userName": userName,
            "code": bank.code,
            "shortName": bank.shortName,
            "logo": bank.logo
        }
        window.loadingIndicator.show()
        const res = await lotteryApi.withdrawBankAccount(body)
        if (res) {
            Alert.alert("Yêu cầu rút thưởng của Quý khách đã được LuckyKing tiếp nhận và sẽ được xử lý. Thời gian xử lý tối đa không quá 2 ngày làm việc (trừ thứ 7, chủ nhật, ngày lễ…)!")
            // dispatch(updateUser({ rewardWalletBalance: rewardWalletBalance - amount }))
            syncBalance()
            setAmount("")
            getBank()
        }
        window.loadingIndicator.hide()
    }

    const chooseBankRef: any = useRef(null);
    const openBankSheet = useCallback(() => { chooseBankRef.current?.openSheet() }, [chooseBankRef])
    const renderBankSheet = useCallback(() => {
        return (
            <ChooseBankSheet
                ref={chooseBankRef}
                onChoose={onChangeBank}
            />
        )
    }, [chooseBankRef, onChangeBank])

    const goToRequestList = useCallback(() => {
        NavigationUtils.navigate(navigation, ScreenName.Drawer.WithdrawRequestScreen)
    }, [navigation])

    return (
        <View style={styles.container}>
            <BasicHeader navigation={navigation} title={"Đổi thưởng về TK ngân hàng"} />

            <KeyboardAvoidingView keyboardVerticalOffset={height + 45} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <ScrollView style={styles.body}>
                    <View style={{ flexDirection: 'row', marginTop: 16, marginHorizontal: 8 }}>
                        <Image source={Images.trophy} style={{ width: 40, height: 40 }} tintColor={Color.luckyKing} />
                        <View style={{ marginLeft: 8 }}>
                            <IText style={{ lineHeight: 16.8 }}>{"Tiền thưởng"}</IText>
                            <IText style={{ lineHeight: 16.8, color: Color.luckyKing }}>{`${printMoney(rewardWalletBalance)}đ`}</IText>
                        </View>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity
                            style={{ padding: 10, borderRadius: 10, backgroundColor: Color.luckyKing }}
                            onPress={goToRequestList}>
                            <IText style={{ color: Color.white }}>{"Danh sách yêu cầu"}</IText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.line} />

                    {/* <View style={styles.borderItem}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={Images.wallet} style={{ width: 40, height: 40 }} />
                            <View style={{ marginLeft: 8 }}>
                                <IText style={{ lineHeight: 16.8 }}>{"Số dư"}</IText>
                                <IText style={{ lineHeight: 16.8, color: Color.luckyKing }}>{`${printMoney(luckykingBalance)}đ`}</IText>
                            </View>
                        </View>
                    </View> */}

                    {
                        listBank.length > 0 ?
                            <IText style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 16 }}>
                                {"Chọn TK từ danh sách đã lưu"}
                            </IText>
                            : <></>
                    }
                    {
                        listBank.map((item: any) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.borderItem,
                                    { paddingHorizontal: 16, height: 70, paddingVertical: 0 }]}
                                    onPress={() => onChangeBank(item)}
                                    key={item.shortName + item.accountNumber}
                                >
                                    <Image style={{ width: 45, height: 45 }} source={{ uri: item.logo }} resizeMode='contain' />
                                    <View style={{ justifyContent: 'center' }}>
                                        <IText style={{ fontWeight: 'bold' }}>{`${item.shortName} (${item.code})`}</IText>
                                        <IText >{`Chủ TK: (${item.userName})`}</IText>
                                        <IText >{`Số TK: (${item.accountNumber})`}</IText>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <View style={[styles.borderItem, { paddingHorizontal: 16 }]}>
                        <TextInput
                            style={styles.txtInput}
                            placeholder={"Nhập số tiền thưởng"}
                            placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
                            value={amount}
                            onChangeText={onChangeAmount}
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
                                    <TouchableOpacity activeOpacity={0.8} key={number} style={styles.boxChoose} onPress={() => onChangeAmount(number.toString())}>
                                        <IText style={{ fontSize: 16 }}>{printMoney(number)}</IText>
                                    </TouchableOpacity>
                                )
                            }) : <></>
                        }
                        <TouchableOpacity activeOpacity={0.7} style={styles.boxChoose} onPress={() => onChangeAmount(rewardWalletBalance.toString())}>
                            <IText style={{ fontSize: 16 }}>{'Tất cả'}</IText>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={[styles.borderItem, { paddingHorizontal: 8 }]} onPress={openBankSheet}>
                        {
                            bank ?
                                <>
                                    <IText style={styles.txtInput}>
                                        {bank.shortName + ` (${bank.code})`}
                                    </IText>
                                    <Image style={{ width: 60, height: 45 }} source={{ uri: bank ? bank.logo : undefined }} resizeMode='contain' />
                                </>
                                : <IText style={[styles.txtInput, { opacity: 0.3 }]}>
                                    {'Chọn ngân hàng'}
                                </IText>
                        }
                    </TouchableOpacity>

                    <View style={[styles.borderItem, { paddingHorizontal: 16 }]}>
                        <TextInput
                            style={styles.txtInput}
                            placeholder={"Chủ tài khoản"}
                            placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
                            value={userName}
                            onChangeText={onChangeUserName}
                        />
                    </View>

                    <View style={[styles.borderItem, { paddingHorizontal: 16 }]}>
                        <TextInput
                            style={styles.txtInput}
                            placeholder={"Số tài khoản"}
                            placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
                            value={accountNumber}
                            onChangeText={onChangeAccountNumber}
                            keyboardType="decimal-pad"
                        />
                    </View>

                    <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 8, alignItems: 'center' }}
                        onPress={() => setSave(!save)}>
                        <Image style={{ width: 20, height: 20 }} source={save ? Images.checked_box : Images.check_box} tintColor={Color.luckyKing} />
                        <IText style={{ marginLeft: 8, fontSize: 15 }}>
                            {"Lưu thông tin cho lần đổi thưởng sau"}
                        </IText>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity style={[styles.button, { opacity: disable ? 0.6 : 1 }]} disabled={disable} onPress={withdraw}>
                <IText uppercase style={{ fontWeight: 'bold', fontSize: 16, color: Color.white }}>{"ĐỔI THƯỞNG"}</IText>
            </TouchableOpacity>

            {renderBankSheet()}
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
        flex: 1
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
        marginTop: 8, paddingVertical: 4, height: 48
    },
    rightArrow: { width: 10, height: 20 },
    button: {
        width: windowWidth - 24, height: 44,
        backgroundColor: Color.luckyKing, borderRadius: 10, marginTop: 12, marginHorizontal: 12,
        justifyContent: 'center', alignItems: 'center', marginBottom: 32
    },
    boxChoose: {
        width: 100, height: 30,
        justifyContent: 'center', alignItems: 'center',
        marginTop: 10, marginHorizontal: 4,
        backgroundColor: "#DADADA", borderRadius: 5
    },
    txtInput: {
        flex: 1, fontFamily: 'myriadpro-regular',
        fontSize: 18, color: Color.black
    }
})