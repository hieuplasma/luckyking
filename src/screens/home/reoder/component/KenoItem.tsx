import { INumberDetail, LotteryType, NumberDetail } from "@common";
import { ConsolasText, IText, LogoIcon } from "@components";
import { Color } from "@styles";
import { getColorLott, getSpecialValueKeno, printMoney, printNumber, printTypePlay } from "@utils";
import React, { useCallback } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { FooterItem } from "./FooterItem";
// import { RenderFooterItem } from "./RenderFooterItem";

interface Props {
    item: any,
    deleteLottery?: () => void,
    changeDraw: (drawSelected: any[],
        onChangeDraw: (draw: any) => void,
        listDraw: any[],
        type: LotteryType) => void,
    init?: boolean,
    onPickedDraw: (picked: any[]) => void
}

export const KenoItem = React.memo(({ item, deleteLottery, changeDraw, init, onPickedDraw }: Props) => {

    const printNumberScan = useCallback((number: any) => {
        if (parseInt(number) > 80) {
            return getSpecialValueKeno(number)
        }
        else return printNumber(number)
    }, [])


    const numberDetail = item.NumberLottery.numberDetail as INumberDetail[]
    const lottColor = Color.keno
    return (
        <View style={styles.borderItem}>
            <LogoIcon type={item.type} />
            <IText style={styles.textType}>{`${printTypePlay(item.NumberLottery.level, item.type)}`}</IText>
            <View>
                {
                    numberDetail.map((it: any, id: number) => {
                        const numbers: number[] = it.boSo.split("-").map(Number);
                        return (
                            <View key={'' + it.boSo + id}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                    <IText style={{ fontSize: 18, fontWeight: 'bold', color: Color.black }}>
                                        {String.fromCharCode(65 + id)}
                                    </IText>
                                    <View style={{ marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                        {
                                            numbers.map((number: number, id2: number) => {

                                                return (
                                                    <View key={number + '' + id2}
                                                        style={[styles.ball, { width: number > 80 ? 100 : 24, backgroundColor: lottColor }]}
                                                    >
                                                        <ConsolasText style={[styles.textBall]}>
                                                            {`${printNumberScan(number)}`}
                                                        </ConsolasText>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>

                                    <IText style={{ fontSize: 16, fontWeight: 'bold', color: Color.black }}>
                                        {`${printMoney(it.tienCuoc)}đ`}
                                    </IText>
                                </View>
                                <View style={styles.underLine} />
                            </View>
                        )
                    })
                }
            </View>
            <FooterItem
                lottColor={lottColor}
                item={item}
                deleteLottery={deleteLottery}
                changeDraw={changeDraw}
                init={init}
                onPickedDraw={onPickedDraw}
            />
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    borderItem: {
        width: windowWidth - 32,
        // shadow
        shadowOffset: { width: 6, height: 5 },
        shadowRadius: 15,
        shadowColor: '#EC6C3C',
        shadowOpacity: 0.2,
        elevation: 3,
        // borderWidth: 1,
        borderColor: '#A0A0A0',
        marginTop: 16,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingTop: 6,
        padding: 16,
    },
    textType: {
        color: '#1E2022',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 7
    },
    underLine: {
        width: windowWidth - 32, height: 1,
        backgroundColor: '#A0A0A0', marginHorizontal: -16,
        marginTop: 12, opacity: 0.2
    },
    ball: {
        width: 24, height: 24, borderRadius: 99,
        backgroundColor: Color.power,
        justifyContent: 'center', alignItems: 'center',
        margin: 5
    },
    textBall: { fontSize: 13, color: Color.white },
})