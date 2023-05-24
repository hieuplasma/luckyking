import { API_HOST } from "@api";
import { Image, Images } from "@assets";
import { OrderStatus, getNameStatus } from "@common";
import { IText } from "@components";
import { ScreenName } from "@navigation";
import { Color } from "@styles";
import { NavigationUtils, caculateLotteryBenefits, doNotExits, printDraw2, printMoney } from "@utils";
import React, { useCallback, } from "react";
import { ColorValue, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface DrawItemProps {
    lottery: any,
    expand: boolean,
    toggle: () => void,
    lottColor: ColorValue,
    navigation: any
}

function getColorStatus(param: OrderStatus, lottColor: ColorValue) {
    switch (param) {
        case OrderStatus.PENDING:
        case OrderStatus.LOCK:
        case OrderStatus.CONFIRMED:
            return Color.blue
        // case OrderStatus.ERROR: return "Bị lỗi"
        // case OrderStatus.RETURNED: return "Đã huỷ"
        case OrderStatus.WON: return lottColor
        case OrderStatus.PAID: return lottColor
        case OrderStatus.NO_PRIZE: return '#057A9F'
        // case OrderStatus.CART: return "Trong giỏ hàng"
        default: return Color.luckyKing
    }
}

export const PrintDrawItem = React.memo(({ lottery, expand, toggle, lottColor, navigation }: DrawItemProps) => {

    const showImg = useCallback((uri: string) => {
        if (doNotExits(uri)) { }
        else window.image.show(uri)
    }, [])

    const result = lottery.result

    const renderWinning = useCallback(() => {
        if (!result) return <></>
        if (!result.drawn) return <></>
        const sove = caculateLotteryBenefits(lottery, result)
        if (sove.totalBenefits == 0) return <></>
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <IText style={{ fontWeight: 'bold' }}>{"Giải thưởng: "}</IText>
                    <IText style={{ fontWeight: 'bold', color: Color.luckyKing }}>{`${printMoney(sove.totalBenefits)}đ`}</IText>
                </View>
                {
                    sove.detailBenefits.map((item: any) => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={item.row}>
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
    }, [lottery, result])

    const navigate = useCallback(() => {
        if (!result) return
        if (!result.drawn) return
        NavigationUtils.push(navigation, ScreenName.ResultChild.DetailKeno, { data: result })
    }, [result, navigation])

    return (
        <TouchableOpacity style={[styles.container, { borderColor: expand ? lottColor : '#A0A0A0' }]}
            activeOpacity={1} onPress={toggle}>
            <View style={styles.topContainer}>
                <IText>
                    <IText style={{ fontWeight: 'bold' }}>{"Kỳ: "}</IText>
                    {printDraw2({ drawCode: lottery.drawCode, drawTime: lottery.drawTime })}
                </IText>
                <TouchableOpacity style={[styles.btn, { borderColor: getColorStatus(lottery.status, lottColor) }]} onPress={navigate}>
                    <IText style={{ color: getColorStatus(lottery.status, lottColor) }}>
                        {getNameStatus(lottery.status)}
                    </IText>
                </TouchableOpacity>
            </View>
            {
                expand ?
                    <View>
                        {renderWinning()}
                        <View style={styles.imgContainer}>
                            <TouchableWithoutFeedback onPress={() => showImg(lottery.imageFront)}>
                                <Image source={lottery.imageFront ? { uri: API_HOST + lottery.imageFront } : Images.no_picture} style={styles.img} resizeMode="contain" />
                            </TouchableWithoutFeedback>
                            {/* <TouchableWithoutFeedback onPress={() => showImg(lottery.imageBack)}>
                                <Image source={lottery.imageBack ? { uri: API_HOST + lottery.imageBack } : Images.no_picture} style={styles.img} resizeMode="contain" />
                            </TouchableWithoutFeedback> */}
                        </View>
                    </View>
                    : <></>
            }
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1, borderColor: '#A0A0A0', borderRadius: 10,
        marginVertical: 5,
        paddingLeft: 16, paddingRight: 8,
        backgroundColor: Color.white
    },
    topContainer: {
        flexDirection: 'row', justifyContent: 'space-between',
        height: 35, alignItems: 'center'
    },
    btn: {
        height: 26, borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        justifyContent: 'center', alignItems: 'center'
    },
    imgContainer: {
        flexDirection: 'row', width: '100%',
        height: 100, justifyContent: 'center',
        marginBottom: 5
    },
    img: {
        width: '100%', alignSelf: 'center',
        height: 100, borderRadius: 10,
        borderWidth: 1, borderColor: 'rgba(160, 160, 160, 0.6)'
    }
})