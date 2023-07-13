export type INumberDetail = {
    boSo: string
    tienCuoc: number
}

export class NumberDetail {
    boSo: string = ""
    tienCuoc: number = 0
    tuChon: boolean | undefined = false
    constructor(boSo: string, tienCuoc: number, tuChon: boolean = false) {
        this.boSo = boSo
        this.tienCuoc = tienCuoc
        this.tuChon = tuChon
    }
}

export class LotteryNumber {
    list: NumberDetail[] = []
    constructor() {
        this.list = []
    }
   async add(obj: NumberDetail) {
       this.list.push(obj)
    }
    convertToJSon() {
        return JSON.stringify(this.list)
    }
}