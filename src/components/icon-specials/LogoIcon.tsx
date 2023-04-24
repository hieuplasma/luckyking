import { Image, Images } from "@assets"
import { LotteryType } from "@common"
import React, { useCallback } from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { ImageStyle } from "react-native-fast-image"

interface LogoIconProps {
    type: LotteryType,
    style?: ImageStyle
}

export const LogoIcon = React.memo(({ type, style }: LogoIconProps) => {

    // let sourceImage = Images.power_logo
    // let styleBase = {}

    // switch (type) {
    //     case LotteryType.Power:
    //         sourceImage = Images.power_logo
    //         styleBase = styles.power
    //         break;
    //     case LotteryType.Mega:
    //         sourceImage = Images.mega_logo
    //         styleBase = styles.mega
    //         break;
    //     case LotteryType.Max3D:
    //         sourceImage = Images.max3d_logo
    //         styleBase = styles.max3d
    //         break;
    //     default:
    //         break;
    // }

    const source = useCallback(() => {
        switch (type) {
            case LotteryType.Power: return Images.power_logo
            case LotteryType.Mega: return Images.mega_logo
            case LotteryType.Max3D: return Images.max3d_logo
            case LotteryType.Max3DPlus: return Images.max3dplus_logo
            case LotteryType.Max3DPro: return Images.max3dpro_logo
            case LotteryType.Keno: return Images.keno_logo
            default: return Images.luckyking_logo
                break;
        }
    }, [type])

    return (
        // <Image source={sourceImage} style={[styleBase, style ?? {}]} resizeMode='contain'></Image>
        <Image source={source()} style={[styles.styleBase, style ? style : {}]} resizeMode='contain'></Image>
    )
})

const styles = StyleSheet.create({
    // power: { width: 89.76, height: 66, alignSelf: 'center' },
    // mega: { width: 117.86, height: 66, alignSelf: 'center' },
    // max3d: { height: 66 },
    styleBase: { height: 66 }
})