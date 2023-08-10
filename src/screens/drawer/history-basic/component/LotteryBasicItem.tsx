import { INumberDetail, LIST_STATUS, LOTTRERY_COLOR_STATUS, LotteryType, OrderStatus } from "@common"
import { IText } from "@components"
import { Color } from "@styles"
import { NavigationUtils, caculateLotteryBenefits, doNotExits, generateUniqueStrings, getLogoHeader, printDisplayId, printDrawCode, printMoney, printNumber, printTypePlay, printWeekDate } from "@utils"
import React, { useCallback } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Image, Images } from "@assets"
import { API_HOST } from "@api"
import { ScreenName } from "@navigation"

type Status = 'pending' | 'complete' | 'returned'
interface LotteryItem {
    lottery: any,
    tab: Status,
    navigation: any
}

const getStatusName: any = {
    PENDING: {
        label: 'Đợi in vé',
        borderColor: LOTTRERY_COLOR_STATUS[OrderStatus.PENDING],
        bgColor: Color.white
    },
    LOCK: {
        // label: 'Đang khoá',
        label: "Đợi in vé",
        borderColor: LOTTRERY_COLOR_STATUS[OrderStatus.LOCK],
        bgColor: Color.white
    },
    PRINTED: {
        // label: 'Đã in',
        label: "Đợi in vé",
        borderColor: LOTTRERY_COLOR_STATUS[OrderStatus.PRINTED],
        bgColor: Color.white
    },
    CONFIRMED: {
        label: 'Chưa xổ',
        borderColor: LOTTRERY_COLOR_STATUS[OrderStatus.CONFIRMED],
        bgColor: Color.white
    },
    NO_PRIZE: {
        label: 'Không trúng',
        borderColor: LOTTRERY_COLOR_STATUS[OrderStatus.NO_PRIZE],
        bgColor: Color.white
    },
    WON: {
        label: 'Trúng thưởng',
        borderColor: LOTTRERY_COLOR_STATUS[OrderStatus.WON],
        bgColor: Color.white
    },
    PAID: {
        label: 'Đã trả thưởng',
        borderColor: LOTTRERY_COLOR_STATUS[OrderStatus.PAID],
        bgColor: Color.white
    },
    RETURNED: {
        label: 'Đã hoàn vé',
        borderColor: LOTTRERY_COLOR_STATUS[OrderStatus.RETURNED],
        bgColor: Color.white
    },
    ERROR: {
        label: 'Vé bị lỗi',
        borderColor: LOTTRERY_COLOR_STATUS[OrderStatus.ERROR],
        bgColor: Color.white
    }
}

