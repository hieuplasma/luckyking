import { INumberDetail, LotteryType, NumberDetail } from "@common";
import { getLevelFromNumberKeno, kenoAnalysis } from "./lottery-utils";

const MUOI_NGHIN = 10000
const TRIEU = 1000000
const TY = 1000000000

function isString(element: any) {
    return typeof element === 'string';
}

enum BasicPrize {
    SPECIAL = "Giải đặc biệt",
    SUB_SPECIAL = "Giải phụ đặc biệt",
    FIRST = "Giải nhất",
    SECOND = "Giải nhì",
    THIRD = "Giải ba",
    FOURTH = "Giải tư",
    FIVETH = "Giải năm",
    SIXTH = "Giải sáu",
    SEVENTH = "Giải bảy"
}


function printDetailKeno(level: number, duplicate: number) {
    if (level <= 10) return `Bậc ${level} - trùng ${duplicate} số`
    switch (level) {
        case 11: return 'Lớn'
        case 12: return 'Nhỏ'
        case 13: return 'Chẵn 13+'
        case 14: return 'Lẻ 13+'
        case 15: return 'Hoà lớn nhỏ'
        case 16: return 'Hoà (chẵn lẻ)'
        case 17: return 'Chẵn (11-12)'
        case 18: return 'Lẻ (11-12)'
        default: return `Bậc ${level} - trùng ${duplicate} số`
    }
}

function printDetailMega(level: number, duplicate: number) {
    if (level != 6) return `Bao ${level} - trùng ${duplicate} số`
    switch (duplicate) {
        case 3: return 'Giải ba'
        case 4: return 'Giải nhì'
        case 5: return 'Giải nhất'
        case 6: return 'Giải đặc biệt'
        default: return `Bao ${level} - trùng ${duplicate} số`
    }
}

function printDetailPower(level: number, duplicate: number, bonus: boolean) {
    if (level != 6) return `Bao ${level} - trùng ${duplicate + (bonus ? 1 : 0)} số`
    if (bonus) {
        if (duplicate == 5) return "Giải phụ đặc biệt"
    }
    switch (duplicate) {
        case 3: return 'Giải ba'
        case 4: return 'Giải nhì'
        case 5: return 'Giải nhất'
        case 6: return 'Giải đặc biệt'
        default: return `Bao ${level} - trùng ${duplicate} số`
    }
}

export function caculateLotteryBenefits(lottery: any, drawResult: any) {
    switch (lottery.type) {
        case LotteryType.Keno: return caculateKenoBenefits(lottery, drawResult)
        case LotteryType.Mega: return caculateMegaBenefits(lottery, drawResult)
        case LotteryType.Power: return caculatePowerBenefits(lottery, drawResult)
        case LotteryType.Max3D: return caculateMax3dBenefits(lottery, drawResult)
        case LotteryType.Max3DPlus: return caculateMax3PlusdBenefits(lottery, drawResult)
        case LotteryType.Max3DPro: return caculateMax3dProBenefits(lottery, drawResult)
        default: return {
            totalBenefits: 0,
            detailBenefits: []
        }
    }
}

