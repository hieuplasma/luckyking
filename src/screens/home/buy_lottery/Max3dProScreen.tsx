import { lotteryApi } from '@api';
import { Image, Images } from '@assets';
import { LotteryType, MAX3D_NUMBER, MAX_SET, MAX_SET_MAX3D, OrderMethod, OrderStatus } from '@common';
import { ConsolasText, HeaderBuyLottery, IText } from '@components';
import { HomeStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getMax3dProDraw } from '@redux';
import { Color } from '@styles';
import { calSurcharge, printMoneyK } from '@utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { ChooseDrawSheet } from './component/ChooseDrawSheet';
import { GeneratedNumber } from './component/GeneratedNumber';
import { Max3dHuge } from './component/Max3dHuge';
import { ViewAbove } from './component/ViewAbove';
import { ViewFooter1 } from './component/ViewFoooter1';
import { ViewFooter2 } from './component/ViewFooter2';
import { NumberSheet3DPlus } from './max3d-component/max3dplus/NumberSheet3DPlus';
import { Max3dProBagView } from './max3d-component/max3dpro/Max3dProBagView';
import { MultiBagView } from './max3d-component/max3dpro/MultiBagView';
import { TypeSheetMax3DPro } from './max3d-component/max3dpro/TypeSheetMax3DPro';
import { generateMax3DPlus, numberMax3d } from './max3d-component/utils';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Max3dScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'Max3dScreen'>;

export interface Max3dProScreenParamsList { }

const initNumber = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
]
const initBets = [10000, 10000, 10000, 10000, 10000, 10000]
const lottColor = Color.max3dpro
const fullNumber = Array.from({ length: 10 }, (_, index) => index);

const MAX_SET_MAX3D_PRO = MAX_SET_MAX3D * 2

