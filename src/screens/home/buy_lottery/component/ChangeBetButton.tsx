import { IText } from "@components"
import { Color } from "@styles"
import { printMoney } from "@utils"
import React from "react"
import { StyleSheet, View, ColorValue, TouchableOpacity, ViewStyle } from "react-native"

interface ChangeBetButtonProps {
    currentBet: number,
    increase: () => void,
    decrease: () => void,
    color: ColorValue,
    max: number,
    min: number,
    style?: ViewStyle

}

export const ChangeBetButton = React.memo(({ currentBet, increase, decrease, color, max, min, style }: ChangeBetButtonProps) => {
    return (
        <View style={[styles.container, style ? style : {}]}>
            {
                currentBet == min ? <View style={{ width: 25, height: 25 }} />
                    : <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={decrease}>
                        <IText style={styles.textButton}>{"-"}</IText>
                    </TouchableOpacity>
            }
            <IText style={{ fontSize: 16, color: color }}>{printMoney(currentBet)}</IText>
            {
                currentBet == max ? <View style={{ width: 25, height: 25 }} />
                    : <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={increase}>
                        <IText style={styles.textButton}>{"+"}</IText>
                    </TouchableOpacity>
            }
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        width: 132, height: 40,
        borderRadius: 15, borderWidth: 1,
        borderColor: Color.max3d, backgroundColor: '#FCEEF7',
        alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 5,
        flexDirection: 'row'
    },
    button: {
        width: 25, height: 25,
        borderRadius: 99,
        backgroundColor: Color.max3d,
        justifyContent: 'center', alignItems: 'center'
    },
    textButton: {
        fontSize: 17, color: Color.white
    }
})