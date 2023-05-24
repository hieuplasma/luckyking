import { lotteryApi } from "@api"
import { LotteryType, OrderStatus } from "@common"
import { IText } from "@components"
import { ScreenName } from "@navigation"
import { Color } from "@styles"
import {
    NavigationUtils,
    caculateLotteryBenefits,
    getSpecialValueKeno, getSplitCharater, kenoAnalysis, printDisplayId,
    printMoney, printNumber
} from "@utils"
import React, { useCallback, useMemo } from "react"
import { StyleSheet, View, Dimensions } from "react-native"

type Status = 'pending' | 'complete' | 'returned'

const PendingList = [OrderStatus.PENDING, OrderStatus.LOCK]

const CompleteList = [OrderStatus.CONFIRMED,
OrderStatus.WON, OrderStatus.PAID, OrderStatus.NO_PRIZE]

const ErrorList = [OrderStatus.ERROR, OrderStatus.RETURNED]

export const ListOrderDrawKeno = React.memo(({ listOrder, navigation, lotteryType, drawResult }: any) => {

    if (listOrder.length == 0) return (
        <IText style={{ marginTop: 8, fontWeight: '600', fontSize: 15 }}>
            {"Quý khách đã không mua vé nào cho kỳ này"}
        </IText>
    )

    const renderResult = useCallback((lottery: any) => {
        if (!lottery.result || !lottery.result.drawn) return (
            <IText style={{ marginLeft: 4 }}>
                {"Vé chưa được xác nhận"}
            </IText>
        )
        const benefits = caculateLotteryBenefits(lottery, drawResult)
        return (
            <View style={{ marginTop: 8, paddingHorizontal: 4 }}>
                <View style={{ flexDirection: 'row' }}>
                    <IText style={{ fontWeight: 'bold', fontSize: 16 }}>{"Tiền thưởng: "}</IText>
                    <IText style={{ fontWeight: 'bold', color: Color.luckyKing, fontSize: 16 }}>{`${printMoney(benefits.totalBenefits)}đ`}</IText>
                </View>
                <View style={{ height: 4 }} />
                {
                    benefits.detailBenefits.map((item: any, index: number) => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={item.row + index}>
                                <IText >
                                    <IText style={{ fontWeight: 'bold', color: Color.blue, fontSize: 16 }}>
                                        {`${item.row}:     `}
                                    </IText>
                                    <IText style={{ fontSize: 16 }}>{item.detail}</IText>
                                </IText>
                                <IText style={{ fontWeight: 'bold', color: Color.luckyKing, fontSize: 16 }}>{`${printMoney(item.benefits)}đ`}</IText>
                            </View>
                        )
                    })
                }
            </View>
        )
    }, [drawResult])

    let analysis: any = false
    if (lotteryType == LotteryType.Keno)
        analysis = useMemo(() => kenoAnalysis(drawResult.result.split("-")), [drawResult])

    const checking = useCallback((number: number) => {
        if (!drawResult) return false
        if (!drawResult.drawn) return false

        if (lotteryType == LotteryType.Keno ||
            lotteryType == LotteryType.Power ||
            lotteryType == LotteryType.Mega) {

            if (lotteryType == LotteryType.Power) {
                if (drawResult.specialNumber == number) return true
            }

            const result = drawResult.result.split("-").map(Number)
            if (result.includes(parseInt(number.toString()))) return true

            if (number > 80 && lotteryType == LotteryType.Keno) {
                //@ts-ignore
                if (analysis.event_number.includes(parseInt(number)))
                    return true
            }
        }
        else {
            if (drawResult.special.includes(number)) return true
            if (drawResult.first.includes(number)) return true
            if (drawResult.second.includes(number)) return true
            if (drawResult.third.includes(number)) return true
        }

        return false
    }, [drawResult])

    const printNumberScan = useCallback((number: any) => {
        if (parseInt(number) > 80 && lotteryType == LotteryType.Keno) {
            return getSpecialValueKeno(number)
        }
        else return printNumber(number)
    }, [lotteryType])

    const renderLottery = React.useCallback((lottery: any, addLine: boolean) => {
        const numberDetail = lottery.NumberLottery.numberDetail
        return (
            <View key={lottery.id}>
                <View style={{ paddingHorizontal: 8 }}>
                    {
                        numberDetail.map((it: any, id: number) => {
                            let numbers: number[] = it.boSo.split(getSplitCharater(lotteryType))
                            return (
                                <View style={styles.lineNumber} key={'' + it.boSo + id}>
                                    <IText style={{ fontSize: 16, color: Color.blue, fontWeight: 'bold' }}>
                                        {String.fromCharCode(65 + id)}
                                    </IText>
                                    <View style={{ marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8, flex: 1 }}>
                                        {
                                            numbers.map((number: any, id2: number) => {
                                                const check = checking(number)
                                                return (
                                                    <IText style={[styles.textBall, { color: check ? Color.luckyKing : Color.black }]} key={id2}>
                                                        {`${printNumberScan(number)}`}
                                                    </IText>
                                                )
                                            })
                                        }
                                    </View>
                                    <IText style={{ color: Color.blue, fontSize: 16, fontWeight: 'bold' }}>
                                        {`${printMoney(it.tienCuoc)}đ`}
                                    </IText>
                                </View>
                            )
                        })
                    }
                    <IText style={styles.total_txt}>
                        {`Vé ${printDisplayId(lottery.displayId)}: `}
                        <IText style={{ fontSize: 16, fontWeight: 'bold' }}>
                            {`${printMoney(lottery.amount)}đ`}
                        </IText>
                    </IText>
                </View>
                {renderResult(lottery)}
                {
                    addLine ?
                        <View style={{ width: '50%', height: 1, backgroundColor: '#A0A0A0', marginVertical: 4, alignSelf: 'center' }} />
                        : <></>
                }
            </View>
        )
    }, [checking])

    const navigate = useCallback(async (item: any) => {
        let screenName = ScreenName.Drawer.OrderKenoScreen
        if (lotteryType)
            window.loadingIndicator.show()
        const res = await lotteryApi.getOrderById({ orderId: item.id })
        window.loadingIndicator.hide()
        if (res) {
            if (res.data.ticketType == 'basic') {
                screenName = ScreenName.Drawer.OrderBasicScreen
                const status: Status = PendingList.includes(res.data.status) ? 'pending'
                    : ErrorList.includes(res.data.status) ? 'returned' : 'complete'
                NavigationUtils.push(navigation, screenName, { order: res.data, status: status })
            }
            else {
                NavigationUtils.push(navigation, screenName, { order: res.data })
            }
        }
    }, [navigation, lotteryType])

    return (
        <View>
            <IText style={{ marginTop: 8, fontWeight: '600', fontSize: 15, marginBottom: 8 }}>
                {"Quý khách đã mua vé cho kỳ này:"}
            </IText>
            <View style={{ width: windowWidth, marginHorizontal: - 10, paddingHorizontal: 10 }}>
                <View >
                    {
                        listOrder.map((item: any, index: number) => {
                            return (
                                <View key={item.displayId} style={styles.orderContainer}>
                                    <IText style={styles.order_txt} onPress={() => navigate(item)}>
                                        {`Đơn ${printDisplayId(item.displayId)}`}
                                    </IText>
                                    {item.items.map((lottery: any, index2: number) => renderLottery(lottery, !(index2 == (item.items.length - 1))))}
                                </View>
                            )
                        })
                    }
                </View>
                <View style={{ height: 100 }} />
            </View>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    orderContainer: {
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
    textBall: { fontSize: 16, marginHorizontal: 5 },
    total_txt: {
        fontSize: 16, fontStyle: 'italic'
    },
    result_txt: { marginTop: 16, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' },
    order_txt: {
        fontWeight: 'bold', color: Color.blue,
        textDecorationLine: 'underline',
        fontSize: 16
    }
})