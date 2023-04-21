import { IText } from "@components"
import { Color } from "@styles"
import React, { useCallback, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface ChooseLevelKenoProps {
    onChoose: (value: number[]) => void
}

const lottColor = Color.keno
const MAX_KENO = 80

export const ChooseLevelKeno = React.memo(({ onChoose }: ChooseLevelKenoProps) => {

    const [current, setCurrent] = useState(0)

    const randomNumber = useCallback((value: number) => {
        setCurrent(value)
        const randomNumbers = new Set();
        while (randomNumbers.size < value) {
            const randomNumber = Math.floor(Math.random() * MAX_KENO) + 1;
            randomNumbers.add(randomNumber);
        }
        const resultArray = Array.from(randomNumbers).map(Number).sort((a, b) => a - b);
        onChoose(resultArray)
    }, [onChoose])
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