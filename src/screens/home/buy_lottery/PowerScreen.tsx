import { Images } from "@assets";
import { HomeStackParamList, ScreenName } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Icon, Image } from "@assets";
import { Color, Dimension, Style } from "@styles";
import { calSurcharge, convolutions, NavigationUtils, printDraw, printMoney, printNumber, ScreenUtils } from "@utils";
import React, { createRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, StatusBar, Alert, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChooseTypeSheet } from "./component/ChooseTypeSheet";
import { useDispatch, useSelector } from "react-redux";
import { lotteryApi } from "@api";
import { ChooseDrawSheet } from "./component/ChooseDrawSheet";
import { ChooseNumberSheet } from "./component/ChooseNumberSheet";
import { LotteryType, MAX_SET, OrderMethod, OrderStatus, POWER_NUMBER } from "@common";
import { addLottery, getCart, getPowerDraw, updateUser } from "@redux";
import { CartIcon, ConsolasText, DigitalText, HeaderBuyLottery, IText } from "@components";
import { ViewAbove } from "./component/ViewAbove";
import { ViewFooter1 } from "./component/ViewFoooter1";
import { ViewFooter2 } from "./component/ViewFooter2";

type NavigationProp = StackNavigationProp<HomeStackParamList, 'PowerScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'PowerScreen'>;

export interface PowerScreenParamsList { }

export interface PowerScreenProps { }

const initNumber = [
    [false, false, false, false, false, false], //  numberA:
    [false, false, false, false, false, false], //  numberB: 
    [false, false, false, false, false, false], //  numberC:
    [false, false, false, false, false, false], // numberD: 
    [false, false, false, false, false, false], //  numberE:
    [false, false, false, false, false, false] // numberF:
]

const types = [
    { label: "Bao 5", value: 5 }, //0
    { label: "Cơ bản", value: 6 }, //1
    { label: "Bao 7", value: 7 },//2
    { label: "Bao 8", value: 8 },//3
    { label: "Bao 9", value: 9 },//3
    { label: "Bao 10", value: 10 },//5
    { label: "Bao 11", value: 11 },//6
    { label: "Bao 12", value: 12 },//7
    { label: "Bao 13", value: 13 },//8
    { label: "Bao 14", value: 14 },//9
    { label: "Bao 15", value: 15 },//10
    { label: "Bao 16", value: 16 },//11
    { label: "Bao 17", value: 17 },//12
    { label: "Bao 18", value: 18 },//13
]

