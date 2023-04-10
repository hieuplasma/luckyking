import { Image, Images } from "@assets";
import { LotteryType, MAX3D_NUMBER, MAX_SET } from "@common";
import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { generateUniqueStrings, printMoneyK, printNumber } from "@utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { ChooseDrawSheet } from "../../component/ChooseDrawSheet";
import { ViewAbove } from "../../component/ViewAbove";
import { ViewFooter1 } from "../../component/ViewFoooter1";
import { ViewFooter2 } from "../../component/ViewFooter2";
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

const listBets = [
    10000, 20000, 30000, 50000, 100000, 200000, 300000
]
const initBets = [10000, 10000, 10000, 10000, 10000, 10000]

export const Max3dTab = React.memo((props: Props) => {

    const listDraw = useSelector((state: any) => state.drawReducer.max3dListDraw)

    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 1 });
    const [drawSelected, setDraw]: any = useState(listDraw[0])
    const [numberSet, setNumbers]: any = useState(initNumber)
    const [bets, setBets]: any = useState(initBets)
    const [generated, setGenrated]: any = useState([])
    const [totalCost, setTotalCost] = useState(0)

    // ref
    const chooseTypeRef: any = useRef(null);
    const chooseDrawRef: any = useRef(null);
    const chooseNumberRef: any = useRef(null);
    const [pageNumber, setPageNumber] = useState(0)

    const randomNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const randomNumbers = new Set();
        while (randomNumbers.size < 3) {
            const randomNumber = Math.floor(Math.random() * MAX3D_NUMBER);
            randomNumbers.add(randomNumber);
        }
        const resultArray = Array.from(randomNumbers).map(Number).sort((a, b) => a - b);
        currentNumber[index] = resultArray
        setNumbers(currentNumber)
    }

    const deleteNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const resultArray = Array(3).fill(false);
        currentNumber[index] = resultArray
        setNumbers(currentNumber)
    }

    useEffect(() => {
        const currentNumber = [...numberSet]
        const level = typePlay.value
        console.log(level)
        let tmp: any = []
        switch (level) {
            case 1:
                currentNumber.map(item => (item[0] !== false) ? tmp.push('' + item[0] + item[1] + item[2]) : null)
                break;
            case 2:
                currentNumber.map(item => (item[0] !== false) ? tmp = tmp.concat(generateUniqueStrings(item)) : null)
                break;
            default:
                break;
        }
        console.log("tmp", tmp)
        setGenrated(tmp)
    }, [numberSet])

    const onChangeType = useCallback((type: any) => {
        setType(type)
        setNumbers(initNumber)
        setBets(initBets)
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

    const onChangeNumber = useCallback((set: any) => setNumbers(set), [])
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
                type={LotteryType.Max3D}
            />
        )
    }, [chooseNumberRef, numberSet, pageNumber])

    return (
        <View style={{ flex: 1 }}>
            <ViewAbove typePlay={typePlay} drawSelected={drawSelected} openTypeSheet={openTypeSheet} openDrawSheet={openDrawSheet} />

            {
                typePlay == 2 ?
                    <View style={{ alignSelf: 'center' }}>

                    </View >
                    : <></>
            }
            {/* //Chon so */}
            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                    {numberSet.map((item: any, index: number) => {
                        return (
                            <View style={styles.lineNumber} key={index}>
                                <IText style={{ fontSize: 18, fontWeight: 'bold' }}>{String.fromCharCode(65 + index)}</IText>
                                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginHorizontal: 18, justifyContent: 'center' }} onPress={() => openNumberSheet(index)}>
                                    {item.sort((a: any, b: any) => a - b).map((number: any, index2: number) => {
                                        return (
                                            <View style={styles.ballContainer} key={index2}>
                                                <Image source={number !== false ? Images.ball_max3d : Images.ball_grey} style={styles.ballStyle}>
                                                    <ConsolasText style={{ color: Color.white, fontSize: 16 }}>{printNumber(number)}</ConsolasText>
                                                </Image>
                                            </View>
                                        )
                                    })}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonBets} onPress={() => openNumberSheet(index)}>
                                    <IText style={{ fontSize: 16, color: '#0171F5' }}>{printMoneyK(bets[index])}</IText>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: 60, justifyContent: 'space-between' }}>
                                    <Image source={Images.nofilled_heart} style={{ width: 22, height: 22, }}></Image>
                                    {item[0] !== false ?
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



            <View style={{ paddingHorizontal: 16, marginBottom: 30 }}>
                <ViewFooter1 fastPick={() => { }} selfPick={() => { }} />

                <IText style={{ fontSize: 16, color: '#0171F5', fontWeight: 'bold', marginTop: 10, alignSelf: 'center' }}>
                    {`Các bộ số được tạo (${generated.length} bộ)`}
                </IText>
                <ScrollView style={styles.boxGenerated}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                        {
                            generated.map((item: any, index: number) =>
                                <IText key={index + ""} style={{ fontSize: 16, color: Color.max3d, marginHorizontal: 16, marginVertical: 5 }}>{item}</IText>
                            )
                        }
                    </View>
                </ScrollView>

                <ViewFooter2
                    totalCost={totalCost}
                    addToCart={() => { }}
                    bookLottery={() => { }}
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
    ballContainer: { width: (windowWidth - 146) / 6, justifyContent: 'center', alignItems: 'center', marginVertical: 8 },
    ballStyle: {
        width: 28, height: 28, justifyContent: 'center', alignItems: 'center'
    },
    buttonBets: {
        width: 40, height: 26,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 6,
        borderColor: '#0171F5',
        borderWidth: 1, marginRight: 12
    },
    boxGenerated: {
        height: 86, width: windowWidth - 32, marginTop: 10,
        borderRadius: 10, backgroundColor: '#F3F2F2',
        padding: 5
    }
})