function caculateKenoBenefits(lottery: any, drawResult: any) {
    let { result } = drawResult;
    const resultSplit: number[] = result.split("-").map(Number)
    let totalBenefits = 0;
    let detailBenefits: any = []
    const numberDetail = lottery.NumberLottery.numberDetail as INumberDetail[]
    numberDetail.map((item: any, index: number) => {
        let benefits = 0
        let numbers: number[] = []
        if (isString(item.boSo)) numbers = item.boSo.split("-").map(Number)
        else numbers = item.boSo
        let level = numbers.length
        if (item.bac) level = item.bac
        if (numbers[0] > 80) {
            level = getLevelFromNumberKeno(numbers[0], level)
        }
        let duplicate = 0;
        numbers.map(number => {
            if (resultSplit.includes(number)) duplicate++
        })
        const analysis = kenoAnalysis(resultSplit)
        switch (level) {
            case 1:
                if (duplicate == 1) benefits = benefits + 2 * MUOI_NGHIN
                break;
            case 2:
                if (duplicate == 2) benefits = benefits + 9 * MUOI_NGHIN
                break;
            case 3:
                if (duplicate == 3) benefits = benefits + 20 * MUOI_NGHIN
                if (duplicate == 2) benefits = benefits + 2 * MUOI_NGHIN
                break;
            case 4:
                if (duplicate == 4) benefits = benefits + 40 * MUOI_NGHIN
                if (duplicate == 3) benefits = benefits + 5 * MUOI_NGHIN
                if (duplicate == 2) benefits = benefits + MUOI_NGHIN
                break
            case 5:
                if (duplicate == 5) benefits = benefits + 4 * TRIEU + 40 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 15 * MUOI_NGHIN
                if (duplicate == 3) benefits = benefits + MUOI_NGHIN
                break;
            case 6:
                if (duplicate == 6) benefits = benefits + 12 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 45 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 4 * MUOI_NGHIN
                if (duplicate == 3) benefits = benefits + MUOI_NGHIN
                break;
            case 7:
                if (duplicate == 7) benefits = benefits + 40 * TRIEU
                if (duplicate == 6) benefits = benefits + TRIEU + 20 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 10 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 2 * MUOI_NGHIN
                if (duplicate == 3) benefits = benefits + MUOI_NGHIN
                break;
            case 8:
                if (duplicate == 8) benefits = benefits + 200 * TRIEU
                if (duplicate == 7) benefits = benefits + 5 * TRIEU
                if (duplicate == 6) benefits = benefits + 50 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 5 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + MUOI_NGHIN
                break;
            case 9:
                if (duplicate == 9) benefits = benefits + 800 * TRIEU
                if (duplicate == 8) benefits = benefits + 12 * TRIEU
                if (duplicate == 7) benefits = benefits + TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + 5 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 3 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + MUOI_NGHIN
                if (duplicate == 0) benefits = benefits + MUOI_NGHIN
                break;
            case 10:
                if (duplicate == 10) benefits = benefits + 2 * TY
                if (duplicate == 9) benefits = benefits + 150 * TRIEU
                if (duplicate == 8) benefits = benefits + 8 * TRIEU
                if (duplicate == 7) benefits = benefits + 71 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + 8 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 2 * MUOI_NGHIN
                if (duplicate == 0) benefits = benefits + MUOI_NGHIN
                break;
            case 11:
                // Lớn
                if (analysis.big == 11 || analysis.big == 12) benefits = benefits + MUOI_NGHIN
                if (analysis.big >= 13) benefits = benefits + 2.6 * MUOI_NGHIN
                break;
            case 12:
                // Nhỏ
                if (analysis.small == 11 || analysis.small == 12) benefits = benefits + MUOI_NGHIN
                if (analysis.small >= 13) benefits = benefits + 2.6 * MUOI_NGHIN
                break;
            case 13:
                // Chẵn 13+
                if (analysis.even == 13 || analysis.even == 14) benefits = benefits + 4 * MUOI_NGHIN
                if (analysis.even >= 15) benefits = benefits + 20 * MUOI_NGHIN
                break;
            case 14:
                // Lẻ 13+
                if (analysis.odd == 13 || analysis.odd == 14) benefits = benefits + 4 * MUOI_NGHIN
                if (analysis.odd >= 15) benefits = benefits + 20 * MUOI_NGHIN
                break;
            case 15:
                // Hoà Lớn Nhỏ
                if (analysis.small == 10) benefits = benefits + 2.6 * MUOI_NGHIN
                break;
            case 16:
                // Hoà Chẵn Lẻ
                if (analysis.odd == 10) benefits = benefits + 2 * MUOI_NGHIN
                break;
            case 17:
                //  Chẵn 11-12
                if (analysis.even == 11 || analysis.even == 12) benefits = benefits + 2 * MUOI_NGHIN
                break;
            case 18:
                //  Lẻ 11-12
                if (analysis.odd == 11 || analysis.odd == 12) benefits = benefits + 2 * MUOI_NGHIN
                break;
            default:
                break;
        }
        let tmp = Math.floor(parseInt(item.tienCuoc.toString()) / 10000) * benefits
        totalBenefits = totalBenefits + tmp
        if (benefits > 0) {
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: printDetailKeno(level, duplicate),
                benefits: benefits
            })
        }
    })
    return { totalBenefits, detailBenefits }
}

