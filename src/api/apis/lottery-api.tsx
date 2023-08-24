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

    getResultKeno = async (params: any) => {
        let fullUrl = API_URI.GET_RESULT_KENO;
        return await window.connection.GET(fullUrl, params)
    }

    getResultMega = async (params: any) => {
        let fullUrl = API_URI.GET_RESULT_MEGA;
        return await window.connection.GET(fullUrl, params)
    }

    getResultPower = async (params: any) => {
        let fullUrl = API_URI.GET_RESULT_POWER;
        return await window.connection.GET(fullUrl, params)
    }

    getResultMax3d = async (params: any) => {
        let fullUrl = API_URI.GET_RESULT_MAX3D;
        return await window.connection.GET(fullUrl, params)
    }

    getResultByDrawCode = async (params: any) => {
        let fullUrl = API_URI.GET_RESULT_BY_DRAWCODE;
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

    reorder = async (body: any) => {
        let fullUrl = API_URI.RE_ORDER;
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

    getOrderByDraw = async (param: any) => {
        let fullUrl = API_URI.GET_ORDER_DRAW;
        return await window.connection.GET(fullUrl, param)
    }

    getOrderById = async (param: any) => {
        let fullUrl = API_URI.GET_ORDER_BY_ID + '/' + param.orderId;
        return await window.connection.GET(fullUrl)
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

    withdrawBankAccount = async (body: any) => {
        let fullUrl = API_URI.WITHDRAW_TO_BANK;
        return await window.connection.POST(fullUrl, body)
    }

    getAllOrder = async (params: { ticketType?: TicketType, status?: OrderStatus }) => {
        let fullUrl = API_URI.GET_ALL_ORDER;
        return await window.connection.GET(fullUrl, params)
    }

    getAllOrder2 = async (params: { ticketType?: TicketType, status?: any }) => {
        let fullUrl = API_URI.GET_ALL_ORDER2;
        return await window.connection.GET(fullUrl, params)
    }

    //View JackPot
    getJackpot = async () => {
        let fullUrl = API_URI.VIEW_JACKPOT;
        return await window.connection.GET(fullUrl)
    }

    //Get Config
    getConfig = async () => {
        let fullUrl = API_URI.GET_CONFIG;
        return await window.connection.GET(fullUrl)
    }

    //Get Popup
    getPopup = async () => {
        let fullUrl = API_URI.GET_POPUP;
        return await window.connection.GET(fullUrl)
    }

    //Statistical
    getStatisticalKenoNumber = async (body: any) => {
        let fullUrl = API_URI.STATISTICAL_KENO_NUMBER;
        return await window.connection.GET(fullUrl, body)
    }

    getStatisticalKenoHeadTail = async (body: any) => {
        let fullUrl = API_URI.STATISTICAL_KENO_HEADTAIL;
        return await window.connection.GET(fullUrl, body)
    }

    getStatisticalKenoBigSmall = async (body: any) => {
        let fullUrl = API_URI.STATISTICAL_KENO_BIGSMALL;
        return await window.connection.GET(fullUrl, body)
    }

    getStatisticalKenoEvenOdd = async (body: any) => {
        let fullUrl = API_URI.STATISTICAL_KENO_EVENODD;
        return await window.connection.GET(fullUrl, body)
    }

    getStatisticalPoMeNumber = async (body: any) => {
        let fullUrl = API_URI.STATISTICAL_POME_NUMBER;
        return await window.connection.GET(fullUrl, body)
    }

    getStatisticalPoMeHeadTail = async (body: any) => {
        let fullUrl = API_URI.STATISTICAL_POME_HEADTAIL;
        return await window.connection.GET(fullUrl, body)
    }

    getStatisticalPoMeEvenOdd = async (body: any) => {
        let fullUrl = API_URI.STATISTICAL_POME_EVENODD;
        return await window.connection.GET(fullUrl, body)
    }
}

const lotteryApi = new LotteryApi
export default lotteryApi