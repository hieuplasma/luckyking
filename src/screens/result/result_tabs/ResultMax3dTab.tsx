import { lotteryApi } from "@api";
import { LotteryType } from "@common";
import { IText } from "@components";
import { Color } from "@styles";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { FirstItemMax3d, PerItemMax3d } from "../component/ItemMax3d";

const lottColor = Color.max3d

const ResultMax3dTab = React.memo(({ navigation }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} />
    )
})
export default ResultMax3dTab

const ExpensiveRerender = React.memo(({ navigation }: any) => {

    useEffect(() => {
        console.log("expensive rerender max3d")
    })

    const [list, setList] = useState<any>([])

    const [isLoading, setIsLoading] = useState(false)

    const onRefresh = useCallback(async () => {
        window.loadingIndicator.show()
        setIsLoading(true)
        const res = await lotteryApi.getResultMax3d({ skip: 0, take: 10, type: LotteryType.Max3D })
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
        const res = await lotteryApi.getResultMax3d({ skip: list.length, take: 10, type: LotteryType.Max3D })
        setList([...list, ...res.data])
    }, [list])

    const renderItem = useCallback(({ item, index }: any) => {
        if (index == 0) return <FirstItemMax3d data={item} type={LotteryType.Max3D} navigation={navigation} />
        return <PerItemMax3d data={item} type={LotteryType.Max3D} navigation={navigation} />
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
    }
})

// {/* <View style={styles.choosingBar}>
//                 <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setCurrentType(LotteryType.Max3D)}>
//                     <View style={styles.circleOut}>
//                         <View style={[styles.circleIn, { backgroundColor: currentType == LotteryType.Max3D ? lottColor : Color.transparent }]}></View>
//                     </View>
//                     <IText style={{ marginLeft: 4 }}>{"Max3D"}</IText>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setCurrentType(LotteryType.Max3DPlus)}>
//                     <View style={styles.circleOut}>
//                         <View style={[styles.circleIn, { backgroundColor: currentType == LotteryType.Max3DPlus ? lottColor : Color.transparent }]}></View>
//                     </View>
//                     <IText style={{ marginLeft: 4 }}>{"Max3D+"}</IText>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setCurrentType(LotteryType.Max3DPro)}>
//                     <View style={styles.circleOut}>
//                         <View style={[styles.circleIn, { backgroundColor: currentType == LotteryType.Max3DPro ? lottColor : Color.transparent }]}></View>
//                     </View>
//                     <IText style={{ marginLeft: 4 }}>{"Max3DPro"}</IText>
//                 </TouchableOpacity>
//             </View> */}