function caculateMegaBenefits(lottery: any, drawResult: any) {
    const { result, jackPot } = drawResult
    const resultSplit: number[] = result.split("-").map(Number)
    let totalBenefits = 0;
    let detailBenefits: any = []
    const numberDetail = lottery.NumberLottery.numberDetail as INumberDetail[]
    const level = lottery.NumberLottery.level
    numberDetail.map((item: any, index: number) => {
        let benefits = 0
        const numbers: number[] = item.boSo.split("-").map(Number);
        let duplicate = 0;
        numbers.map(number => {
            if (resultSplit.includes(number)) duplicate++
        })
        switch (level) {
            case 5:
                if (duplicate == 2) benefits = benefits + 12 * MUOI_NGHIN
                if (duplicate == 3) benefits = benefits + 2 * TRIEU + MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 31 * TRIEU + 4 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + jackPot + 390 * TRIEU
                break;
            case 6:
                if (duplicate == 3) benefits = benefits + 3 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 30 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 10 * TRIEU
                if (duplicate == 6) benefits = benefits + jackPot
                break;
            case 7:
                if (duplicate == 3) benefits = benefits + 12 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + TRIEU + 2 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 21 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + jackPot + 60 * TRIEU
                break;
            case 8:
                if (duplicate == 3) benefits = benefits + 30 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 2 * TRIEU + 28 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 34 * TRIEU + 80 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + jackPot + 124 * TRIEU + 50 * MUOI_NGHIN
                break
            case 9:
                if (duplicate == 3) benefits = benefits + 60 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 4 * TRIEU + 20 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 50 * TRIEU + 20 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + jackPot + 194 * TRIEU + 10 * MUOI_NGHIN
                break;
            case 10:
                if (duplicate == 3) benefits = benefits + TRIEU + 5 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 6 * TRIEU + 90 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 68 * TRIEU
                if (duplicate == 6) benefits = benefits + jackPot + 269 * TRIEU + 40 * MUOI_NGHIN
                break;
            case 11:
                if (duplicate == 3) benefits = benefits + TRIEU + 68 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 10 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 88 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + jackPot + 351 * TRIEU
                break;
            case 12:
                if (duplicate == 3) benefits = benefits + 2 * TRIEU + 52 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 15 * TRIEU + 12 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 112 * TRIEU
                if (duplicate == 6) benefits = benefits + jackPot + 439 * TRIEU + 50 * MUOI_NGHIN
                break;
            case 13:
                if (duplicate == 3) benefits = benefits + 3 * TRIEU + 60 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 20 * TRIEU + 88 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 138 * TRIEU + 80 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + jackPot + 535 * TRIEU + 50 * MUOI_NGHIN
                break;
            case 14:
                if (duplicate == 3) benefits = benefits + 4 * TRIEU + 95 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 27 * TRIEU + 90 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 169 * TRIEU + 20 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + jackPot + 639 * TRIEU + 60 * MUOI_NGHIN
                break;
            case 15:
                if (duplicate == 3) benefits = benefits + 6 * TRIEU + 60 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 36 * TRIEU + 30 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 203 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + jackPot + 752 * TRIEU + 40 * MUOI_NGHIN
                break;
            case 18:
                if (duplicate == 3) benefits = benefits + 13 * TRIEU + 65 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 70 * TRIEU + 98 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 332 * TRIEU + 80 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + jackPot + 1149 * TRIEU
                break;
            default:
                break;
        }
        // let tmp = Math.floor(parseInt(item.tienCuocCuoc.toString()) / 10000) * benefits
        totalBenefits = totalBenefits + benefits
        if (benefits > 0) {
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: printDetailMega(level, duplicate),
                benefits: benefits
            })
        }
    })
    return { totalBenefits, detailBenefits }
}

