import { LotteryType } from "@common";
import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { generateStringsFromArray, generateUniqueStrings } from "@utils";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ChangeBetButton } from "../../component/ChangeBetButton";
import { BagNumberSheet } from "../../component/BagNumberSheet";

const lottColor = Color.max3d
const fullNumber = Array.from({ length: 10 }, (_, index) => index);

interface BagViewProps {
    changeCost: (data: any) => void,
    changeGenerated: (data: any) => void,
    changeBets: (data: any) => void,
    typePlay: any
}
export const Max3dPlusBagView = forwardRef(({ changeCost, changeGenerated, changeBets, typePlay }: BagViewProps, ref) => {

    const [generated, setGenrated] = useState([])
    const [currentBet, setCurrentBet] = useState(10000)
    const [total, setTotal] = useState(0)

    const [currentNumbers, setNumbers]: any = useState([])
    const [fixedNumbers, setFixedNumbers]: any = useState([false, false, false])

    useImperativeHandle(ref, () => ({
        renderNumberSheet: () => { return renderNumberSheet() },
    }));

    useEffect(() => {
        setCurrentBet(10000)
        setNumbers([])
        setFixedNumbers([false, false, false])
        setGenrated([])
        changeCost(0)
        changeGenerated([])
        changeBets([])
    }, [typePlay])

    const choose = (number: number) => {
        let tmp = [...currentNumbers]
        let index = tmp.indexOf(number);
        if (index !== -1) tmp.splice(index, 1);
        else tmp.push(number)
        setNumbers(tmp)
    }

    useEffect(() => {
        if (!(fixedNumbers[0] !== false && fixedNumbers[1] !== false && fixedNumbers[2] !== false)) {
            changeCost(0)
            changeGenerated([])
            changeBets([])
            return setGenrated([]);
        }
        let before = "", after = ""
        if (typePlay.value == 8) before = "" + fixedNumbers[0] + fixedNumbers[1] + fixedNumbers[2] + " "
        else after = " " + fixedNumbers[0] + fixedNumbers[1] + fixedNumbers[2]
        const tmp: any = generateStringsFromArray(currentNumbers.sort((a: number, b: number) => a - b), before, after)
        setGenrated(tmp)
        changeCost(tmp.length * currentBet)
        changeGenerated(tmp)
        changeBets(Array(tmp.length).fill(currentBet))
    }, [currentNumbers, fixedNumbers])

    useEffect(() => {
        changeCost(generated.length * currentBet)
        changeBets(Array(generated.length).fill(currentBet))
    }, [currentBet])

    const chooseNumberRef: any = useRef(null);

    const onChangeFixed = useCallback((set: any) => {
        setFixedNumbers(set)
    }, [])
    const openNumberSheet = useCallback(() => {
        chooseNumberRef.current?.openSheet()
    }, [chooseNumberRef])
    const renderNumberSheet = useCallback(() => {
        return (
            <BagNumberSheet
                ref={chooseNumberRef}
                onChoose={onChangeFixed}
                numberSet={fixedNumbers}
                type={LotteryType.Max3DPlus}
                bagPosition={typePlay.value == 7 ? 1 : 2}
            />
        )
    }, [chooseNumberRef, fixedNumbers])


    return (
        <>
            <IText style={{ fontSize: 16, marginLeft: 16, marginTop: 8 }}>{"Chọn các số để bao"}</IText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 8 }}>
                {
                    fullNumber.map((number: number) => {
                        const check = currentNumbers.includes(number) ? true : false
                        return (
                            <TouchableOpacity key={number + ""} style={[styles.ballCircle, { backgroundColor: check ? lottColor : Color.white }]}
                                onPress={() => choose(number)}>
                                <ConsolasText style={{ fontSize: 16, color: check ? Color.white : lottColor }}>{number}</ConsolasText>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                {
                    typePlay.value == 7 ?
                        <>
                            <View style={styles.boxNumber}>
                                <ConsolasText style={{ fontSize: 16, color: lottColor }}>{"Bao số"}</ConsolasText>
                            </View>
                            <View style={{ width: 16 }} />
                        </> : <></>
                }
                <TouchableOpacity style={styles.boxNumber} onPress={openNumberSheet}>
                    {
                        fixedNumbers.map((item: any, idx: number) => {
                            return (<ConsolasText key={"" + idx} style={{ fontSize: 16, color: lottColor }}>{item}</ConsolasText>)
                        })
                    }
                </TouchableOpacity>
                {
                    typePlay.value == 8 ?
                        <>
                            <View style={{ width: 16 }} />
                            <View style={styles.boxNumber}>
                                <ConsolasText style={{ fontSize: 16, color: lottColor }}>{"Bao số"}</ConsolasText>
                            </View>
                        </> : <></>
                }
            </View>

            {/* <IText style={{ fontSize: 16, marginLeft: 16, marginTop: 4 }}>
                {`Chọn các số cố định `}
                <IText style={{ color: Color.luckyKing, fontWeight:'bold' }}>
                    {`( ${print(fixedNumbers[0])} ${print(fixedNumbers[1])} ${print(fixedNumbers[2])} )`}
                </IText>
            </IText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 }}>
                {
                    fullNumber.map((number: number) => {
                        const check = fixedNumbers.includes(number) ? true : false
                        return (
                            <TouchableOpacity key={number + ""} style={[styles.ballCircle, { backgroundColor: check ? lottColor : Color.white }]}
                                onPress={() => chooseFixed(number)}>
                                <ConsolasText style={{ fontSize: 16, color: check ? Color.white : lottColor }}>{number}</ConsolasText>
                            </TouchableOpacity>
                        )
                    })
                }
            </View> */}
            <IText style={{ fontSize: 16, color: Color.blue, fontWeight: 'bold', marginTop: 5, alignSelf: 'center' }}>
                {`Các bộ số được tạo (${generated.length} bộ)`}
            </IText>
            <ScrollView style={[styles.boxGenerated, { marginHorizontal: 16 }]}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        generated.map((item: any, index: number) =>
                            <View key={index + ""} style={{ flexDirection: 'row' }}>
                                <ConsolasText style={[styles.textGenerated, { color: lottColor }]}>{item}</ConsolasText>
                                <View style={styles.lineContainer} >
                                    <View style={styles.line} />
                                </View>

                            </View>
                        )
                    }
                </View>
            </ScrollView>
            <View style={{ marginTop: 8, marginHorizontal: 16, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <IText style={{ fontSize: 16 }}>{"Chọn giá tiền mỗi bộ số"}</IText>
                <ChangeBetButton
                    currentBet={currentBet}
                    increase={() => setCurrentBet(currentBet + 10000)}
                    decrease={() => setCurrentBet(currentBet - 10000)}
                    color={lottColor}
                    max={300000}
                    min={10000}
                />
            </View>

            {renderNumberSheet()}
        </>
    )
})

// export const Max3dBagView = React.memo(Wiget)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    ballCircle: {
        width: 31, height: 31,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 99, borderWidth: 1,
        borderColor: lottColor
    },
    boxGenerated: {
        height: 86, width: windowWidth - 32,
        borderRadius: 10, backgroundColor: '#F3F2F2',
        padding: 5
    },
    lineContainer: {
        height: 20, width: 1,
        alignSelf: 'center',
        alignItems: 'center', justifyContent: 'center'
    },
    line: {
        height: 11, width: 1,
        alignSelf: 'center', backgroundColor: '#B2AFAF',
        borderRadius: 10, marginBottom: 6
    },
    textGenerated: {
        fontSize: 16,
        marginHorizontal: 8, marginVertical: 5
    },
    boxNumber: {
        width: 70, height: 28,
        marginVertical: 4,
        borderColor: lottColor, borderRadius: 15,
        borderWidth: 1, justifyContent: 'space-evenly',
        alignItems: 'center', flexDirection: 'row'
    },
})