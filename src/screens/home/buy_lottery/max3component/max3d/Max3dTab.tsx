import { Image, Images } from "@assets";
import { LotteryType, MAX3D_NUMBER, MAX_SET, MAX_SET_MAX3D, OrderMethod, OrderStatus } from "@common";
import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { calSurcharge, generateUniqueStrings, printMoneyK, printNumber } from "@utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, View, Dimensions, Alert } from "react-native";
import { useSelector } from "react-redux";
import { ChangeBetButton } from "../../component/ChangeBetButton";
import { ChooseDrawSheet } from "../../component/ChooseDrawSheet";
import { ViewAbove } from "../../component/ViewAbove";
import { ViewFooter1 } from "../../component/ViewFoooter1";
import { ViewFooter2 } from "../../component/ViewFooter2";
import { generateMax3d } from "../utils";
import { Max3dBagView } from "./Max3dBagView";
import { NumberSheetMax3d } from "./NumberSheetMax3d";
import { TypeSheetMax3d } from "./TypeSheetMax3d";

interface Props {
    showBottomSheet: boolean
}

const initNumber = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
]

const initBets = [10000, 10000, 10000, 10000, 10000, 10000]
const lottColor = Color.max3d
const fullNumber = Array.from({ length: 10 }, (_, index) => index);

