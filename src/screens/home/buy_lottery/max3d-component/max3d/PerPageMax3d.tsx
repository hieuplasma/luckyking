import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import React, { useCallback, useEffect, useState } from "react";
import { ColorValue, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { ChangeBetButton } from "../../component/ChangeBetButton";
import { nextBet, previousBet, printMoneyK } from "@utils";

const betMilestones = [
    10000, 20000, 50000, 100000, 200000, 300000
]

const column = [0, 1, 2]
const fullNumber = Array.from({ length: 10 }, (_, index) => index);

interface PerPageMax3dProps {
    hugePosition: number[],
    listNumber: any,
    lottColor: ColorValue,
    bet: number,
    onChangeNumber: (value: any) => void,
    onChangeBet: (value: any) => void
}

export const PerPageMax3d = React.memo(({ hugePosition, listNumber, lottColor, bet, onChangeNumber, onChangeBet }: PerPageMax3dProps) => {

    useEffect(() => {
        console.log("PerPageView rerender:::")
    })

    const [currentBet, setBet] = useState(bet)
    const [listChoose, setList] = useState([...listNumber])

    useEffect(() => {
        setList(listNumber)
    }, [listNumber])

    useEffect(() => {
        setBet(bet)
    }, [bet])

    const [toggleObj, setToggleObj] = useState({ number: -1, columnId: -1 })
    const handleToggle = useCallback((number: number, columnId: number) => {
        setToggleObj({ number: number, columnId: columnId })
    }, []);

    useEffect(() => {
        const newList = [...listChoose]
        newList[toggleObj.columnId] = toggleObj.number
        setList(newList)
        onChangeNumber(newList)
    }, [toggleObj])

    const changeBet = useCallback((value: number) => {
        setBet(value)
        onChangeBet(value)
    }, [])

    return (
        <View style={{ marginHorizontal: 32, width: windowWidth - 64, height: 440, flexDirection: 'row', justifyContent: 'space-between' }}>
            {column.map((columnId: number) => {
                const filled = hugePosition.includes(columnId) ? true : false
                return (
                    <View key={columnId + ""}>
                        {
                            fullNumber.map((number: number, index2: number) => {
                                const check = (listChoose[columnId] === number ? true : false) || filled
                                return (
                                    <MemoizedBallNumber
                                        key={index2}
                                        number={number}
                                        lottColor={lottColor}
                                        onToggle={handleToggle}
                                        check={check}
                                        filled={filled}
                                        columnId={columnId}
                                    />
                                )
                            })
                        }
                    </View>
                )
            })}
            <View style={{}}>
                {
                    betMilestones.map((milestone: number) => {
                        const check = milestone == currentBet ? true : false
                        return (
                            <TouchableOpacity key={milestone} style={[styles.betBlock, { backgroundColor: check ? Color.max3d : Color.white }]}
                                onPress={() => changeBet(milestone)}>
                                <IText style={[styles.textBet, { color: check ? Color.white : Color.max3d }]}>{printMoneyK(milestone)}</IText>
                            </TouchableOpacity>
                        )
                    })
                }
                <View style={{ flex: 1 }}></View>
                <ChangeBetButton
                    currentBet={currentBet}
                    increase={() => changeBet(nextBet(currentBet))}
                    decrease={() => changeBet(previousBet(currentBet))}
                    color={lottColor}
                    max={300000}
                    min={10000}
                />
            </View>
        </View>
    )
})

const MemoizedBallNumber = React.memo(({ number, lottColor, onToggle, check, filled, columnId }: any) => {
    const handlePress = useCallback(() => {
        onToggle(number, columnId);
    }, [onToggle, number, check]);

    return (
        <View style={styles.ballContainer}  >
            <TouchableOpacity disabled={filled} activeOpacity={0.8}
                style={[styles.ball, { backgroundColor: check ? lottColor : '#E9E6E6' }]}
                onPress={handlePress}
            >
                <ConsolasText style={[styles.textBall, { color: check ? Color.white : Color.black, marginTop: filled ? -2 : 2 }]}>
                    {filled ? "✽" : number}
                </ConsolasText>
            </TouchableOpacity>
        </View>
    )
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    ballContainer: {
        width: (windowWidth - 48) / 8, height: 44,
        justifyContent: 'center', alignItems: 'center'
    },
    ball: {
        width: 32, height: 32,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 99, backgroundColor: '#E9E6E6'
    },
    textBall: { fontSize: 16 },
    betBlock: {
        width: 63, height: 26, marginVertical: 9,
        borderRadius: 10, borderWidth: 1, borderColor: Color.max3d,
        justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
    },
    textBet: {
        fontSize: 16, color: Color.max3d
    }
})