import { Image, Images } from "@assets";
import { BTN_LABEL, ERR_MES, LotteryType, MAX3D_NUMBER, MAX_SET, MAX_SET_MAX3D, OrderMethod, OrderStatus, SUCCESS_MES } from "@common";
import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { NavigationUtils, calSurcharge, printMoneyK } from "@utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ChooseDrawSheet } from "../../component/ChooseDrawSheet";
import { GeneratedNumber } from "../../component/GeneratedNumber";
import { ViewAbove } from "../../component/ViewAbove";
import { ViewFooter1 } from "../../component/ViewFoooter1";
import { ViewFooter2 } from "../../component/ViewFooter2";
import { generateMax3DPlus, numberMax3d } from "../utils";
import { Max3dHuge } from "../../component/Max3dHuge";
import { NumberSheet3DPlus } from "./NumberSheet3DPlus";
import { TypeSheetMax3dPlus } from "./TypeSheetMax3dPlus";
import { Max3dPlusBagView } from "./Max3dPlusBagView";
import { ScreenName } from "@navigation";
import { addLottery } from "@redux";
import { lotteryApi } from "@api";
interface Props {
    showBottomSheet: boolean,
    navigation: any
}

const initNumber = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
]
const initBets = [10000, 10000, 10000, 10000, 10000, 10000]
const lottColor = Color.max3d

const MAX_SET_MAX3D_PLUS = MAX_SET_MAX3D * 2

