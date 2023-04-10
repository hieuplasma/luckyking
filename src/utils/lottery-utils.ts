import { LotteryType } from "@common";
import { dateConvert } from "./time-utils";

export function convolutions(a: number, b: number) {
    let big = a, small = b
    if (b > a) { big = b; small = a }
    if (big == small) return 1
    if (big == 6 && small == 5) return 6
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
    let amount = parseInt(param.toString())
    return amount.toLocaleString()
}

export function printMoneyK(param: any) {
    let amount = parseInt(param.toString()) / 1000
    return amount.toLocaleString() + 'K'
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
    return "#0" + code + " - " + dateConvert(date)
}

export function printNumber(number: any) {
    if (number === false) return ""
    if (number < 10) return '0' + number
    return number
}

export function calSurcharge(cost: number) {
    return Math.floor(cost * 2 / 100)
}

export function printTypePlay(value: number, type: string) {
    let result;
    switch (type) {
        case LotteryType.Power:
        case LotteryType.Mega:
            result = PowerMegaType(value);
            break;
        default:
            result = "Invalid type";
            break;
    }

    return result;
}

function PowerMegaType(value: number) {
    return value === 6 ? "Cơ bản" : "Bao " + value;
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

export function generateUniqueStrings(nums: number[], current = "", used = []) {
    if (current.length === 3) {
        return [current];
    } else {
        let result: string[] = [];
        for (let i = 0; i < nums.length; i++) {
            //@ts-ignore
            if (!used.includes(nums[i])) {
                let tempUsed = [...used, nums[i]];
                //@ts-ignore
                let temp = generateUniqueStrings(nums, current + nums[i].toString(), tempUsed);
                result = [...result, ...temp];
            }
        }
        return result;
    }
}