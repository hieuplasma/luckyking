import { Color } from "@styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { ViewAbove } from "../component/ViewAbove";
import { useSelector } from "react-redux";
import { ChooseDrawKeno } from "./simple-tab/ChooseDrawKeno";
import { TypeBagKenoSheet } from "./bag-tab/TypeBagKenoSheet";
import { ViewFooterKeno } from "./simple-tab/ViewFooterKeno";
import { RenderLineKenobag } from "./bag-tab/RenderLineKenoBag";
import { KENO_NUMBER, LotteryType, OrderMethod, OrderStatus } from "@common";
import { NumberSheetKenoBag } from "./bag-tab/NumberSheetKenoBag";
import { ConsolasText, IText } from "@components";
import { NavigationUtils, generateUniqueStrings, printNumber, taoChuoiTuToHopChap } from "@utils";
import { TableKenoBag } from "./bag-tab/TableKenoBag";
import { ScreenName } from "@navigation";

interface Props {
    showBottomSheet: boolean,
    navigation: any
}

const initNumber = [false, false, false]

export const BagKenoTab = React.memo(({ showBottomSheet, navigation }: Props) => {

    const [typePlay, setType]: any = useState({ bag: 3, level: 2 });
    const listDraw = useSelector((state: any) => state.drawReducer.kenoListDraw)
    const [drawSelected, setDraw]: any = useState([listDraw[0]])

    useEffect(() => {
        let tmp = [...drawSelected]
        for (let i = 0; i < drawSelected.length; i++) {
            if (!listDraw.includes(drawSelected[i]))
                tmp.splice(i, 1)
        }
        if (tmp.length == 0) tmp = [listDraw[0]]
        setDraw(tmp)
    }, [listDraw])

    const [numberSet, setNumbers]: any = useState(initNumber)
    const [numberFake, setNumberFake] = useState(initNumber)
    const [generated, setGenerated]: any = useState([])
    const [bet, setBet] = useState(10000)
    const [totalCost, setTotalCost] = useState(0)

    const randomNumber = useCallback(() => {
        const randomNumbers = new Set();
        while (randomNumbers.size < typePlay.bag) {
            const randomNumber = Math.floor(Math.random() * KENO_NUMBER) + 1;
            randomNumbers.add(randomNumber);
        }
        const resultArray = Array.from(randomNumbers).map(Number).sort((a, b) => a - b);
        setNumbers(resultArray)
    }, [typePlay])

    const deleteNumber = useCallback(() => {
        setNumbers(Array(typePlay.bag).fill(false))
    }, [typePlay])

    const genNumber = useCallback(async (arr: number[], m: number) => {
        window.loadingIndicator.show()
        const strArr: string[] = []
        arr.map((item: number) => strArr.push(printNumber(item)))
        const tmp = await taoChuoiTuToHopChap(strArr, m)
        window.loadingIndicator.hide()
        setGenerated(tmp)
    }, [])

    useEffect(() => {
        if (numberSet[0] !== false) {
            genNumber(numberSet, typePlay.level)
        }
        else {
            setGenerated([])
        }
    }, [numberSet, typePlay])

    useEffect(() => {
        setTotalCost(generated.length * bet * drawSelected.length)
    }, [bet, drawSelected, generated])

    // ref
    const chooseTypeRef: any = useRef(null);
    const chooseDrawRef: any = useRef(null);
    const chooseNumberRef: any = useRef(null);

    const onChangeType = useCallback((type: any) => {
        setType(type)
        const arr = Array(type.bag).fill(false);
        setNumbers(arr)
    }, [])
    const openTypeSheet = useCallback(() => { chooseTypeRef.current?.openSheet() }, [chooseTypeRef])
    const renderTypeSheet = useCallback(() => {
        return (
            <TypeBagKenoSheet
                ref={chooseTypeRef}
                currentChoose={typePlay}
                onChoose={onChangeType}
            />
        )
    }, [chooseTypeRef, onChangeType, typePlay])

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

    const onChangeNumber = useCallback((numberData: any, betData: any) => {
        setBet(betData)
        setNumbers(numberData)
    }, [])
    const openNumberSheet = useCallback(async () => {
        await setNumberFake(numberSet)
        chooseNumberRef.current?.openSheet()
    }, [chooseNumberRef, numberSet])
    const renderNumberSheet = useCallback(() => {
        return (
            <NumberSheetKenoBag
                ref={chooseNumberRef}
                onChoose={onChangeNumber}
                numberSet={numberFake}
            />
        )
    }, [chooseNumberRef, numberFake])

    const bookLottery = useCallback(() => {
        const currentNumber = [...generated]
        let tmp: any = []
        let drawCodes: any = []
        let drawTimes: any = []
        if (currentNumber.length == 0) {
            return window.myalert.show({ title: 'Bạn chưa chọn bộ số nào', btnLabel: "Đã hiểu" })
        }
        currentNumber.map((item: any) => tmp.push(item.trim().replaceAll(" ", "-")))
        drawSelected.map((item: any) => {
            drawCodes.push(item.drawCode)
            drawTimes.push(item.drawTime)
        })
        const total = totalCost
        let body: any = {
            lotteryType: LotteryType.Keno,
            amount: total,
            status: OrderStatus.PENDING,
            level: typePlay.bag,
            drawCode: drawCodes,
            drawTime: drawTimes,
            numbers: tmp,
            bets: Array(generated.length).fill(bet)
        }
        NavigationUtils.navigate(navigation, ScreenName.HomeChild.OrderScreen, { body: body })
    }, [generated, bet, drawSelected, totalCost])

    return (
        <View style={{ flex: 1 }}>
            <ViewAbove
                typePlay={`Bao ${typePlay.bag} bậc ${typePlay.level}`}
                drawSelected={drawSelected}
                openTypeSheet={openTypeSheet}
                openDrawSheet={openDrawSheet}
            />

            <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                <RenderLineKenobag
                    item={numberSet}
                    title="A"
                    openNumberSheet={() => openNumberSheet()}
                    deleteNumber={deleteNumber}
                    randomNumber={randomNumber}
                    bet={bet}
                />
            </View>

            <IText style={{ marginHorizontal: 16, fontSize: 16 }}>
                {"Có tổng cổng "}
                <IText style={{ fontWeight: 'bold', fontSize: 16 }}>{generated.length}</IText>
                <IText style={{ fontSize: 16 }}>{" bộ số sẽ được tạo:"}</IText>
            </IText>

            <ScrollView style={{ flex: 1 }} >
                <View style={{ flex: 1, paddingHorizontal: 16, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        generated.map((item: any, index: number) =>
                            <View key={index + ""} style={{ flexDirection: 'row' }}>
                                <IText style={styles.textGenerated}>{item}</IText>
                                <View style={styles.lineContainer} >
                                    <View style={styles.line} />
                                </View>

                            </View>
                        )
                    }
                </View>
            </ScrollView>

            <TableKenoBag />

            <View style={{ paddingHorizontal: 16, marginBottom: 5, zIndex: -1 }}>
                <ViewFooterKeno totalCost={totalCost} bookLottery={bookLottery} />
            </View>
            {
                showBottomSheet ?
                    <>
                        {renderDrawSheet()}
                        {renderTypeSheet()}
                        {renderNumberSheet()}
                    </>
                    : <></>
            }
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
        fontSize: 16, fontWeight: 'bold',
        marginHorizontal: 8, marginVertical: 5
    }
})