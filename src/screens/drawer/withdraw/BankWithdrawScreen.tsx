import { lotteryApi } from '@api';
import { Images, Image } from '@assets';
import { BasicHeader, IText } from '@components';
import { WithdrawStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { doNotExits, printMoney } from '@utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, TouchableOpacity, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements'
import { ChooseBankSheet } from './ChooseBankSheet';

type NavigationProp = StackNavigationProp<WithdrawStackParamList, 'LuckyKingWithdrawScreen'>;
type NavigationRoute = RouteProp<WithdrawStackParamList, 'LuckyKingWithdrawScreen'>;

export interface BankWithdrawScreenParamsList { }

export const BankWithdrawScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const height = useHeaderHeight()

    const user = useSelector((state: any) => state.userReducer)

    const rewardWalletBalance = useSelector((state: any) => state.userReducer.rewardWalletBalance)
    const luckykingBalance = useSelector((state: any) => state.userReducer.luckykingBalance)

    const [disable, setDisable] = useState(true)

    const [amount, setAmount]: any = useState("")
    const onChangeAmount = useCallback((text: string) => {
        setAmount(text)
    }, [])

    const [bank, setBank]: any = useState(false)
    const onChangeBank = useCallback((param: any) => {
        setBank(param)
        setAccountNumber(param.accountNumber)
        setUserName(param.userName)
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
    }, [amount])

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
            Alert.alert("Tạo yêu cầu đổi thưởng thành công, vui lòng chở xử lý!")
            setAmount("")
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

    return (
        <View style={styles.container}>
            <BasicHeader navigation={navigation} title={"Đổi thưởng về TK ngân hàng"} />

            <KeyboardAvoidingView keyboardVerticalOffset={height + 45} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <ScrollView style={styles.body}>
                    <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 8 }}>
                        <Image source={Images.trophy} style={{ width: 40, height: 40 }} />
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
                                <IText style={{ lineHeight: 16.8 }}>{"Số dư"}</IText>
                                <IText style={{ lineHeight: 16.8, color: Color.luckyKing }}>{`${printMoney(luckykingBalance)}đ`}</IText>
                            </View>
                        </View>
                    </View>

                    <IText style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 16 }}>
                        {"Chọn TK từ danh sách đã lưu"}
                    </IText>
                    {
                        user.bankAccount.map((item: any) => {
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

                    <TouchableOpacity style={[styles.borderItem, { paddingHorizontal: 16 }]} onPress={openBankSheet}>
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
        width: windowWidth - 32, marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1, borderColor: '#DADADA',
        alignItems: 'center',
        flexDirection: 'row', paddingHorizontal: 10,
        marginTop: 8, paddingVertical: 4, height: 48
    },
    rightArrow: { width: 10, height: 20 },
    button: {
        width: windowWidth - 32, height: 44,
        backgroundColor: Color.luckyKing, borderRadius: 10, marginTop: 12, marginHorizontal: 16,
        justifyContent: 'center', alignItems: 'center', marginBottom: 32
    },
    boxChoose: {
        width: 80, height: 30,
        justifyContent: 'center', alignItems: 'center',
        marginTop: 10, marginHorizontal: 4,
        backgroundColor: "#DADADA", borderRadius: 5
    },
    txtInput: {
        flex: 1, fontFamily: 'myriadpro-regular',
        fontSize: 18, color: Color.black
    }
})