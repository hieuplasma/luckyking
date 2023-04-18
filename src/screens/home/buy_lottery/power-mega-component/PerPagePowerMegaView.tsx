import { ConsolasText, IText } from "@components";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Color } from "@styles";
import { printNumber } from "@utils";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { ColorValue, Dimensions, StyleSheet, View } from "react-native";

const fullNumber: number[] = Array.from({ length: 55 }, (_, index) => index + 1);

interface ItemPageProps {
    listNumber: any,
    lottColor: ColorValue,
    onNumberChange: (value: any) => void,
}

const Wiget = forwardRef(({ listNumber, lottColor, onNumberChange }: ItemPageProps, ref) => {

    // useEffect(() => {
    //     console.log("PerPageView rerender:::")
    // })

    const [listChoose, setList]: any = useState([...listNumber])
    const [toggleObj, setToggleObj] = useState({ number: 0, value: false })

    useEffect(() => {
        setList(listNumber)
    }, [listNumber])

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
        setList(newList)
        onNumberChange(newList)
    }, [toggleObj])

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 24, width: windowWidth - 48 }}>
            {fullNumber.map((number: number, index2: number) =>
                <MemoizedBallNumber
                    key={number}
                    number={number}
                    lottColor={lottColor}
                    check={listChoose.includes(number)}
                    onToggle={handleToggle}
                />
            )}
        </View>
    )
})

export const PerPagePowerMegaView = React.memo(Wiget)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MemoizedBallNumber = React.memo(({ number, lottColor, onToggle, check }: any) => {

    useEffect(() => {
        console.log("console ball" + number)
    })

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

const styles = StyleSheet.create({
    title: {
        fontSize: 18, color: Color.black, alignSelf: 'center', fontWeight: 'bold'
    },
    ballContainer: {
        width: (windowWidth - 48) / 8, height: 44,
        justifyContent: 'center', alignItems: 'center'
    },
    ball: {
        width: 32, height: 32,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 99, backgroundColor: '#E9E6E6'
    },
    textBall: { fontSize: 16, marginTop: 2 }
})