import { Image, Images } from "@assets";
import { Color } from "@styles";
import { printDraw, printMoney } from "@utils";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";

interface ViewAboveProps {
    typePlay: any
    drawSelected: any,
    openTypeSheet: () => void,
    openDrawSheet: () => void
}

export const ViewAbove = React.memo(({ typePlay, drawSelected, openTypeSheet, openDrawSheet }: ViewAboveProps) => {

    const luckykingBalance = useSelector((state: any) => state.userReducer.luckykingBalance);
    return (
        <View style={styles.body}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, color: Color.black }}>
                    {"Số dư tài khoản: "}
                </Text>
                <Text style={{ fontSize: 16, color: Color.luckyKing, fontWeight: 'bold' }}>
                    {`${printMoney(luckykingBalance)} đ`}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between' }}>
                <TouchableOpacity activeOpacity={0.6} style={styles.dropDown} onPress={openTypeSheet}>
                    <Text style={{ fontSize: 13, color: Color.black }}>{typePlay.label}</Text>
                    <Image source={Images.down_arrow} style={{ width: 12, height: 6 }}></Image>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} style={[styles.dropDown, { paddingHorizontal: 4 }]} onPress={openDrawSheet}>
                    <Text style={{ fontSize: 13, color: Color.black }}>{drawSelected ? printDraw(drawSelected) : "------"}</Text>
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
        marginTop: 10,
        paddingHorizontal: 16
    },
    dropDown: {
        width: (windowWidth - 44) / 2, height: 36,
        borderRadius: 10, padding: 6, paddingHorizontal: 12,
        justifyContent: 'space-between',
        borderColor: Color.black, borderWidth: 1, flexDirection: 'row', alignItems: 'center'
    },
    lineNumber: {
        flexDirection: 'row', marginVertical: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})