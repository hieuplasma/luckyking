import { lotteryApi } from "@api";
import { Images, Image } from "@assets";
import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { printDrawWeekDate, printMoney, printNumber } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";

const lottColor = Color.power

const ResultPowerTab = React.memo(() => {
    return (
        <ExpensiveRerender />
    )
})
export default ResultPowerTab

const ExpensiveRerender = React.memo(() => {

    useEffect(() => {
        console.log("expensive rerender power")
    })

    const [list, setList] = useState<any>([])

    const [isLoading, setIsLoading] = useState(false)

    const onRefresh = useCallback(async () => {
        window.loadingIndicator.show()
        setIsLoading(true)
        const res = await lotteryApi.getResultPower({ skip: 0, take: 10 })
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
        const res = await lotteryApi.getResultPower({ skip: list.length, take: 10 })
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
    const result = data.result.split("-").map(Number)
    return (
        <View>
            <Image style={{ width: windowWidth - 20, height: 356, marginVertical: 8 }} resizeMode="stretch" source={Images.power_banner}>
                <View style={styles.above}>
                    <IText style={styles.titleFirstItem}>
                        {`Kỳ quay ${printDrawWeekDate(data)}`}
                    </IText>
                </View>
                <Image source={Images.power_logo_stroke1} style={{ height: 72, marginTop: 48 }} resizeMode="contain" />

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                    {
                        result.map((number: number) => {
                            return (
                                <View style={styles.ball} key={number}>
                                    <ConsolasText style={{ color: lottColor, fontSize: 26, fontWeight: 'bold', lineHeight: 30.44 }} >
                                        {printNumber(number)}
                                    </ConsolasText>
                                </View>
                            )
                        })
                    }
                    <View style={[styles.ball, { backgroundColor: Color.luckyKing }]}>
                        <ConsolasText style={{ color: Color.white, fontSize: 26, fontWeight: 'bold', lineHeight: 30.44 }} >
                            {printNumber(data.specialNumber)}
                        </ConsolasText>
                    </View>
                </View>

                <IText style={styles.txt_bold}>
                    {"Giá trị Jackpot 1"}
                </IText>
                <IText style={[styles.txt_bold, { lineHeight: 32, fontSize: 32 }]}>
                    {result.jackpot1 ? `${printMoney(result.jackpot1)}đ` : "Không có thông tin"}
                </IText>

                <IText style={styles.txt_bold}>
                    {"Giá trị Jackpot 2"}
                </IText>
                <IText style={[styles.txt_bold, { lineHeight: 28, fontSize: 28 }]}>
                    {result.jackpot2 ? `${printMoney(result.jackpot2)}đ` : "Không có thông tin"}
                </IText>

                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 12 }} onPress={() => { }} activeOpacity={1}>
                    <View style={{ flex: 1 }} />
                    <IText style={{ fontSize: 16, fontWeight: 'bold', color: Color.white, marginHorizontal: 8 }}>{"Xem chi tiết"}</IText>
                    <View style={{ flex: 1, justifyContent: 'center' }} >
                        <Image style={{ width: 20, height: 10 }} source={Images.right_arrow} />
                    </View>
                </TouchableOpacity>
            </Image>

            <IText style={{ marginTop: 8, fontWeight: '600', fontSize: 15 }}>{"Kết quả các kì quay trước:"}</IText>
        </View>
    )
})

const PerItem = React.memo(({ data }: any) => {
    const result = data.result.split("-").map(Number)
    return (
        <TouchableOpacity style={styles.per_item_container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <IText style={styles.txt_draw}>
                    <IText style={{ fontWeight: 'bold' }}>{"Kỳ: "}</IText>
                    {`${printDrawWeekDate(data)}`}
                </IText>
                <Image style={{ width: 20, height: 10 }} source={Images.right_arrow} tintColor={'#303030'} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12, alignItems: 'center' }}>
                {
                    result.map((number: number) => {
                        return (
                            <View style={[styles.ball_per, { backgroundColor: lottColor }]} key={number}>
                                <ConsolasText style={{ color: Color.white, fontSize: 18 }} >
                                    {printNumber(number)}
                                </ConsolasText>
                            </View>
                        )
                    })
                }
                <View style={{ height: 16, width: 1, backgroundColor: "#A0A0A0" }} />
                <View style={[styles.ball_per, { backgroundColor: Color.luckyKing }]}>
                    <ConsolasText style={{ color: Color.white, fontSize: 18 }} >
                        {printNumber(data.specialNumber)}
                    </ConsolasText>
                </View>
            </View>
        </TouchableOpacity>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    above: {
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 37,
        justifyContent: 'center', alignItems: 'center'
    },
    titleFirstItem: {
        color: Color.white,
        fontWeight: 'bold',
    },
    ball: {
        width: 42, height: 42,
        justifyContent: 'center', alignItems: 'center',
        marginHorizontal: 4,
        borderRadius: 99, backgroundColor: Color.white,
    },
    txt_bold: {
        color: Color.white, marginTop: 8,
        fontWeight: 'bold', alignSelf: 'center',
        fontSize: 16
    },

    per_item_container: {
        marginTop: 10, borderColor: 'rgba(160, 160, 160, 0.2)',
        borderTopWidth: 1,
        paddingTop: 10,
        width: windowWidth - 20,
    },
    txt_draw: {
        fontSize: 15,
    },
    ball_per: {
        width: 35, height: 35,
        justifyContent: 'center', alignItems: 'center',
        marginHorizontal: 4,
        borderRadius: 99, backgroundColor: lottColor
    }
})