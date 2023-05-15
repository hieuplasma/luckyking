import { lotteryApi } from "@api";
import { IText } from "@components";
import { Color } from "@styles";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { FirstItemMega, PerItemMega } from "../component/ItemMega";

const lottColor = Color.mega

const ResultMegaTab = React.memo(({ navigation }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} />
    )
})
export default ResultMegaTab

const ExpensiveRerender = React.memo(({ navigation }: any) => {

    useEffect(() => {
        console.log("expensive rerender mega")
    })

    const [list, setList] = useState<any>([])

    const [isLoading, setIsLoading] = useState(false)

    const onRefresh = useCallback(async () => {
        window.loadingIndicator.show()
        setIsLoading(true)
        const res = await lotteryApi.getResultMega({ skip: 0, take: 10 })
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
        const res = await lotteryApi.getResultMega({ skip: list.length, take: 10 })
        setList([...list, ...res.data])
    }, [list])

    const renderItem = useCallback(({ item, index }: any) => {
        if (index == 0) return <FirstItemMega data={item} navigation={navigation} />
        return <PerItemMega data={item} navigation={navigation} />
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