export const LotteryBasicItem = React.memo(({ lottery, tab, navigation }: LotteryItem) => {

    const numberDetail = lottery.NumberLottery.numberDetail as INumberDetail[]

    const showImg = useCallback((uri1: string, uri2: string, index: number) => {
        let tmp: string[] = []
        if (!doNotExits(uri1)) tmp.push(uri1)
        if (!doNotExits(uri2)) tmp.push(uri2)
        if (tmp.length > index) window.image.show(tmp, index)
    }, [])

    const checking = useCallback((number: number, level = 0) => {
        const lotteryType = lottery.type
        const drawResult = lottery.result
        if (!drawResult) return false
        if (!drawResult.drawn) return false
        if (lotteryType == LotteryType.Power ||
            lotteryType == LotteryType.Mega) {

            if (lotteryType == LotteryType.Power) {
                if (drawResult.specialNumber == number) return true
            }

            const result = drawResult.result.split("-").map(Number)
            if (result.includes(parseInt(number.toString()))) return true
        }
        else {
            if (lottery.type == LotteryType.Max3DPro && lottery.NumberLottery.level == 4) {
                const arrStr = generateUniqueStrings(Array.from(String(number), Number))
                for (const element of arrStr) {
                    if (drawResult.special.includes(element)) return true
                    if (drawResult.first.includes(element)) return true
                    if (drawResult.second.includes(element)) return true
                    if (drawResult.third.includes(element)) return true
                }
            }
            else {
                if (drawResult.special.includes(number)) return true
                if (drawResult.first.includes(number)) return true
                if (drawResult.second.includes(number)) return true
                if (drawResult.third.includes(number)) return true
            }
        }

        return false
    }, [lottery.result, lottery.type, lottery.NumberLottery.level])

    const renderWinning = useCallback(() => {
        const drawResult = lottery.result
        if (!drawResult) return <></>
        if (!drawResult.drawn) return <></>

        const sove = caculateLotteryBenefits(lottery, drawResult)
        if (sove.totalBenefits == 0) return <></>
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <IText style={{ fontWeight: 'bold' }}>{"Giải thưởng: "}</IText>
                    <IText style={{ fontWeight: 'bold', color: Color.luckyKing }}>{`${printMoney(sove.totalBenefits)}đ`}</IText>
                </View>
                {
                    sove.detailBenefits.map((item: any, index: number) => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={item.row + index}>
                                <IText >
                                    <IText style={{ fontWeight: 'bold', color: Color.blue }}>
                                        {`${item.row}: `}
                                    </IText>
                                    <IText>{item.detail}</IText>
                                </IText>
                                <IText style={{ fontWeight: 'bold', color: Color.luckyKing }}>{`${printMoney(item.benefits)}đ`}</IText>
                            </View>
                        )
                    })
                }
            </View>
        )
    }, [lottery.result])

    const navigateToResult = useCallback((lottery: any) => {
        if (LIST_STATUS.ERROR.includes(lottery.status)) {
            window.myalert.show({ title: "Vé đã bị hoàn huỷ!" })
            return;
        }
        if (!lottery.result) {
            window.myalert.show({ title: "Chưa có kết quả cho vé số này!" })
            return;
        }

        let screenName = ScreenName.ResultChild.DetailMega
        switch (lottery.type) {
            case LotteryType.Power:
                screenName = ScreenName.ResultChild.DetailPower
                break;
            case LotteryType.Max3D:
            case LotteryType.Max3DPlus:
            case LotteryType.Max3DPro:
                screenName = ScreenName.ResultChild.DetailMax3d
                break;
            default:
                break;
        }
        NavigationUtils.navigate(navigation, screenName, { data: lottery.result, type: lottery.type })
    }, [navigation])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, paddingRight: 16 }}>
                    <IText style={{ fontWeight: 'bold' }}>
                        {printTypePlay(lottery.NumberLottery.level, lottery.type)}
                    </IText>
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
                                        <IText style={{ fontSize: 10 }}>
                                            {(it.tuChon ? ' (TC)' : '')}
                                        </IText>
                                    </IText>
                                    <View style={{ marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8, flex: 1 }}>
                                        {
                                            numbers.map((number: any, id2: number) => {
                                                const check = checking(number)
                                                return (
                                                    <IText style={[styles.textBall, { color: check ? Color.luckyKing : Color.black }]} key={id2}>
                                                        {`${printNumber(number)}`}
                                                    </IText>
                                                )
                                            })
                                        }
                                    </View>
                                    <View />
                                    {
                                        lottery.type == LotteryType.Power || lottery.type == LotteryType.Mega ?
                                            <></>
                                            : <IText style={{ color: Color.blue }}>{`${printMoney(it.tienCuoc)}đ`}</IText>
                                    }
                                </View>
                            )
                        })
                    }
                </View>
                <Image style={getLogoHeader(lottery.type).style} source={getLogoHeader(lottery.type).source} resizeMode='contain' />
            </View>

            <IText style={{ fontSize: 14, fontWeight: '400' }}>
                <IText style={{ fontWeight: 'bold' }}>{"Kỳ: "}</IText>
                {printDrawCode(lottery.drawCode) + "   "}
                <IText style={{ fontWeight: 'bold' }}>{"Ngày: "}</IText>
                {printWeekDate(new Date(lottery.drawTime))}
            </IText>

            {
                lottery.imageFront || lottery.imageBack ?
                    <View style={styles.imgContainer}>
                        <TouchableWithoutFeedback onPress={() => showImg(lottery.imageFront, lottery.imageBack, 0)}>
                            <Image source={lottery.imageFront ? { uri: API_HOST + lottery.imageFront } : Images.no_picture} style={styles.img} resizeMode="cover" />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => showImg(lottery.imageFront, lottery.imageBack, 1)}>
                            <Image source={lottery.imageBack ? { uri: API_HOST + lottery.imageBack } : Images.no_picture} style={styles.img} resizeMode="cover" />
                        </TouchableWithoutFeedback>
                    </View>
                    : <></>
            }
            <View style={styles.underLine} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <IText style={{ fontSize: 14, fontWeight: 'bold' }}>
                    <IText style={{ fontWeight: 'bold' }}>{"Vé " + printDisplayId(lottery.displayId) + ": "}</IText>
                    <IText style={{ color: Color.blue, fontWeight: 'bold' }}>{printMoney(lottery.amount) + "đ"}</IText>
                </IText>
                {
                    1 ?
                        <TouchableOpacity style={[styles.btnStatus,
                        { borderColor: getStatusName[lottery.status].bgColor },
                        { backgroundColor: getStatusName[lottery.status].borderColor }
                        ]}
                            onPress={() => navigateToResult(lottery)}>
                            <IText style={{ fontSize: 16, color: getStatusName[lottery.status].bgColor }}>
                                {getStatusName[lottery.status].label}
                            </IText>
                        </TouchableOpacity>
                        : <></>
                }
            </View>
            {renderWinning()}
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
        justifyContent: 'space-between',
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
        height: 150, justifyContent: 'space-between',
        marginTop: 5
    },
    img: {
        width: '49%',
        height: 150,
        borderWidth: 1, borderColor: 'rgba(160, 160, 160, 0.6)'
    },
    btnStatus: {
        height: 26,
        justifyContent: 'center', alignItems: 'center',
        paddingHorizontal: 8, borderRadius: 8,
        borderWidth: 1
    }
})