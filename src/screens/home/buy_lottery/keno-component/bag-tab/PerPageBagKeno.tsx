import { Image, Images } from "@assets"
import { ConsolasText, IText } from "@components"
import { Color } from "@styles"
import { getColorLott, printMoneyK, printNumber } from "@utils"
import React, { useCallback, useEffect, useState } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"

const betMilestones = [
    10000, 20000, 50000, 100000, 200000, 500000
]

const lottColor = Color.keno

const fullNumber = Array.from({ length: 80 }, (_, index) => index + 1);

export const PerPageBagKeno = React.memo(({ listNumber, bet, onChangeNumber, onChangeBet }: any) => {

    const [currentBet, setBet] = useState(bet)
    const [listChoose, setList]: any = useState([])

    useEffect(() => {
        setList(listNumber)
    }, [listNumber])

    useEffect(() => {
        setBet(bet)
    }, [bet])

    const [toggleObj, setToggleObj] = useState({ number: -1, value: false })
    const handleToggle = useCallback((number: number, value: boolean) => {
        setToggleObj({ number: number, value: value })
    }, []);

    useEffect(() => {
        const newList = [...listChoose]
        if (!toggleObj.value) newList[newList.indexOf(toggleObj.number)] = false
        else {
            const index = newList.indexOf(false)
            if (index != -1) newList[index] = toggleObj.number
        }
        onChangeNumber(newList.sort((a, b) => a - b))
    }, [toggleObj])

    const changeBet = useCallback((value: number) => {
        setBet(value)
        onChangeBet(value)
    }, [])

    return (
        <View style={{ marginHorizontal: 8, width: windowWidth - 16 }}>
            <View style={styles.line} />
            <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', flexShrink: 2, justifyContent: 'space-between' }}>
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    ballContainer: {
        width: (windowWidth - 48) / 10, height: 36,
        justifyContent: 'center', alignItems: 'center'
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
    }
})
