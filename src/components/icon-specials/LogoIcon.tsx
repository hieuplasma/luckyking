import { Image, Images } from "@assets"
import { LotteryType } from "@common"
import React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { ImageStyle } from "react-native-fast-image"

interface LogoIconProps {
    type: keyof LotteryType,
    style?: ImageStyle
}

export const LogoIcon = React.memo(({ type, style }: LogoIconProps) => {

    let sourceImage = Images.power_logo
    let styleBase = styles.power

    switch (type) {
        case LotteryType.Power:
            sourceImage = Images.power_logo
            styleBase = styles.power
            break;
        case LotteryType.Mega:
            sourceImage = Images.mega_logo
            styleBase = styles.mega
            break;
        default:
            break;
    }

    return (
        <Image source={sourceImage} style={[styleBase, style ?? {}]}></Image>
    )
})

const styles = StyleSheet.create({
    power: { width: 89.76, height: 66, alignSelf: 'center' },
    mega: { width: 117.86, height: 66, alignSelf: 'center' },
})