import { lotteryApi } from "@api";
import { Image, Images } from "@assets";
import { LotteryType } from "@common";
import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { printDraw, printDrawCode, printDrawWeekDate, printMoney, printNumber, printWeekDate } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";

const lottColor = Color.max3dpro

const ResultMax3dProTab = React.memo(() => {
    return (
        <ExpensiveRerender />
    )
})
export default ResultMax3dProTab

const ExpensiveRerender = React.memo(() => {

    useEffect(() => {
        console.log("expensive rerender max3dpro")
    })

    const [list, setList] = useState<any>([])

    const [isLoading, setIsLoading] = useState(false)

    const onRefresh = useCallback(async () => {
        window.loadingIndicator.show()
        setIsLoading(true)
        const res = await lotteryApi.getResultMax3d({ skip: 0, take: 10, type: LotteryType.Max3DPro })
        if (res) {
            setList(res.data)
        }
        window.loadingIndicator.hide()
        setIsLoading(false)
    }, [])

    useEffect(() => {
        onRefresh()
    }, [])

    const loadMore = useCallback(async () => {
        const res = await lotteryApi.getResultMax3d({ skip: list.length, take: 10, type: LotteryType.Max3DPro })
        setList([...list, ...res.data])
    }, [list])

    const renderItem = useCallback(({ item, index }: any) => {
        if (index == 0) return <FirstItem data={item} />
        return <PerItem data={item} />
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <FlatList
                style={{ flex: 1, width: windowWidth, paddingHorizontal: -10 }}
                data={list}
                extraData={list}
                keyExtractor={(item: any, index: number) => String(item.id)}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <IText style={{ fontSize: 16, color: Color.luckyKing, fontWeight: 'bold' }}>{"Không có dữ liệu!"}</IText>
                    </View>}
                ListFooterComponent={<View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} />
                </View>}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                maxToRenderPerBatch={10}
            />
        </View>
    )
})

