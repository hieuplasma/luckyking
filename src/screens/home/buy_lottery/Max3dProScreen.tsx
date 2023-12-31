import { lotteryApi } from '@api';
import { Image, Images } from '@assets';
import { BTN_LABEL, DELAY_SCREEN, ERR_MES, LotteryType, MAX3D_NUMBER, MAX_SET, MAX_SET_MAX3D, OrderMethod, OrderStatus, SUCCESS_MES } from '@common';
import { ConsolasText, HeaderBuyLottery, IText } from '@components';
import { HomeStackParamList, ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { addLottery } from '@redux';
import { Color } from '@styles';
import { NavigationUtils, calSurcharge, printMoneyK } from '@utils';
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
import { cntDistinct } from '@utils'

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

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    useEffect(() => {
        window.loadingIndicator.show()
        const timer = setTimeout(() => {
            window.loadingIndicator.hide()
            setShowBottomSheet(true);
        }, DELAY_SCREEN); // change delay as needed
        return () => clearTimeout(timer);
    }, []);

    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 1 });
    const [drawSelected, setDraw]: any = useState(listDraw.length > 0 ? [listDraw[0]] : [])
    const [numberSet, setNumbers]: any = useState(initNumber)
    const [numberFake, setNumberFake]: any = useState(initNumber)
    const [bets, setBets] = useState(initBets)
    const [generated, setGenrated] = useState<string[]>([])
    const [bagGenerated, setBagGenerated] = useState([])
    const [generatedBets, setGeneratedBets] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [hugePosition, setHugePosition] = useState([-1, -1])

    const typeBagRef: any = useRef(null);
    const multiBagRef: any = useRef(null)
    const [totalCostBag, setTotalCostBag] = useState(0)

    const randomNumber = (index: number) => {
        const currentNumber = [...numberSet]
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
        currentNumber[index] = resultArray
        setNumbers(currentNumber)
    }

    const deleteNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const resultArray = Array(MAX_SET_MAX3D_PRO).fill(false);
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
        if (typePlay.value == 10) {
            multiBagRef.current?.random()
            return
        }
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
            item[huge[0]] = 10
            item[huge[1]] = 10
        })
        setHugePosition(huge)
        setNumbers(tmp)
    }, [hugePosition, typePlay])


    const onChangeType = useCallback((type: any) => {
        setBagGenerated([])
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
                type={LotteryType.Max3DPro}
                hugePosition={hugePosition}
            />
        )
    }, [chooseNumberRef, numberFake, pageNumber])

    const createBody = (status: OrderStatus) => {
        if (generated.length == 0) {
            window.myalert.show({ title: ERR_MES.NONE_NUMBER, btnLabel: BTN_LABEL.UNDERSTOOD })
            // Alert.alert("Thông báo", "Bạn chưa chọn bộ số nào")
            return undefined
        }
        if (drawSelected.length <= 0) {
            window.myalert.show({ title: ERR_MES.INVALID_DRAW, btnLabel: BTN_LABEL.UNDERSTOOD })
            return undefined
        }
        let drawCodes: any = []
        let drawTimes: any = []
        drawSelected.map((item: any) => {
            drawCodes.push(item.drawCode)
            drawTimes.push(item.drawTime)
        })
        const total = (typePlay.value != 7 && typePlay.value != 8 && typePlay.value != 10) ? totalCost : totalCostBag

        let pushGenerated: any[] = []
        let pushBets: any[] = []
        let pushTienCuoc: any[] = []
        if (typePlay.value == 1) {
            for (const element of generated) {
                const split = element.split(" ")
                if (split[0] == 'TCTCTC') split[0] = 'TC'
                if (split[1] == 'TCTCTC') split[1] = 'TC'
                pushGenerated.push(split[0] + ' ' + split[1])
            }
            pushBets = generatedBets
            pushTienCuoc = generatedBets
        }
        else if (typePlay.value == 10) {
            pushGenerated = bagGenerated
            pushBets = [totalCostBag / (generated.length)]
            pushTienCuoc = [totalCostBag]
        }
        else if (typePlay.value == 4) {
            for (let i = 0; i < numberSet.length; i++) {
                const element = numberSet[i]
                if (element[0] !== false && element[1] !== false) {
                    const str = '' + element[0] + element[1] + element[2] + ' ' + element[3] + element[4] + element[5]
                    pushGenerated.push(str)
                    pushTienCuoc.push(cntDistinct('' + element[0] + element[1] + element[2]) * cntDistinct('' + element[3] + element[4] + element[5]) * bets[i])
                    pushBets.push(bets[i])
                }
            }
        }
        else {
            pushGenerated = generated
            pushBets = generatedBets
            pushTienCuoc = generatedBets
        }

        let body: any = {
            lotteryType: LotteryType.Max3DPro,
            amount: total,
            status: status,
            level: typePlay.value,
            drawCode: drawCodes,
            drawTime: drawTimes,
            numbers: pushGenerated,
            bets: pushBets,
            tienCuoc: pushTienCuoc
        }

        return body
    }

    const bookLottery = async () => {
        const body = createBody(OrderStatus.PENDING)
        if (!body) return
        NavigationUtils.navigate(navigation, ScreenName.HomeChild.OrderScreen, { body: body })
    }

    const addToCart = async () => {
        const body = createBody(OrderStatus.CART)
        if (!body) return
        window.loadingIndicator.show()
        const res = await lotteryApi.addMax3dToCart(body)
        if (res) {
            window.myalert.show({ title: SUCCESS_MES.CARTED_LOTTEY, alertType: 'success' })
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
        setBagGenerated([])
    }, [listDraw])

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBuyLottery navigation={navigation} lotteryType={LotteryType.Max3DPro} />
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
                    <Image source={Images.bg_ticket_1} style={{ flex: 1 }} resizeMode="cover">
                        <Max3dProBagView
                            ref={typeBagRef}
                            changeCost={(data: number) => setTotalCostBag(data)}
                            changeBets={(data: any) => setGeneratedBets(data)}
                            changeGenerated={(data: any) => setGenrated(data)}
                            typePlay={typePlay}
                        />
                    </Image>
                    : typePlay.value == 10 ?
                        <MultiBagView
                            ref={multiBagRef}
                            changeCost={(data: number) => setTotalCostBag(data)}
                            changeBets={(data: any) => setGeneratedBets(data)}
                            changeGenerated={(data: any) => setGenrated(data)}
                            changeNumber={(data: any) => setBagGenerated(data)}
                            typePlay={typePlay}
                        />
                        :
                        <Image source={Images.bg_ticket_1} style={{ flex: 1 }} resizeMode="cover">
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
                                                <View style={{ flexDirection: 'row', alignItems: 'center', width: 26, justifyContent: 'space-between' }}>
                                                    {/* <Image source={Images.nofilled_heart} style={{ width: 22, height: 22, }}></Image> */}
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
                    (typePlay.value == 7 || typePlay.value == 8) ?
                        <></>
                        : <>
                            {
                                typePlay.value == 10 ?
                                    <></>
                                    :
                                    <ViewFooter1 fastPick={fastPick} selfPick={selfPick} hideSelfPick={typePlay.value != 1} />
                            }
                            <GeneratedNumber generated={generated} lottColor={lottColor} />
                        </>
                }
                <ViewFooter2
                    totalCost={(typePlay.value != 7 && typePlay.value != 8 && typePlay.value != 10) ? totalCost : totalCostBag * drawSelected.length}
                    addToCart={addToCart}
                    bookLottery={bookLottery}
                    lotteryType={LotteryType.Max3DPro}
                    navigation={navigation}
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
