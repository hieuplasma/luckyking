import { HomeStackParamList, ScreenName } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, Images } from "@assets";
import { Color } from "@styles";
import {
    convolutions,
    NavigationUtils,
    printNumber
} from "@utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ChooseTypeSheet } from "./power-mega-component/ChooseTypeSheet";
import { useDispatch, useSelector } from "react-redux";
import { lotteryApi } from "@api";
import { ChooseDrawSheet } from "./component/ChooseDrawSheet";
import { ChooseNumberSheet } from "./power-mega-component/ChooseNumberSheet";
import { BTN_LABEL, DELAY_SCREEN, ERR_MES, LotteryType, MAX_SET, MEGA_NUMBER, OrderStatus, SUCCESS_MES } from "@common";
import { addLottery } from "@redux";
import { ConsolasText, HeaderBuyLottery, IText } from "@components";
import { ViewAbove } from "./component/ViewAbove";
import { ViewFooter1 } from "./component/ViewFoooter1";
import { ViewFooter2 } from "./component/ViewFooter2";

type NavigationProp = StackNavigationProp<HomeStackParamList, 'MegaScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'MegaScreen'>;

export interface MegaScreenParamsList { }

export interface MegaScreenProps { }

const initNumber = [
    [false, false, false, false, false, false], //  numberA:
    [false, false, false, false, false, false], //  numberB: 
    [false, false, false, false, false, false], //  numberC:
    [false, false, false, false, false, false], // numberD: 
    [false, false, false, false, false, false], //  numberE:
    [false, false, false, false, false, false] // numberF:
]

