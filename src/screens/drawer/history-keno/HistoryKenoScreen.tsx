import { lotteryApi } from '@api';
import { ERR_MES, LIST_STATUS, OrderStatus } from '@common';
import { ImageHeader, IText } from '@components';
import { HistoryKenoStackParamList, ScreenName } from '@navigation';
import { RouteProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { NavigationUtils } from '@utils';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, FlatList, RefreshControl, SectionList } from 'react-native';
import { OrderItem } from './component/OrderKenoItem';

type NavigationProp = StackNavigationProp<HistoryKenoStackParamList, 'HistoryKenoScreen'>;
type NavigationRoute = RouteProp<HistoryKenoStackParamList, 'HistoryKenoScreen'>;

export interface HistoryKenocreenParamsList { }

type Status = 'booked' | 'returned'

const TODAY = new Date()
TODAY.setUTCHours(0, 0, 0)

export const HistoryKenoScreen = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();
    const isFocused = useIsFocused();

    const [listOrderKeno, setListOrderKeno] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [status, setStatus] = useState<Status>('booked')

    const onRefresh = useCallback(async () => {
        setLoading(true)
        window.loadingIndicator.show()
        const res = await lotteryApi.getAllOrder2({ ticketType: 'keno', status: status })
        if (res) {
            setListOrderKeno(res.data)
        }
        setLoading(false)
        window.loadingIndicator.hide()
    }, [status])

    useEffect(() => {
        onRefresh()
    }, [status])

    useEffect(() => {
        if (isFocused)
            onRefresh()
    }, [isFocused])

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"LỊCH SỬ ĐẶT VÉ KENO"} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 11, }}>
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
                <SectionList
                    style={{ marginTop: 8 }}
                    sections={listOrderKeno}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                        <OrderItem order={item}
                            onPress={() =>
                                NavigationUtils.navigate(navigation, ScreenName.Drawer.OrderKenoScreen,
                                    { order: item, status: status })}
                        />
                    )}
                    renderSectionHeader={({ section: { key } }) => (
                        <View style={styles.itemHeader}>
                            <IText style={{ fontWeight: 'bold', marginLeft: 16 }}>
                                {key}
                            </IText>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    ListFooterComponent={<View style={{ height: 100 }}></View>}
                    ListEmptyComponent={
                        <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <IText style={{ fontSize: 20, color: Color.luckyKing, fontWeight: 'bold' }}>{ERR_MES.NO_ORDER}</IText>
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
        backgroundColor: Color.white
    },
    body: {
        flex: 1
    },
    itemHeader: { height: 40, justifyContent: 'center', backgroundColor: Color.historyBackground }
})