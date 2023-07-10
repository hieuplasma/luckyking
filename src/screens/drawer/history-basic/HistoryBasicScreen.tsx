import { lotteryApi } from '@api';
import { ERR_MES } from '@common';
import { ImageHeader, IText } from '@components';
import { HistoryBasicStackParamList, ScreenName } from '@navigation';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { NavigationUtils } from '@utils';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, FlatList, RefreshControl, SectionList } from 'react-native';
import { OrderBasicItem } from './component/OrderBasicItem';

type NavigationProp = StackNavigationProp<HistoryBasicStackParamList, 'HistoryBasicScreen'>;
type NavigationRoute = RouteProp<HistoryBasicStackParamList, 'HistoryBasicScreen'>;

export interface HistoryBasicScreenParamsList { }

type Status = 'pending' | 'complete' | 'returned'

export const HistoryBasicScreen = React.memo(() => {

    const isFocused = useIsFocused();
    const navigation = useNavigation<NavigationProp>();

    const [listOrder, setListOrder] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [status, setStatus] = useState<Status>('pending')

    const onRefresh = useCallback(async () => {
        setLoading(true)
        window.loadingIndicator.show()
        const res = await lotteryApi.getAllOrder2({ ticketType: 'basic', status: status })
        if (res) {
            setListOrder(res.data)
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
                <SectionList
                    style={{ marginTop: 8 }}
                    sections={listOrder}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                        <OrderBasicItem order={item}
                            onPress={() =>
                                NavigationUtils.navigate(navigation, ScreenName.Drawer.OrderBasicScreen,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Color.historyBackground,
        backgroundColor: Color.white
    },
    body: {
        flex: 1
    },
    itemHeader: { height: 40, justifyContent: 'center', backgroundColor: Color.historyBackground }
})