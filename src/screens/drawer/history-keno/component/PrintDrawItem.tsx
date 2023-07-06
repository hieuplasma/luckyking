import { API_HOST } from "@api";
import { Image, Images } from "@assets";
import { OrderStatus, getLotteyNameStatus } from "@common";
import { IText } from "@components";
import { ScreenName } from "@navigation";
import { Color } from "@styles";
import { NavigationUtils, caculateLotteryBenefits, doNotExits, printDisplayId, printDraw2, printMoney } from "@utils";
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
            return '#0171F5'
        case OrderStatus.ERROR: return Color.gray
        case OrderStatus.RETURNED: return Color.gray
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
        if (!lottery.result) {
            window.myalert.show({ title: "Chưa có kết quả cho vé số này hoặc vé đã bị huỷ!" })
            return;
        }
        if (!lottery.result.drawn) {
            window.myalert.show({ title: "Chưa có kết quả cho vé số này hoặc vé đã bị huỷ!" })
            return;
        }
        NavigationUtils.push(navigation, ScreenName.ResultChild.DetailKeno, { data: result })
    }, [result, navigation])

    return (
        <View style={[styles.container, { borderColor: expand ? lottColor : '#A0A0A0' }]}>

            <TouchableOpacity
                style={styles.topContainer}
                activeOpacity={1}
                onPress={toggle}>
                <View>
                    <IText style={{ marginTop: 8, marginBottom: -8 }}>
                        <IText style={{ fontWeight: 'bold' }}>{"Vé Keno: "}</IText>
                        {printDisplayId(lottery.displayId)}
                    </IText>
                    <IText>
                        <IText style={{ fontWeight: 'bold' }}>{"Kỳ: "}</IText>
                        {printDraw2({ drawCode: lottery.drawCode, drawTime: lottery.drawTime })}
                    </IText>
                </View>

                <View style={{ flex: 1 }} />
                <IText style={{
                    color: getColorStatus(lottery.status, lottColor),
                    marginRight: 4,
                    fontWeight: 'bold'
                }}>
                    {getLotteyNameStatus(lottery.status)}
                </IText>
                <Image
                    source={Images.triangle}
                    style={{ width: 15, height: 15, transform: [{ rotate: expand ? '90deg' : '0deg' }] }}
                    tintColor={getColorStatus(lottery.status, lottColor)} />
            </TouchableOpacity>
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
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={navigate}
                                style={styles.btnViewResult}>
                                <IText style={{ color: Color.white }}>
                                    {'Xem kết quả kỳ quay'}
                                </IText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : <></>
            }
        </View>
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
        height: 50, alignItems: 'center',
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
    },
    btnViewResult: {
        height: 30,
        justifyContent: 'center', alignItems: 'center',
        paddingHorizontal: 10, backgroundColor: Color.keno,
        borderRadius: 10,
        marginVertical: 4
    }
})