function caculatePowerBenefits(lottery: any, drawResult: any) {
    const { result, specialNumber, jackpot1, jackpot2 } = drawResult
    const resultSplit: number[] = result.split("-").map(Number)
    let detailBenefits: any = []
    let totalBenefits = 0;
    const numberDetail = lottery.NumberLottery.numberDetail as INumberDetail[]
    const level = lottery.NumberLottery.level
    numberDetail.map((item: any, index: number) => {
        let benefits = 0
        const numbers: number[] = item.boSo.split("-").map(Number);
        let duplicate = 0;
        let bonus = false
        numbers.map(number => {
            if (resultSplit.includes(number)) duplicate++
            if (specialNumber == number) bonus = true
        })
        if (bonus) {
            switch (level) {
                case 5:
                    if (duplicate == 4) benefits = benefits + 2 * jackpot2 + 24 * TRIEU
                    break;
                case 6:
                    if (duplicate == 5) benefits = benefits + jackpot2
                    break;
                case 7:
                    if (duplicate == 5) benefits = benefits + jackpot2 + 42 * TRIEU + 50 * MUOI_NGHIN
                    if (duplicate == 6) benefits = benefits + jackpot1 + jackpot2
                    break;
                case 8:
                    if (duplicate == 5) benefits = benefits + jackpot2 + 88 * TRIEU
                    if (duplicate == 6) benefits = benefits + jackpot1 + jackpot2 + 247 * TRIEU + 50 * MUOI_NGHIN
                    break
                case 9:
                    if (duplicate == 5) benefits = benefits + jackpot2 + 137 * TRIEU
                    if (duplicate == 6) benefits = benefits + jackpot1 + jackpot2 + 503 * TRIEU + 50 * MUOI_NGHIN
                    break;
                case 10:
                    if (duplicate == 5) benefits = benefits + jackpot2 + 190 * TRIEU
                    if (duplicate == 6) benefits = benefits + jackpot1 + jackpot2 + 769 * TRIEU
                    break;
                case 11:
                    if (duplicate == 5) benefits = benefits + jackpot2 + 247 * TRIEU + 50 * MUOI_NGHIN
                    if (duplicate == 6) benefits = benefits + jackpot1 + jackpot2 + 1040 * TRIEU
                    break;
                case 12:
                    if (duplicate == 5) benefits = benefits + jackpot2 + 310 * TRIEU
                    if (duplicate == 6) benefits = benefits + jackpot1 + jackpot2 + 1330 * TRIEU
                    break;
                case 13:
                    if (duplicate == 5) benefits = benefits + jackpot2 + 378 * TRIEU
                    if (duplicate == 6) benefits = benefits + jackpot1 + jackpot2 + 1630 * TRIEU
                    break;
                case 14:
                    if (duplicate == 5) benefits = benefits + jackpot2 + 452 * TRIEU
                    if (duplicate == 6) benefits = benefits + jackpot1 + jackpot2 + 1940 * TRIEU
                    break;
                case 15:
                    if (duplicate == 5) benefits = benefits + jackpot2 + 532 * TRIEU + 50 * MUOI_NGHIN
                    if (duplicate == 6) benefits = benefits + jackpot1 + jackpot2 + 2270 * TRIEU
                    break;
                case 18:
                    if (duplicate == 5) benefits = benefits + jackpot2 + 818 * TRIEU
                    if (duplicate == 6) benefits = benefits + jackpot1 + jackpot2 + 3350 * TRIEU
                    break;
                default:
                    break;
            }
        }
        else switch (level) {
            case 5:
                if (duplicate == 2) benefits = benefits + 20 * MUOI_NGHIN
                if (duplicate == 3) benefits = benefits + 3 * TRIEU + 85 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 104 * TRIEU
                if (duplicate == 5) benefits = benefits + jackpot1 + jackpot2 + 1920 * TRIEU
                break;
            case 6:
                if (duplicate == 3) benefits = benefits + 5 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 50 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 40 * TRIEU
                if (duplicate == 6) benefits = benefits + jackpot1
                break;
            case 7:
                if (duplicate == 3) benefits = benefits + 20 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + TRIEU + 70 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 82 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + jackpot1 + 240 * TRIEU
                break;
            case 8:
                if (duplicate == 3) benefits = benefits + 50 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 3 * TRIEU + 80 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 128 * TRIEU
                if (duplicate == 6) benefits = benefits + jackpot1 + 487 * TRIEU + 50 * MUOI_NGHIN
                break
            case 9:
                if (duplicate == 3) benefits = benefits + 100 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 7 * TRIEU
                if (duplicate == 5) benefits = benefits + 177 * TRIEU
                if (duplicate == 6) benefits = benefits + jackpot1 + 743 * TRIEU + 50 * MUOI_NGHIN
                break;
            case 10:
                if (duplicate == 3) benefits = benefits + TRIEU + 75 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 11 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 230 * TRIEU
                if (duplicate == 6) benefits = benefits + jackpot1 + 1000 * TRIEU
                break;
            case 11:
                if (duplicate == 3) benefits = benefits + 2 * TRIEU + 80 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 17 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 287 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + jackpot1 + 1280 * TRIEU
                break;
            case 12:
                if (duplicate == 3) benefits = benefits + 4 * TRIEU + 20 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 25 * TRIEU + 20 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 350 * TRIEU
                if (duplicate == 6) benefits = benefits + jackpot1 + 1570 * TRIEU
                break;
            case 13:
                if (duplicate == 3) benefits = benefits + 6 * TRIEU
                if (duplicate == 4) benefits = benefits + 34 * TRIEU + 80 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 418 * TRIEU
                if (duplicate == 6) benefits = benefits + jackpot1 + 1870 * TRIEU
                break;
            case 14:
                if (duplicate == 3) benefits = benefits + 8 * TRIEU + 25 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 46 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 492 * TRIEU
                if (duplicate == 6) benefits = benefits + jackpot1 + 2180 * TRIEU
                break;
            case 15:
                if (duplicate == 3) benefits = benefits + 11 * TRIEU
                if (duplicate == 4) benefits = benefits + 60 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 572 * TRIEU + 50 * MUOI_NGHIN
                if (duplicate == 6) benefits = benefits + jackpot1 + 2510 * TRIEU
                break;
            case 18:
                if (duplicate == 3) benefits = benefits + 22 * TRIEU + 75 * MUOI_NGHIN
                if (duplicate == 4) benefits = benefits + 118 * TRIEU + 30 * MUOI_NGHIN
                if (duplicate == 5) benefits = benefits + 858 * TRIEU
                if (duplicate == 6) benefits = benefits + jackpot1 + 3590 * TRIEU
                break;
            default:
                break;
        }
        // let tmp = Math.floor(parseInt(item.tienCuocCuoc.toString()) / 10000) * benefits
        totalBenefits = totalBenefits + benefits
        if (benefits > 0) {
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: printDetailPower(level, duplicate, bonus),
                benefits: benefits
            })
        }
    })
    return { totalBenefits, detailBenefits }
}