export const MegaScreen = React.memo((props: any) => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log("mega screen re-render")
    })

    const listDraw = useSelector((state: any) => state.drawReducer.megaListDraw)

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 6 });
    const [drawSelected, setDraw]: any = useState(listDraw.length > 0 ? [listDraw[0]] : [])
    const [numberSet, setNumbers]: any = useState(initNumber)
    const [numberSetFake, setNumberSetFake]: any = useState(initNumber)
    const [totalCost, setTotalCost] = useState(0)

    // ref
    const chooseTypeRef: any = useRef(null);
    const chooseDrawRef: any = useRef(null);
    const chooseNumberRef: any = useRef(null);
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        window.loadingIndicator.show()
        const timer = setTimeout(() => {
            window.loadingIndicator.hide()
            setShowBottomSheet(true);
        }, DELAY_SCREEN); // change delay as needed
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
        setTotalCost(set * 10000 * convolutions(MAX_SET, level, LotteryType.Mega) * drawSelected.length)
    }, [numberSet, drawSelected])

    const randomNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const currentLevel = typePlay.value
        const randomNumbers = new Set();
        while (randomNumbers.size < currentLevel) {
            const randomNumber = Math.floor(Math.random() * MEGA_NUMBER) + 1;
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
                const randomNumber = Math.floor(Math.random() * MEGA_NUMBER) + 1;
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

    const createBody = (status: OrderStatus) => {
        const currentNumber = [...numberSet]
        let drawCodes: any = []
        let drawTimes: any = []
        let numbers: string[] = []
        let bets: number[] = []
        for (let i = 0; i < currentNumber.length; i++) {
            let tmp = ""
            if (currentNumber[i][0] !== false) {
                currentNumber[i].map((item: number, index: number) => {
                    if (index == 0) tmp = tmp + item
                    else tmp = tmp + "-" + item
                })
                numbers.push(tmp)
                bets.push(10000 * convolutions(MAX_SET, currentNumber[i].length, LotteryType.Mega))
            }
        }
        if (numbers.length == 0) {
            // return Alert.alert("Thông báo", "Bạn chưa chọn bộ số nào")
            window.myalert.show({ title: ERR_MES.NONE_NUMBER, btnLabel: BTN_LABEL.UNDERSTOOD })
            return undefined
        }
        if (drawSelected.length <= 0) {
            window.myalert.show({ title: ERR_MES.INVALID_DRAW, btnLabel: BTN_LABEL.UNDERSTOOD })
            return undefined
        }
        drawSelected.map((item: any) => {
            drawCodes.push(item.drawCode)
            drawTimes.push(item.drawTime)
        })
        const total = totalCost
        let body: any = {
            lotteryType: LotteryType.Mega,
            amount: total,
            status: status,
            level: typePlay.value,
            drawCode: drawCodes,
            drawTime: drawTimes,
            numbers: numbers,
            bets: bets
        }

        return body
    }

    const bookLottery = async () => {
        const body = createBody(OrderStatus.PENDING)
        if (!body) return 0
        NavigationUtils.navigate(navigation, ScreenName.HomeChild.OrderScreen, { body: body })
    }

    const addToCart = async () => {
        const body = createBody(OrderStatus.CART)
        if (!body) return 0
        window.loadingIndicator.show()
        const res = await lotteryApi.addPowerMegaToCart(body)
        if (res) {
            window.myalert.show({ title: SUCCESS_MES.CARTED_LOTTEY, btnLabel: "OK", alertType: 'success' })
            refreshChoosing()
            dispatch(addLottery(res.data))
        }
        window.loadingIndicator.hide()
    }

    const refreshChoosing = useCallback(() => {
        setDraw([listDraw[0]])
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
                type={LotteryType.Mega}
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
                type={LotteryType.Mega}
            />
        )
    }, [chooseDrawRef, onChangeDraw, drawSelected, listDraw])

    const onChangeNumber = useCallback((set: any) => setNumbers(set), [])
    const openNumberSheet = useCallback(async (pageIndex: number) => {
        await setNumberSetFake([...numberSet])
        setPageNumber(pageIndex)
        chooseNumberRef.current?.openSheet()
    }, [chooseNumberRef, numberSet])
    const renderNumberSheet = useCallback(() => {
        return (
            <ChooseNumberSheet
                ref={chooseNumberRef}
                onChoose={onChangeNumber}
                numberSet={numberSetFake}
                page={pageNumber}
                type={LotteryType.Mega}
            />
        )
    }, [chooseNumberRef, numberSetFake, pageNumber, onChangeNumber])

    return (
        <SafeAreaView style={styles.container}>
            {/* //Header */}
            <HeaderBuyLottery navigation={navigation} lotteryType={LotteryType.Mega} />
            {/* //Body */}
            <ViewAbove typePlay={typePlay.label} drawSelected={drawSelected} openTypeSheet={openTypeSheet} openDrawSheet={openDrawSheet} />
            {/* //Chon so */}
            <Image source={Images.bg_ticket_1} style={{ flex: 1 }} resizeMode="cover">
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                        {numberSet.map((item: any, index: number) =>
                            <LineView
                                key={index}
                                item={item}
                                index={index}
                                openNumberSheet={() => openNumberSheet(index)}
                                deleteNumber={() => deleteNumber(index)}
                                randomNumber={() => randomNumber(index)}
                            />
                        )}
                    </View>
                </ScrollView>
            </Image>

            {/* //Footer */}
            <View style={{ paddingHorizontal: 16, marginBottom: 5 }}>
                <ViewFooter1 fastPick={fastPick} selfPick={selfPick} />
                <ViewFooter2
                    totalCost={totalCost}
                    addToCart={addToCart}
                    bookLottery={bookLottery}
                    lotteryType={LotteryType.Mega}
                    navigation={navigation}
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

        </SafeAreaView>
    )
})

interface LineViewProps {
    item: any,
    index: number,
    openNumberSheet: (index: number) => void,
    deleteNumber: (index: number) => void,
    randomNumber: (index: number) => void
}
const LineView = React.memo(({ item, index, openNumberSheet, deleteNumber, randomNumber }: LineViewProps) => {
    return (
        <View style={styles.lineNumber}>
            <IText style={{ fontSize: 18, fontWeight: 'bold' }}>{String.fromCharCode(65 + index)}</IText>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginHorizontal: 18, flexWrap: 'wrap' }} onPress={() => openNumberSheet(index)}>
                {item.sort((a: any, b: any) => a - b).map((number: any, index2: number) => {
                    return (
                        <View style={styles.ballContainer} key={index2}>
                            <Image source={number ? Images.ball_mega : Images.ball_grey} style={styles.ballStyle}>
                                <ConsolasText style={{ color: Color.white, fontSize: 16 }}>{printNumber(number)}</ConsolasText>
                            </Image>
                            {/* <View style={styles.ballStyle}>
                                <ConsolasText style={{ color: Color.white, fontSize: 16 }}>{printNumber(number)}</ConsolasText>
                            </View> */}
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
        width: 28, height: 28,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: Color.mega,
        borderRadius: 99
    }
})