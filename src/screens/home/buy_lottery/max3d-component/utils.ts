import { generateUniqueStrings } from "@utils"

const fullNumber = Array.from({ length: 10 }, (_, index) => index);

export function numberMax3d(number: any) {
    return number == "TC" ? "TC" : number < 10 ? number : "*"
}

export function generateMax3d(level: number, currentNumber: any, bets: number[], hugePosition: number) {
    let tmpGenerated: any = []
    let tmpBets: any = []
    switch (level) {
        case 1:
            currentNumber.map((item: any, index: number) => {
                if (item[0] !== false) {
                    tmpGenerated.push('' + item[0] + item[1] + item[2])
                    tmpBets.push(bets[index])
                }
            })
            break;
        case 2:
            currentNumber.map((item: any, index: number) => {
                if (item[0] !== false) {
                    const result = generateUniqueStrings(item)
                    tmpGenerated = tmpGenerated.concat(result)
                    tmpBets = tmpBets.concat(Array(result.length).fill(bets[index]))
                }
            })
            break;
        case 3:
            currentNumber.map((item: any, index: number) => {
                if (item[0] !== false && item[1] !== false) {
                    fullNumber.map(number => {
                        let tmp = [...item]
                        tmp[hugePosition] = number
                        tmpGenerated.push('' + tmp[0] + tmp[1] + tmp[2])
                    })
                    tmpBets = tmpBets.concat(Array(10).fill(bets[index]))
                }
            })
            break;
        default:
            break;
    }
    let total = 0
    tmpBets.map((item: number) => total = total + item)
    return {
        numberGenerated: tmpGenerated,
        betsGenerated: tmpBets,
        totalCost: total
    }
}

export function generateMax3DPlus(level: number, currentNumber: any, bets: number[], hugePosition: number[]) {
    let tmpGenerated: any = []
    let tmpBets: any = []
    switch (level) {
        case 1:
            currentNumber.map((item: any, index: number) => {
                if (item[0] !== false) {
                    tmpGenerated.push('' + item[0] + item[1] + item[2] + " " + item[3] + item[4] + item[5])
                    tmpBets.push(bets[index])
                }
            })
            break;
        case 2:
            currentNumber.map((item: any, index: number) => {
                if (item[0] !== false) {
                    const result = generateUniqueStrings(item.slice(0, 3)).map(it => it + " " + item[3] + item[4] + item[5])
                    tmpGenerated = tmpGenerated.concat(result)
                    tmpBets = tmpBets.concat(Array(result.length).fill(bets[index]))
                }
            })
            break;
        case 3:
            currentNumber.map((item: any, index: number) => {
                if (item[0] !== false) {
                    const result = generateUniqueStrings(item.slice(3, 6)).map(it => "" + item[0] + item[1] + item[2] + " " + it)
                    tmpGenerated = tmpGenerated.concat(result)
                    tmpBets = tmpBets.concat(Array(result.length).fill(bets[index]))
                    // console.log(tmpGenerated)
                }
            })
            break;
        case 4:
            currentNumber.map((item: any, index: number) => {
                if (item[0] !== false) {
                    const result2 = generateUniqueStrings(item.slice(3, 6))
                    const result = generateUniqueStrings(item.slice(0, 3)).map(it => {
                        for (let i = 0; i < result2.length; i++) {
                            tmpGenerated.push(it + " " + result2[i])
                            // tmpBets.push(bets[index])
                        }
                    })
                    tmpBets = tmpBets.concat(Array(result.length * result2.length).fill(bets[index]))
                }
            })
            break;
        case 5:
            currentNumber.map((item: any, index: number) => {
                if (item[0] !== false && item[1] !== false) {
                    fullNumber.map(number => {
                        let tmp = [...item]
                        if (hugePosition[0] > -1) tmp[hugePosition[0]] = number
                        if (hugePosition[1] > -1) tmp[hugePosition[1]] = number
                        tmpGenerated.push('' + tmp[0] + tmp[1] + tmp[2] + " " + tmp[3] + tmp[4] + tmp[5])
                    })
                    tmpBets = tmpBets.concat(Array(10).fill(bets[index]))
                }
            })
            break;
        case 6:
            currentNumber.map((item: any, index: number) => {
                if (item[0] !== false && item[1] !== false) {
                    fullNumber.map(number1 => {
                        fullNumber.map(number2 => {
                            let tmp = [...item]
                            tmp[hugePosition[0]] = number1
                            tmp[hugePosition[1]] = number2
                            tmpGenerated.push('' + tmp[0] + tmp[1] + tmp[2] + " " + tmp[3] + tmp[4] + tmp[5])
                        })
                    })
                    tmpBets = tmpBets.concat(Array(100).fill(bets[index]))
                }
            })
            break;
        default:
            break;
    }
    let total = 0
    tmpBets.map((item: number) => total = total + item)
    return {
        numberGenerated: tmpGenerated,
        betsGenerated: tmpBets,
        totalCost: total
    }
}