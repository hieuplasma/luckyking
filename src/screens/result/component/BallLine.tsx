import { LotteryType } from "@common";
import { Color } from "@styles";
import { getColorLott } from "@utils";
import React from "react";
import { View } from "react-native";

interface BallLineProps {
    type: LotteryType,
    count: number,
    bonus?: boolean
}
export const BallLine = React.memo(({ type, count, bonus }: BallLineProps) => {

    const lottColor = getColorLott(type)
    const arr = Array.from({ length: count }, (_, index) => index + 1);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', width: 80 }}>
            {
                arr.map((it) => {
                    return (
                        <View
                            style={{
                                width: 10, height: 10,
                                marginHorizontal: 1,
                                borderRadius: 99, backgroundColor: lottColor
                            }}
                            key={it}>
                        </View>
                    )
                })
            }
            {
                bonus ?
                    <View
                        style={{
                            width: 10, height: 10,
                            marginHorizontal: 1,
                            borderRadius: 99, backgroundColor: Color.luckyKing
                        }}
                    >
                    </View> : <></>
            }
        </View>
    )
})