const FirstItem = React.memo(({ data }: any) => {

    console.log(data.first)

    return (
        <View >
            <Image style={styles.img_cont} resizeMode="stretch" source={Images.max3d_banner}>
                <View style={styles.above}>
                    <IText style={styles.titleFirstItem}>
                        {`Kỳ quay ${printDrawWeekDate(data)}`}
                    </IText>
                </View>
                <Image source={Images.max3dpro_logo} style={{ height: 75.80, marginTop: 48 }} resizeMode="contain" />
                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 8 }} onPress={() => { }} activeOpacity={1}>
                    <View style={{ flex: 1 }} />
                    <IText style={{ fontSize: 16, fontWeight: 'bold', color: Color.white, marginHorizontal: 8 }}>{"Xem chi tiết"}</IText>
                    <View style={{ flex: 1, justifyContent: 'center' }} >
                        <Image style={{ width: 20, height: 10 }} source={Images.right_arrow} />
                    </View>
                </TouchableOpacity>
            </Image>

            <View style={{ height: 282, width: windowWidth - 20, borderWidth: 1, borderColor: lottColor, borderRadius: 10 }}>
                <View style={[styles.per_result, { borderRadius: 10 }]}>
                    <View style={{ width: 100, justifyContent: 'center' }}>
                        <IText style={styles.txt_inside}>{"Giải đặc biệt"}</IText>
                        <IText style={styles.txt_money}>{printMoney(1000000)}</IText>
                    </View>
                    <View style={styles.vertical_line} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <IText style={styles.txt_inside}>{"Trùng 1 bộ ba số bất kì"}</IText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    data.special[0].split("").map((number: number, idx: number) => {
                                        return (
                                            <View style={styles.ball} key={idx}>
                                                <ConsolasText style={{ color: Color.white, fontSize: 18 }}>{number}</ConsolasText>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    data.special[1].split("").map((number: number, idx: number) => {
                                        return (
                                            <View style={styles.ball} key={idx}>
                                                <ConsolasText style={{ color: Color.white, fontSize: 18 }}>{number}</ConsolasText>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.per_result, { backgroundColor: '#EFEEEC' }]}>
                    <View style={{ width: 100, justifyContent: 'center' }}>
                        <IText style={styles.txt_inside}>{"Giải nhất"}</IText>
                        <IText style={styles.txt_money}>{printMoney(300000)}</IText>
                    </View>
                    <View style={styles.vertical_line} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <IText style={styles.txt_inside}>{"Trùng 1 bộ ba số bất kì"}</IText>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                data.first.map((it: string, idx: number) => {
                                    return (
                                        <View style={{ width: '50%' }} key={idx}>
                                            <IText style={styles.txt_number} >{it}</IText>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
                <View style={[styles.per_result, { borderRadius: 10 }]}>
                    <View style={{ width: 100, justifyContent: 'center' }}>
                        <IText style={styles.txt_inside}>{"Giải nhì"}</IText>
                        <IText style={styles.txt_money}>{printMoney(210000)}</IText>
                    </View>
                    <View style={styles.vertical_line} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <IText style={styles.txt_inside}>{"Trùng 1 bộ ba số bất kì"}</IText>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                data.second.map((it: string, idx: number) => {
                                    return (
                                        <View style={{ width: '33%' }} key={idx}>
                                            <IText style={styles.txt_number} >{it}</IText>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
                <View style={[styles.per_result, { backgroundColor: '#EFEEEC', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
                    <View style={{ width: 100, justifyContent: 'center' }}>
                        <IText style={styles.txt_inside}>{"Giải ba"}</IText>
                        <IText style={styles.txt_money}>{printMoney(100000)}</IText>
                    </View>
                    <View style={styles.vertical_line} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <IText style={styles.txt_inside}>{"Trùng 1 bộ ba số bất kì"}</IText>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                data.third.map((it: string, idx: number) => {
                                    return (
                                        <View style={{ width: '25%' }} key={idx}>
                                            <IText style={styles.txt_number}>{it}</IText>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </View>

            <IText style={{ marginTop: 8, fontWeight: '600', fontSize: 15 }}>{"Kết quả các kì quay trước:"}</IText>
        </View>
    )
})

const PerItem = React.memo(({ data }: any) => {

    return (
        <TouchableOpacity style={styles.per_item_container}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View>
                    <IText style={{ fontWeight: 'bold' }}>{"Kỳ quay"}</IText>
                    <IText style={{ color: lottColor }}>{printDrawCode(data.drawCode)}</IText>
                </View>
                <View style={{ marginLeft: 32 }}>
                    <IText style={{ fontWeight: 'bold' }}>{"Thời gian quay"}</IText>
                    <IText style={{ fontSize: 15 }}>{printWeekDate(new Date(data.drawTime))}</IText>
                </View>
                <View style={{ flex: 1 }} />
                <Image style={{ width: 20, height: 10 }} source={Images.right_arrow} tintColor={'#303030'} />
            </View>
        </TouchableOpacity>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    choosingBar: {
        flexDirection: 'row', marginVertical: 8,
        justifyContent: 'space-around', alignItems: 'center'
    },
    circleOut: {
        width: 16, height: 16,
        borderRadius: 99, borderWidth: 1,
        borderColor: lottColor,
        justifyContent: 'center', alignItems: 'center'
    },
    circleIn: {
        width: 10, height: 10,
        borderRadius: 99, borderWidth: 1,
        borderColor: lottColor
    },

    img_cont: { width: windowWidth - 20, height: 160, marginTop: 8 },
    above: {
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 37,
        justifyContent: 'center', alignItems: 'center'
    },
    titleFirstItem: {
        color: Color.white,
        fontWeight: 'bold',
    },
    txt_draw: {
        fontSize: 15,
    },
    per_item_container: {
        marginTop: 10, borderColor: 'rgba(160, 160, 160, 0.2)',
        borderTopWidth: 1,
        paddingTop: 10,
        width: windowWidth - 20,
    },
    per_result: {
        height: 70, width: '100%',
        backgroundColor: Color.white,
        flexDirection: 'row'
    },
    vertical_line: {
        height: '100%', width: 1, backgroundColor: '#A0A0A0'
    },
    txt_inside: { fontSize: 13, textAlign: 'center' },
    txt_money: {
        fontSize: 16, color: lottColor, textAlign: 'center'
    },
    txt_number: { fontSize: 14, color: lottColor, alignSelf: 'center' },
    ball: {
        width: 26, height: 26, backgroundColor: lottColor,
        borderRadius: 99,
        justifyContent: 'center', alignItems: 'center',
        marginHorizontal: 2
    }
})