function caculateMax3dBenefits(lottery: any, result: any) {
    const { special, first, second, third } = result
    let totalBenefits = 0;
    let detailBenefits: any = []
    const numberDetail = lottery.NumberLottery.numberDetail as INumberDetail[]
    numberDetail.map((item: any, index: number) => {
        let benefits = 0
        const coefficient = Math.floor(parseInt(item.tienCuoc.toString()) / 10000)
        if (special.includes(item.boSo)) {
            benefits = benefits + TRIEU
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.SPECIAL,
                benefits: TRIEU * coefficient
            })
        }
        if (first.includes(item.boSo)) {
            benefits = benefits + 35 * MUOI_NGHIN
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.FIRST,
                benefits: 35 * MUOI_NGHIN * coefficient
            })
        }
        if (second.includes(item.boSo)) {
            benefits = benefits + 21 * MUOI_NGHIN
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.SECOND,
                benefits: 21 * MUOI_NGHIN * coefficient
            })
        }
        if (third.includes(item.boSo)) {
            benefits = benefits + 10 * MUOI_NGHIN
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.THIRD,
                benefits: 10 * MUOI_NGHIN * coefficient
            })
        }
        let tmp = coefficient * benefits
        totalBenefits = totalBenefits + tmp
    })
    return { totalBenefits, detailBenefits }
}

