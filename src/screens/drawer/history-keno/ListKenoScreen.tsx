import { lotteryApi } from '@api';
import { Icon, Images, Image } from '@assets';
import { NumberDetail } from '@common';
import { ConsolasText, ImageHeader, IText } from '@components';
import { ScreenName, } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, Style } from '@styles';
import { dateTimeConvert, NavigationUtils, printDrawCode, printMoney, printNumber, printWeekDate, ScreenUtils } from '@utils';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { HistoryKenoStackParamList } from 'src/navigation/drawer/HistoryKenoNavigation';

type NavigationProp = StackNavigationProp<HistoryKenoStackParamList, 'HistoryKenoScreen'>;
type NavigationRoute = RouteProp<HistoryKenoStackParamList, 'HistoryKenoScreen'>;

export interface HistoryKenocreenParamsList { }

const getData = {
    81: 'Lớn',
    82: 'Nhỏ',
    83: 'Hoà LN',
    84: 'Chẵn 13+',
    85: 'Hòa CL',
    86: 'Lẻ 13+',
    87: 'Chẵn 11-12',
    88: 'Lẻ 11-12'
}

export const HistoryKenoScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const rewardWalletBalance = useSelector((state: any) => state.userReducer.rewardWalletBalance)

    const navigate = (screen: string) => {
        NavigationUtils.navigate(navigation, screen)
    }

    const [listOrderKeno, setListOrderKeno] = useState([])
    const [isLoading, setLoading] = useState(false)

    const onRefresh = useCallback(async () => {
        setLoading(true)
        window.loadingIndicator.show()
        const res = await lotteryApi.getAllOrder({})
        if (res) {
            setListOrderKeno(res.data.filter(check).sort(compare))
        }
        setLoading(false)
        window.loadingIndicator.hide()
    }, [])

    function check(param: any) {
        return true
        // return param.type == "withdraw"
    }

    function compare(a: any, b: any) {
        if (a.creataAt < b.creataAt) {
            return 1;
        }
        if (a.creataAt > b.creataAt) {
            return -1;
        }
        return 0;
    }

    useEffect(() => {
        onRefresh()
    }, [navigation])

    const getName = useCallback((number: number) => {
        //@ts-ignore
        return getData[`${number}`]
    }, [])

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"LỊCH SỬ ĐẶT VÉ KENO"} />

            <View style={styles.body}>
                <FlatList
                    style={{ marginTop: 16 }}
                    data={listOrderKeno.sort()}
                    renderItem={({ item, index }: any) => {
                        const numberDetail: NumberDetail[] = JSON.parse(item.Lottery[0].NumberLottery.numberDetail.toString())
                        return (
                            <View style={{
                                width: '100%',
                                paddingHorizontal: 8,
                                backgroundColor: index % 2 == 0 ? Color.white : "#EFEEEC",
                            }}>
                                <IText>{"#000000" + item.displayId}</IText>
                                <IText>{printMoney(item.amount) + "đ"}</IText>
                                <IText>{"Thời gian mua: " + new Date(item.creataAt).toLocaleString()}</IText>
                                {
                                    item.Lottery[0].drawCode.map((code: number, indexCode: number) => {
                                        return (
                                            <View style={styles.lineBottom} key={code}>
                                                <IText style={{ fontSize: 14, fontWeight: '400' }}>
                                                    {`Kỳ ${printDrawCode(item.Lottery[0].drawCode[indexCode])} - ${dateTimeConvert(new Date(item.Lottery[0].drawTime[indexCode]))}`}
                                                </IText>
                                                {/* <Image source={Images.edit_pen} style={styles.iconTrash}></Image> */}
                                            </View>
                                        )
                                    })
                                }
                                {
                                    numberDetail.map((it: any, id: number) => {
                                        const numbers: number[] = it.boSo.split("-").map(Number);
                                        return (
                                            <View key={'' + it.boSo + id}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                                    <IText style={{ fontSize: 18, fontWeight: '600', color: Color.black }}>
                                                        {String.fromCharCode(65 + id)}
                                                    </IText>
                                                    <View style={{ marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                                        {
                                                            (numbers[0] <= 80) ?
                                                                numbers.map((number: number, id2: number) => {
                                                                    return (
                                                                        <View key={number + '' + id2} style={[styles.ball, { backgroundColor: Color.keno }]}>
                                                                            <ConsolasText style={styles.textBall}>
                                                                                {`${printNumber(number)}`}
                                                                            </ConsolasText>
                                                                        </View>
                                                                    )
                                                                })
                                                                : <View style={[styles.borderButton, { borderColor: Color.keno, height: 30, paddingHorizontal: 15 }]}>
                                                                    <IText style={{ color: Color.keno, fontWeight: 'bold' }}>{getName(numbers[0])}</IText>
                                                                </View>
                                                        }
                                                    </View>
                                                </View>
                                                <IText>{printMoney(it.tienCuoc) + "đ"}</IText>
                                                <View style={styles.underLine} />
                                            </View>
                                        )
                                    })
                                }
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
    line: {
        height: 1, backgroundColor: '#A0A0A0', opacity: 0.2,
        width: '100%', marginTop: 8
    },
    lineBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12
    },
    underLine: {
        width: windowWidth - 32, height: 1,
        backgroundColor: '#A0A0A0', marginHorizontal: -16,
        marginTop: 12, opacity: 0.2
    },
    ball: {
        width: 24, height: 24, borderRadius: 99,
        backgroundColor: Color.power,
        justifyContent: 'center', alignItems: 'center',
        margin: 5
    },
    textBall: { fontSize: 13, color: Color.white },
    borderButton: {
        borderWidth: 1, borderColor: Color.black,
        borderRadius: 15, marginVertical: 4, marginLeft: 10,
        height: 23, paddingHorizontal: 10,
        justifyContent: 'center', alignItems: 'center'
    },
})