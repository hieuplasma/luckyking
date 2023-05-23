import { Image, Images } from "@assets"
import { ConsolasText, IText } from "@components"
import { ScreenName } from "@navigation"
import { Color } from "@styles"
import { NavigationUtils, printDrawWeekDate, printMoney, printNumber } from "@utils"
import React, { useCallback } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"

const lottColor = Color.power

interface FirstItemProps {
    data: any,
    navigation?: any,
    hideBtm?: boolean
}

export const FirstItemPower = React.memo(({ data, navigation, hideBtm }: FirstItemProps) => {

    if (!data.drawn) return (
        <View >
            <Image style={{ width: windowWidth - 20, height: 170, marginVertical: 8 }} resizeMode="stretch" source={Images.power_banner}>
                <View style={styles.above}>
                    <IText style={styles.titleFirstItem}>
                        {`Kỳ quay ${printDrawWeekDate(data)}`}
                    </IText>
                </View>
                <Image source={Images.power_logo_stroke1} style={{ height: 72, marginTop: 48 }} resizeMode="contain" />
                <IText style={{
                    fontWeight: 'bold', color: Color.white,
                    fontSize: 20, alignSelf: 'center',
                    marginTop: 16
                }}>{"Chưa có kết quả"}
                </IText>
            </Image>
        </View>
    )

    const result = data.result.split("-").map(Number)

    const navigate = useCallback(() => {
        if (navigation)
            NavigationUtils.navigate(navigation, ScreenName.ResultChild.DetailPower, { data })
    }, [navigation, data])

    return (
        <TouchableOpacity onPress={navigate} activeOpacity={1}>
            <Image style={{ width: windowWidth - 20, height: hideBtm ? 320 : 356, marginVertical: 8 }} resizeMode="stretch" source={Images.power_banner}>
                <View style={styles.above}>
                    <IText style={styles.titleFirstItem}>
                        {`Kỳ quay ${printDrawWeekDate(data)}`}
                    </IText>
                </View>
                <Image source={Images.power_logo_stroke1} style={{ height: 72, marginTop: 48 }} resizeMode="contain" />

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                    {
                        data.drawn ?
                            result.map((number: number) => {
                                return (
                                    <View style={styles.ball} key={number}>
                                        <ConsolasText style={{ color: lottColor, fontSize: 26, fontWeight: 'bold', lineHeight: 30.44 }} >
                                            {printNumber(number)}
                                        </ConsolasText>
                                    </View>
                                )
                            })
                            : <IText style={{ fontWeight: 'bold', color: Color.white, fontSize: 20 }}>{"Chưa có kết quả"}</IText>
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
                    {parseInt(data.jackpot1) > 0 ? `${printMoney(data.jackpot1)}đ` : "Không có thông tin"}
                </IText>

                <IText style={styles.txt_bold}>
                    {"Giá trị Jackpot 2"}
                </IText>
                <IText style={[styles.txt_bold, { lineHeight: 28, fontSize: 28 }]}>
                    {parseInt(data.jackpot1) > 0 ? `${printMoney(data.jackpot2)}đ` : "Không có thông tin"}
                </IText>
                {
                    hideBtm ? <></>
                        :
                        <View style={{ flexDirection: 'row', marginTop: 12 }} >
                            <View style={{ flex: 1 }} />
                            <IText style={{ fontSize: 16, fontWeight: 'bold', color: Color.white, marginHorizontal: 8 }}>{"Xem chi tiết"}</IText>
                            <View style={{ flex: 1, justifyContent: 'center' }} >
                                <Image style={{ width: 20, height: 10 }} source={Images.right_arrow} />
                            </View>
                        </View>
                }
            </Image>

            {
                hideBtm ? <></> :
                    <IText style={{ marginTop: 8, fontWeight: '600', fontSize: 15 }}>{"Kết quả các kì quay trước:"}</IText>
            }
        </TouchableOpacity>
    )
})

export const PerItemPower = React.memo(({ data, navigation }: any) => {
    const result = data.result.split("-").map(Number)

    const navigate = useCallback(() => {
        if (navigation)
            NavigationUtils.navigate(navigation, ScreenName.ResultChild.DetailPower, { data })
    }, [navigation, data])

    return (
        <TouchableOpacity style={styles.per_item_container} onPress={navigate} activeOpacity={1}>
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