import { Image, Images } from "@assets";
import { LotteryType, MAX3D_NUMBER, MAX_SET, MAX_SET_MAX3D, OrderMethod, OrderStatus } from "@common";
import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { calSurcharge, generateUniqueStrings, printMoneyK } from "@utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { ChooseDrawSheet } from "../../component/ChooseDrawSheet";
import { ViewAbove } from "../../component/ViewAbove";
import { ViewFooter1 } from "../../component/ViewFoooter1";
import { ViewFooter2 } from "../../component/ViewFooter2";
import { generateMax3DPlus } from "../utils";
import { NumberSheet3DPlus } from "./NumberSheet3DPlus";
import { TypeSheetMax3dPlus } from "./TypeSheetMax3dPlus";

interface Props {
    showBottomSheet: boolean
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
const fullNumber = Array.from({ length: 10 }, (_, index) => index);

const MAX_SET_MAX3D_PLUS = MAX_SET_MAX3D * 2

export const Max3dPlusTab = React.memo((props: Props) => {

    const listDraw = useSelector((state: any) => state.drawReducer.max3dListDraw)

    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 1 });
    const [drawSelected, setDraw]: any = useState(listDraw[0])
    const [numberSet, setNumbers]: any = useState(initNumber)
    const [bets, setBets] = useState(initBets)
    const [generated, setGenrated] = useState([])
    const [generatedBets, setGeneratedBets] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [hugePosition, setHugePosition] = useState([-1, -1])
    // const [bagPosition, setBagPosition] = useState()

    const randomNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const randomNumbers = [];
        while (randomNumbers.length < MAX_SET_MAX3D_PLUS * 2) {
            const randomNumber = Math.floor(Math.random() * MAX3D_NUMBER);
            randomNumbers.push(randomNumber);
        }
        let resultArray = Array.from(randomNumbers).map(Number)
        if (typePlay.value == 5) resultArray[hugePosition[0]] = 10
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
        if (typePlay.value == 5) resultArray[hugePosition[0]] = 10
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
            if (typePlay.value == 5) resultArray[hugePosition[0]] = 10
            if (typePlay.value == 6) {
                resultArray[hugePosition[0]] = 10
                resultArray[hugePosition[1]] = 10
            }
            tmp[i] = resultArray
        }
        setNumbers(tmp)
    }, [typePlay])

    const selfPick = useCallback(() => {
        window.myalert.show({ title: 'Vé tự chọn hiện không khả dụng cho loại hình chơi MAX3D!', btnLabel: "OK" })
    }, [])

    useEffect(() => {
        const currentNumber = [...numberSet]
        const level = typePlay.value
        const tmp = generateMax3DPlus(level, currentNumber, bets, hugePosition)
        console.log(tmp)
        setGenrated(tmp.numberGenerated)
        setGeneratedBets(tmp.betsGenerated)
        setTotalCost(tmp.totalCost)
    }, [numberSet, bets])

    const onChangeHugePositon = useCallback((position: number, index: number) => {
        let huge = [...hugePosition]
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
            item[huge[0]] = 10
            item[huge[1]] = 10
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
    const openNumberSheet = useCallback((page: number) => {
        setPageNumber(page)
        chooseNumberRef.current?.openSheet()
    }, [chooseNumberRef])
    const renderNumberSheet = useCallback(() => {
        return (
            <NumberSheet3DPlus
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
            lotteryType: LotteryType.Max3DPlus,
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
            lotteryType: LotteryType.Max3DPlus,
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
                (typePlay.value == 5 || typePlay.value == 6) ?
                    <View style={{ alignSelf: 'center', marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <IText style={{ fontSize: 16 }}>{`Chọn ${typePlay.value == 5 ? 1 : 2} vị trí ÔM`}</IText>
                        <View style={styles.hugeContainer}>
                            {
                                [0, 1, 2].map((item) => {
                                    return (
                                        <TouchableOpacity key={item + ""} activeOpacity={1} style={styles.circleOutside} onPress={() => onChangeHugePositon(item, 0)}>
                                            <View style={[styles.circleInside, { backgroundColor: hugePosition.includes(item) ? lottColor : Color.white }]} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        {
                            typePlay.value == 6 ?
                                <View style={styles.hugeContainer}>
                                    {
                                        [3, 4, 5].map((item) => {
                                            return (
                                                <TouchableOpacity key={item + ""} activeOpacity={1} style={styles.circleOutside} onPress={() => onChangeHugePositon(item, 1)}>
                                                    <View style={[styles.circleInside, { backgroundColor: hugePosition.includes(item) ? lottColor : Color.white }]} />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }

                                </View> : <></>
                        }
                    </View >
                    : <></>
            }


            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                    {numberSet.map((item: any, index: number) => {
                        return (
                            <View style={styles.lineNumber} key={String.fromCharCode(65 + index)}>
                                <IText style={{ fontSize: 18, fontWeight: 'bold' }}>{String.fromCharCode(65 + index)}</IText>
                                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginHorizontal: 18, justifyContent: 'space-evenly' }} onPress={() => openNumberSheet(index)}>
                                    <View style={styles.boxNumber}>
                                        {typePlay.value == 7 ?
                                            <IText style={{ color: lottColor, fontSize: 16 }}>{"Bao số"}</IText>
                                            : item.slice(0, 3).map((number: any, index2: number) => {
                                                return (
                                                    <IText key={index2 + "::" + index} style={{ color: lottColor, fontSize: 16 }}>{number < 10 ? number : "*"}</IText>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={styles.boxNumber}>
                                        {typePlay.value == 8 ?
                                            <IText style={{ color: lottColor, fontSize: 16 }}>{"Bao số"}</IText>
                                            : item.slice(3, 6).map((number: any, index2: number) => {
                                                return (
                                                    <IText key={index2 + "::" + index} style={{ color: lottColor, fontSize: 16 }}>{number < 10 ? number : "*"}</IText>
                                                )
                                            })
                                        }
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

            {/* Footer */}
            <View style={{ paddingHorizontal: 16, marginBottom: 5 }}>

                <ViewFooter1 fastPick={fastPick} selfPick={selfPick} />

                <IText style={{ fontSize: 16, color: Color.blue, fontWeight: 'bold', marginTop: 5, alignSelf: 'center' }}>
                    {`Các bộ số được tạo (${generated.length} bộ)`}
                </IText>
                <ScrollView style={styles.boxGenerated}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                        {
                            generated.map((item: any, index: number) =>
                                <View key={index + ""} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <ConsolasText style={styles.textGenerated}>{item}</ConsolasText>
                                    <View style={styles.lineContainer} >
                                        <View style={styles.line} />
                                    </View>
                                </View>
                            )
                        }
                    </View>
                </ScrollView>

                <ViewFooter2
                    totalCost={totalCost}
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
        fontSize: 16, color: lottColor,
        marginHorizontal: 8, marginVertical: 5
    }
})
