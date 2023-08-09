import { IText } from "@components"
import { Color } from "@styles"
import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface ChooseLevelKenoProps {
    onChoose?: (value: any[]) => void,
    onChooseForAll?: (value: any) => void,
    pickingType?: 'selfpick' | 'fastpick' | 'default'
}

const lottColor = Color.keno
const MAX_KENO = 80

// COMPONENT HEIGHT = 66

export const ChooseLevelKeno = React.memo(({ onChoose, onChooseForAll, pickingType }: ChooseLevelKenoProps) => {

    const [current, setCurrent] = useState(0)

    const random1Row = useCallback((len: number) => {
        if (pickingType == 'selfpick') {
            return Array(len).fill('TC')
        }
        else {
            const randomNumbers = new Set();
            while (randomNumbers.size < len) {
                const randomNumber = Math.floor(Math.random() * MAX_KENO) + 1;
                randomNumbers.add(randomNumber);
            }
            const resultArray = Array.from(randomNumbers).map(Number).sort((a, b) => a - b);
            return resultArray
        }
    }, [pickingType])

    const random6Row = useCallback((len: number) => {
        if (pickingType == 'selfpick') {
            const random: any[][] = []
            while (random.length < 6) {
                random.push(random1Row(len))
            }
            return random
        }
        else {
            const random: any[][] = []
            while (random.length < 6) {
                random.push(random1Row(len))
            }
            const resultArray = random.sort((a, b) => a[0] - b[0]);
            return resultArray
        }
    }, [pickingType, random1Row])

    const randomNumber = useCallback((value: number) => {
        setCurrent(value)
        if (onChoose) onChoose(random1Row(value))
        if (onChooseForAll) onChooseForAll(random6Row(value))
    }, [onChoose, onChooseForAll, pickingType])

    useEffect(() => {
        setCurrent(0)
    }, [pickingType])
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                {[1, 2, 3, 4, 5].map((number: number) => {
                    return (
                        <MemoizedBtn key={number} number={number}
                            onChoose={() => randomNumber(number)}
                            check={current == number ? true : false}
                        />
                    )
                })}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                {[6, 7, 8, 9, 10].map((number: number) => {
                    return (
                        <MemoizedBtn key={number} number={number}
                            onChoose={() => randomNumber(number)}
                            check={current == number ? true : false}
                        />
                    )
                })}
            </View>
        </>
    )
})

const MemoizedBtn = React.memo(({ number, onChoose, check }: any) => {
    return (
        <TouchableOpacity
            style={[styles.btn, { backgroundColor: check ? lottColor : Color.white }]}
            onPress={onChoose}
            activeOpacity={0.7}
        >
            <IText style={[styles.tx, { color: check ? 'white' : lottColor }]}>
                {`Bậc ${number}`}
            </IText>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    btn: {
        width: 50, height: 25,
        borderRadius: 10, borderWidth: 1,
        borderColor: lottColor,
        justifyContent: 'center', alignItems: 'center'
    },
    tx: {
        fontSize: 16
    }
})