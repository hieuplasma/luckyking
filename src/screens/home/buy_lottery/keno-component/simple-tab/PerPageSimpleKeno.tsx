import { Image, Images } from "@assets"
import { ConsolasText, IText } from "@components"
import { Color } from "@styles"
import { getColorLott, printMoneyK, printNumber } from "@utils"
import React, { useCallback, useEffect, useState } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { ChooseLevelKeno } from "./ChooseLevelKeno"
import { PickingType } from "@common"
import { ScrollView } from "react-native-gesture-handler"

const betMilestones = [
    10000, 20000, 50000, 100000, 200000, 500000
]

const lottColor = Color.keno

const fullNumber = Array.from({ length: 80 }, (_, index) => index + 1);
const MAX_LENGTH = 10

const LonNho = [
    { label: "Lớn", value: 81 },
    { label: "Nhỏ", value: 82 },
    { label: "Hoà LN", value: 83 }
]

const ChanLe = [
    { label: "Chẵn 13+", value: 84 },
    { label: "Hòa CL", value: 85 },
    { label: "Lẻ 13+", value: 86 },
    { label: "Chẵn 11-12", value: 87 },
    { label: "Lẻ 11-12", value: 88 }
]

export const PerPageSimpleKeno = React.memo(({ listNumber, bet, onChangeNumber, onChangeBet }: any) => {

    const [currentBet, setBet] = useState(bet)
    const [listChoose, setList]: any = useState([])
    const [pickingType, setPickingType] = useState<PickingType>('default')

    useEffect(() => {
        setList(listNumber)
    }, [listNumber])

    useEffect(() => {
        setBet(bet)
    }, [bet])

    const fastPick = useCallback(() => {
        if (pickingType == 'fastpick') setPickingType('default')
        else setPickingType('fastpick')
    }, [pickingType])

    const selfPick = useCallback(() => {
        // return window.myalert.show({ title: 'Tính năng đang phát triển' })
        if (pickingType == 'selfpick') setPickingType('default')
        else setPickingType('selfpick')
    }, [pickingType])

    const randomFastPick = useCallback((value: any[]) => {
        setList(value)
        onChangeNumber(value)
    }, [])

    const [toggleObj, setToggleObj] = useState({ number: -1, value: false })
    const handleToggle = useCallback((number: number, value: boolean) => {
        setToggleObj({ number: number, value: value })
    }, []);

    useEffect(() => {
        setPickingType('default')
        const newList = [...listChoose]
        if (toggleObj.value) {
            if (toggleObj.number > 80 || newList[0] > 80) newList.length = 0
            if (newList.length < MAX_LENGTH) newList.push(toggleObj.number)
        }
        else {
            const index = newList.indexOf(toggleObj.number);
            newList.splice(index, 1);
        }
        newList.sort((a: number, b: number) => a - b)
        setList(newList)
        onChangeNumber(newList)
    }, [toggleObj])

    const changeBet = useCallback((value: number) => {
        setBet(value)
        onChangeBet(value)
    }, [])

    return (
        <View style={{ marginHorizontal: 8, width: windowWidth - 16 }}>
            <View style={styles.line} />
            <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', flexShrink: 2, justifyContent: 'space-between', paddingHorizontal: -1.6 }}>
                {fullNumber.map((item: number) => {
                    return (
                        <MemoizedBallNumber
                            number={item}
                            onToggle={handleToggle}
                            check={listChoose.includes(item)}
                            key={item + ""}
                        />
                    )
                })}
                <View style={styles.columnLine} />
                <View style={styles.rowLine} />
            </View>
            <View style={styles.line} />

            <View style={{ flexDirection: 'row' }}>
                <View style={styles.leftView}>
                    {LonNho.map((item: any) => {
                        return (
                            <MemoizedButton item={item}
                                onToggle={handleToggle}
                                check={listChoose.includes(item.value)}
                                key={item.value + ""}
                            />
                        )
                    })}
                </View>
                <View style={styles.lineBetween} />
                <View style={styles.rightView}>
                    {ChanLe.map((item: any) => {
                        return (
                            <MemoizedButton item={item}
                                onToggle={handleToggle}
                                check={listChoose.includes(item.value)}
                                key={item.value + ""}
                            />
                        )
                    })}
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
                {betMilestones.map((milestone: number) => {
                    const check = milestone == currentBet ? true : false
                    return (
                        <TouchableOpacity key={milestone} style={[styles.betBlock, { backgroundColor: check ? lottColor : Color.white }]}
                            onPress={() => changeBet(milestone)}>
                            <IText style={[styles.textBet, { color: check ? Color.white : lottColor }]}>
                                {printMoneyK(milestone)}
                            </IText>
                        </TouchableOpacity>
                    )
                })}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                <TouchableOpacity
                    style={[styles.buttonFooterUp, { backgroundColor: pickingType == 'fastpick' ? '#FFC42C' : Color.white }]}
                    activeOpacity={0.6} onPress={fastPick}>
                    <Image source={Images.fast_pick} style={{ width: 19, height: 19 }}></Image>
                    <IText style={styles.textFooterUp}>{"Chọn nhanh"}</IText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttonFooterUp, { backgroundColor: pickingType == 'selfpick' ? '#FFC42C' : Color.white }]}
                    activeOpacity={0.6} onPress={selfPick}>
                    <View style={{ width: 21, height: 21, borderRadius: 99, backgroundColor: Color.luckyKing, justifyContent: 'center', alignItems: 'center' }}>
                        <IText style={{ fontSize: 14, color: Color.white, fontWeight: 'bold' }}>TC</IText>
                    </View>
                    <IText style={styles.textFooterUp}>{"Tự chọn"}</IText>
                </TouchableOpacity>
            </View>

            {
                pickingType == 'default' ? <View style={{ height: 66 }} />
                    : <ChooseLevelKeno onChoose={randomFastPick} pickingType={pickingType} />
            }
        </View>
    )
})

