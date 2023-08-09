import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { ViewAbove } from "../component/ViewAbove";
import { useSelector } from "react-redux";
import { ChooseDrawKeno } from "./simple-tab/ChooseDrawKeno";
import { ViewFooterKeno } from "./simple-tab/ViewFooterKeno";
import { NumberSheetSimpleKeno } from "./simple-tab/NumberSheetSimpleKeno";
import { RenderLineKeno } from "./simple-tab/RenderLineKeno";
import { BTN_LABEL, ERR_MES, KENO_NUMBER, LotteryType, OrderMethod, OrderStatus, PickingType } from "@common";
import { ViewFooter1 } from "../component/ViewFoooter1";
import { ChooseLevelKeno } from "./simple-tab/ChooseLevelKeno";
import { NavigationUtils } from "@utils";
import { ScreenName } from "@navigation";
import { Image, Images } from "@assets";

interface Props {
    showBottomSheet: boolean,
    navigation: any
}

const initBets = [10000, 10000, 10000, 10000, 10000, 10000]
const initNumber = [[], [], [], [], [], []]

export const SimpleKenoTab = React.memo(({ showBottomSheet, navigation }: Props) => {

    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 1 });
    const listDraw = useSelector((state: any) => state.drawReducer.kenoListDraw)
    const [drawSelected, setDraw]: any = useState(listDraw.length > 0 ? [listDraw[0]] : [])
    const [pickingType, setPickingType] = useState<PickingType>('default')

    useEffect(() => {
        if (listDraw.length == 0) return setDraw([])
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

    const [numberSet, setNumbers] = useState<any>(initNumber)
    const [numberFake, setNumbersFake] = useState(initNumber)
    const [pageNumber, setPageNumber] = useState(0)
    const [bets, setBets] = useState(initBets)
    const [totalCost, setTotalCost] = useState(0)

    const [randomLine, setRandomLine] = useState(-1)

    const randomNumber = useCallback((value: number[]) => {
        let newNumbers: any = [...numberSet]
        newNumbers[randomLine] = value
        setNumbers(newNumbers)
        setRandomLine(-1)
    }, [numberSet, randomLine])

    const randomNumberDefault = useCallback((index: number) => {
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
        setRandomLine(-1)
    }, [numberSet])

    const deleteNumber = useCallback((index: number) => {
        let newNumbers: any = [...numberSet]
        newNumbers[index] = []
        setNumbers(newNumbers)
    }, [numberSet])

    const randomFastPick = useCallback((value: any[]) => {
        setNumbers(value)
    }, [])

    useEffect(() => {
        let count = 0;
        for (let i = 0; i < numberSet.length; i++) {
            if (numberSet[i].length > 0 && numberSet[i][0] !== false)
                count = count + bets[i]
        }
        setTotalCost(count * drawSelected.length)
    }, [numberSet, bets, drawSelected])

    const fastPick = useCallback(() => {
        if (pickingType == 'fastpick') setPickingType('default')
        else setPickingType('fastpick')
    }, [pickingType])

    const selfPick = useCallback(() => {
        // return window.myalert.show({ title: 'Tính năng đang phát triển' })
        if (pickingType == 'selfpick') setPickingType('default')
        else setPickingType('selfpick')
    }, [pickingType])

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
        setNumbers(set)
        setBets(bets)
    }, [])
    const openNumberSheet = useCallback(async (page: number) => {
        await setNumbersFake(numberSet)
        setPageNumber(page)
        setPickingType('default')
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
        const currentNumber = [...numberSet]
        let drawCodes: any = []
        let drawTimes: any = []
        let numbers: string[] = []
        let betsGenerated: number[] = []
        for (let i = 0; i < currentNumber.length; i++) {
            let tmp = ""
            if (currentNumber[i][0] !== false && currentNumber[i].length > 0) {
                currentNumber[i].map((item: number, index: number) => {
                    if (index == 0) tmp = tmp + item
                    else tmp = tmp + "-" + item
                })
                numbers.push(tmp)
                betsGenerated.push(bets[i])
            }
        }
        if (numbers.length == 0) {
            return window.myalert.show({ title: ERR_MES.NONE_NUMBER, btnLabel: BTN_LABEL.UNDERSTOOD })
        }
        if (drawSelected.length <= 0) {
            return window.myalert.show({ title: ERR_MES.INVALID_DRAW, btnLabel: BTN_LABEL.UNDERSTOOD })
        }
        drawSelected.map((item: any) => {
            drawCodes.push(item.drawCode)
            drawTimes.push(item.drawTime)
        })
        const total = totalCost
        let body: any = {
            lotteryType: LotteryType.Keno,
            amount: total,
            status: OrderStatus.PENDING,
            level: typePlay.value,
            drawCode: drawCodes,
            drawTime: drawTimes,
            numbers: numbers,
            bets: betsGenerated
        }
        NavigationUtils.navigate(navigation, ScreenName.HomeChild.OrderScreen, { body: body })
    }, [numberSet, bets, drawSelected, totalCost])

    return (
        <View style={{ flex: 1 }}>
            <ViewAbove
                typePlay={typePlay.label}
                drawSelected={drawSelected}
                openTypeSheet={openTypeSheet}
                openDrawSheet={openDrawSheet}
                disableChooseType={true}
            />

            <Image source={Images.bg_ticket_1} style={{ flex: 1 }} resizeMode="cover">
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
                                    randomNumber={() => randomNumberDefault(index)}
                                    randoming={randomLine == index ? true : false}
                                    bet={bets[index]}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
            </Image>

            <View style={{ paddingHorizontal: 16, marginBottom: 5, zIndex: -1 }}>
                <ViewFooter1
                    fastPick={fastPick}
                    selfPick={selfPick}
                    pickingType={pickingType}
                />
                {
                    (pickingType == 'fastpick' || pickingType == 'selfpick') ?
                        <ChooseLevelKeno onChooseForAll={randomFastPick} pickingType={pickingType} />
                        : randomLine != -1 ?
                            <ChooseLevelKeno onChoose={randomNumber} pickingType={pickingType} />
                            : <View style={{ height: 66 }} />
                }
                <ViewFooterKeno totalCost={totalCost} bookLottery={bookLottery} />
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