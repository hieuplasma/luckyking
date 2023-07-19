import {  userApi } from '@api';
import { Images, Image } from '@assets';
import { ImageHeader, IText } from '@components';
import { RechargeStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { NavigationUtils, printMoney } from '@utils';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, RefreshControl, ActivityIndicator, SectionList } from 'react-native';
import { useSelector } from 'react-redux';
import { ItemTransaction } from '../component/ItemTransaction';
import { groupBySortedFlucs } from '../component/groupData';
import { ERR_MES } from '@common';

type NavigationProp = StackNavigationProp<RechargeStackParamList, 'RechargeScreen'>;
type NavigationRoute = RouteProp<RechargeStackParamList, 'RechargeScreen'>;

export interface RechargeScreenParamsList { }

export const RechargeScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const luckykingBalance = useSelector((state: any) => state.userReducer.luckykingBalance)

    const [listTransaction, setListTransaction] = useState<any[]>([])
    const [sectionData, setSectionData] = useState<any[]>([])
    const [isLoading, setLoading] = useState(false)
    const [loadingBottom, setLoadingBottom] = useState(false)

    const onRefresh = async () => {
        setLoading(true)
        window.loadingIndicator.show()
        const res = await userApi.getHistoryMoneyAccount({ skip: 0, take: 20 })
        if (res) {
            setListTransaction(res.data)
        }
        setLoading(false)
        window.loadingIndicator.hide()
    }

    useEffect(() => {
        onRefresh()
    }, [])

    const loadMore = useCallback(async () => {
        setLoadingBottom(true)
        const res = await userApi.getHistoryMoneyAccount({ skip: listTransaction.length, take: 20 })
        setLoadingBottom(false)
        if (res) {
            setListTransaction([...listTransaction, ...res.data])
        }
    }, [listTransaction])

    useEffect(() => {
        setSectionData(groupBySortedFlucs(listTransaction))
    }, [listTransaction])

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

                <IText style={{ marginTop: 10, marginLeft: 16, fontWeight: 'bold' }}>{"Các hình thức nạp tiền:"}</IText>

                <TouchableOpacity style={styles.borderItem} onPress={() => NavigationUtils.navigate(navigation, ScreenName.Drawer.BankRechargeScreen)}>
                    <Image source={Images.bank_center} style={{ width: 28, height: 28 }} />
                    <IText style={{ marginLeft: 16 }}>{"Chuyển khoản ngân hàng"}</IText>
                    <View style={{ flex: 1 }} />
                    <Image source={Images.right_arrow} style={styles.rightArrow} tintColor={Color.black} />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.borderItem}>
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
                </TouchableOpacity> */}

                <IText style={{ marginTop: 10, marginLeft: 16, fontWeight: 'bold' }}>
                    {"Lịch sử  Ví LuckyKing:"}
                </IText>

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
    itemHeader: { height: 40, justifyContent: 'center', backgroundColor: Color.historyBackground, paddingLeft: 8 }
})