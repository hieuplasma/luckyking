import { lotteryApi } from "@api";
import { Image, Images } from "@assets";
import { LotteryType } from "@common";
import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { printDraw, printDrawCode, printDrawWeekDate, printMoney, printNumber, printWeekDate } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import { FirstItemMax3d, PerItemMax3d } from "../component/ItemMax3d";

const lottColor = Color.max3dpro

const ResultMax3dProTab = React.memo(({ navigation }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} />
    )
})
export default ResultMax3dProTab

const ExpensiveRerender = React.memo(({ navigation }: any) => {

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
        if (index == 0) return <FirstItemMax3d data={item} type={LotteryType.Max3DPro} navigation={navigation} />
        return <PerItemMax3d data={item} type={LotteryType.Max3DPro} navigation={navigation} />
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
})