import { API_URI } from "../config";

class LotteryApi {

    getScheduleKeno = async (params: any) => {
        let fullUrl = API_URI.GET_SCHEDULE_KENO;
        return await window.connection.GET(fullUrl, params)
    }
    
    getSchedulePower = async (params: any) => {
        let fullUrl = API_URI.GET_SCHEDULE_POWER;
        return await window.connection.GET(fullUrl, params)
    }

    getScheduleMega = async (params: any) => {
        let fullUrl = API_URI.GET_SCHEDULE_MEGA;
        return await window.connection.GET(fullUrl, params)
    }

    getScheduleMax3d = async (params: any) => {
        let fullUrl = API_URI.GET_SCHEDULE_MAX3D;
        return await window.connection.GET(fullUrl, params)
    }


    bookLotteryPowerMega = async (body: any) => {
        let fullUrl = API_URI.BOOK_LOTTERY_POWER_MEGA;
        return await window.connection.POST(fullUrl, body)
    }

    addPowerMegaToCart = async (body: any) => {
        let fullUrl = API_URI.ADD_POWER_MEGA_CART;
        return await window.connection.POST(fullUrl, body)
    }

    getListItemCart = async () => {
        let fullUrl = API_URI.GET_LIST_ITEM_CART;
        return await window.connection.GET(fullUrl)
    }

    deleteItemCart = async (body: any) => {
        let fullUrl = API_URI.DELETE_LOTTERY_CART;
        return await window.connection.POST(fullUrl, body)
    }

    deleteNumberLottery = async (body: any) => {
        let fullUrl = API_URI.DELETE_LOTTERY_NUMBER;
        return await window.connection.POST(fullUrl, body)
    }

    emptyCart = async (body: any) => {
        let fullUrl = API_URI.EMPTY_CART;
        return await window.connection.POST(fullUrl, body)
    }

    getTransactionHistory = async () => {
        let fullUrl = API_URI.TRANSACTION_HISTORY;
        return await window.connection.GET(fullUrl)
    }

    withdrawLuckyKing = async (body: any) => {
        let fullUrl = API_URI.WITHDRAW_TO_LUCKYKING;
        return await window.connection.POST(fullUrl, body)
    }
}

const lotteryApi = new LotteryApi
export default lotteryApi