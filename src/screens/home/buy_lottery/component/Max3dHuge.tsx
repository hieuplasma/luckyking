import { LotteryType } from "@common";
import { IText } from "@components";
import { Color } from "@styles";
import { getColorLott } from "@utils";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Max3dHugeProps {
    hugeCount: number,
    hugePosition: number[],
    onChangeHugePositon: (position: any, index: any) => void,
    lotteryType: LotteryType
}

export const Max3dHuge = React.memo(({ hugeCount, hugePosition, onChangeHugePositon, lotteryType }: Max3dHugeProps) => {

    const lottColor = getColorLott(lotteryType)
    return (
        <View style={{ alignSelf: 'center', marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
            <IText style={{ fontSize: 16 }}>{`Chọn ${hugeCount} vị trí ÔM`}</IText>
            <View style={[styles.hugeContainer, { borderColor: lottColor }]}>
                {
                    [0, 1, 2].map((item) => {
                        return (
                            <TouchableOpacity key={item + ""} activeOpacity={1} style={[styles.circleOutside, { borderColor: lottColor }]} onPress={() => onChangeHugePositon(item, 0)}>
                                <View style={[styles.circleInside, { backgroundColor: hugePosition.includes(item) ? lottColor : Color.white, borderColor: lottColor }]} />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            {
              lotteryType !== LotteryType.Max3D ?
                    <View style={[styles.hugeContainer, { borderColor: lottColor }]}>
                        {
                            [3, 4, 5].map((item) => {
                                return (
                                    <TouchableOpacity key={item + ""} activeOpacity={1} style={[styles.circleOutside, { borderColor: lottColor }]} onPress={() => onChangeHugePositon(item, 1)}>
                                        <View style={[styles.circleInside, { backgroundColor: hugePosition.includes(item) ? lottColor : Color.white, borderColor: lottColor }]} />
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View> : <></>
            }
        </View >
    )
})

const styles = StyleSheet.create({
    hugeContainer: {
        width: 73, height: 24,
        borderRadius: 20,
        borderWidth: 1, marginLeft: 4,
        justifyContent: 'space-around', flexDirection: 'row',
        alignItems: 'center'
    },
    circleOutside: {
        width: 16, height: 16,
        borderRadius: 99, borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleInside: {
        width: 11, height: 11,
        borderRadius: 99, borderWidth: 1
    }
})