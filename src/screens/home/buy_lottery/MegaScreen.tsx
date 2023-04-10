import { Images } from "@assets";
import { HomeStackParamList, ScreenName } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Icon, Image } from "@assets";
import { Color, Dimension, Style } from "@styles";
import { calSurcharge, convolutions, NavigationUtils, printDraw, printMoney, ScreenUtils } from "@utils";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, StatusBar, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChooseTypeSheet } from "./component/ChooseTypeSheet";
import { useDispatch, useSelector } from "react-redux";
import { lotteryApi } from "@api";
import { ChooseDrawSheet } from "./component/ChooseDrawSheet";
import { ChooseNumberSheet } from "./component/ChooseNumberSheet";
import { LotteryType, MAX_SET, MEGA_NUMBER, OrderMethod, OrderStatus } from "@common";
import { addLottery, getCart, getMegaDraw, updateUser } from "@redux";
import { CartIcon, HeaderBuyLottery } from "@components";
import { ViewAbove } from "./component/ViewAbove";

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
        console.log("mega screen re-render")
    })

    const listDraw = useSelector((state: any) => state.drawReducer.megaListDraw)
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
            const res = await lotteryApi.getScheduleMega({ take: 6 })
            if (res) {
                if (res.data.length > 0) dispatch(getMegaDraw(res.data))
            }
        }
        getFirstDraw()
    }, [])

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

    const printNumber = (number: any) => {
        if (number === false) return ""
        if (number < 10) return '0' + number
        return number
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
            lotteryType: LotteryType.Mega,
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
            lotteryType: LotteryType.Mega,
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
    const openNumberSheet = useCallback(() => { chooseNumberRef.current?.openSheet() }, [chooseNumberRef])
    const renderNumberSheet = useCallback(() => {
        return (
            <ChooseNumberSheet
                ref={chooseNumberRef}
                onChoose={onChangeNumber}
                numberSet={numberSet}
                page={pageNumber}
                type={LotteryType.Mega}
            />
        )
    }, [chooseNumberRef, numberSet, pageNumber])

    return (
        <View style={styles.container}>
            {/* //Header */}
            <HeaderBuyLottery navigation={navigation} lotteryType={LotteryType.Mega} />
            {/* //Body */}
            <ViewAbove typePlay={typePlay} drawSelected={drawSelected} openTypeSheet={openTypeSheet} openDrawSheet={openDrawSheet} />
            {/* //Chon so */}
            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                    {numberSet.map((item: any, index: number) => {
                        return (
                            <View style={styles.lineNumber} key={index}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{String.fromCharCode(65 + index)}</Text>
                                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginHorizontal: 18, flexWrap: 'wrap' }} onPress={() => {
                                    setPageNumber(index)
                                    openNumberSheet()
                                }}>
                                    {item.sort((a: any, b: any) => a - b).map((number: any, index2: number) => {
                                        return (
                                            <View style={styles.ballContainer} key={index2}>
                                                <Image source={number ? Images.ball_mega : Images.ball_grey} style={styles.ballStyle}>
                                                    <Text style={{ color: Color.white }}>{printNumber(number)}</Text>
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
            <View style={{ paddingHorizontal: 16, paddingBottom: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.buttonFooterUp} activeOpacity={0.6}>
                        <Image source={Images.filled_heart} style={{ width: 19, height: 19 }}></Image>
                        <Text style={styles.textFooterUp}>{"Yêu thích"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonFooterUp} activeOpacity={0.6} onPress={() => fastPick()}>
                        <Image source={Images.fast_pick} style={{ width: 19, height: 19 }}></Image>
                        <Text style={styles.textFooterUp}>{"Chọn nhanh"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonFooterUp} activeOpacity={0.6} onPress={() => selfPick()}>
                        <View style={{ width: 21, height: 21, borderRadius: 99, backgroundColor: Color.luckyKing, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, color: Color.white }}>TC</Text>
                        </View>
                        <Text style={styles.textFooterUp}>{"Tự chọn"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
                    <Text style={{ color: Color.black, fontSize: 16 }}>{"Giá vé tạm tính"}</Text>
                    <Text style={{ color: Color.luckyKing, fontSize: 16 }}>{`${printMoney(totalCost)} đ`}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                    <TouchableOpacity style={[styles.buttonFooterDown, { backgroundColor: '#0171F5' }]} activeOpacity={0.6} onPress={addToCart}>
                        <Image source={Images.add_cart} style={{ width: 26, height: 26 }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonFooterDown, { backgroundColor: Color.mega }]} activeOpacity={0.6} onPress={bookLottery}>
                        <Text style={{ color: Color.white, fontWeight: 'bold', fontSize: 16 }}>{"ĐẶT VÉ"}</Text>
                    </TouchableOpacity>
                </View>
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
    },
    buttonFooterUp: {
        width: (windowWidth - 48) / 3, height: 32,
        borderRadius: 10, padding: 6,
        justifyContent: 'space-around', alignItems: 'center',
        borderColor: '#FFC42C', backgroundColor: '#FDF9F9',
        borderWidth: 1, flexDirection: 'row'
    },
    textFooterUp: { fontSize: 12, color: Color.luckyKing },
    buttonFooterDown: {
        width: (windowWidth - 36) / 2, height: 44,
        borderRadius: 10, padding: 6,
        justifyContent: 'space-around', alignItems: 'center',
        borderColor: '#FFC42C', backgroundColor: '#FDF9F9',
        borderWidth: 1
    }
})