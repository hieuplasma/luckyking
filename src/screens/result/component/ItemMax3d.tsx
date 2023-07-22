import { Image, Images } from "@assets"
import { LotteryType } from "@common"
import { ConsolasText, IText } from "@components"
import { ScreenName } from "@navigation"
import { Color } from "@styles"
import { NavigationUtils, getColorLott, getLogoHeader, printDrawCode, printDrawWeekDate, printMoney, printWeekDate } from "@utils"
import React, { useCallback } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"

interface FirstItemProps {
    data: any,
    navigation?: any,
    hideBtm?: boolean,
    type: LotteryType
}

export const FirstItemMax3d = React.memo(({ data, type, navigation, hideBtm }: FirstItemProps) => {

    const lottColor = getColorLott(type)
    const logo = type == LotteryType.Max3D ? Images.max3d_logo_stroke1
        : type == LotteryType.Max3DPlus ? Images.max3dplus_logo : Images.max3dpro_logo

    if (!data.drawn) return (
        <View >
            <Image style={{ width: windowWidth - 20, height: 170, marginVertical: 8 }} resizeMode="stretch" source={Images.max3d_banner}>
                <View style={styles.above}>
                    <IText style={styles.titleFirstItem}>
                        {`Kỳ quay ${printDrawWeekDate(data)}`}
                    </IText>
                </View>
                <Image source={logo} style={{ height: 75.80, marginTop: 48 }} resizeMode="contain" />
                <IText style={{
                    fontWeight: 'bold', color: Color.white,
                    fontSize: 20, alignSelf: 'center',
                    marginTop: 16
                }}>{"Chưa có kết quả"}
                </IText>
            </Image>
        </View>
    )

    const navigate = useCallback(() => {
        if (navigation)
            NavigationUtils.navigate(navigation, ScreenName.ResultChild.DetailMax3d, { data, type })
    }, [navigation, data, type])

    return (
        <TouchableOpacity onPress={navigate} activeOpacity={1}>
            <Image style={[styles.img_cont, { height: hideBtm ? 130 : 160 }]} resizeMode="stretch" source={Images.max3d_banner}>
                <View style={styles.above}>
                    <IText style={styles.titleFirstItem}>
                        {`Kỳ quay ${printDrawWeekDate(data)}`}
                    </IText>
                </View>
                <Image source={logo} style={{ height: 75.80, marginTop: 48 }} resizeMode="contain" />
                {
                    hideBtm ? <></>
                        : <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <View style={{ flex: 1 }} />
                            <IText style={{ fontSize: 16, fontWeight: 'bold', color: Color.white, marginHorizontal: 8 }}>{"Xem chi tiết"}</IText>
                            <View style={{ flex: 1, justifyContent: 'center' }} >
                                <Image style={{ width: 20, height: 10 }} source={Images.right_arrow} />
                            </View>
                        </View>
                }
            </Image>

            <View style={{ height: 282, width: windowWidth - 20, borderWidth: 1, borderColor: lottColor, borderRadius: 10 }}>
                <View style={[styles.per_result, { borderRadius: 10 }]}>
                    <View style={{ width: 100, justifyContent: 'center' }}>
                        <IText style={styles.txt_inside}>{"Giải đặc biệt"}</IText>
                        {/* <IText style={[styles.txt_money, { color: lottColor }]}>{printMoney(1000000)}</IText> */}
                    </View>
                    <View style={styles.vertical_line} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        {/* <IText style={styles.txt_inside}>{"Trùng 1 bộ ba số bất kì"}</IText> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    data.special[0].split("").map((number: number, idx: number) => {
                                        return (
                                            <View style={[styles.ball, { backgroundColor: lottColor }]} key={idx}>
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
                                            <View style={[styles.ball, { backgroundColor: lottColor }]} key={idx}>
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
                        {/* <IText style={[styles.txt_money, { color: lottColor }]}>{printMoney(300000)}</IText> */}
                    </View>
                    <View style={styles.vertical_line} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        {/* <IText style={styles.txt_inside}>{"Trùng 1 bộ ba số bất kì"}</IText> */}
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                data.first.map((it: string, idx: number) => {
                                    return (
                                        <View style={{ width: '50%' }} key={idx}>
                                            <IText style={[styles.txt_number, { color: lottColor }]}>{it}</IText>
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
                        {/* <IText style={[styles.txt_money, { color: lottColor }]}>{printMoney(210000)}</IText> */}
                    </View>
                    <View style={styles.vertical_line} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        {/* <IText style={styles.txt_inside}>{"Trùng 1 bộ ba số bất kì"}</IText> */}
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                data.second.map((it: string, idx: number) => {
                                    return (
                                        <View style={{ width: '33%' }} key={idx}>
                                            <IText style={[styles.txt_number, { color: lottColor }]}>{it}</IText>
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
                        {/* <IText style={[styles.txt_money, { color: lottColor }]}>{printMoney(100000)}</IText> */}
                    </View>
                    <View style={styles.vertical_line} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        {/* <IText style={styles.txt_inside}>{"Trùng 1 bộ ba số bất kì"}</IText> */}
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                data.third.map((it: string, idx: number) => {
                                    return (
                                        <View style={{ width: '25%' }} key={idx}>
                                            <IText style={[styles.txt_number, { color: lottColor }]}>{it}</IText>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </View>


            {
                hideBtm ? <></> :
                    <IText style={{ marginTop: 8, fontWeight: 'bold', fontSize: 15 }}>{"Kết quả các kì quay trước:"}</IText>
            }
        </TouchableOpacity>
    )
})

export const PerItemMax3d = React.memo(({ data, type, navigation }: any) => {

    const lottColor = getColorLott(type)

    const navigate = useCallback(() => {
        if (navigation)
            NavigationUtils.navigate(navigation, ScreenName.ResultChild.DetailMax3d, { data, type })
    }, [navigation, data, type])

    return (
        <TouchableOpacity style={styles.per_item_container} onPress={navigate} activeOpacity={1}>
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
        fontSize: 16, textAlign: 'center'
    },
    txt_number: { fontSize: 14, alignSelf: 'center' },
    ball: {
        width: 26, height: 26,
        borderRadius: 99,
        justifyContent: 'center', alignItems: 'center',
        marginHorizontal: 2
    }
})
