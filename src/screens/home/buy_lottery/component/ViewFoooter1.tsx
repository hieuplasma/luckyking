import { Image, Images } from "@assets";
import { IText } from "@components";
import { Color } from "@styles";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

interface ViewFooterProps {
    fastPick: () => void,
    selfPick: () => void
}

export const ViewFooter1 = React.memo(({ fastPick, selfPick, }: ViewFooterProps) => {

    useEffect(()=> {
        "View Footer 1 rerender"
    })
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.buttonFooterUp} activeOpacity={0.6}>
                <Image source={Images.filled_heart} style={{ width: 19, height: 19 }}></Image>
                <IText style={styles.textFooterUp}>{"Yêu thích"}</IText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonFooterUp} activeOpacity={0.6} onPress={() => fastPick()}>
                <Image source={Images.fast_pick} style={{ width: 19, height: 19 }}></Image>
                <IText style={styles.textFooterUp}>{"Chọn nhanh"}</IText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonFooterUp} activeOpacity={0.6} onPress={() => selfPick()}>
                <View style={{ width: 21, height: 21, borderRadius: 99, backgroundColor: Color.luckyKing, justifyContent: 'center', alignItems: 'center' }}>
                    <IText style={{ fontSize: 14, color: Color.white, fontWeight: 'bold' }}>TC</IText>
                </View>
                <IText style={styles.textFooterUp}>{"Tự chọn"}</IText>
            </TouchableOpacity>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    buttonFooterUp: {
        width: (windowWidth - 48) / 3, height: 32,
        borderRadius: 10, padding: 6,
        justifyContent: 'center', alignItems: 'center',
        borderColor: '#FFC42C', backgroundColor: '#FDF9F9',
        borderWidth: 1, flexDirection: 'row'
    },
    textFooterUp: { fontSize: 16, color: Color.luckyKing, marginTop: 0, marginLeft: 2 }
})