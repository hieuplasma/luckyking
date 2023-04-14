import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { generateStringsFromArray, generateUniqueStrings } from "@utils";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ChangeBetButton } from "../../component/ChangeBetButton";

const lottColor = Color.max3d
const fullNumber = Array.from({ length: 10 }, (_, index) => index);

interface BagViewProps {
    changeCost: (data: any) => void,
    changeGenerated: (data: any) => void,
    changeBets: (data: any) => void
}

export const Max3dBagView = forwardRef(({ changeCost, changeGenerated, changeBets }: BagViewProps, ref) => {

    const [generated, setGenrated] = useState([])
    const [currentBet, setCurrentBet] = useState(10000)
    const [total, setTotal] = useState(0)

    const [currentNumbers, setNumbers]: any = useState([])

    // useImperativeHandle(ref, () => ({
    //     totalCost: () => { return total },
    //     generated: () => { return generated }
    // }));

    const choose = (number: number) => {
        let tmp = [...currentNumbers]
        let index = tmp.indexOf(number);
        if (index !== -1) tmp.splice(index, 1);
        else tmp.push(number)
        setNumbers(tmp)
    }

    useEffect(() => {
        const tmp: any = generateStringsFromArray(currentNumbers.sort((a: number, b: number) => a - b))
        setGenrated(tmp)
        changeCost(tmp.length * currentBet)
        changeGenerated(tmp)
        changeBets(Array(tmp.length).fill(currentBet))
    }, [currentNumbers])

    useEffect(() => {
        changeCost(generated.length * currentBet)
        changeBets(Array(generated.length).fill(currentBet))
    }, [currentBet])

    return (
        <>
            <IText style={{ fontSize: 16, marginLeft: 16, marginTop: 8 }}>{"Chọn các số để bao"}</IText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 }}>
                {
                    fullNumber.map((number: number) => {
                        const check = currentNumbers.includes(number) ? true : false
                        return (
                            <TouchableOpacity key={number + ""} style={[styles.ballCircle, { backgroundColor: check ? lottColor : Color.white }]}
                                onPress={() => choose(number)}>
                                <ConsolasText style={{ fontSize: 16, color: check ? Color.white : lottColor }}>{number}</ConsolasText>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <IText style={{ fontSize: 16, color: Color.blue, fontWeight: 'bold', marginTop: 5, alignSelf: 'center' }}>
                {`Các bộ số được tạo (${generated.length} bộ)`}
            </IText>
            <ScrollView style={[styles.boxGenerated, { marginHorizontal: 16 }]}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        generated.map((item: any, index: number) =>
                            <ConsolasText key={index + ""} style={{ fontSize: 16, color: lottColor, marginHorizontal: 8, marginVertical: 5 }}>{item}</ConsolasText>
                        )
                    }
                </View>
            </ScrollView>
            <View style={{ marginTop: 8, marginHorizontal: 16, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <IText style={{ fontSize: 16 }}>{"Chọn giá tiền mỗi bộ số"}</IText>
                <ChangeBetButton
                    currentBet={currentBet}
                    increase={() => setCurrentBet(currentBet + 10000)}
                    decrease={() => setCurrentBet(currentBet - 10000)}
                    color={lottColor}
                    max={300000}
                    min={10000}
                />
            </View>
        </>
    )
})

// export const Max3dBagView = React.memo(Wiget)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    ballCircle: {
        width: 31, height: 31,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 99, borderWidth: 1,
        borderColor: lottColor
    },
    boxGenerated: {
        height: 86, width: windowWidth - 32,
        borderRadius: 10, backgroundColor: '#F3F2F2',
        padding: 5
    },
})