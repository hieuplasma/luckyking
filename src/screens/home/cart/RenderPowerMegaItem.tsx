import { Image, Images } from "@assets";
import { INumberDetail, NumberDetail } from "@common";
import { ConsolasText, IText, LogoIcon } from "@components";
import { Color } from "@styles";
import { getColorLott, printDrawCode, printMoney, printNumber, printTypePlay, printWeekDate } from "@utils";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { RenderFooterItem } from "./RenderFooterItem";

interface Props {
    item: any,
    openModalDeleteLottery: () => void
}

export const RenderPowerMegaItem = React.memo(({ item, openModalDeleteLottery }: Props) => {

    const numberDetail = item.NumberLottery.numberDetail as INumberDetail[]
    const lottColor = getColorLott(item.type)
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
                                        <IText style={{ fontSize: 10 }}>
                                            {(it.tuChon ? ' (TC)' : '')}
                                        </IText>
                                    </IText>
                                    <View style={{ marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                        {
                                            numbers.map((number: number, id2: number) => {
                                                return (
                                                    <View key={number + '' + id2} style={[styles.ball, { backgroundColor: lottColor }]}>
                                                        <ConsolasText style={styles.textBall}>
                                                            {`${printNumber(number)}`}
                                                        </ConsolasText>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                                <View style={styles.underLine} />
                            </View>
                        )
                    })
                }
            </View>
            <RenderFooterItem
                lottColor={lottColor}
                item={item}
                openModalDeleteLottery={openModalDeleteLottery}
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