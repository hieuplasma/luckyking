import { Images } from "@assets";
import { HomeStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Icon, Image } from "@assets";
import { Color, Dimension, Style } from "@styles";
import { convolutions, printDraw, printMoney, ScreenUtils } from "@utils";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { ChooseTypeSheet } from "./component/ChooseTypeSheet";
import { useSelector } from "react-redux";
import { lotteryApi } from "@api";
import { ChooseDrawSheet } from "./component/ChooseDrawSheet";
import { ChooseNumberSheet } from "./component/ChooseNumberSheet";

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

export const PowerScreen = React.memo((props: any) => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 6 });
    const [numberSet, setNumbers]: any = useState(initNumber)
    const [totalCost, setTotalCost] = useState(0)
    // [Choose Type, Choose Draw, Choose Number ...]
    const [indexSheet, setIndexSheet] = useState([-1, -1, -1])
    const [drawSelected, setDraw]: any = useState(false)
    const [listDraw, setListDraw]: any = useState([])

    // ref
    const chooseTypeRef = useRef<BottomSheet>(null);
    const chooseDrawRef = useRef<BottomSheet>(null);
    const chooseNumberRef = useRef<BottomSheet>(null);
    const [pageNumber, setPageNumber] = useState(0)

    const MoneyAccount = useSelector((state: any) => state.userReducer.MoneyAccount);

    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

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
        setTotalCost(set * 10000 * convolutions(6, level))
    }, [numberSet])

    useEffect(() => {
        async function getFirstDraw() {
            const res = await lotteryApi.getSchedulePower({ take: 6 })
            if (res) {
                if (res.data.length > 0) {
                    setDraw(res.data[0])
                    setListDraw(res.data)
                }
            }
        }
        getFirstDraw()
    }, [])

    const toggleSheet = (newIndex: number, position: number) => {
        const currentIndexSet: number[] = [...indexSheet]
        currentIndexSet[position] = newIndex
        setIndexSheet(currentIndexSet)
    }

    const openBottomSheet = (ref: any) => {
        ref.current?.expand()
    }

    const onChangeType = (type: any) => {
        setType(type)
        const arr = Array.from({ length: 6 }, () => Array(type.value).fill(false));
        setNumbers(arr)
    }

    const randomNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const currentLevel = typePlay.value
        const randomNumbers = new Set();
        while (randomNumbers.size < currentLevel) {
            const randomNumber = Math.floor(Math.random() * 55) + 1;
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
        for (let i = 0; i < 6; i++) {
            const randomNumbers = new Set();
            while (randomNumbers.size < currentLevel) {
                const randomNumber = Math.floor(Math.random() * 55) + 1;
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
        for (let i = 0; i < 6; i++) {
            currentNumber[i] = Array(currentLevel).fill("TC");
        }
        setNumbers(currentNumber)
    }

    const printNumber = (number: any) => {
        if (number === false) return ""
        if (number < 10) return '0' + number
        return number
    }

    const bookLottery = () => {
        const currentNumber = [...numberSet]
        const numbers: string[] = []
        for (let i = 0; i < currentNumber.length; i++) {

        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={"transparent"} />
            {/* //Header */}
            <View style={[styles.headerContainer, { marginTop: safeAreaInsets.top }]}>
                <Icon.Button
                    size={'small'}
                    color={Color.gray}
                    name="ic_back"
                    style={[Style.Space.Padding.Zero]}
                    onPressed={onGoBack}
                />
                <Image source={Images.power_logo} style={styles.imageLogo} />
                <Icon.Button
                    size={'large'}
                    color={Color.gray}
                    name="ic_cart"
                    style={[Style.Space.Padding.Zero]}
                    onPressed={() => { }}
                />
            </View>
            {/* //Body */}
            <View style={styles.body}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, color: Color.black }}>
                        {"Số dư tài khoản: "}
                    </Text>
                    <Text style={{ fontSize: 16, color: Color.luckyKing, fontWeight: 'bold' }}>
                        {`${printMoney(MoneyAccount)} đ`}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between' }}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.dropDown} onPress={() => openBottomSheet(chooseTypeRef)}>
                        <Text style={{ fontSize: 13, color: Color.black, lineHeight: 24 }}>{typePlay.label}</Text>
                        <Image source={Images.down_arrow} style={{ width: 12, height: 6 }}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.6} style={[styles.dropDown, { paddingHorizontal: 4 }]} onPress={() => openBottomSheet(chooseDrawRef)}>
                        <Text style={{ fontSize: 13, color: Color.black, lineHeight: 24 }}>{drawSelected ? printDraw(drawSelected) : "------"}</Text>
                        <Image source={Images.down_arrow} style={{ width: 12, height: 6 }}></Image>
                    </TouchableOpacity>
                </View>
            </View>

            {/* //Chon so */}
            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                    {numberSet.map((item: any, index: number) => {
                        return (
                            <View style={styles.lineNumber} key={index}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{String.fromCharCode(65 + index)}</Text>
                                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginHorizontal: 18, flexWrap: 'wrap' }} onPress={() => {
                                    setPageNumber(index)
                                    openBottomSheet(chooseNumberRef)
                                }}>
                                    {item.sort((a: any, b: any) => a - b).map((number: any, index2: number) => {
                                        return (
                                            <View style={styles.ballContainer} key={index2}>
                                                <Image source={number ? Images.ball_power : Images.ball_grey} style={styles.ballStyle}>
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
                        <Image source={Images.filled_heart} style={{ width: 21, height: 19 }}></Image>
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
                    <TouchableOpacity style={[styles.buttonFooterDown, { backgroundColor: '#0171F5' }]} activeOpacity={0.6}>
                        <Icon.Default
                            size={'large'}
                            color={'white'}
                            name="ic_cart"
                            style={[Style.Space.Padding.Zero]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonFooterDown, { backgroundColor: '#C38E32' }]} activeOpacity={0.6}>
                        <Text style={{ color: Color.white, fontWeight: 'bold', fontSize: 16 }}>{"ĐẶT VÉ"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* BottomSheet */}
            {showBottomSheet ?
                <>
                    <ChooseTypeSheet
                        bottomSheetRef={chooseTypeRef}
                        isVisible={indexSheet[0] == -1 ? false : true}
                        onToggle={(newIndex) => toggleSheet(newIndex, 0)}
                        currentChoose={typePlay}
                        onChoose={(type) => onChangeType(type)}
                    />
                    <ChooseDrawSheet
                        bottomSheetRef={chooseDrawRef}
                        isVisible={indexSheet[1] == -1 ? false : true}
                        onToggle={(newIndex) => toggleSheet(newIndex, 1)}
                        currentChoose={drawSelected}
                        onChoose={(draw) => setDraw(draw)}
                        listDraw={listDraw}
                    />
                    <ChooseNumberSheet
                        bottomSheetRef={chooseNumberRef}
                        isVisible={indexSheet[2] == -1 ? false : true}
                        onToggle={(newIndex) => toggleSheet(newIndex, 2)}
                        currentChoose={drawSelected}
                        onChoose={(set) => setNumbers(set)}
                        numberSet={numberSet}
                        page={pageNumber}
                    />
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
    imageLogo: {
        height: 44.12, width: 60
    },
    headerContainer: {
        flexDirection: 'row',
        height: ScreenUtils.getHeaderHeight(),
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    body: {
        marginTop: 10,
        paddingHorizontal: 16
    },
    dropDown: {
        width: (windowWidth - 44) / 2, height: 36,
        borderRadius: 10, padding: 6, paddingHorizontal: 12,
        justifyContent: 'space-between',
        borderColor: Color.black, borderWidth: 1, flexDirection: 'row', alignItems: 'center'
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
    },

    bottomSheetContainer: {
        flex: 1,
        alignItems: 'center',
    },
    sheetStyle: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        // width: '100%', backgroundColor: '#F4F4F4'
    }
})