function caculateMax3PlusdBenefits(lottery: any, result: any) {
    const { special, first, second, third } = result
    let totalBenefits = 0;
    let detailBenefits: any = []
    const numberDetail = lottery.NumberLottery.numberDetail as INumberDetail[]
    numberDetail.map((item: any, index: number) => {
        let benefits = 0
        const coefficient = Math.floor(parseInt(item.tienCuoc.toString()) / 10000)
        const numbers: string[] = item.boSo.split(" ")
        const number1 = numbers[0]
        const number2 = numbers[1]
        let duplicateSpecial = 0, duplicate1 = 0, duplicate2 = 0, duplicate3 = 0;

        if (special.includes(number1)) duplicateSpecial++; if (special.includes(number2)) duplicateSpecial++;
        if (first.includes(number1)) duplicate1++; if (first.includes(number2)) duplicate1++;
        if (second.includes(number1)) duplicate2++; if (second.includes(number2)) duplicate2++;
        if (third.includes(number1)) duplicate3++; if (third.includes(number2)) duplicate3++;

        if (duplicateSpecial == 2) {
            benefits = benefits + TY;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.SPECIAL,
                benefits: TY * coefficient
            })
        }
        if (duplicate1 == 2) {
            benefits = benefits + 40 * TRIEU;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.FIRST,
                benefits: 40 * TRIEU * coefficient
            })
        }
        if (duplicate2 == 2) {
            benefits = benefits + 10 * TRIEU;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.SECOND,
                benefits: 10 * TRIEU * coefficient
            })
        }
        if (duplicate3 == 2) {
            benefits = benefits + 5 * TRIEU;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.THIRD,
                benefits: 5 * TRIEU * coefficient
            })
        }
        if ((duplicateSpecial + duplicate1 + duplicate2 + duplicate3) >= 2) {
            benefits = benefits + TRIEU;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.FOURTH,
                benefits: TRIEU * coefficient
            })
        }
        if (duplicateSpecial == 1) {
            benefits = benefits + 15 * MUOI_NGHIN;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.FIVETH,
                benefits: 15 * MUOI_NGHIN * coefficient
            })
        }
        if ((duplicate1 + duplicate2 + duplicate3) == 1) {
            benefits = benefits + 4 * MUOI_NGHIN;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.SIXTH,
                benefits: 4 * MUOI_NGHIN * coefficient
            })
        }

        let tmp = coefficient * benefits
        totalBenefits = totalBenefits + tmp
    })
    return { totalBenefits, detailBenefits }
}


function caculateMax3dProBenefits(lottery: any, result: any) {
    const { special, first, second, third } = result
    let totalBenefits = 0;
    let detailBenefits: any = []
    const numberDetail: NumberDetail[] = lottery.NumberLottery.numberDetail

    if (lottery.NumberLottery.level == 10) {
        return multibagMax3dPro(lottery, result)
    }
    numberDetail.map((item: any, index: number) => {
        let benefits = 0
        const coefficient = Math.floor(parseInt(item.tienCuoc.toString()) / 10000)
        const numbers: string[] = item.boSo.split(" ")
        const number1 = numbers[0]
        const number2 = numbers[1]
        let duplicateSpecial = 0, duplicate1 = 0, duplicate2 = 0, duplicate3 = 0;

        if (number1 == special[0] && number2 == special[1]) duplicateSpecial = 3
        if (special.includes(number1)) duplicateSpecial++; if (special.includes(number2)) duplicateSpecial++;
        if (first.includes(number1)) duplicate1++; if (first.includes(number2)) duplicate1++;
        if (second.includes(number1)) duplicate2++; if (second.includes(number2)) duplicate2++;
        if (third.includes(number1)) duplicate3++; if (third.includes(number2)) duplicate3++;

        if (number1 == special[0] && number2 == special[1]) duplicateSpecial = 3

        if (duplicateSpecial == 3) {
            benefits = benefits + 2 * TY;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.SPECIAL,
                benefits: 2 * TY * coefficient
            })
        }
        if (duplicateSpecial == 2) {
            benefits = benefits + 400 * TRIEU;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.SUB_SPECIAL,
                benefits: 400 * TRIEU * coefficient
            })
        }
        if (duplicate1 == 2) {
            benefits = benefits + 30 * TRIEU;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.FIRST,
                benefits: 30 * TRIEU * coefficient
            })
        }
        if (duplicate2 == 2) {
            benefits = benefits + 10 * TRIEU;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.SECOND,
                benefits: 10 * TRIEU * coefficient
            })
        }
        if (duplicate3 == 2) {
            benefits = benefits + 4 * TRIEU;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.THIRD,
                benefits: 4 * TRIEU * coefficient
            })
        }
        if ((duplicateSpecial + duplicate1 + duplicate2 + duplicate3) >= 2) {
            benefits = benefits + TRIEU;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.FOURTH,
                benefits: TRIEU * coefficient
            })
        }
        if (duplicateSpecial == 1) {
            benefits = benefits + 10 * MUOI_NGHIN;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.FIVETH,
                benefits: 10 * MUOI_NGHIN * coefficient
            })
        }
        if ((duplicate1 + duplicate2 + duplicate3) == 1) {
            benefits = benefits + 4 * MUOI_NGHIN;
            detailBenefits.push({
                row: String.fromCharCode(65 + index),
                detail: BasicPrize.SIXTH,
                benefits: 4 * MUOI_NGHIN * coefficient
            })
        }

        let tmp = Math.floor(parseInt(item.tienCuoc.toString()) / 10000) * benefits
        totalBenefits = totalBenefits + tmp
    })
    return { totalBenefits, detailBenefits }
}

