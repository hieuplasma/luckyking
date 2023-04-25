import { Image, Images } from "@assets";
import { LotteryType, NumberDetail } from "@common";
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

export const RenderMax3dItem = React.memo(({ item, openModalDeleteLottery }: Props) => {

    const numberDetail: NumberDetail[] = JSON.parse(item.NumberLottery.numberDetail.toString())
    const lottColor = getColorLott(item.type)
    return (
        <View style={styles.borderItem}>
            <LogoIcon type={item.type} />
            <IText style={styles.textType}>{`${printTypePlay(item.NumberLottery.level, item.type)}`}</IText>
            <View>
                {
                    numberDetail.map((it: any, id: number) => {
                        const numbers: number[] = it.boSo.split(" ")
                        console.log(numbers)
                        return (
                            <View key={'' + it.boSo + id}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                    <IText style={{ fontSize: 18, fontWeight: '600', color: Color.black }}>
                                        {String.fromCharCode(65 + id)}
                                    </IText>
                                    <View style={[styles.boxNumber, { backgroundColor: lottColor }]}>
                                        <IText style={[styles.numberText, { backgroundColor: lottColor }]}>{numbers[0]}</IText>
                                    </View>
                                    {
                                        item.type == LotteryType.Max3D ? <></>
                                            : <View style={[styles.boxNumber, { backgroundColor: lottColor }]}>
                                                <IText style={styles.numberText}>{numbers[1]}</IText>
                                            </View>
                                    }
                                    <View style={{ flex: 1 }} />
                                    <IText style={{ fontSize: 16, fontWeight: '600', color: Color.black }}>
                                        {`${printMoney(it.tienCuoc)}đ`}
                                    </IText>
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
        fontWeight: '600',
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