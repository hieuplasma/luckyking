import { Image, Images } from "@assets"
import { ConsolasText, IText } from "@components"
import { ScreenName } from "@navigation"
import { Color } from "@styles"
import { NavigationUtils, kenoAnalysis, printDraw2, printNumber } from "@utils"
import React, { useCallback } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"

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

interface FirstItemProps {
    data: any,
    navigation?: any,
    hideBtm?: boolean
}

export const FirstItemKeno = React.memo(({ data, navigation, hideBtm }: FirstItemProps) => {

    const result = data.result.split("-").map(Number)
    const analysis = kenoAnalysis(result)

    const navigate = useCallback(() => {
        if (navigation)
            NavigationUtils.navigate(navigation, ScreenName.ResultChild.DetailKeno, { data })
    }, [navigation, data])

    return (
        <TouchableOpacity onPress={navigate} activeOpacity={1}>
            <Image style={{ width: windowWidth - 20, height: hideBtm ? 280 : 305, marginVertical: 8 }} resizeMode="stretch" source={Images.keno_banner}>
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

                {hideBtm ? <></>
                    :
                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 16 }} onPress={() => { }} activeOpacity={1}>
                        <View style={{ flex: 1 }} />
                        <IText style={{ fontSize: 16, fontWeight: 'bold', color: Color.white, marginHorizontal: 8 }}>{"Xem chi tiết"}</IText>
                        <View style={{ flex: 1, justifyContent: 'center' }} >
                            <Image style={{ width: 20, height: 10 }} source={Images.right_arrow} />
                        </View>
                    </TouchableOpacity>}
            </Image>

            {
                hideBtm ? <></> :
                    <IText style={{ marginTop: 8, fontWeight: '600', fontSize: 15 }}>{"Kết quả các kì quay trước:"}</IText>
            }
        </TouchableOpacity>
    )
})

export const PerItemKeno = React.memo(({ data, navigation }: any) => {

    const result = data.result.split("-").map(Number)
    const analysis = kenoAnalysis(result)

    const navigate = useCallback(() => {
        NavigationUtils.navigate(navigation, ScreenName.ResultChild.DetailKeno, { data })
    }, [navigation, data])
    return (
        <TouchableOpacity style={styles.per_item_container} onPress={navigate} activeOpacity={1}>
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