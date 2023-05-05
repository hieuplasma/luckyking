import { Image, Images } from "@assets";
import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import { printMoneyK, printNumber } from "@utils";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

interface RenderLineKenoBagProps {
    title: string,
    item: any[],
    openNumberSheet: () => void,
    deleteNumber: () => void,
    randomNumber: () => void,
    bet: number
}

export const RenderLineKenobag = React.memo(({ item, title, openNumberSheet, deleteNumber, randomNumber, bet }: RenderLineKenoBagProps) => {
    return (
        <View style={styles.lineNumber} >
            <IText style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</IText>
            <TouchableOpacity activeOpacity={1} style={{ flex: 1, flexDirection: 'row', marginHorizontal: 18, flexWrap: 'wrap' }} onPress={openNumberSheet}>
                {item.map((number: any, index2: number) => {
                    return (
                        <View style={styles.ballContainer} key={index2}>
                            <Image source={number !== false ? Images.ball_keno : Images.ball_grey} style={styles.ballStyle}>
                                <ConsolasText style={{ color: Color.white, fontSize: 16 }}>{printNumber(number)}</ConsolasText>
                            </Image>
                        </View>
                    )
                })}
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBets} onPress={openNumberSheet}>
                <IText style={{ fontSize: 16, color: Color.blue }}>{printMoneyK(bet)}</IText>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: 60, justifyContent: 'space-between' }}>
                <Image source={Images.nofilled_heart} style={{ width: 22, height: 22, }}></Image>
                {(item[0] !== false && item.length > 0) ?
                    <TouchableOpacity onPress={deleteNumber}>
                        <Image source={Images.trash} style={{ width: 26, height: 26 }}></Image>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={randomNumber}>
                        <Image source={Images.refresh} style={{ width: 26, height: 26 }}></Image>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    lineNumber: {
        flexDirection: 'row', marginVertical: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ballContainer: {
        width: (windowWidth - 196) / 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    ballStyle: {
        width: 28, height: 28,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: Color.power,
        borderRadius: 99
    },
    buttonBets: {
        width: 40, height: 26,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 6,
        borderColor: Color.blue,
        borderWidth: 1, marginRight: 12
    }
})