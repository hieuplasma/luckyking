import { Image, Images } from "@assets";
import { INumberDetail, LotteryType, NumberDetail } from "@common";
import { ConsolasText, IText, LogoIcon } from "@components";
import { Color } from "@styles";
import { getColorLott, printMoney, printNumber, printTypePlay, printWeekDate } from "@utils";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { FooterItem } from "./FooterItem";

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

export const Max3dItem = React.memo(({ item, deleteLottery, changeDraw, init, onPickedDraw }: Props) => {

    const numberDetail = item.NumberLottery.numberDetail as INumberDetail[]
    const lottColor = getColorLott(item.type)
    return (
        <View style={styles.borderItem}>
            <LogoIcon type={item.type} />
            <IText style={styles.textType}>{`${printTypePlay(item.NumberLottery.level, item.type)}`}</IText>
            <View>
                {
                    numberDetail.map((it: any, id: number) => {
                        const numbers: number[] = it.boSo.split(" ")
                        return (
                            <View key={'' + it.boSo + id}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                    <IText style={{ fontSize: 18, fontWeight: 'bold', color: Color.black }}>
                                        {String.fromCharCode(65 + id)}
                                    </IText>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                        {
                                            numbers.map((number: any, index: number) => {
                                                return (
                                                    <View style={[styles.boxNumber, { backgroundColor: lottColor }]} key={index}>
                                                        <IText style={styles.numberText}>{number}</IText>
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
    boxNumber: {
        width: 42, height: 24,
        margin: 5, borderRadius: 15, marginLeft: 20,
        justifyContent: 'center', alignItems: 'center',
    },
    numberText: { color: Color.white, fontSize: 13 }
})