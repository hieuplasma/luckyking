import { Image, Images } from "@assets";
import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { printMoneyK, printNumber } from "@utils";
import React, { useCallback } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

interface RenderLineKenoProps {
    title: string,
    item: any[],
    openNumberSheet: () => void,
    deleteNumber: () => void,
    randomNumber: () => void,
    bet: number
}

const getData = {
    81: 'Lớn',
    82: 'Nhỏ',
    83: 'Hoà LN',
    84: 'Chẵn 13+',
    85: 'Hòa CL',
    86: 'Lẻ 13+',
    87: 'Chẵn 11-12',
    88: 'Lẻ 11-12'
}

const lottColor = Color.keno

export const RenderLineKeno = React.memo(({ item, title, openNumberSheet, deleteNumber, randomNumber, bet }: RenderLineKenoProps) => {

    const getName = useCallback((number: number) => {
        //@ts-ignore
        return getData[`${number}`]
    }, [])

    return (
        <View style={styles.lineNumber} >
            <IText style={{ fontSize: 18, fontWeight: 'bold', width: 15 }}>{title}</IText>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginHorizontal: 18, flexWrap: 'wrap' }} onPress={openNumberSheet}>
                {
                    item.length == 0 ?
                        <View style={styles.borderButton}>
                            <IText>{"Chọn số"}</IText>
                        </View>
                        : (item[0] <= 80 || item[0] === false) ?
                            item.map((number: any, index2: number) => {
                                return (
                                    <View style={styles.ballContainer} key={index2}>
                                        <Image source={number !== false ? Images.ball_keno : Images.ball_grey} style={styles.ballStyle}>
                                            <ConsolasText style={{ color: Color.white, fontSize: 16 }}>{printNumber(number)}</ConsolasText>
                                        </Image>
                                    </View>
                                )
                            })
                            : <View style={[styles.borderButton, { borderColor: lottColor, height: 30, paddingHorizontal: 15 }]}>
                                <IText style={{ color: lottColor, fontWeight: 'bold' }}>{getName(item[0])}</IText>
                            </View>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBets} onPress={openNumberSheet}>
                <IText style={{ fontSize: 16, color: Color.blue }}>{printMoneyK(bet)}</IText>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: 60, justifyContent: 'space-between' }}>
                <Image source={Images.nofilled_heart} style={{ width: 22, height: 22, }}></Image>
                {(item[0] !== false && item.length > 0) ?
                    <TouchableOpacity onPress={deleteNumber}>
                        <Image source={Images.trash} style={{ width: 26, height: 26 }}></Image>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={randomNumber}>
                        <Image source={Images.refresh} style={{ width: 26, height: 26 }}></Image>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    lineNumber: {
        flexDirection: 'row', marginVertical: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ballContainer: {
        width: (windowWidth - 196) / 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    ballStyle: {
        width: 28, height: 28,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: Color.power,
        borderRadius: 99
    },
    buttonBets: {
        width: 40, height: 26,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 6,
        borderColor: Color.blue,
        borderWidth: 1, marginRight: 12
    },
    borderButton: {
        borderWidth: 1, borderColor: Color.black,
        borderRadius: 15, marginVertical: 4, marginLeft: 10,
        height: 23, paddingHorizontal: 10,
        justifyContent: 'center', alignItems: 'center'
    },
})