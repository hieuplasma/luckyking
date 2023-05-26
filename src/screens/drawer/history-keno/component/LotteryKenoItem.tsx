import { NumberDetail } from "@common"
import { ConsolasText, IText } from "@components"
import { Color } from "@styles"
import { getSpecialValueKeno, kenoAnalysis, printMoney, printNumber } from "@utils"
import React, { useCallback, useState } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { PrintDrawItem } from "./PrintDrawItem"

interface LotteryItem {
    section: any,
    navigation: any
}

const lottColor = Color.keno

export const LotteryKenoItem = React.memo(({ section, navigation }: LotteryItem) => {

    const numberDetail: NumberDetail[] = section.boSo
    const [expandNumber, setExpandNumber] = useState(0)
    const [drawResult, setDrawResult] = useState<any>(false)
    const lotteries = section.lotteries.sort((a: any, b: any) => a.drawCode - b.drawCode)

    const handleExpandNumber = useCallback(async (index: number, lottery: any) => {
        if (index == expandNumber) {
            setExpandNumber(-1)
        }
        else {
            setExpandNumber(index)
            setDrawResult(lottery.result)
        }
    }, [expandNumber])

    const checking = useCallback((number: number,) => {
        if (expandNumber == -1) return false
        if (!drawResult) return false
        if (!drawResult.drawn) return false
        const result = drawResult.result.split("-").map(Number)
        if (result.includes(number)) return true
        if (number > 80) {
            const analysis = kenoAnalysis(result)
            //@ts-ignore
            if (analysis.event_number.includes(parseInt(number)))
                return true
        }
        return false
    }, [expandNumber, drawResult])

    const printNumberScan = useCallback((number: any) => {
        if (parseInt(number) > 80) {
            return getSpecialValueKeno(number)
        }
        else return printNumber(number)
    }, [])

    return (
        <View>
            {numberDetail.map((it: NumberDetail, id: number) => {
                const numbers: number[] = it.boSo.split("-").map(Number);
                return (
                    <View style={styles.lineNumber} key={id}>
                        <IText style={{ fontSize: 14, color: Color.blue }}>
                            {String.fromCharCode(65 + id)}
                        </IText>
                        <View style={{ marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                            {
                                numbers.map((number: number, id2: number) => {
                                    const check = checking(number)
                                    return (
                                        <View key={number + '' + id2}
                                            style={
                                                [styles.ball,
                                                {
                                                    backgroundColor: check ? lottColor : Color.white,
                                                    width: number > 80 ? 100 : 24
                                                }]
                                            }
                                        >
                                            <ConsolasText style={[styles.textBall, { color: check ? Color.white : lottColor }]}>
                                                {`${printNumberScan(number)}`}
                                            </ConsolasText>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        {
                            numbers[0] <= 80 ? <IText style={{ marginLeft: 5 }}>{numbers.length}</IText>
                                : <></>
                        }
                        <IText style={{ marginRight: 10, textAlign: 'right', width: 70 }}>{`${printMoney(it.tienCuoc)}đ`}</IText>
                    </View>
                )
            })}
            <View style={{ height: 5 }} />
            {lotteries.map((lottery: any, index: number) => {
                return (
                    <PrintDrawItem
                        key={lottery.id}
                        lottery={lottery}
                        expand={expandNumber == index ? true : false}
                        toggle={() => handleExpandNumber(index, lottery)}
                        lottColor={Color.keno}
                        navigation={navigation}
                    />
                )
            })}
            <View style={styles.underLine} />
        </View>
    )

})


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    lineNumber: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    underLine: {
        width: windowWidth - 32, height: 1,
        backgroundColor: '#A0A0A0',
        marginTop: 12, opacity: 0.2
    },
    ball: {
        width: 24, height: 24, borderRadius: 99,
        justifyContent: 'center', alignItems: 'center',
        margin: 5, borderWidth: 1, borderColor: lottColor
    },
    textBall: { fontSize: 13, color: lottColor }
})