export const Max3dPlusTab = React.memo((props: Props) => {

    const dispatch = useDispatch()

    const listDraw = useSelector((state: any) => state.drawReducer.max3dListDraw)

    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 1 });
    const [drawSelected, setDraw]: any = useState(listDraw.length > 0 ? [listDraw[0]] : [])
    const [numberSet, setNumbers]: any = useState(initNumber)
    const [numberFake, setNumberFake]: any = useState(initNumber)
    const [bets, setBets] = useState(initBets)
    const [generated, setGenrated] = useState<string[]>([])
    const [generatedBets, setGeneratedBets] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [hugePosition, setHugePosition] = useState([-1, -1])

    const typeBagRef: any = useRef(null);
    const [totalCostBag, setTotalCostBag] = useState(0)

    const randomNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const randomNumbers = [];
        while (randomNumbers.length < MAX_SET_MAX3D_PLUS) {
            const randomNumber = Math.floor(Math.random() * MAX3D_NUMBER);
            randomNumbers.push(randomNumber);
        }
        let resultArray = Array.from(randomNumbers).map(Number)
        if (typePlay.value == 5) {
            if (hugePosition[0] > -1) resultArray[hugePosition[0]] = 10
            if (hugePosition[1] > -1) resultArray[hugePosition[1]] = 10
        }
        if (typePlay.value == 6) {
            resultArray[hugePosition[0]] = 10
            resultArray[hugePosition[1]] = 10
        }
        currentNumber[index] = resultArray
        setNumbers(currentNumber)
    }

    const deleteNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const resultArray = Array(MAX_SET_MAX3D_PLUS).fill(false);
        if (typePlay.value == 5) {
            if (hugePosition[0] > -1) resultArray[hugePosition[0]] = 10
            if (hugePosition[1] > -1) resultArray[hugePosition[1]] = 10
        }
        if (typePlay.value == 6) {
            resultArray[hugePosition[0]] = 10
            resultArray[hugePosition[1]] = 10
        }
        currentNumber[index] = resultArray
        setNumbers(currentNumber)
    }

    const fastPick = useCallback(() => {
        let tmp = []
        for (let i = 0; i < MAX_SET; i++) {
            const randomNumbers = [];
            while (randomNumbers.length < MAX_SET_MAX3D_PLUS) {
                const randomNumber = Math.floor(Math.random() * MAX3D_NUMBER);
                randomNumbers.push(randomNumber);
            }
            let resultArray = Array.from(randomNumbers).map(Number)
            if (typePlay.value == 5) {
                if (hugePosition[0] > -1) resultArray[hugePosition[0]] = 10
                if (hugePosition[1] > -1) resultArray[hugePosition[1]] = 10
            }
            if (typePlay.value == 6) {
                resultArray[hugePosition[0]] = 10
                resultArray[hugePosition[1]] = 10
            }
            tmp[i] = resultArray
        }
        setNumbers(tmp)
    }, [typeBagRef, hugePosition])

    const selfPick = useCallback(() => {
        if (typePlay.value != 1) return window.myalert.show({ title: 'Vé tự chọn hiện không khả dụng cho loại hình chơi này!', btnLabel: "OK" })
        const currentNumber = [...numberSet]
        for (let i = 0; i < MAX_SET; i++) {
            currentNumber[i] = Array(MAX_SET_MAX3D_PLUS).fill("TC");
        }
        setNumbers(currentNumber)
    }, [typePlay, hugePosition])

    useEffect(() => {
        const currentNumber = [...numberSet]
        const level = typePlay.value
        const tmp = generateMax3DPlus(level, currentNumber, bets, hugePosition)
        setGenrated(tmp.numberGenerated)
        setGeneratedBets(tmp.betsGenerated)
        setTotalCost(tmp.totalCost * drawSelected.length)
    }, [numberSet, bets, drawSelected])

    const onChangeHugePositon = useCallback((position: number, index: number) => {
        let huge = [-1, -1]
        if (typePlay.value == 6) huge = [...hugePosition]
        huge[index] = position
        let tmp = [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
        ]
        tmp.map((item: any) => {
            if (huge[0] > -1) item[huge[0]] = 10
            if (huge[1] > -1) item[huge[1]] = 10
        })
        setHugePosition(huge)
        setNumbers(tmp)
    }, [hugePosition])

    // ref
    const chooseTypeRef: any = useRef(null);
    const chooseDrawRef: any = useRef(null);
    const chooseNumberRef: any = useRef(null);

    const onChangeType = useCallback((type: any) => {
        setType(type)
        setNumbers(initNumber)
        setBets(initBets)
        setHugePosition([-1, -1])
        if (type.value == 5) {
            setHugePosition([0, -1])
            setNumbers([
                [10, false, false, false, false, false],
                [10, false, false, false, false, false],
                [10, false, false, false, false, false],
                [10, false, false, false, false, false],
                [10, false, false, false, false, false],
                [10, false, false, false, false, false],
            ])
        }
        if (type.value == 6) {
            setHugePosition([0, 3])
            setNumbers([
                [10, false, false, 10, false, false],
                [10, false, false, 10, false, false],
                [10, false, false, 10, false, false],
                [10, false, false, 10, false, false],
                [10, false, false, 10, false, false],
                [10, false, false, 10, false, false],
            ])
        }
    }, [])
    const openTypeSheet = useCallback(() => { chooseTypeRef.current?.openSheet() }, [chooseTypeRef])
    const renderTypeSheet = useCallback(() => {
        return (
            <TypeSheetMax3dPlus
                ref={chooseTypeRef}
                currentChoose={typePlay}
                onChoose={onChangeType}
                type={LotteryType.Max3DPlus}
            />
        )
    }, [chooseTypeRef, onChangeType, typePlay])

    const onChangeDraw = useCallback((draw: any) => setDraw(draw), [])
    const openDrawSheet = useCallback(() => { chooseDrawRef.current?.openSheet() }, [chooseDrawRef])
    const renderDrawSheet = useCallback(() => {
        return (
            <ChooseDrawSheet
                ref={chooseDrawRef}
                currentChoose={drawSelected}
                onChoose={onChangeDraw}
                listDraw={listDraw}
                type={LotteryType.Max3DPlus}
            />
        )
    }, [chooseDrawRef, onChangeDraw, drawSelected, listDraw])

    const onChangeNumber = useCallback((set: any, bets: any) => {
        setNumbers(set)
        setBets(bets)
    }, [])
    const openNumberSheet = useCallback(async (page: number) => {
        await setNumberFake(numberSet)
        setPageNumber(page)
        chooseNumberRef.current?.openSheet()
    }, [chooseNumberRef, numberSet])
    const renderNumberSheet = useCallback(() => {
        return (
            <NumberSheet3DPlus
                ref={chooseNumberRef}
                onChoose={onChangeNumber}
                numberSet={numberFake}
                page={pageNumber}
                listBets={bets}
                type={LotteryType.Max3DPlus}
                hugePosition={hugePosition}
            />
        )
    }, [chooseNumberRef, numberFake, pageNumber])

    const createBody = (status: OrderStatus) => {
        if (generated.length == 0) {
            window.myalert.show({ title: ERR_MES.NONE_NUMBER, btnLabel: BTN_LABEL.UNDERSTOOD })
            return undefined
        }
        if (drawSelected.length <= 0) {
            return window.myalert.show({ title: ERR_MES.INVALID_DRAW, btnLabel: BTN_LABEL.UNDERSTOOD })
        }
        let drawCodes: any = []
        let drawTimes: any = []
        drawSelected.map((item: any) => {
            drawCodes.push(item.drawCode)
            drawTimes.push(item.drawTime)
        })
        const total = (typePlay.value != 7 && typePlay.value != 8) ? totalCost : totalCostBag
        let pushGenerated: any[] = []
        if (typePlay.value == 1) {
            for (const element of generated) {
                const split = element.split(" ")
                if (split[0] == 'TCTCTC') split[0] = 'TC'
                if (split[1] == 'TCTCTC') split[1] = 'TC'
                pushGenerated.push(split[0] + ' ' + split[1])
            }
        }
        else pushGenerated = generated
        let body: any = {
            lotteryType: LotteryType.Max3DPlus,
            amount: total,
            status: status,
            level: typePlay.value,
            drawCode: drawCodes,
            drawTime: drawTimes,
            numbers: pushGenerated,
            bets: generatedBets
        }

        return body
    }

    const bookLottery = async () => {
        const body = createBody(OrderStatus.PENDING)
        if (!body) return 0;
        NavigationUtils.navigate(props.navigation, ScreenName.HomeChild.OrderScreen, { body: body })
    }

    const addToCart = async () => {
        const body = createBody(OrderStatus.CART)
        if (!body) return 0;
        window.loadingIndicator.show()
        const res = await lotteryApi.addMax3dToCart(body)
        if (res) {
            window.myalert.show({ title: SUCCESS_MES.CARTED_LOTTEY, btnLabel: "OK", alertType: 'success' })
            refreshChoosing()
            dispatch(addLottery(res.data))
        }
        window.loadingIndicator.hide()
    }

    const refreshChoosing = useCallback(() => {
        setType({ label: "Cơ bản", value: 1 })
        setNumbers(initNumber)
        setBets(initBets)
        setHugePosition([-1, -1])
        setDraw([listDraw[0]])
    }, [listDraw])

    return (
        <View style={{ flex: 1 }}>
            <ViewAbove typePlay={typePlay.label} drawSelected={drawSelected} openTypeSheet={openTypeSheet} openDrawSheet={openDrawSheet} />

            {
                (typePlay.value == 5 || typePlay.value == 6) ?
                    <Max3dHuge
                        hugeCount={typePlay.value == 5 ? 1 : 2}
                        hugePosition={hugePosition}
                        onChangeHugePositon={onChangeHugePositon}
                        lotteryType={LotteryType.Max3DPlus}
                    />
                    : <></>
            }


            {
                typePlay.value == 7 || typePlay.value == 8 ?
                    <Max3dPlusBagView
                        ref={typeBagRef}
                        changeCost={(data: number) => setTotalCostBag(data)}
                        changeBets={(data: any) => setGeneratedBets(data)}
                        changeGenerated={(data: any) => setGenrated(data)}
                        typePlay={typePlay}
                    />
                    : <Image source={Images.bg_ticket_1} style={{ flex: 1 }} resizeMode="cover">
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                                {numberSet.map((item: any, index: number) => {
                                    return (
                                        <View style={styles.lineNumber} key={String.fromCharCode(65 + index)}>
                                            <IText style={{ fontSize: 18, fontWeight: 'bold' }}>{String.fromCharCode(65 + index)}</IText>
                                            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginHorizontal: 18, justifyContent: 'space-evenly' }} onPress={() => openNumberSheet(index)}>
                                                <View style={styles.boxNumber}>
                                                    {item.slice(0, 3).map((number: any, index2: number) => {
                                                        return (
                                                            <IText key={index2 + "::" + index} style={{ color: lottColor, fontSize: 16 }}>{numberMax3d(number)}</IText>
                                                        )
                                                    })}
                                                </View>
                                                <View style={styles.boxNumber}>
                                                    {item.slice(3, 6).map((number: any, index2: number) => {
                                                        return (
                                                            <IText key={index2 + "::" + index} style={{ color: lottColor, fontSize: 16 }}>{numberMax3d(number)}</IText>
                                                        )
                                                    })}
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.buttonBets} onPress={() => openNumberSheet(index)}>
                                                <IText style={{ fontSize: 16, color: Color.blue }}>{printMoneyK(bets[index])}</IText>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', width: 60, justifyContent: 'space-between' }}>
                                                <Image source={Images.nofilled_heart} style={{ width: 22, height: 22, }}></Image>
                                                {(item[0] !== false && item[1] !== false) ?
                                                    <TouchableOpacity onPress={() => deleteNumber(index)}>
                                                        <Image source={Images.trash} style={{ width: 26, height: 26 }}></Image>
                                                    </TouchableOpacity>
                                                    : <TouchableOpacity onPress={() => randomNumber(index)}>
                                                        <Image source={Images.refresh} style={{ width: 26, height: 26 }}></Image>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </Image>
            }

            {/* Footer */}
            <View style={{ paddingHorizontal: 16, marginBottom: 5, zIndex: -1 }}>
                {
                    typePlay.value == 7 || typePlay.value == 8 ?
                        <></>
                        : <>
                            <ViewFooter1 fastPick={fastPick} selfPick={selfPick} hideSelfPick={typePlay.value != 1} />
                            <GeneratedNumber generated={generated} lottColor={lottColor} />
                        </>
                }
                <ViewFooter2
                    totalCost={(typePlay.value != 7 && typePlay.value != 8) ? totalCost : totalCostBag * drawSelected.length}
                    addToCart={addToCart}
                    bookLottery={bookLottery}
                    lotteryType={LotteryType.Max3DPlus}
                    navigation={props.navigation}
                />
            </View>

            {/* BottomSheet */}
            {props.showBottomSheet ?
                <>
                    {renderTypeSheet()}
                    {renderDrawSheet()}
                    {renderNumberSheet()}
                </> : <></>}
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
    boxNumber: {
        width: 70, height: 28,
        marginVertical: 4,
        borderColor: lottColor, borderRadius: 15,
        borderWidth: 1, justifyContent: 'space-evenly',
        alignItems: 'center', flexDirection: 'row'
    },
    buttonBets: {
        width: 40, height: 26,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 6,
        borderColor: Color.blue,
        borderWidth: 1, marginRight: 12
    }
})
