import { lotteryApi } from "@api";
import { Image, Images } from "@assets";
import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { kenoAnalysis, printDraw2, printNumber } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const lottColor = Color.keno
const list_sb = [
    { title: 'LỚN ', value: 'big' },
    { title: 'HOÀ', value: 'draw' },
    { title: 'NHỎ ', value: 'small' }
]

const list_eo = [
    { title: 'CHẴN ', value: 'even' },
    { title: 'CHẴN 11-12', value: 'even_11_12' },
    { title: 'HÒA', value: 'draw' },
    { title: 'LẺ 11-12', value: 'odd_11_12' },
    { title: 'LẺ ', value: 'odd' },
]

const ResultKenoTab = React.memo(() => {
    return (
        <ExpensiveRerender />
    )
})
export default ResultKenoTab

const ExpensiveRerender = React.memo(() => {

    useEffect(() => {
        console.log("expensive rerender keno")
    })

    const [list, setList] = useState<any>([])

    const [isLoading, setIsLoading] = useState(false)

    const onRefresh = useCallback(async () => {
        window.loadingIndicator.show()
        setIsLoading(true)
        const res = await lotteryApi.getResultKeno({ skip: 0, take: 10 })
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
        const res = await lotteryApi.getResultKeno({ skip: list.length, take: 10 })
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
                ListFooterComponent={<View style={{ height: 100, justifyContent:'center', alignItems:'center' }}>
                    <ActivityIndicator size={"large"}/>
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
    const analysis = kenoAnalysis(result)

    return (
        <View>
            <Image style={{ width: windowWidth - 20, height: 305, marginVertical: 8 }} resizeMode="stretch" source={Images.keno_banner}>
                <View style={styles.above}>
                    <IText style={styles.titleFirstItem}>
                        {`Kỳ quay ${printDraw2(data)}`}
                    </IText>
                </View>
                <Image source={Images.keno_logo} style={{ height: 64.71, marginTop: 48 }} resizeMode="contain" />

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingHorizontal: '3%', marginTop: 16 }}>
                    {
                        result.map((it: number, id: number) => {
                            return (
                                <View style={styles.ball_container} key={id}>
                                    <View style={styles.ball_first}>
                                        <ConsolasText style={{ fontWeight: 'bold', color: lottColor }} >
                                            {printNumber(it)}
                                        </ConsolasText>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4 }}>
                    {list_sb.map(it => {
                        return (
                            <View style={[styles.btn_first, { marginHorizontal: 8 }]} key={it.value}>
                                <IText style={[styles.txt_btn, { color: analysis.small_big == it.value ? Color.luckyKing : Color.black }]}>
                                    {it.title + ' ' + (it.value == 'big' ? `(${analysis.big})` : it.value == 'small' ? `(${analysis.small})` : '')}
                                </IText>
                            </View>
                        )
                    })}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 8 }}>
                    {list_eo.map(it => {
                        return (
                            <View style={[styles.btn_first, { width: it.value == 'draw' ? 40 : (it.value == 'even' || it.value == 'odd') ? 72 : 75 }]} key={it.value}>
                                <IText style={[styles.txt_btn, { color: analysis.even_odd == it.value ? Color.luckyKing : Color.black }]}>
                                    {it.title + (it.value == 'even' ? `(${analysis.even})` : it.value == 'odd' ? `(${analysis.odd})` : '')}
                                </IText>
                            </View>
                        )
                    })}
                </View>

                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 16 }} onPress={() => { }} activeOpacity={1}>
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
    const analysis = kenoAnalysis(result)
    return (
        <TouchableOpacity style={styles.per_item_container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <IText style={styles.txt_draw}>
                    <IText style={{ fontWeight: 'bold' }}>{"Kỳ: "}</IText>
                    {`${printDraw2(data)}`}
                </IText>
                <Image style={{ width: 20, height: 10 }} source={Images.right_arrow} tintColor={'#303030'} />
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingHorizontal: '1%' }}>
                {
                    result.map((it: number, id: number) => {
                        return (
                            <View style={styles.ball_container} key={id}>
                                <View style={styles.ball_per}>
                                    <ConsolasText style={{ color: lottColor }} >
                                        {printNumber(it)}
                                    </ConsolasText>
                                </View>
                            </View>
                        )
                    })
                }
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4 }}>
                {list_sb.map(it => {
                    return (
                        <View style={[styles.btn_first, { marginHorizontal: 8, borderColor: lottColor, borderWidth: 1 }]} key={it.value}>
                            <IText style={[styles.txt_btn, { color: analysis.small_big == it.value ? Color.luckyKing : Color.black }]}>
                                {it.title + ' ' + (it.value == 'big' ? `(${analysis.big})` : it.value == 'small' ? `(${analysis.small})` : '')}
                            </IText>
                        </View>
                    )
                })}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 8 }}>
                {list_eo.map(it => {
                    return (
                        <View style={[styles.btn_first, { width: it.value == 'draw' ? 40 : (it.value == 'even' || it.value == 'odd') ? 72 : 75, borderColor: lottColor, borderWidth: 1 }]} key={it.value}>
                            <IText style={[styles.txt_btn, { color: analysis.even_odd == it.value ? Color.luckyKing : Color.black }]}>
                                {it.title + (it.value == 'even' ? `(${analysis.even})` : it.value == 'odd' ? `(${analysis.odd})` : '')}
                            </IText>
                        </View>
                    )
                })}
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
    ball_container: { width: '10%', height: 34, justifyContent: 'center', alignItems: 'center' },
    ball_first: {
        width: 28, height: 28,
        backgroundColor: Color.white,
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_first: {
        width: 72, height: 25,
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10, backgroundColor: Color.white,
    },
    txt_btn: {
        fontWeight: '600',
        color: Color.black,
        fontSize: 13
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
        width: 28, height: 28,
        backgroundColor: Color.white,
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: lottColor, borderWidth: 1
    },
})