export const Max3dProScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const dispatch = useDispatch()
    const listDraw = useSelector((state: any) => state.drawReducer.max3dProListDraw)
    const luckykingBalance = useSelector((state: any) => state.userReducer.luckykingBalance);

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBottomSheet(true);
        }, 500); // change delay as needed
        return () => clearTimeout(timer);
    }, []);

    const getListDraw = async () => {
        const listMax3dPro = await lotteryApi.getScheduleMax3d({ type: LotteryType.Max3DPro, take: 6, skip: 0 })
        if (listMax3dPro) {
            if (listMax3dPro.data.length > 0) {
                dispatch(getMax3dProDraw(listMax3dPro.data))
            }
        }
    }

    useEffect(() => {
        getListDraw()
    }, [])

    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 1 });
    const [drawSelected, setDraw]: any = useState(listDraw[0])
    const [numberSet, setNumbers]: any = useState(initNumber)
    const [numberFake, setNumberFake]:any = useState(initNumber)
    const [bets, setBets] = useState(initBets)
    const [generated, setGenrated] = useState([])
    const [generatedBets, setGeneratedBets] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [hugePosition, setHugePosition] = useState([-1, -1])

    const typeBagRef: any = useRef(null);
    const [totalCostBag, setTotalCostBag] = useState(0)

    const randomNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const randomNumbers = [];
        while (randomNumbers.length < MAX_SET_MAX3D_PRO * 2) {
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
        const resultArray = Array(MAX_SET_MAX3D_PRO).fill(false);
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
            while (randomNumbers.length < MAX_SET_MAX3D_PRO) {
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
            currentNumber[i] = Array(MAX_SET_MAX3D_PRO).fill("TC");
        }
        setNumbers(currentNumber)
    }, [typePlay, hugePosition])

    // ref
    const chooseTypeRef: any = useRef(null);
    const chooseDrawRef: any = useRef(null);
    const chooseNumberRef: any = useRef(null);

    useEffect(() => {
        const currentNumber = [...numberSet]
        const level = typePlay.value
        const tmp = generateMax3DPlus(level, currentNumber, bets, hugePosition)
        setGenrated(tmp.numberGenerated)
        setGeneratedBets(tmp.betsGenerated)
        setTotalCost(tmp.totalCost)
    }, [numberSet, bets])

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
            item[huge[0]] = 10
            item[huge[1]] = 10
        })
        setHugePosition(huge)
        setNumbers(tmp)
    }, [hugePosition, typePlay])


    const onChangeType = useCallback((type: any) => {
        setType(type)
        setNumbers(initNumber)
        setBets(initBets)
        setHugePosition([-1, -1])
        setGenrated([])
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
            <TypeSheetMax3DPro
                ref={chooseTypeRef}
                currentChoose={typePlay}
                onChoose={onChangeType}
                type={LotteryType.Max3DPro}
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
                type={LotteryType.Max3DPro}
            />
        )
    }, [chooseDrawRef, onChangeDraw, drawSelected, listDraw])

    const onChangeNumber = useCallback((set: any, bets: any) => {
        setNumbers(set)
        setBets(bets)
    }, [])
    const openNumberSheet = useCallback(async(page: number) => {
        setNumberFake(numberSet)
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
                type={LotteryType.Max3DPro}
                hugePosition={hugePosition}
            />
        )
    }, [chooseNumberRef, numberFake, pageNumber])


    const bookLottery = async () => {
        if (generated.length == 0) {
            return Alert.alert("Thông báo", "Bạn chưa chọn bộ số nào")
        }
        const total = (typePlay.value != 7 && typePlay.value != 8) ? totalCost : totalCostBag
        const surchagre = calSurcharge(total)
        let body: any = {
            lotteryType: LotteryType.Max3DPro,
            amount: total,
            surchagre: surchagre,
            status: OrderStatus.PENDING,
            method: OrderMethod.Keep,
            level: typePlay.value,
            drawCode: drawSelected.drawCode,
            numbers: generated,
            bets: generatedBets
        }
        // console.log(body)
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
        const total = (typePlay.value != 7 && typePlay.value != 8) ? totalCost : totalCostBag
        const surchagre = calSurcharge(total)
        let body: any = {
            lotteryType: LotteryType.Max3DPro,
            amount: total,
            status: OrderStatus.CART,
            level: typePlay.value,
            drawCode: drawSelected.drawCode,
            drawTime: drawSelected.drawTime,
            numbers: generated,
            bets: generatedBets
        }
        // console.log(body)
        window.loadingIndicator.show()
        // const res = await lotteryApi.addPowerMegaToCart(body)
        // // console.log(res)
        // if (res) {
        //     Alert.alert("Thành công", "Đã thêm vé vào giỏ hàng!")
        //     refreshChoosing()
        //     dispatch(addLottery(res.data))
        // }
        window.loadingIndicator.hide()
    }


    return (
        <SafeAreaView style={styles.container}>
            <HeaderBuyLottery navigation={navigation} lotteryType={LotteryType.Max3DPro} />
            <ViewAbove typePlay={typePlay} drawSelected={drawSelected} openTypeSheet={openTypeSheet} openDrawSheet={openDrawSheet} />

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
                    <Max3dProBagView
                        ref={typeBagRef}
                        changeCost={(data: number) => setTotalCostBag(data)}
                        changeBets={(data: any) => setGeneratedBets(data)}
                        changeGenerated={(data: any) => setGenrated(data)}
                        typePlay={typePlay}
                    />
                    : typePlay.value == 10 ?
                        <MultiBagView />
                        : <ScrollView style={{ flex: 1 }}>
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
            }

            {/* Footer */}
            <View style={{ paddingHorizontal: 16, marginBottom: 5, zIndex: -1 }}>
                {
                    typePlay.value == 7 || typePlay.value == 8 ?
                        <></>
                        : <>
                            <ViewFooter1 fastPick={fastPick} selfPick={selfPick} />
                            <GeneratedNumber generated={generated} lottColor={lottColor} />
                        </>
                }
                <ViewFooter2
                    totalCost={(typePlay.value != 7 && typePlay.value != 8) ? totalCost : totalCostBag}
                    addToCart={addToCart}
                    bookLottery={bookLottery}
                    lotteryType={LotteryType.Max3DPro}
                />
            </View>
            {/* BottomSheet */}
            {showBottomSheet ?
                <>
                    {renderTypeSheet()}
                    {renderDrawSheet()}
                    {renderNumberSheet()}
                </> : <></>}
        </SafeAreaView>
    )
};

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
