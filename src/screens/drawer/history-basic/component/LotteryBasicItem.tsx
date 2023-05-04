import { LotteryType, NumberDetail, OrderStatus } from "@common"
import { ConsolasText, IText } from "@components"
import { Color } from "@styles"
import { doNotExits, getColorLott, getLogoHeader, printDisplayId, printDraw2, printDrawCode, printMoney, printNumber, printWeekDate } from "@utils"
import React, { useCallback, useState } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { PrintDrawItem } from "../../component/PrintDrawItem"
import { Image, Images } from "@assets"
import { API_HOST } from "@api"

type Status = 'pending' | 'complete' | 'returned'
interface LotteryItem {
    lottery: any,
    tab: Status
}

const getStatusName: any = {
    CONFIRMED: {
        label: 'Chưa xổ',
        borderColor: '#0171F5',
        bgColor: Color.white
    },
    NO_PRIZE: {
        label: 'Không trúng',
        borderColor: '#010BF5',
        bgColor: Color.white
    },
    WON: {
        label: 'Trúng thưởng',
        borderColor: Color.white,
        bgColor: Color.luckyKing
    },
    PAID: {
        label: 'Đã trả thưởng',
        borderColor: Color.white,
        bgColor: Color.luckyKing
    }
}

export const LotteryBasicItem = React.memo(({ lottery, tab }: LotteryItem) => {

    const numberDetail: NumberDetail[] = JSON.parse(lottery.NumberLottery.numberDetail.toString())
    const lottColor = getColorLott(lottery.type)

    const showImg = useCallback((uri: string) => {
        if (doNotExits(uri)) { }
        else window.image.show(uri)
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View >
                    {
                        numberDetail.map((it: any, id: number) => {
                            let numbers: number[] = []
                            if (lottery.type == LotteryType.Mega || lottery.type == LotteryType.Power)
                                numbers = it.boSo.split("-").map(Number);
                            else numbers = it.boSo.split(" ")
                            return (
                                <View style={styles.lineNumber} key={'' + it.boSo + id}>
                                    <IText style={{ fontSize: 14, color: Color.blue }}>
                                        {String.fromCharCode(65 + id)}
                                    </IText>
                                    <View style={{ marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 }}>
                                        {
                                            numbers.map((number: any, id2: number) => {
                                                return (
                                                    <IText style={styles.textBall} key={id2}>
                                                        {`${printNumber(number)}`}
                                                    </IText>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    {
                                        lottery.type == LotteryType.Power || lottery.type == LotteryType.Mega ?
                                            <></>
                                            : <IText style={{ color: Color.blue }}>{`${printMoney(it.tienCuoc)}đ`}</IText>
                                    }
                                </View>
                            )
                        })
                    }
                    <IText style={{ fontSize: 14, fontWeight: '400' }}>
                        <IText style={{ fontWeight: 'bold' }}>{"Kỳ: "}</IText>
                        {printDrawCode(lottery.drawCode) + "   "}
                        <IText style={{ fontWeight: 'bold' }}>{"Ngày: "}</IText>
                        {printWeekDate(new Date(lottery.drawTime))}
                    </IText>
                </View>
                <Image style={{ height: 44, flex: 1 }} source={getLogoHeader(lottery.type).source} resizeMode='contain' />
            </View>

            {
                tab == 'complete' ?
                    <View style={styles.imgContainer}>
                        <TouchableWithoutFeedback onPress={() => showImg(lottery.imageFront)}>
                            <Image source={lottery.imageFront ? { uri: API_HOST + lottery.imageFront } : Images.no_picture} style={styles.img} resizeMode="contain" />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => showImg(lottery.imageBack)}>
                            <Image source={lottery.imageBack ? { uri: API_HOST + lottery.imageBack } : Images.no_picture} style={styles.img} resizeMode="contain" />
                        </TouchableWithoutFeedback>
                    </View>
                    : <></>
            }
            <View style={styles.underLine} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <IText style={{ fontSize: 14, fontWeight: 'bold' }}>
                    <IText>{"Vé " + printDisplayId(lottery.displayId) + ": "}</IText>
                    <IText style={{ color: Color.luckyKing }}>{printMoney(lottery.amount) + "đ"}</IText>
                </IText>
                {
                    tab == 'complete' ?
                        <TouchableOpacity style={[styles.btnStatus,
                        { borderColor: getStatusName[lottery.status].borderColor },
                        { backgroundColor: getStatusName[lottery.status].bgColor }
                        ]}>
                            <IText style={{ fontSize: 16, color: getStatusName[lottery.status].borderColor }}>
                                {getStatusName[lottery.status].label}
                            </IText>
                        </TouchableOpacity>
                        : <></>
                }
            </View>
        </View>
    )
})


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.white,
        borderRadius: 10,
        marginBottom: 28,
        padding: 12,
        width: '100%',
        //  height: 200,
        shadowOffset: { width: 6, height: 5 },
        shadowRadius: 15,
        shadowColor: '#EC6C3C',
        shadowOpacity: 0.2,
        elevation: 3,
    },
    lineNumber: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    underLine: {
        width: windowWidth - 32, height: 1,
        marginHorizontal: -12,
        backgroundColor: '#A0A0A0',
        marginVertical: 12, opacity: 0.2
    },
    ball: {
        width: 24, height: 24, borderRadius: 99,
        justifyContent: 'center', alignItems: 'center',
        margin: 5, borderWidth: 1,
    },
    textBall: { fontSize: 14, marginHorizontal: 5 },
    imgContainer: {
        flexDirection: 'row', width: '100%',
        height: 100, justifyContent: 'space-between',
        marginTop: 5
    },
    img: {
        width: '49%',
        height: 100,
        borderWidth: 1, borderColor: 'rgba(160, 160, 160, 0.6)'
    },
    btnStatus: {
        height: 26,
        justifyContent: 'center', alignItems: 'center',
        paddingHorizontal: 8, borderRadius: 8,
        borderWidth: 1
    }
})