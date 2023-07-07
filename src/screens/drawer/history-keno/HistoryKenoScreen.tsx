import { lotteryApi } from '@api';
import { ERR_MES, LIST_STATUS, OrderStatus } from '@common';
import { ImageHeader, IText } from '@components';
import { HistoryKenoStackParamList, ScreenName } from '@navigation';
import { RouteProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { NavigationUtils } from '@utils';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { OrderItem } from './component/OrderKenoItem';

type NavigationProp = StackNavigationProp<HistoryKenoStackParamList, 'HistoryKenoScreen'>;
type NavigationRoute = RouteProp<HistoryKenoStackParamList, 'HistoryKenoScreen'>;

export interface HistoryKenocreenParamsList { }

type Status = 'pending' | 'complete' | 'returned'

export const HistoryKenoScreen = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();
    const isFocused = useIsFocused();

    const [listOrderKeno, setListOrderKeno] = useState([])
    const [isLoading, setLoading] = useState(false)

    const onRefresh = useCallback(async () => {
        setLoading(true)
        window.loadingIndicator.show()
        const res = await lotteryApi.getAllOrder({ ticketType: 'keno' })
        if (res) {
            setListOrderKeno(res.data.sort(compare))
        }
        setLoading(false)
        window.loadingIndicator.hide()
    }, [])

    const [status, setStatus] = useState<Status>('pending')

    const check = useCallback((param: any) => {
        if (status == 'pending') return LIST_STATUS.PENDING.includes(param.status)
        if (status == 'complete') return LIST_STATUS.PRINTED.includes(param.status)
        if (status == 'returned') return LIST_STATUS.ERROR.includes(param.status)
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
        if (isFocused)
            onRefresh()
    }, [isFocused])

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"LỊCH SỬ ĐẶT VÉ KENO"} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 11 }}>
                <TouchableOpacity onPress={() => setStatus('pending')}>
                    <IText style={{
                        fontSize: 18,
                        color: status == 'pending' ? Color.luckyKing : Color.black,
                        textDecorationLine: status == 'pending' ? 'underline' : 'none'
                    }}>
                        {"Đợi in vé"}
                    </IText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStatus('complete')}>
                    <IText style={{
                        fontSize: 18,
                        color: status == 'complete' ? Color.luckyKing : Color.black,
                        textDecorationLine: status == 'complete' ? 'underline' : 'none'
                    }}>
                        {"Đã in xong"}
                    </IText>
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
                    data={listOrderKeno.filter(check)}
                    extraData={listOrderKeno.filter(check)}
                    renderItem={({ item, index }: any) => {
                        return <OrderItem
                            order={item}
                            onPress={() => NavigationUtils.navigate(navigation, ScreenName.Drawer.OrderKenoScreen, { order: item })}
                            bgColor={index % 2 == 0 ? Color.white : Color.transparent}
                        />
                    }}
                    keyExtractor={(item: any, index) => String(item.id)}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    ListFooterComponent={<View style={{ height: 100 }}></View>}
                    ListEmptyComponent={
                        <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <IText style={{ fontSize: 20, color: Color.luckyKing, fontWeight: 'bold' }}>{ERR_MES.NO_LOTTERY}</IText>
                        </View>
                    }
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