export const PowerScreen = React.memo((props: PowerScreenProps) => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("power screen re-render")
    })

    const listDraw = useSelector((state: any) => state.drawReducer.powerListDraw)
    const luckykingBalance = useSelector((state: any) => state.userReducer.luckykingBalance);

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 6 });
    const [drawSelected, setDraw]: any = useState(listDraw[0])
    const [numberSet, setNumbers]: any = useState(initNumber)
    const [totalCost, setTotalCost] = useState(0)

    // ref
    const chooseTypeRef: any = useRef(null);
    const chooseDrawRef: any = useRef(null);
    const chooseNumberRef: any = useRef(null);
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBottomSheet(true);
        }, 500); // change delay as needed
        return () => clearTimeout(timer);
    }, []);

    // sort and calculate total money
    useEffect(() => {
        const level: number = typePlay.value
        let set = 0
        for (let i = 0; i < numberSet.length; i++) {
            const element = numberSet[i]
            if (element[0] || element[1]) set++
        }
        setTotalCost(set * 10000 * convolutions(MAX_SET, level))
    }, [numberSet])

    useEffect(() => {
        async function getFirstDraw() {
            const res = await lotteryApi.getSchedulePower({ take: 6 })
            if (res) {
                if (res.data.length > 0) dispatch(getPowerDraw(res.data))
            }
        }
        getFirstDraw()
    }, [])

    const randomNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const currentLevel = typePlay.value
        const randomNumbers = new Set();
        while (randomNumbers.size < currentLevel) {
            const randomNumber = Math.floor(Math.random() * POWER_NUMBER) + 1;
            randomNumbers.add(randomNumber);
        }
        const resultArray = Array.from(randomNumbers).map(Number).sort((a, b) => a - b);
        currentNumber[index] = resultArray
        setNumbers(currentNumber)
    }

    const deleteNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const currentLevel = typePlay.value
        const resultArray = Array(currentLevel).fill(false);
        currentNumber[index] = resultArray
        setNumbers(currentNumber)
    }

    const fastPick = () => {
        let array = [];
        const currentLevel = typePlay.value
        for (let i = 0; i < MAX_SET; i++) {
            const randomNumbers = new Set();
            while (randomNumbers.size < currentLevel) {
                const randomNumber = Math.floor(Math.random() * POWER_NUMBER) + 1;
                randomNumbers.add(randomNumber);
            }
            const resultArray = Array.from(randomNumbers).map(Number).sort((a, b) => a - b);
            array.push(resultArray);
        }
        setNumbers(array.sort((a, b) => a[0] - b[0]))
    }

    const selfPick = () => {
        const currentNumber = [...numberSet]
        const currentLevel = typePlay.value
        for (let i = 0; i < MAX_SET; i++) {
            currentNumber[i] = Array(currentLevel).fill("TC");
        }
        setNumbers(currentNumber)
    }

    const bookLottery = async () => {
        const currentNumber = [...numberSet]
        let numbers: string[] = []
        for (let i = 0; i < currentNumber.length; i++) {
            let tmp = ""
            if (currentNumber[i][0] !== false) {
                currentNumber[i].map((item: number, index: number) => {
                    if (index == 0) tmp = tmp + item
                    else tmp = tmp + "-" + item
                })
                numbers.push(tmp)
            }
        }
        if (numbers.length == 0) {
            return Alert.alert("Thông báo", "Bạn chưa chọn bộ số nào")
        }
        const total = totalCost
        const surchagre = calSurcharge(totalCost)
        let body: any = {
            lotteryType: LotteryType.Power,
            amount: total,
            surchagre: surchagre,
            status: OrderStatus.PENDING,
            method: OrderMethod.Keep,
            level: typePlay.value,
            drawCode: drawSelected.drawCode,
            numbers: numbers
        }
        window.loadingIndicator.show()
        const res = await lotteryApi.bookLotteryPowerMega(body)
        if (res) {
            Alert.alert("Thành công", "Đã thanh toán mua vé thành công!")
            dispatch(updateUser({ luckykingBalance: luckykingBalance - total - surchagre }))
            refreshChoosing()
        }
        window.loadingIndicator.hide()
    }

    const addToCart = async () => {
        const currentNumber = [...numberSet]
        let numbers: string[] = []
        for (let i = 0; i < currentNumber.length; i++) {
            let tmp = ""
            if (currentNumber[i][0] !== false) {
                currentNumber[i].map((item: number, index: number) => {
                    if (index == 0) tmp = tmp + item
                    else tmp = tmp + "-" + item
                })
                numbers.push(tmp)
            }
        }
        if (numbers.length == 0) {
            return Alert.alert("Thông báo", "Bạn chưa chọn bộ số nào")
        }
        let body: any = {
            lotteryType: LotteryType.Power,
            amount: totalCost,
            status: OrderStatus.CART,
            level: typePlay.value,
            drawCode: drawSelected.drawCode,
            drawTime: drawSelected.drawTime,
            numbers: numbers
        }
        window.loadingIndicator.show()
        const res = await lotteryApi.addPowerMegaToCart(body)
        console.log(res)
        if (res) {
            Alert.alert("Thành công", "Đã thêm vé vào giỏ hàng!")
            refreshChoosing()
            dispatch(addLottery(res.data))
        }
        window.loadingIndicator.hide()
    }

    const refreshChoosing = useCallback(() => {
        setDraw(listDraw[0])
        setType({ label: "Cơ bản", value: 6 })
        setNumbers(initNumber)
    }, [])

    const onChangeType = useCallback((type: any) => {
        setType(type)
        const arr = Array.from({ length: MAX_SET }, () => Array(type.value).fill(false));
        setNumbers(arr)
    }, [])
    const openTypeSheet = useCallback(() => { chooseTypeRef.current?.openSheet() }, [chooseTypeRef])
    const renderTypeSheet = useCallback(() => {
        return (
            <ChooseTypeSheet
                ref={chooseTypeRef}
                currentChoose={typePlay}
                onChoose={onChangeType}
                type={LotteryType.Power}
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
                type={LotteryType.Power}
            />
        )
    }, [chooseDrawRef, onChangeDraw, drawSelected, listDraw])

    const onChangeNumber = useCallback((set: any) => setNumbers(set), [])
    const openNumberSheet = useCallback(() => { chooseNumberRef.current?.openSheet() }, [chooseNumberRef])
    const renderNumberSheet = useCallback(() => {
        return (
            <ChooseNumberSheet
                ref={chooseNumberRef}
                onChoose={onChangeNumber}
                numberSet={numberSet}
                page={pageNumber}
                type={LotteryType.Power}
            />
        )
    }, [chooseNumberRef, numberSet, pageNumber])

    return (
        <View style={styles.container}>
            <HeaderBuyLottery navigation={navigation} lotteryType={LotteryType.Power} />
            {/* //Body */}
            <ViewAbove typePlay={typePlay} drawSelected={drawSelected} openTypeSheet={openTypeSheet} openDrawSheet={openDrawSheet} />
            {/* //Chon so */}
            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                    {numberSet.map((item: any, index: number) => {
                        return (
                            <View style={styles.lineNumber} key={index}>
                                <IText style={{ fontSize: 18, fontWeight: 'bold' }}>{String.fromCharCode(65 + index)}</IText>
                                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginHorizontal: 18, flexWrap: 'wrap' }} onPress={() => {
                                    setPageNumber(index)
                                    openNumberSheet()
                                }}>
                                    {item.sort((a: any, b: any) => a - b).map((number: any, index2: number) => {
                                        return (
                                            <View style={styles.ballContainer} key={index2}>
                                                <Image source={number ? Images.ball_power : Images.ball_grey} style={styles.ballStyle}>
                                                    <ConsolasText style={{ color: Color.white, fontSize: 16 }}>{printNumber(number)}</ConsolasText>
                                                </Image>
                                            </View>
                                        )
                                    })}
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: 60, justifyContent: 'space-between' }}>
                                    <Image source={Images.nofilled_heart} style={{ width: 22, height: 22, }}></Image>
                                    {item[0] ?
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

            {/* //Footer */}
            <View style={{ paddingHorizontal: 16, marginBottom: 30 }}>
                <ViewFooter1 fastPick={fastPick} selfPick={selfPick} />
                <ViewFooter2
                    totalCost={totalCost}
                    addToCart={addToCart}
                    bookLottery={bookLottery}
                    lotteryType={LotteryType.Power}
                />
            </View>
            {/* BottomSheet */}
            {showBottomSheet ?
                <>
                    {renderTypeSheet()}
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
    container: {
        flex: 1,
        backgroundColor: Color.buyLotteryBackGround
    },
    lineNumber: {
        flexDirection: 'row', marginVertical: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ballContainer: { width: (windowWidth - 146) / 6, justifyContent: 'center', alignItems: 'center', marginVertical: 8 },
    ballStyle: {
        width: 28, height: 28, justifyContent: 'center', alignItems: 'center'
    }
})