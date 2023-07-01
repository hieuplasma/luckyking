import { lotteryApi } from '@api';
import { Icon, Images, Image } from '@assets';
import { TransactionType } from '@common';
import { ImageHeader, IText } from '@components';
import { ScreenName, WithdrawStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, Style } from '@styles';
import { fullDateTimeConvert2, NavigationUtils, printMoney, ScreenUtils } from '@utils';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<WithdrawStackParamList, 'WithdrawScreen'>;
type NavigationRoute = RouteProp<WithdrawStackParamList, 'WithdrawScreen'>;

export interface WithdrawScreenParamsList { }

export const WithdrawScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const rewardWalletBalance = useSelector((state: any) => state.userReducer.rewardWalletBalance)

    const navigate = (screen: string) => {
        NavigationUtils.navigate(navigation, screen)
    }

    const [listTransaction, setListTransaction] = useState([])
    const [isLoading, setLoading] = useState(false)

    const onRefresh = async () => {
        setLoading(true)
        window.loadingIndicator.show()
        const res = await lotteryApi.getTransactionHistory()
        if (res) {
            setListTransaction(res.data.filter(check).sort(compare))
        }
        setLoading(false)
        window.loadingIndicator.hide()
    }

    function check(param: any) {
        return (param.type == TransactionType.WithDraw || param.type == TransactionType.Rewarded)
    }

    function compare(a: any, b: any) {
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        return 0;
    }

    useEffect(() => {
        onRefresh()
    }, [])

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"Đổi thưởng"} />

            <View style={styles.body}>
                <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 8 }}>
                    <Image source={Images.trophy} style={{ width: 40, height: 40 }}  tintColor={Color.luckyKing} />
                    <View style={{ marginLeft: 8 }}>
                        <IText style={{ lineHeight: 16.8 }}>{"Tiền thưởng"}</IText>
                        <IText style={{ lineHeight: 16.8, color: Color.luckyKing }}>{`${printMoney(rewardWalletBalance)}đ`}</IText>
                    </View>
                </View>

                <View style={styles.line} />

                <IText style={{ marginTop: 16, marginLeft: 8 }}>{"Các hình thức đổi thưởng:"}</IText>
                <View style={{ height: 8 }} />

                <TouchableOpacity style={styles.borderItem} onPress={() => navigate(ScreenName.Drawer.LuckyKingWithdrawScreen)}>
                    <Image source={Images.luckyking_baw} style={{ width: 28, height: 28 }} />
                    <IText style={{ marginLeft: 16 }}>{"Đổi thưởng về TK đặt vé LuckyKing"}</IText>
                    <View style={{ flex: 1 }} />
                    <Image source={Images.right_arrow} style={styles.rightArrow} tintColor={Color.black} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.borderItem} onPress={() => navigate(ScreenName.Drawer.BankWithdrawScreen)}>
                    <Image source={Images.bank_center} style={{ width: 28, height: 28 }} />
                    <IText style={{ marginLeft: 16 }}>{"Đổi thưởng về TK Ngân hàng"}</IText>
                    <View style={{ flex: 1 }} />
                    <Image source={Images.right_arrow} style={styles.rightArrow} tintColor={Color.black} />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.borderItem}>
                    <Image source={Images.momo} style={{ width: 28, height: 28 }} />
                    <IText style={{ marginLeft: 16 }}>{"Đổi thưởng về ví MoMo"}</IText>
                    <View style={{ flex: 1 }} />
                    <Image source={Images.right_arrow} style={styles.rightArrow} tintColor={Color.black} />
                </TouchableOpacity> */}

                <IText style={{ marginTop: 20, marginLeft: 8 }}>
                    {"Lịch sử Tài khoản đổi thưởng:"}
                </IText>

                <FlatList
                    style={{ marginTop: 16 }}
                    data={listTransaction.sort()}
                    renderItem={({ item, index }: any) => {
                        return (
                            <View style={{
                                height: 50, width: '100%',
                                paddingHorizontal: 8, alignItems: 'center',
                                backgroundColor: index % 2 == 0 ? Color.white : "#EFEEEC",
                                flexDirection: 'row',
                            }}>
                                <Image style={{ width: 36, height: 36 }} source={Images.transaction} />
                                <View style={{ marginLeft: 8, justifyContent: 'center' }}>
                                    <IText style={{ fontWeight: 'bold' }}>{item.description}</IText>
                                    <IText>{fullDateTimeConvert2(new Date(item.createdAt))}</IText>
                                </View>
                                <View style={{ flex: 1 }} />
                                <IText style={{ fontWeight: 'bold' }}>
                                    {`${item.type == TransactionType.Rewarded ? '+' : '-'} ${printMoney(item.amount)}đ`}
                                </IText>
                            </View>
                        )
                    }}
                    keyExtractor={(item: any, index) => String(item.id)}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    ListFooterComponent={<View style={{ height: 100 }}></View>}
                />

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
        alignItems: 'center', justifyContent: 'space-between',
        flexDirection: 'row', paddingHorizontal: 10,
        marginVertical: 4, paddingVertical: 8,
    },
    rightArrow: { width: 10, height: 20 }
})