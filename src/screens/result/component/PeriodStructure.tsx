import { IText } from "@components";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BallLine } from "./BallLine";
import { printMoney } from "@utils";
import { LotteryType } from "@common";

interface Props {
    type: LotteryType,
    jackpot1: any,
    jackpot2?: any,
    first: number,
    second: number,
    third: number
}
export const PeriodStructure = React.memo(({ type, jackpot1, jackpot2, first, second, third }: Props) => {
    return (
        <>
            <View style={styles.lineItem}>
                <IText style={styles.txt_col_1}> {"Giải thưởng"}</IText>
                <IText style={{ width: 80, fontSize: 15 }}> {"Kết quả"}</IText>
                <View style={{ width: 90 }}>
                    <IText style={styles.txt_col_3}>{"Số lượng giải"}</IText>
                </View>
                <View style={{ flex: 1 }} />
                <IText> {"Giá trị giải"}</IText>
            </View>
            <View style={styles.lineItem}>
                <IText style={styles.txt_col_1}> {"Jackpot "}</IText>
                <BallLine type={type} count={6} />
                <View style={{ width: 90 }}>
                    <IText style={styles.txt_col_3}>{"-----"}</IText>
                </View>
                <View style={{ flex: 1 }} />
                <IText style={styles.txt_col_4}> {parseInt(jackpot1) > 0 ? `${printMoney(jackpot1)}đ` : "no_info"}</IText>
            </View>
            {
                jackpot2 ?
                    <View style={styles.lineItem}>
                        <IText style={styles.txt_col_1}> {"Jackpot 2"}</IText>
                        <BallLine type={type} count={6} />
                        <View style={{ width: 90 }}>
                            <IText style={styles.txt_col_3}>{"-----"}</IText>
                        </View>
                        <View style={{ flex: 1 }} />
                        <IText style={styles.txt_col_4}> {parseInt(jackpot2) > 0 ? `${printMoney(jackpot2)}đ` : "no_info"}</IText>
                    </View>
                    : <></>
            }
            <View style={styles.lineItem}>
                <IText style={styles.txt_col_1}> {"Giải nhất"}</IText>
                <BallLine type={type} count={5} />
                <View style={{ width: 90 }}>
                    <IText style={styles.txt_col_3}>{"-----"}</IText>
                </View>
                <View style={{ flex: 1 }} />
                <IText style={styles.txt_col_4}> {printMoney(first) + "đ"}</IText>
            </View>
            <View style={styles.lineItem}>
                <IText style={styles.txt_col_1}> {"Giải nhì"}</IText>
                <BallLine type={type} count={4} />
                <View style={{ width: 90 }}>
                    <IText style={styles.txt_col_3}>{"-----"}</IText>
                </View>
                <View style={{ flex: 1 }} />
                <IText style={styles.txt_col_4}> {printMoney(second) + "đ"}</IText>
            </View>
            <View style={styles.lineItem}>
                <IText style={styles.txt_col_1}> {"Giải ba"}</IText>
                <BallLine type={type} count={3} />
                <View style={{ width: 90 }}>
                    <IText style={styles.txt_col_3}>{"-----"}</IText>
                </View>
                <View style={{ flex: 1 }} />
                <IText style={styles.txt_col_4}> {printMoney(third) + "đ"}</IText>
            </View>
        </>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    lineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#EEEBEB'
    },
    txt_col_1: {
        fontSize: 15, width: 90
    },
    txt_col_3: {
        fontSize: 15, alignSelf: 'center'
    },
    txt_col_4: { fontSize: 15 }
})