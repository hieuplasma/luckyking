import { lotteryApi } from '@api';
import { LIST_STATUS, OrderStatus } from '@common';
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

type Status = 'booked' | 'returned'

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

    const [status, setStatus] = useState<Status>('booked')

    const check = useCallback((param: any) => {
        if (status == 'booked') return LIST_STATUS.BOOKED.includes(param.status)
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
                <TouchableOpacity onPress={() => setStatus('booked')}>
                    <IText style={{
                        fontSize: 18,
                        color: status == 'booked' ? Color.luckyKing : Color.black,
                        textDecorationLine: status == 'booked' ? 'underline' : 'none'
                    }}>
                        {"Đã đặt"}
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