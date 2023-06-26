import { Images } from "@assets"
import { LotteryType } from "@common"
import { Color } from "@styles"

export function doNotExits(param: any) {
    if (param == "" || param == undefined || param == null) return true
    else return false
}

export function getColorLott(params: LotteryType) {
    switch (params) {
        case LotteryType.Power:
            return Color.power
        case LotteryType.Mega:
            return Color.mega
        case LotteryType.Keno:
            return Color.keno
        case LotteryType.Max3D:
            return Color.max3d
        case LotteryType.Max3DPlus:
            return Color.max3d
        case LotteryType.Max3DPro:
            return Color.max3dpro
        default:
            return Color.power
    }
}

export function getBallLott(params: LotteryType) {
    switch (params) {
        case LotteryType.Power:
            return Images.ball_power
        case LotteryType.Mega:
            return Images.ball_mega
        case LotteryType.Keno:
            return Images.ball_keno
        case LotteryType.Max3D:
            return Images.ball_max3d
        case LotteryType.Max3DPlus:
            return Images.ball_max3d
        case LotteryType.Max3DPro:
            return Images.ball_3dpro
        default:
            return Color.power
    }
}

export function getSplitCharater(param: LotteryType) {
    switch (param) {
        case LotteryType.Max3D:
        case LotteryType.Max3DPlus:
        case LotteryType.Max3DPro:
            return " "
        default: return "-"
    }
}

export function isVietnamesePhoneNumber(number?: string) {
    if (!number) return false
    return /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/.test(number);
  }