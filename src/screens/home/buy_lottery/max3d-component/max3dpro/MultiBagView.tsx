import { Image, Images } from "@assets";
import { LotteryType } from "@common";
import { IText } from "@components";
import { Color } from "@styles";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { ChangeBetButton } from "../../component/ChangeBetButton";
import { MultiBagSheet } from "./MultiBagSheet";
import { NumberMultiBagSheet } from "./NumberMultiBagSheet";
import { nextBet, previousBet } from "@utils";

const lottColor = Color.max3dpro

interface MultiBagViewProps {
    changeCost: (data: any) => void,
    changeGenerated: (data: any) => void,
    changeBets: (data: any) => void,
    changeNumber: (data: any) => void,
    typePlay: any
}

const initNumber = [
    [false, false, false],
    [false, false, false],
    [false, false, false,]
]

const Wiget = forwardRef(({ changeCost, changeGenerated, changeBets, changeNumber, typePlay }: MultiBagViewProps, ref) => {

    const chooseTypeRef: any = useRef(null)
    const chooseNumberRef: any = useRef(null)
    const [pageNumber, setPageNumber]: any = useState(0)

    const [bagType, setBagType] = useState({ label: "Bao 3 bộ 3 số", value: 3 })
    const [numberSet, setNumbers]: any = useState<any[]>(initNumber)
    const [numberFake, setNumberFake]: any = useState<any[]>(initNumber)

    // useImperativeHandle(ref, () => ({
    //     renderNumberSheet: () => { return renderNumberSheet() },
    //     renderTypeSheet: () => { return renderTypeSheet() }
    // }));

    const onChangeType = useCallback((type: any) => {
        setBagType(type)
        const arr = Array.from({ length: type.value }, () => Array(3).fill(false));
        setNumbers(arr)
        setPageNumber(0)
        changeGenerated([])
    }, [])
    const openTypeSheet = useCallback(() => { chooseTypeRef.current?.openSheet() }, [chooseTypeRef])
    const renderTypeSheet = useCallback(() => {
        return (
            <MultiBagSheet
                ref={chooseTypeRef}
                currentChoose={bagType}
                onChoose={onChangeType}
                type={LotteryType.Max3DPro}
            />
        )
    }, [chooseTypeRef, onChangeType, bagType])

    const onChangeNumber = useCallback((set: any) => {
        let generated: any = []
        let arrForGenerate: any = []

        for (let i = 0; i < set.length; i++) {
            arrForGenerate[i] = set[i].join("")
        }

        for (let i = 0; i < arrForGenerate.length; i++) {
            for (let j = i + 1; j < arrForGenerate.length; j++) {
                var str1 = arrForGenerate[i] + ' ' + arrForGenerate[j];
                var str2 = arrForGenerate[j] + ' ' + arrForGenerate[i];
                generated.push(str1);
                generated.push(str2);
            }
        }
        changeGenerated(generated)
        changeNumber([arrForGenerate.join(" ")])
        setNumbers(set)
    }, [changeNumber, changeGenerated])

    const openNumberSheet = useCallback(async (page: number) => {
        console.log(page)
        await setNumberFake(numberSet)
        await setPageNumber(page)
        chooseNumberRef.current?.openSheet()
    }, [chooseNumberRef, numberSet])

    const renderNumberSheet = useCallback(() => {
        return (
            <NumberMultiBagSheet
                ref={chooseNumberRef}
                onChoose={onChangeNumber}
                numberSet={numberFake}
                page={pageNumber}
            />
        )
    }, [chooseNumberRef, numberFake, pageNumber])

    const [currentBet, setCurrentBet] = useState(10000)

    useEffect(() => {
        changeCost(bagType.value * (bagType.value - 1) * currentBet)
        changeBets([bagType.value * (bagType.value - 1) * currentBet])
    }, [currentBet, bagType.value])

    return (
        <>
            <Image source={Images.bg_ticket_1} style={{ flex: 1 }} resizeMode="cover">
                <View style={styles.body}>
                    <View style={{ flexDirection: 'row', paddingTop: 5, justifyContent: 'space-between' }}>
                        <TouchableOpacity activeOpacity={0.6} style={styles.dropDown} onPress={openTypeSheet}>
                            <IText style={{ fontSize: 13 }}>{`Bao ${bagType.value} bộ 3 số`}</IText>
                            <Image source={Images.down_arrow} style={{ width: 12, height: 6 }}></Image>
                        </TouchableOpacity>

                        <ChangeBetButton
                            style={styles.changeBet}
                            currentBet={currentBet}
                            increase={() => setCurrentBet(nextBet(currentBet))}
                            decrease={() => setCurrentBet(previousBet(currentBet))}
                            color={lottColor}
                            max={300000}
                            min={10000}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                            {numberSet.map((item: any, index: number) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.boxNumber}
                                        key={index}
                                        onPress={() => openNumberSheet(index)}
                                    >
                                        {item.slice(0, 3).map((number: any, index2: number) => {
                                            return (
                                                <IText
                                                    key={index2 + "::" + index}
                                                    style={styles.number_txt}>
                                                    {number}
                                                </IText>
                                            )
                                        })}
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <Image source={Images.nofilled_heart} style={{ width: 22, height: 22 }}></Image>
                    </View>

                </View>
            </Image>
            {renderTypeSheet()}
            {renderNumberSheet()}
        </>
    )
})

export const MultiBagView = React.memo(Wiget)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    body: {
        marginTop: 5,
        paddingHorizontal: 16
    },
    dropDown: {
        width: (windowWidth - 44) / 2, height: 36,
        borderRadius: 10, padding: 6, paddingHorizontal: 12,
        justifyContent: 'space-between',
        borderColor: Color.black, borderWidth: 1, flexDirection: 'row', alignItems: 'center'
    },
    changeBet: {
        width: (windowWidth - 44) / 2, height: 36,
        borderRadius: 10
    },
    lineNumber: {
        flexDirection: 'row', marginVertical: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boxNumber: {
        width: 70, height: 28,
        borderColor: lottColor, borderRadius: 15,
        borderWidth: 1, justifyContent: 'space-evenly',
        alignItems: 'center', flexDirection: 'row', margin: 5
    },
    number_txt: { color: lottColor, fontSize: 16 }
})