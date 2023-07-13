import { EVEN_ODD, LotteryType, SMALL_BIG } from "@common";
import { dateConvert, dateTimeConvert, fullDateTimeConvert, getWeekDate } from "./time-utils";
import { Images } from "@assets";
import { doNotExits } from "./other-utils";

export function convolutions(a: number, b: number, lotteryType?: LotteryType) {
    let big = a, small = b
    if (b > a) { big = b; small = a }
    if (big == small) return 1
    if (big == 6 && small == 5 && lotteryType == LotteryType.Mega) return 40
    if (big == 6 && small == 5 && lotteryType == LotteryType.Power) return 50
    if (big == 7 && small == 6) return 7
    if (big == 8 && small == 6) return 28
    if (big == 9 && small == 6) return 84
    if (big == 10 && small == 6) return 210
    if (big == 11 && small == 6) return 462
    if (big == 12 && small == 6) return 924
    if (big == 13 && small == 6) return 1716
    if (big == 14 && small == 6) return 3003
    if (big == 15 && small == 6) return 5005
    if (big == 16 && small == 6) return 8008
    if (big == 17 && small == 6) return 12376
    if (big == 18 && small == 6) return 18564
    return 1
}

export function printMoney(param: any) {
    if (doNotExits(param)) return 'Invalid'
    let amount = parseInt(param.toString())
    //@ts-ignore
    return amount.toLocaleString().replaceAll(",", ".")
}

export function printMoneyK(param: any) {
    let amount = parseInt(param.toString()) / 1000
    //@ts-ignore
    return amount.toLocaleString().replaceAll(",", ".") + 'K'
}

export function printDrawCode(drawCode: any) {
    const code = parseInt(drawCode.toString())
    if (code < 1000) return "#00" + code
    return "#0" + code
}

export function printDraw(param: any) {
    const code = parseInt(param.drawCode.toString())
    const date = new Date(param.drawTime)
    if (code < 1000) return "#00" + code + " - " + dateConvert(date)
    if (code > 100000) return "#" + code + " - " + dateTimeConvert(date)
    return "#0" + code + " - " + dateConvert(date)
}

export function printDraw2(param: any) {
    const code = parseInt(param.drawCode.toString())
    const date = new Date(param.drawTime)
    return "#" + code.toString().padStart(7, "0") + " - " + fullDateTimeConvert(date)
}

export function printDrawWeekDate(param: any) {
    const code = parseInt(param.drawCode.toString())
    const date = new Date(param.drawTime)
    const weekDate = date.getDay()
    return "#" + code.toString().padStart(5, "0") + " - " + getWeekDate(weekDate) + " - " + dateConvert(date)
}


export function printNumber(number: any) {
    if (isNaN(number)) return 'TC'
    if (typeof number === 'string' && number.length == 3) return number
    if (number === false) return ""
    if (number < 10) return '0' + number
    return number
}

export function printDisplayId(number: any) {
    return "#" + number.toString().padStart(9, "0");
}

export function calSurcharge(cost: number) {
    return Math.floor(cost * 2 / 100)
}

export function printTypePlay(value: number, type: string) {
    switch (type) {
        case LotteryType.Power:
        case LotteryType.Mega:
            return PowerMegaType(value);
        case LotteryType.Max3D:
            return "Max 3D"
        case LotteryType.Max3DPlus:
            return "Max 3D+"
        case LotteryType.Max3DPro:
            return Max3dProType(value)
        default:
            return "Invalid type";
    }
}

function PowerMegaType(value: number) {
    return value === 6 ? "Cơ bản" : "Bao " + value;
}

function Max3dProType(value: number) {
    switch (value) {
        // case 4: return "Bao bộ 3 số";
        case 10: return "Bao nhiều bộ 3 số";
        default: return "Max 3D Pro";
    }
}

export function getLogoHeader(lotteryType: LotteryType) {
    let logo = { source: Images.power_logo, style: { height: 44.12, width: 60 } }
    switch (lotteryType) {
        case LotteryType.Power:
            logo = ({ source: Images.power_logo, style: { height: 44.12, width: 60 } })
            break;
        case LotteryType.Mega:
            logo = ({ source: Images.mega_logo, style: { height: 44, width: 78.57 } })
            break;
        case LotteryType.Max3D:
            logo = ({ source: Images.max3d_logo, style: { height: 82.79, width: 90 } })
            break;
        case LotteryType.Max3DPlus:
            logo = ({ source: Images.max3dplus_logo, style: { height: 44, width: 80 } })
            break;
        case LotteryType.Max3DPro:
            logo = ({ source: Images.max3dpro_logo, style: { height: 50, width: 75 } })
            break;
        default:
            break;
    }
    return logo
}

