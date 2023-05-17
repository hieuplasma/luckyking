import { NumberDetail } from "@common"
import { ConsolasText, IText } from "@components"
import { Color } from "@styles"
import { printDraw2, printMoney, printNumber } from "@utils"
import React, { useCallback, useState } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { PrintDrawItem } from "../../component/PrintDrawItem"

interface LotteryItem {
    section: any
}

const lottColor = Color.keno

export const LotteryKenoItem = React.memo(({ section }: LotteryItem) => {

    const numberDetail: NumberDetail[] = JSON.parse(section.boSo.toString())

    const [expandNumber, setExpandNumber] = useState(-1)

    const handleExpandNumber = useCallback((index: number) => {
        if (index == expandNumber) setExpandNumber(-1)
        else setExpandNumber(index)
    }, [expandNumber])

    return (
        <View>
            {numberDetail.map((it: NumberDetail, id: number) => {
                const numbers: number[] = it.boSo.split("-").map(Number);
                return (
                    <View style={styles.lineNumber} key={'' + it.boSo + id}>
                        <IText style={{ fontSize: 14, color: Color.blue }}>
                            {String.fromCharCode(65 + id)}
                        </IText>
                        <View style={{ marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                            {
                                numbers.map((number: number, id2: number) => {
                                    return (
                                        <View key={number + '' + id2} style={[styles.ball, { backgroundColor: Color.white }]}>
                                            <ConsolasText style={styles.textBall}>
                                                {`${printNumber(number)}`}
                                            </ConsolasText>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <IText style={{ marginLeft: 5 }}>{numbers.length}</IText>
                        <IText style={{ marginRight: 10, textAlign:'right', width: 70}}>{`${printMoney(it.tienCuoc)}đ`}</IText>
                    </View>
                )
            })}
            <View style={{ height: 5 }} />
            {section.lotteries.sort((a: any, b: any) => a.drawCode - b.drawCode).map((lottery: any, index: number) => {
                return (
                    <PrintDrawItem
                        key={lottery.id}
                        lottery={lottery}
                        expand={expandNumber == index ? true : false}
                        toggle={() => handleExpandNumber(index)}
                        lottColor={Color.keno}
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