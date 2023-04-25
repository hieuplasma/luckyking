import { OrderStatus, TicketType } from "@common";
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

    // Order Lottery
    bookLotteryMax3d = async (body: any) => {
        let fullUrl = API_URI.BOOK_LOTTERY_MAX3D;
        return await window.connection.POST(fullUrl, body)
    }

    bookLotteryKeno = async (body: any) => {
        let fullUrl = API_URI.BOOK_LOTTERY_KENO;
        return await window.connection.POST(fullUrl, body)
    }

    bookLotteryPowerMega = async (body: any) => {
        let fullUrl = API_URI.BOOK_LOTTERY_POWER_MEGA;
        return await window.connection.POST(fullUrl, body)
    }

    bookLotteryCart = async (body: any) => {
        let fullUrl = API_URI.BOOK_LOTTERY_CART;
        return await window.connection.POST(fullUrl, body)
    }
    // ---- End -----

    // Add Lottery to Cart
    addPowerMegaToCart = async (body: any) => {
        let fullUrl = API_URI.ADD_POWER_MEGA_CART;
        return await window.connection.POST(fullUrl, body)
    }

    addMax3dToCart = async (body: any) => {
        let fullUrl = API_URI.ADD_MAX3D_CART;
        return await window.connection.POST(fullUrl, body)
    }
    // ---- End -----

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

    getAllOrder = async (params: { ticketType?: TicketType, status?: OrderStatus }) => {
        let fullUrl = API_URI.GET_ALL_ORDER;
        return await window.connection.GET(fullUrl, params)
    }
}

const lotteryApi = new LotteryApi
export default lotteryApi