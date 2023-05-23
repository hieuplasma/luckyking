import { lotteryApi } from '@api';
import { OrderStatus } from '@common';
import { ImageHeader, IText } from '@components';
import { HistoryBasicStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { NavigationUtils } from '@utils';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { OrderBasicItem } from './component/OrderBasicItem';

type NavigationProp = StackNavigationProp<HistoryBasicStackParamList, 'HistoryBasicScreen'>;
type NavigationRoute = RouteProp<HistoryBasicStackParamList, 'HistoryBasicScreen'>;

export interface HistoryBasicScreenParamsList { }

type Status = 'pending' | 'complete' | 'returned'

const PendingList = [OrderStatus.PENDING, OrderStatus.LOCK]

const CompleteList = [OrderStatus.CONFIRMED,
OrderStatus.WON, OrderStatus.PAID, OrderStatus.NO_PRIZE]

const ErrorList = [OrderStatus.ERROR, OrderStatus.RETURNED]

export const HistoryBasicScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();

    const [listOrder, setListOrder] = useState([])
    const [isLoading, setLoading] = useState(false)

    const onRefresh = useCallback(async () => {
        setLoading(true)
        window.loadingIndicator.show()
        const res = await lotteryApi.getAllOrder({ ticketType: 'basic' })
        if (res) {
            setListOrder(res.data.sort(compare))
        }
        setLoading(false)
        window.loadingIndicator.hide()
    }, [])

    const [status, setStatus] = useState<Status>('complete')

    const check = useCallback((param: any) => {
        if (status == 'complete') return CompleteList.includes(param.status)
        if (status == 'pending') return PendingList.includes(param.status)
        if (status == 'returned') return ErrorList.includes(param.status)
    }, [status])

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
    }, [navigation])

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"LỊCH SỬ ĐẶT VÉ CƠ BẢN"} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 11 }}>
                <TouchableOpacity onPress={() => setStatus('pending')}>
                    <IText style={{
                        fontSize: 18,
                        color: status == 'pending' ? Color.luckyKing : Color.black,
                        textDecorationLine: status == 'pending' ? 'underline' : 'none'
                    }}>
                        {"Đợi in"}
                    </IText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStatus('complete')}>
                    <IText style={{
                        fontSize: 18,
                        color: status == 'complete' ? Color.luckyKing : Color.black,
                        textDecorationLine: status == 'complete' ? 'underline' : 'none'
                    }}>
                        {"Hoàn thành"}</IText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStatus('returned')}>
                    <IText style={{
                        fontSize: 18,
                        color: status == 'returned' ? Color.luckyKing : Color.black,
                        textDecorationLine: status == 'returned' ? 'underline' : 'none'
                    }}>
                        {"Đã huỷ"}</IText>
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <FlatList
                    style={{ marginTop: 16 }}
                    data={listOrder.filter(check)}
                    extraData={listOrder.filter(check)}
                    renderItem={({ item, index }: any) => {
                        return <OrderBasicItem order={item}
                            onPress={() => NavigationUtils.navigate(navigation, ScreenName.Drawer.OrderBasicScreen, { order: item, status: status })} />
                    }}
                    keyExtractor={(item: any, index) => String(item.id)}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    ListFooterComponent={<View style={{ height: 100 }}></View>}
                />
            </View>
        </View >
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
        flex: 1
    },
    lineItem: {
        marginTop: 12,
        flexDirection: 'row', justifyContent: 'space-between'
    },
    txItem: {
        color: '#4F4D4D'
    }
})