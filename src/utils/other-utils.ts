import { Images } from "@assets"
import { LotteryType, PASSWORD_MAX, PASSWORD_MIN, ZALO_LINK } from "@common"
import { Color } from "@styles"
import { Alert, Linking, Platform } from "react-native"

export function doNotExits(param: any) {
    if (param == undefined || param == null) return true
    const tmp = param.toString().trim()
    if (tmp == "") return true
    else return false
}

export function hasWhiteSpace(s: string) {
    return /\s/g.test(s);
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

const start = ["84", "0084", "+84"]
export function normalizePhoneNumber(number?: string) {
    if (!number) return number
    let digitsOnly = number.trim()
    for (const element of start) {
        if (digitsOnly.startsWith(element)) {
            digitsOnly = digitsOnly.replace(element, '0');
            break;
        }
    }
    console.log("digitsOnly", digitsOnly)
    return digitsOnly
}

export function isValidPassword(param?: string) {
    if (!param) return false
    const password = param.trim()

    if (hasWhiteSpace(password)) return false
    // var disallowedChars = /[~`!@#$%^&*()\-_=+[{\]}\\|:;"'<,>.?/]/;
    // if (disallowedChars.test(password)) return false

    if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) return false

    return true
}

export function checkIdentify(val: string) {
    if (val.trim().length != 12 && val.trim().length != 9) return false;
    if (!/^\d+$/.test(val.trim())) return false;
    return true;
}

export function nextBet(currentBet: number) {
    switch (currentBet) {
        case 10000: return 20000
        case 20000: return 50000
        case 50000: return 100000
        case 100000: return 200000
        case 200000: return 300000
        default: return currentBet
    }
}

export function previousBet(currentBet: number) {
    switch (currentBet) {
        case 20000: return 10000
        case 50000: return 20000
        case 100000: return 50000
        case 200000: return 100000
        case 300000: return 200000
        default: return currentBet
    }
}

export function openZalo() {
    const url = ZALO_LINK
    if (Platform.OS !== 'android') {
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Thông báo', 'Tài khoản Zalo của chúng tôi hiện đang bảo trì!');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch(err => console.log(err));
    }
    else Linking.openURL(url);
    Linking.openURL(url);
}