function multibagMax3dPro(lottery: any, result: any) {
    const { special, first, second, third } = result
    let totalBenefits = 0;
    let detailBenefits: any = []
    const numberDetail: NumberDetail[] = lottery.NumberLottery.numberDetail
    numberDetail.map((item: any, index: number) => {
        const numbers: string[] = item.boSo.split(" ")
        const coefficient = Math.floor(parseInt(item.tienCuoc.toString()) / (MUOI_NGHIN * numbers.length * (numbers.length - 1)))
        let benefits = 0
        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                const number1 = numbers[i]
                const number2 = numbers[j]
                let duplicateSpecial = 0, duplicate1 = 0, duplicate2 = 0, duplicate3 = 0;

                if (number1 == special[0] && number2 == special[1]) duplicateSpecial = 3
                if (special.includes(number1)) duplicateSpecial++; if (special.includes(number2)) duplicateSpecial++;
                if (first.includes(number1)) duplicate1++; if (first.includes(number2)) duplicate1++;
                if (second.includes(number1)) duplicate2++; if (second.includes(number2)) duplicate2++;
                if (third.includes(number1)) duplicate3++; if (third.includes(number2)) duplicate3++;

                if (number1 == special[0] && number2 == special[1]) duplicateSpecial = 3

                if (duplicateSpecial == 3) {
                    benefits = benefits + 2 * TY;
                    detailBenefits.push({
                        row: String.fromCharCode(65 + index),
                        detail: BasicPrize.SPECIAL,
                        benefits: 2 * TY * coefficient
                    })
                }
                if (duplicateSpecial == 2) {
                    benefits = benefits + 400 * TRIEU;
                    detailBenefits.push({
                        row: String.fromCharCode(65 + index),
                        detail: BasicPrize.SUB_SPECIAL,
                        benefits: 400 * TRIEU * coefficient
                    })
                }
                if (duplicate1 == 2) {
                    benefits = benefits + 30 * TRIEU;
                    detailBenefits.push({
                        row: String.fromCharCode(65 + index),
                        detail: BasicPrize.FIRST,
                        benefits: 30 * TRIEU * coefficient
                    })
                }
                if (duplicate2 == 2) {
                    benefits = benefits + 10 * TRIEU;
                    detailBenefits.push({
                        row: String.fromCharCode(65 + index),
                        detail: BasicPrize.SECOND,
                        benefits: 10 * TRIEU * coefficient
                    })
                }
                if (duplicate3 == 2) {
                    benefits = benefits + 4 * TRIEU;
                    detailBenefits.push({
                        row: String.fromCharCode(65 + index),
                        detail: BasicPrize.THIRD,
                        benefits: 4 * TRIEU * coefficient
                    })
                }
                if ((duplicateSpecial + duplicate1 + duplicate2 + duplicate3) >= 2) {
                    benefits = benefits + TRIEU;
                    detailBenefits.push({
                        row: String.fromCharCode(65 + index),
                        detail: BasicPrize.FOURTH,
                        benefits: TRIEU * coefficient
                    })
                }
                if (duplicateSpecial == 1) {
                    benefits = benefits + 10 * MUOI_NGHIN;
                    detailBenefits.push({
                        row: String.fromCharCode(65 + index),
                        detail: BasicPrize.FIVETH,
                        benefits: 10 * MUOI_NGHIN * coefficient
                    })
                }
                if ((duplicate1 + duplicate2 + duplicate3) == 1) {
                    benefits = benefits + 4 * MUOI_NGHIN;
                    detailBenefits.push({
                        row: String.fromCharCode(65 + index),
                        detail: BasicPrize.SIXTH,
                        benefits: 4 * MUOI_NGHIN * coefficient
                    })
                }

                let tmp = coefficient * benefits
                totalBenefits = totalBenefits + tmp
            }
        }
    })
    return { totalBenefits, detailBenefits }
}


export function serializeBigInt(obj: any) {
    const returned = JSON.stringify(
        obj,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    )
    return returned
}
