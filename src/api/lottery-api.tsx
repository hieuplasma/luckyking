import { API_URI } from "./url";

class LotteryApi {
    getSchedulePower = async (params: any) => {
        let fullUrl = API_URI.GET_SCHEDULE_POWER;
        return await window.connection.GET(fullUrl, params)
    }

    bookLotteryPower = async (body: any) => {
        let fullUrl = API_URI.BOOK_LOTTERY_POWER;
        return await window.connection.POST(fullUrl, body)
    }
}

const lotteryApi = new LotteryApi
export default lotteryApi