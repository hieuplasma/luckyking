import { lotteryApi, userApi } from '@api';
import { Images, Image } from '@assets';
import { BasicHeader, IText } from '@components';
import { WithdrawStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { fullDateTimeConvert, fullDateTimeConvert2, printDisplayId, printMoney } from '@utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, FlatList, RefreshControl, ActivityIndicator, } from 'react-native';

type NavigationProp = StackNavigationProp<WithdrawStackParamList, 'WithdrawRequestScreen'>;
type NavigationRoute = RouteProp<WithdrawStackParamList, 'WithdrawRequestScreen'>;

export interface WithdrawRequestScreenParamsList { }

export const WithdrawRequestScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const [withdraw, setWithdraw] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const getWithdraw = useCallback(async () => {
        setIsLoading(true)
        const res = await userApi.getAllBankWithdraw()
        if (res) {
            setWithdraw(res.data)
        }
        setIsLoading(false)
    }, [])
    useEffect(() => {
        getWithdraw()
    }, [])

    const loadMore = useCallback(async () => {
        const res = await userApi.getAllBankWithdraw()
        setWithdraw([...withdraw, ...res.data])
    }, [withdraw])

    const renderItem = useCallback(({ item, index }: any) => {
        return (
            <View style={{ padding: 16, borderBottomWidth: 1, borderColor: Color.gray }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <IText style={{ fontWeight: 'bold' }}>{printDisplayId(item.displayId) + ":"}</IText>
                    <IText style={{ fontWeight: 'bold', fontSize: 18, color: Color.luckyKing }}>
                        {printMoney(item.amount) + "đ"}
                    </IText>
                </View>

                <IText style={{ fontStyle: 'italic' }}>
                    {"Thông tin chuyển khoản: "}
                </IText>
                <IText style={{ fontWeight: 'bold', color: Color.blue }}>
                    {`${item.shortName} - ${item.accountNumber} - ${item.userName}`}
                </IText>
                <IText >
                    {"Ngày tạo: " + fullDateTimeConvert2(new Date(item.createdAt))}
                </IText>
                {
                    item.confirmAt ?
                        <IText >
                            {"Ngày xác nhận: " + fullDateTimeConvert2(new Date(item.confirmAt))}
                        </IText>
                        : <></>
                }

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IText >
                        {"Trạng thái: "}
                    </IText>
                    <View
                        style={{
                            padding: 3, paddingHorizontal: 8,
                            borderRadius: 10, marginLeft: 4,
                            backgroundColor: item.status == "success" ? `rgba(84, 214, 44, 0.16)` :
                                item.status == "false" ? 'rgba(255, 72, 66, 0.16)' : 'rgba(255, 193, 7, 0.16)'
                        }}>
                        <IText style={{
                            fontWeight: 'bold',
                            color: item.status == "success" ? 'rgb(34, 154, 22)' :
                                item.status == "false" ? 'rgb(183, 33, 54)' : 'rgb(183, 129, 3)'
                        }}>
                            {item.status == "success" && "Thành công"}
                            {item.status == "false" && "Bị từ chối"}
                            {item.status == "pending" && "Đang chờ duyệt"}
                        </IText>
                    </View>
                </View>

                {
                    item.status == "false" ?
                        <IText >
                            {"Lý do từ chối: "}
                            <IText style={{ fontWeight: 'bold' }}>
                                {item.statusDescription}
                            </IText>
                        </IText>
                        : <></>
                }
            </View>
        )
    }, [])

    return (
        <View style={styles.container}>
            <BasicHeader navigation={navigation} title={"DS yêu cầu đổi thưởng"} />

            <View style={styles.body}>
                <FlatList
                    style={{ flex: 1, width: windowWidth, paddingHorizontal: -10 }}
                    data={withdraw}
                    extraData={withdraw}
                    keyExtractor={(item: any, index: number) => String(item.id)}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={getWithdraw} />
                    }
                    ListEmptyComponent={
                        <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <IText style={{ fontSize: 16, color: Color.luckyKing, fontWeight: 'bold' }}>{"Không có dữ liệu!"}</IText>
                        </View>}
                    ListFooterComponent={<View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        {/* <ActivityIndicator size={"large"} /> */}
                    </View>}
                    // onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    maxToRenderPerBatch={10}
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
    }
})