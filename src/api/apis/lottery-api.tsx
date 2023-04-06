import { API_URI } from "../config";

class LotteryApi {
    getSchedulePower = async (params: any) => {
        let fullUrl = API_URI.GET_SCHEDULE_POWER;
        return await window.connection.GET(fullUrl, params)
    }

    bookLotteryPower = async (body: any) => {
        let fullUrl = API_URI.BOOK_LOTTERY_POWER;
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
}

const lotteryApi = new LotteryApi
export default lotteryApi