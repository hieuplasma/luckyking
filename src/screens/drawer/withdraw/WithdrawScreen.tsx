import { userApi } from '@api';
import { Images, Image } from '@assets';
import { ERR_MES } from '@common';
import { ImageHeader, IText } from '@components';
import { ScreenName, WithdrawStackParamList } from '@navigation';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { NavigationUtils, printMoney } from '@utils';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, RefreshControl, SectionList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ItemTransaction } from '../component/ItemTransaction';
import { groupBySortedFlucs } from '../component/groupData';
import { updateUser } from '@redux';

type NavigationProp = StackNavigationProp<WithdrawStackParamList, 'WithdrawScreen'>;
type NavigationRoute = RouteProp<WithdrawStackParamList, 'WithdrawScreen'>;

export interface WithdrawScreenParamsList { expandHistory?: boolean }

export const WithdrawScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const isFocused = useIsFocused();
    const dispatch = useDispatch()

    const rewardWalletBalance = useSelector((state: any) => state.userReducer.rewardWalletBalance)

    const navigate = (screen: string) => {
        NavigationUtils.navigate(navigation, screen)
    }

    const [listTransaction, setListTransaction] = useState<any[]>([])
    const [sectionData, setSectionData] = useState<any[]>([])
    const [isLoading, setLoading] = useState(false)
    const [loadingBottom, setLoadingBottom] = useState(false)
    const [showHistory, setShowHistory] = useState(false)

    const syncBalance = useCallback(async () => {
        const resBalance = await userApi.getBalance()
        if (resBalance) {
            dispatch(updateUser(resBalance.data))
        }
    }, [])

    const onRefresh = async () => {
        setLoading(true)
        window.loadingIndicator.show()
        const res = await userApi.getHistoryRewardWallet({ skip: 0, take: 20 })
        if (res) {
            setListTransaction(res.data)
        }
        await syncBalance()
        setLoading(false)
        window.loadingIndicator.hide()
    }

    // useEffect(() => {
    //     onRefresh()
    // }, [])

    const loadMore = useCallback(async () => {
        setLoadingBottom(true)
        const res = await userApi.getHistoryRewardWallet({ skip: listTransaction.length, take: 20 })
        setLoadingBottom(false)
        if (res) {
            setListTransaction([...listTransaction, ...res.data])
        }
    }, [listTransaction])

    useEffect(() => {
        setSectionData(groupBySortedFlucs(listTransaction))
    }, [listTransaction])

    const toggleHistory = useCallback(() => {
        setShowHistory(!showHistory)
        if (!showHistory) onRefresh()
    }, [showHistory, onRefresh])

    useEffect(() => {
        if (route?.params?.expandHistory == true
            && isFocused) {
            setShowHistory(true)
            onRefresh()
        }
    }, [isFocused])


    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"Đổi thưởng"} />

            <View style={styles.body}>
                <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 8 }}>
                    <Image source={Images.trophy} style={{ width: 40, height: 40 }} tintColor={Color.luckyKing} />
                    <View style={{ marginLeft: 8 }}>
                        <IText style={{ lineHeight: 16.8 }}>{"Tiền thưởng"}</IText>
                        <IText style={{ lineHeight: 16.8, color: Color.luckyKing }}>{`${printMoney(rewardWalletBalance)}đ`}</IText>
                    </View>
                </View>

                <View style={styles.line} />

                <IText style={{ marginTop: 10, marginLeft: 16, fontWeight: 'bold' }}>{"Các hình thức đổi thưởng:"}</IText>

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

                <IText style={styles.txtHistory} onPress={toggleHistory}>
                    {"Lịch sử Tài khoản đổi thưởng"}
                </IText>

                {
                    showHistory ?
                        <SectionList
                            style={{ marginTop: 8 }}
                            sections={sectionData}
                            renderItem={({ item, index }: any) => {
                                return (
                                    <ItemTransaction item={item} />
                                )
                            }}
                            renderSectionHeader={({ section: { key } }) => (
                                <View style={styles.itemHeader}>
                                    <IText style={{ fontWeight: 'bold' }}>
                                        {key}
                                    </IText>
                                </View>
                            )}
                            keyExtractor={(item: any, index) => String(item.id)}
                            refreshControl={
                                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                            }
                            ListFooterComponent={<View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                                {loadingBottom ?
                                    <ActivityIndicator size={"large"} color={Color.gray} />
                                    : <></>}
                            </View>}
                            ListEmptyComponent={
                                <View style={{ marginTop: 16, justifyContent: 'center', alignItems: 'center' }}>
                                    <IText style={{ fontSize: 16, color: Color.luckyKing, fontWeight: 'bold' }}>{ERR_MES.NO_TRANSACTION}</IText>
                                </View>}
                            onEndReached={loadMore}
                        />
                        : <></>
                }
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
    rightArrow: { width: 10, height: 20 },
    itemHeader: { height: 40, justifyContent: 'center', backgroundColor: Color.historyBackground, paddingLeft: 8 },
    txtHistory: {
        marginTop: 10, textAlign: 'center', fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: Color.blue
    }
})