const MemoizedBallNumber = React.memo(({ number, onToggle, check }: any) => {
    const handlePress = useCallback(() => {
        onToggle(number, !check);
    }, [onToggle, number, check]);
    return (
        <View style={styles.ballContainer}>
            <TouchableOpacity
                style={[styles.ball, { backgroundColor: check ? lottColor : '#E9E6E6' }]}
                onPress={handlePress}
            >
                <ConsolasText style={[styles.textBall, { color: check ? 'white' : 'black' }]}>
                    {printNumber(number)}
                </ConsolasText>
            </TouchableOpacity>
        </View>
    );
});

const MemoizedButton = React.memo(({ item, onToggle, check }: any) => {
    const handlePress = useCallback(() => {
        onToggle(item.value, !check);
    }, [onToggle, item, check]);

    const customStyle = useCallback(() => {
        switch (item.value) {
            case 83: return { width: '100%' }
            case 84: case 85: case 86: return styles.buttonRightUp
            case 87: case 88: return styles.buttonRightDown
            default: return {}
        }
    }, [item])

    const checkingStyle = useCallback(() => {
        if (check) return { btnColor: lottColor, txColor: Color.white, borderColor: lottColor }
        else return { btnColor: Color.transparent, txColor: Color.black, borderColor: Color.black }
    }, [check])

    return (
        <TouchableOpacity style={
            [styles.borderButton, customStyle(),
            {
                backgroundColor: checkingStyle().btnColor,
                borderColor: checkingStyle().borderColor
            }]}
            onPress={handlePress}
        >
            <IText style={[styles.textButton, { color: checkingStyle().txColor }]}>{item.label}</IText>
        </TouchableOpacity>
    );
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    ballContainer: {
        width: (windowWidth - 48) / 10, height: 36,
        justifyContent: 'center', alignItems: 'center',
        marginHorizontal: 1.6
    },
    ball: {
        width: 30, height: 30,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 99, backgroundColor: '#E9E6E6'
    },
    textBall: { fontSize: 16 },
    betBlock: {
        height: 26, paddingHorizontal: 10,
        borderRadius: 10, borderWidth: 1, borderColor: lottColor,
        justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
    },
    textBet: {
        fontSize: 16, color: lottColor
    },
    line: {
        width: windowWidth - 16, height: 1,
        backgroundColor: '#E1DEDE', marginVertical: 8
    },
    columnLine: {
        position: 'absolute',
        left: '50%', top: 0,
        width: 1, height: '100%', backgroundColor: '#C0BBBB'
    },
    rowLine: {
        position: 'absolute',
        left: 0, top: '50%',
        width: '100%', height: 1, backgroundColor: '#C0BBBB'
    },
    leftView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: 100
    },
    lineBetween: {
        height: "100%", width: 1, marginHorizontal: 4, backgroundColor: '#C0BBBB'
    },
    rightView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flex: 1, marginLeft: 0
    },
    borderButton: {
        borderWidth: 1, borderColor: Color.black,
        borderRadius: 15, marginVertical: 4,
        height: 23, paddingHorizontal: 10,
        justifyContent: 'center', alignItems: 'center'
    },
    buttonRightUp: {
        width: (windowWidth - 130) / 3, paddingHorizontal: 0
    },
    buttonRightDown: {
        width: (windowWidth - 130) / 2
    },
    textButton: { fontSize: 15 },
    buttonFooterUp: {
        width: (windowWidth - 48) / 2, height: 28,
        borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        borderColor: '#FFC42C', backgroundColor: '#FDF9F9',
        borderWidth: 1, flexDirection: 'row'
    },
    textFooterUp: { fontSize: 16, color: Color.luckyKing, marginLeft: 4 }
})
