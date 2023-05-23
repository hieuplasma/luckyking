import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
const column = [0, 1, 2]
const fullNumber = Array.from({ length: 10 }, (_, index) => index);

interface Props {
    listNumber: any,
    onChangeNumber: (value: any) => void,
}

const lottColor = Color.max3dpro

export const PerPageMultiBagSheet = React.memo(({ listNumber, onChangeNumber }: Props) => {

    const [listChoose, setList] = useState([...listNumber])

    useEffect(() => {
        setList(listNumber)
    }, [listNumber])

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

    return (
        <View style={{ marginHorizontal: 32, width: windowWidth - 64, height: 440, flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {column.map((columnId: number) => {
                return (
                    <View key={columnId + ""}>
                        {
                            fullNumber.map((number: number, index2: number) => {
                                const check = (listChoose[columnId] === number ? true : false)
                                return (
                                    <MemoizedBallNumber
                                        key={index2}
                                        number={number}
                                        lottColor={lottColor}
                                        onToggle={handleToggle}
                                        check={check}
                                        columnId={columnId}
                                    />
                                )
                            })
                        }
                    </View>
                )
            })}
        </View>
    )
})

const MemoizedBallNumber = React.memo(({ number, lottColor, onToggle, check, columnId }: any) => {
    const handlePress = useCallback(() => {
        onToggle(number, columnId);
    }, [onToggle, number, check]);

    return (
        <View style={styles.ballContainer}  >
            <TouchableOpacity activeOpacity={0.8}
                style={[styles.ball, { backgroundColor: check ? lottColor : '#E9E6E6' }]}
                onPress={handlePress}
            >
                <ConsolasText style={[styles.textBall, { color: check ? Color.white : Color.black }]}>
                    {number}
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