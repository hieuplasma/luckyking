import { Image, Images } from "@assets";
import { IText } from "@components";
import { Color } from "@styles";
import { printDraw, printMoney } from "@utils";
import React, { useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";

interface ViewAboveProps {
    typePlay: any
    drawSelected: any,
    openTypeSheet: () => void,
    openDrawSheet: () => void
    disableChooseType?: boolean
}

export const ViewAbove = React.memo(({ typePlay, drawSelected, openTypeSheet, openDrawSheet, disableChooseType }: ViewAboveProps) => {

    const luckykingBalance = useSelector((state: any) => state.userReducer.luckykingBalance);

    const getDrawName = useCallback(() => {
        if (drawSelected && drawSelected.length > 0) {
            if (drawSelected.length > 1) return drawSelected.length + " kỳ"
            else return printDraw(drawSelected[0])
        }
        else return "------"
    }, [drawSelected])
    return (
        <View style={styles.body}>
            <View style={{ flexDirection: 'row' }}>
                <IText style={{ fontSize: 16 }}>
                    {"Số dư tài khoản: "}
                </IText>
                <IText style={{ fontSize: 16, color: Color.luckyKing, fontWeight: 'bold' }}>
                    {`${printMoney(luckykingBalance)} đ`}
                </IText>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 5, justifyContent: 'space-between' }}>
                <TouchableOpacity activeOpacity={0.6} style={[styles.dropDown, { opacity: disableChooseType ? 0.6 : 1 }]} onPress={openTypeSheet}>
                    <IText style={{ fontSize: 13 }}>{typePlay}</IText>
                    {
                        disableChooseType ? <></>
                            : <Image source={Images.down_arrow} style={{ width: 12, height: 6 }}></Image>
                    }
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} style={[styles.dropDown]} onPress={openDrawSheet}>
                    <IText style={{ fontSize: 13 }}>{getDrawName()}</IText>
                    <Image source={Images.down_arrow} style={{ width: 12, height: 6 }}></Image>
                </TouchableOpacity>
            </View>
        </View>

    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    body: {
        marginTop: 5,
        paddingHorizontal: 16
    },
    dropDown: {
        width: (windowWidth - 44) / 2, height: 36,
        borderRadius: 10, paddingHorizontal: 12,
        justifyContent: 'space-between',
        borderColor: Color.black, borderWidth: 1, flexDirection: 'row', alignItems: 'center'
    }
})