export function generateStrings(nums: number[], current = "") {
    if (current.length === 3) {
        return [current];
    } else {
        let result: string[] = [];
        for (let i = 0; i < nums.length; i++) {
            let temp = generateStrings(nums, current + nums[i].toString());
            result = [...result, ...temp];
        }
        return result;
    }
}

export function generateUniqueStrings(arr: number[]) {
    const results: string[] = [];

    const generatePermutations = (arr: number[], currentString: string, counts: number[], length: number, results: string[]) => {
        if (currentString.length === length) {
            results.push(currentString);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (counts[i] > 0) {
                counts[i]--;
                generatePermutations(arr, currentString + arr[i], counts, length, results);
                counts[i]++;
            }
        }
    };

    generatePermutations(arr, "", [1, 1, 1], 3, results);

    return results.filter(onlyUnique);
}

function onlyUnique(value: any, index: number, array: any[]) {
    return array.indexOf(value) === index;
}

export function generateStringsFromArray(arr: number[], before = "", after = "") {
    let result: string[] = [];
    function generateCombinations(prefix: any, remaining: any) {
        if (prefix.length === 3) {
            result.push(before + prefix + after);
        } else {
            for (let i = 0; i < remaining.length; i++) {
                generateCombinations(prefix + remaining[i], remaining);
            }
        }
    }
    generateCombinations("", arr);
    return result;
}

export async function taoChuoiTuToHopChap(arr: string[], m: number) {
    let results: string[] = [];

    async function backtrack(temp: any, start: number) {
        if (temp.length === m) {
            results.push(temp.join(' '));
            return;
        }
        for (let i = start; i < arr.length; i++) {
            temp.push(arr[i]);
            backtrack(temp, i + 1);
            temp.pop();
        }
    }

    await backtrack([], 0);
    return results;
}

export function kenoAnalysis(param: number[]) {
    let small = 0, big = 0, even = 0, odd = 0, small_big: SMALL_BIG = 'small', even_odd: EVEN_ODD = 'even'
    for (const element of param) {
        if (element <= 40) small++; else big++;
        if (element % 2 == 0) even++; else odd++;
    }

    let event_number: number[] = []

    if (big > 10) small_big = 'big'
    if (big == 10) small_big = 'draw'
    if (big < 10) small_big = 'small'

    if (odd > 12) even_odd = 'odd'
    if (odd == 11 || odd == 12) even_odd = 'odd_11_12'
    if (odd == 10) even_odd = 'draw'
    if (odd == 9 || odd == 8) even_odd = 'even_11_12'
    if (odd < 8) even_odd = 'even'

    switch (small_big) {
        case 'big':
            event_number.push(81)
            break;
        case 'small':
            event_number.push(82)
            break;
        case 'draw':
            event_number.push(83)
            break;
        default:
            break;
    }

    switch (even_odd) {
        case 'even':
            event_number.push(84)
            break;
        case 'draw':
            event_number.push(85)
            break;
        case 'odd':
            event_number.push(86)
            break;
        case 'even_11_12':
            event_number.push(87)
            break;
        case 'odd_11_12':
            event_number.push(88)
            break;
        default:
            break;
    }

    return { small, big, even, odd, small_big, even_odd, event_number }
}

const getData = {
    81: 'Lớn',
    82: 'Nhỏ',
    83: 'Hoà LN',
    84: 'Chẵn 13+',
    85: 'Hòa CL',
    86: 'Lẻ 13+',
    87: 'Chẵn 11-12',
    88: 'Lẻ 11-12'
}

export function getSpecialValueKeno(param: any) {
    //@ts-ignore
    return getData[`${param}`]
}

export function getLevelFromNumberKeno(param: number, oldLevel: number) {
    const number = parseInt(param.toString())
    switch (number) {
        case 81: return 11
        case 82: return 12
        case 84: return 13
        case 86: return 14
        case 83: return 15
        case 85: return 16
        case 87: return 17
        case 88: return 18
        default: return oldLevel
    }
}

export function getLotteryName(param: LotteryType) {
    switch (param) {
        case LotteryType.Keno: return "Keno"
        case LotteryType.Max3D: return "Max3D"
        case LotteryType.Max3DPlus: return "Max3D+"
        case LotteryType.Max3DPro: return "Max3D Pro"
        case LotteryType.Power: return "Power"
        case LotteryType.Mega: return "Mega"

    }
}