export const Max3dTab = React.memo((props: Props) => {

    const listDraw = useSelector((state: any) => state.drawReducer.max3dListDraw)

    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 1 });
    const [drawSelected, setDraw]: any = useState(listDraw[0])
    const [numberSet, setNumbers]: any = useState(initNumber)
    const [bets, setBets] = useState(initBets)
    const [generated, setGenrated] = useState([])
    const [generatedBets, setGeneratedBets] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [hugePosition, setHugePosition] = useState(-1)

    // ref
    const chooseTypeRef: any = useRef(null);
    const chooseDrawRef: any = useRef(null);
    const chooseNumberRef: any = useRef(null);
    const [pageNumber, setPageNumber] = useState(0)

    const type4Ref: any = useRef(null);

    const [totalCostBag, setTotalCostBag] = useState(0)

    const randomNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const randomNumbers = [];
        while (randomNumbers.length < MAX_SET_MAX3D) {
            const randomNumber = Math.floor(Math.random() * MAX3D_NUMBER);
            randomNumbers.push(randomNumber);
        }
        let resultArray = Array.from(randomNumbers).map(Number)
        if (typePlay.value == 3) resultArray[hugePosition] = 10
        currentNumber[index] = resultArray
        setNumbers(currentNumber)
    }

    const deleteNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const resultArray = Array(MAX_SET_MAX3D).fill(false);
        if (typePlay.value == 3) resultArray[hugePosition] = 10
        currentNumber[index] = resultArray
        setNumbers(currentNumber)
    }

    const fastPick = useCallback(() => {
        let tmp = []
        for (let i = 0; i < MAX_SET; i++) {
            const randomNumbers = [];
            while (randomNumbers.length < 3) {
                const randomNumber = Math.floor(Math.random() * MAX3D_NUMBER);
                randomNumbers.push(randomNumber);
            }
            let resultArray = Array.from(randomNumbers).map(Number)
            if (typePlay.value == 3) resultArray[hugePosition] = 10
            tmp[i] = resultArray
        }
        setNumbers(tmp)
    }, [typePlay, hugePosition])

    const selfPick = useCallback(() => {
        window.myalert.show({ title: 'Vé tự chọn hiện không khả dụng cho loại hình chơi MAX3D!', btnLabel: "OK" })
    }, [])

    useEffect(() => {
        const currentNumber = [...numberSet]
        const level = typePlay.value
        const tmp = generateMax3d(level, currentNumber, bets, hugePosition)
        setGenrated(tmp.numberGenerated)
        setGeneratedBets(tmp.betsGenerated)
        setTotalCost(tmp.totalCost)
    }, [numberSet, bets])

    const onChangeHugePositon = useCallback((position: number) => {
        let tmp = [
            [false, false, false], [false, false, false], [false, false, false],
            [false, false, false], [false, false, false], [false, false, false],
        ]
        tmp.map((item: any) => item[position] = 10)
        setHugePosition(position)
        setNumbers(tmp)
    }, [])

    const onChangeType = useCallback((type: any) => {
        setType(type)
        setNumbers(initNumber)
        setBets(initBets)
        setHugePosition(-1)
        if (type.value == 3) {
            let tmp = [
                [10, false, false], [10, false, false], [10, false, false],
                [10, false, false], [10, false, false], [10, false, false],
            ]
            setNumbers(tmp)
            setHugePosition(0)
        }
    }, [])
    const openTypeSheet = useCallback(() => { chooseTypeRef.current?.openSheet() }, [chooseTypeRef])
    const renderTypeSheet = useCallback(() => {
        return (
            <TypeSheetMax3d
                ref={chooseTypeRef}
                currentChoose={typePlay}
                onChoose={onChangeType}
                type={LotteryType.Max3D}
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
                type={LotteryType.Max3D}
            />
        )
    }, [chooseDrawRef, onChangeDraw, drawSelected, listDraw])

    const onChangeNumber = useCallback((set: any, bets: any) => {
        setNumbers(set)
        setBets(bets)
    }, [])
    const openNumberSheet = useCallback((page: number) => {
        setPageNumber(page)
        chooseNumberRef.current?.openSheet()
    }, [chooseNumberRef])
    const renderNumberSheet = useCallback(() => {
        return (
            <NumberSheetMax3d
                ref={chooseNumberRef}
                onChoose={onChangeNumber}
                numberSet={numberSet}
                page={pageNumber}
                listBets={bets}
                type={LotteryType.Max3D}
                hugePosition={hugePosition}
            />
        )
    }, [chooseNumberRef, numberSet, pageNumber])

    const bookLottery = async () => {
        if (generated.length == 0) {
            return Alert.alert("Thông báo", "Bạn chưa chọn bộ số nào")
        }
        const total = totalCost
        const surchagre = calSurcharge(totalCost)
        let body: any = {
            lotteryType: LotteryType.Max3D,
            amount: total,
            surchagre: surchagre,
            status: OrderStatus.PENDING,
            method: OrderMethod.Keep,
            level: typePlay.value,
            drawCode: drawSelected.drawCode,
            numbers: generated,
            bets: generatedBets
        }
        console.log(body)
        window.loadingIndicator.show()
        // const res = await lotteryApi.bookLotteryPowerMega(body)
        // if (res) {
        //     Alert.alert("Thành công", "Đã thanh toán mua vé thành công!")
        //     dispatch(updateUser({ luckykingBalance: luckykingBalance - total - surchagre }))
        //     refreshChoosing()
        // }
        window.loadingIndicator.hide()
    }

    const addToCart = async () => {
        if (generated.length == 0) {
            return Alert.alert("Thông báo", "Bạn chưa chọn bộ số nào")
        }
        let body: any = {
            lotteryType: LotteryType.Max3D,
            amount: totalCost,
            status: OrderStatus.CART,
            level: typePlay.value,
            drawCode: drawSelected.drawCode,
            drawTime: drawSelected.drawTime,
            numbers: generated,
            bets: generatedBets
        }
        console.log(body)
        window.loadingIndicator.show()
        // const res = await lotteryApi.addPowerMegaToCart(body)
        // console.log(res)
        // if (res) {
        //     Alert.alert("Thành công", "Đã thêm vé vào giỏ hàng!")
        //     refreshChoosing()
        //     dispatch(addLottery(res.data))
        // }
        window.loadingIndicator.hide()
    }

    return (
        <View style={{ flex: 1 }}>
            <ViewAbove typePlay={typePlay} drawSelected={drawSelected} openTypeSheet={openTypeSheet} openDrawSheet={openDrawSheet} />

            {
                typePlay.value == 3 ?
                    <View style={{ alignSelf: 'center', marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <IText style={{ fontSize: 16 }}>{"Chọn 1 vị trí ÔM"}</IText>
                        <View style={styles.hugeContainer}>
                            {
                                [0, 1, 2].map((item) => {
                                    return (
                                        <TouchableOpacity key={item + ""} activeOpacity={1} style={styles.circleOutside} onPress={() => onChangeHugePositon(item)}>
                                            <View style={[styles.circleInside, { backgroundColor: hugePosition == item ? lottColor : Color.white }]} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View >
                    : <></>
            }

            {/* //Chon so */}
            {
                typePlay.value == 4 ?
                    <Max3dBagView ref={type4Ref} changeCost={(data: number) => setTotalCostBag(data)} />
                    : <ScrollView style={{ flex: 1 }}>
                        <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                            {numberSet.map((item: any, index: number) => {
                                return (
                                    <View style={styles.lineNumber} key={index}>
                                        <IText style={{ fontSize: 18, fontWeight: 'bold' }}>{String.fromCharCode(65 + index)}</IText>
                                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginHorizontal: 18, justifyContent: 'center' }} onPress={() => openNumberSheet(index)}>
                                            {item.map((number: any, index2: number) => {
                                                return (
                                                    <View style={styles.ballContainer} key={index2}>
                                                        <Image source={number !== false ? Images.ball_max3d : Images.ball_grey} style={styles.ballStyle}>
                                                            <ConsolasText style={{ color: Color.white, fontSize: 16, marginTop: number == 10 ? -2 : 2 }}>{number < 10 ? number : "✽"}</ConsolasText>
                                                        </Image>
                                                    </View>
                                                )
                                            })}
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
            }

            <View style={{ paddingHorizontal: 16, marginBottom: 5 }}>
                {
                    typePlay.value == 4 ?
                        <></>
                        : <>
                            <ViewFooter1 fastPick={fastPick} selfPick={selfPick} />

                            <IText style={{ fontSize: 16, color: Color.blue, fontWeight: 'bold', marginTop: 5, alignSelf: 'center' }}>
                                {`Các bộ số được tạo (${generated.length} bộ)`}
                            </IText>
                            <ScrollView style={styles.boxGenerated}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {
                                        generated.map((item: any, index: number) =>
                                            <ConsolasText key={index + ""} style={{ fontSize: 16, color: lottColor, marginHorizontal: 8, marginVertical: 5 }}>{item}</ConsolasText>
                                        )
                                    }
                                </View>
                            </ScrollView>
                        </>
                }
                <ViewFooter2
                    totalCost={typePlay.value != 4 ? totalCost : totalCostBag}
                    addToCart={addToCart}
                    bookLottery={bookLottery}
                    lotteryType={LotteryType.Max3D}
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
    boxGenerated: {
        height: 86, width: windowWidth - 32,
        borderRadius: 10, backgroundColor: '#F3F2F2',
        padding: 5
    },
    hugeContainer: {
        width: 73, height: 24,
        borderRadius: 20, borderColor: lottColor,
        borderWidth: 1, marginLeft: 4,
        justifyContent: 'space-around', flexDirection: 'row',
        alignItems: 'center'
    },
    circleOutside: {
        width: 16, height: 16,
        borderRadius: 99, borderWidth: 1,
        borderColor: lottColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleInside: {
        width: 11, height: 11,
        borderRadius: 99, borderWidth: 1,
        borderColor: lottColor
    }
})