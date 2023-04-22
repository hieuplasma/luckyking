import { Color } from "@styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ViewAbove } from "../component/ViewAbove";
import { useSelector } from "react-redux";
import { ChooseDrawKeno } from "./simple-tab/ChooseDrawKeno";
import { ViewFooterKeno } from "./simple-tab/ViewFooterKeno";
import { IText } from "@components";
import { NumberSheetSimpleKeno } from "./simple-tab/NumberSheetSimpleKeno";
import { RenderLineKeno } from "./simple-tab/RenderLineKeno";
import { KENO_NUMBER, PickingType } from "@common";
import { ViewFooter1 } from "../component/ViewFoooter1";
import { ChooseLevelKeno } from "./simple-tab/ChooseLevelKeno";

interface Props {
    showBottomSheet: boolean
}

const initBets = [10000, 10000, 10000, 10000, 10000, 10000]
const initNumber = [[], [], [], [], [], []]

export const SimpleKenoTab = React.memo(({ showBottomSheet }: Props) => {

    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 1 });
    const listDraw = useSelector((state: any) => state.drawReducer.kenoListDraw)
    const [drawSelected, setDraw]: any = useState([listDraw[0]])
    const [pickingType, setPickingType] = useState<PickingType>('default')

    useEffect(() => {
        let tmp = [...drawSelected]
        for (let i = 0; i < drawSelected.length; i++) {
            if (!listDraw.includes(drawSelected[i])) {
                tmp.splice(i, 1);
                break;
            }
        }
        if (tmp.length == 0) tmp = [listDraw[0]]
        setDraw(tmp)
    }, [listDraw])

    useEffect(() => {
        console.log("rerender")
    })

    const [numberSet, setNumbers] = useState<any>(initNumber)
    const [numberFake, setNumbersFake] = useState(initNumber)
    const [pageNumber, setPageNumber] = useState(0)
    const [bets, setBets] = useState(initBets)
    const [total, setTotal] = useState(0)

    const randomNumber = useCallback((index: number) => {
        let newNumbers: any = [...numberSet]
        const level = numberSet[index].length == 0 ? 2 : numberSet[index].length
        const randomNumbers = new Set();
        while (randomNumbers.size < level) {
            const randomNumber = Math.floor(Math.random() * KENO_NUMBER) + 1;
            randomNumbers.add(randomNumber);
        }
        const resultArray = Array.from(randomNumbers).map(Number).sort((a, b) => a - b);
        newNumbers[index] = resultArray
        setNumbers(newNumbers)
    }, [numberSet])

    const deleteNumber = useCallback((index: number) => {
        let newNumbers: any = [...numberSet]
        const level = numberSet[index].length
        let resultArray = (level == 1 && numberSet[index][0] > 80) ? [] : Array(level).fill(false)
        console.log(resultArray)
        newNumbers[index] = resultArray
        setNumbers(newNumbers)
    }, [numberSet])

    const randomFastPick = useCallback((value: number[]) => {
        setNumbers(value)
    }, [])

    useEffect(() => {
        let count = 0;
        for (let i = 0; i < numberSet.length; i++) {
            if (numberSet[i].length > 0 && numberSet[i][0] !== false)
                count = count + bets[i]
        }
        setTotal(count * drawSelected.length)
    }, [numberSet, bets, drawSelected])

    const fastPick = useCallback(() => {
        if (pickingType == 'fastpick') setPickingType('default')
        else setPickingType('fastpick')
    }, [pickingType])

    const selfPick = useCallback(() => {

    }, [])

    // ref
    const chooseTypeRef: any = useRef(null);
    const chooseDrawRef: any = useRef(null);
    const chooseNumberRef: any = useRef(null);

    const openTypeSheet = useCallback(() => { }, [])

    const onChangeDraw = useCallback((draw: any) => setDraw(draw), [])
    const openDrawSheet = useCallback(() => { chooseDrawRef.current?.openSheet() }, [chooseDrawRef])
    const renderDrawSheet = useCallback(() => {
        return (
            <ChooseDrawKeno
                ref={chooseDrawRef}
                currentChoose={drawSelected}
                onChoose={onChangeDraw}
            />
        )
    }, [chooseDrawRef, onChangeDraw, drawSelected])

    const onChangeNumber = useCallback((set: any, bets: any) => {
        console.log("numbers::::", set),
            console.log("bets::::", bets)
        setNumbers(set)
        setBets(bets)
    }, [])
    const openNumberSheet = useCallback(async (page: number) => {
        await setNumbersFake(numberSet)
        setPageNumber(page)
        chooseNumberRef.current?.openSheet()
    }, [chooseNumberRef, numberSet])
    const renderNumberSheet = useCallback(() => {
        return (
            <NumberSheetSimpleKeno
                ref={chooseNumberRef}
                onChoose={onChangeNumber}
                numberSet={numberFake}
                page={pageNumber}
                listBets={bets}
            />
        )
    }, [chooseNumberRef, numberFake, pageNumber])

    const bookLottery = useCallback(() => {

    }, [numberSet, bets, drawSelected])

    return (
        <View style={{ flex: 1 }}>
            <ViewAbove typePlay={typePlay.label} drawSelected={drawSelected} openTypeSheet={openTypeSheet} openDrawSheet={openDrawSheet} />

            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                    {numberSet.map((item: any, index: number) => {
                        return (
                            <RenderLineKeno
                                key={index}
                                title={String.fromCharCode(65 + index)}
                                item={item}
                                openNumberSheet={() => openNumberSheet(index)}
                                deleteNumber={() => deleteNumber(index)}
                                randomNumber={() => randomNumber(index)}
                                bet={bets[index]}
                            />
                        )
                    })}
                </View>
            </ScrollView>

            <View style={{ paddingHorizontal: 16, marginBottom: 5, zIndex: -1 }}>
                <ViewFooter1
                    fastPick={fastPick}
                    selfPick={selfPick}
                    pickingType={pickingType}
                />
                {
                    pickingType == 'default' ? <View style={{ height: 66 }} />
                        : <ChooseLevelKeno onChooseForAll={randomFastPick} />
                }
                <ViewFooterKeno totalCost={total} bookLottery={bookLottery} />
            </View>

            {showBottomSheet ?
                <>
                    {renderDrawSheet()}
                    {renderNumberSheet()}
                </>
                : <></>}
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
    ballContainer: { width: (windowWidth - 146) / 6, justifyContent: 'center', alignItems: 'center', marginVertical: 4 },
    ballStyle: {
        width: 28, height: 28, justifyContent: 'center', alignItems: 'center'
    },
    buttonBets: {
        width: 40, height: 26,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 6,
        borderColor: Color.blue,
        borderWidth: 1, marginRight: 12
    }
})