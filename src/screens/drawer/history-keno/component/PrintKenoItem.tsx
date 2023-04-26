import { API_HOST } from "@api";
import { Image, Images } from "@assets";
import { OrderStatus, getNameStatus } from "@common";
import { IText } from "@components";
import { Color } from "@styles";
import { doNotExits, printDraw2 } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";

interface DrawKenoItem {
    lottery: any,
    expand: boolean,
    toggle: () => void
}

function getColorStatus(param: OrderStatus) {
    switch (param) {
        case OrderStatus.PENDING:
        case OrderStatus.LOCK:
        case OrderStatus.CONFIRMED:
            return Color.blue
        // case OrderStatus.ERROR: return "Bị lỗi"
        // case OrderStatus.RETURNED: return "Đã huỷ"
        case OrderStatus.WON: return Color.keno
        case OrderStatus.PAID: return Color.keno
        case OrderStatus.NO_PRIZE: return '#057A9F'
        // case OrderStatus.CART: return "Trong giỏ hàng"
        default: return Color.luckyKing
    }
}

export const PrintKenoItem = React.memo(({ lottery, expand, toggle }: DrawKenoItem) => {

    const showImg = useCallback((uri: string) => {
        if (doNotExits(uri)) { }
        else window.image.show(uri)
    }, [])

    return (
        <TouchableOpacity style={[styles.container, { borderColor: expand ? Color.keno : '#A0A0A0' }]}
            activeOpacity={1} onPress={toggle}>
            <View style={styles.topContainer}>
                <IText>
                    <IText style={{ fontWeight: 'bold' }}>{"Kỳ: "}</IText>
                    {printDraw2({ drawCode: lottery.drawCode, drawTime: lottery.drawTime })}
                </IText>
                <TouchableOpacity style={[styles.btn, { borderColor: getColorStatus(lottery.status) }]} onPress={toggle}>
                    <IText style={{ color: getColorStatus(lottery.status) }}>
                        {getNameStatus(lottery.status)}
                    </IText>
                </TouchableOpacity>
            </View>
            {
                expand ?
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
        paddingHorizontal: 10
    },
    imgContainer: {
        flexDirection: 'row', width: '100%',
        height: 100, justifyContent: 'space-between',
        marginBottom: 5
    },
    img: {
        width: '49%',
        height: 100,
        borderWidth: 1, borderColor: 'rgba(160, 160, 160, 0.6)'
    }
})