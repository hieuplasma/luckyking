import { API_URI } from "../config";

class UserApi {
  getuserInfo = async () => {
    let fullUrl = API_URI.GET_USER_INFO;
    return await window.connection.GET(fullUrl)
  }

  updateUserInfo = async (body: any) => {
    let fullUrl = API_URI.UPDATE_USER_INFO;
    return await window.connection.POST(fullUrl, body)
  }

  updatePassword = async (body: any) => {
    let fullUrl = API_URI.UPDATE_PASSWORD;
    return await window.connection.POST(fullUrl, body)
  }

  getFirebaseToken = async () => {
    let fullUrl = API_URI.GET_FIREBASE_TOKEN;
    return await window.connection.GET(fullUrl)
  }

  updateFCMToken = async (body: any) => {
    let fullUrl = API_URI.UPDATE_FCM_TOKEN;
    return await window.connection.POST(fullUrl, body)
  }

  getBalance = async () => {
    let fullUrl = API_URI.GET_BALANCE;
    return await window.connection.GET(fullUrl)
  }

  getHistoryMoneyAccount = async (body: any) => {
    let fullUrl = API_URI.MONEY_ACCOUNT_HISTORY;
    return await window.connection.GET(fullUrl, body)
  }

  getHistoryRewardWallet = async (body: any) => {
    let fullUrl = API_URI.REWARD_WALLET_HISTORY;
    return await window.connection.GET(fullUrl, body)
  }

  getAllBank = async () => {
    let fullUrl = API_URI.GET_ALL_BANK;
    return await window.connection.GET(fullUrl)
  }

  getAllBankWithdraw = async () => {
    let fullUrl = API_URI.GET_ALL_BANK_WITHDRAW;
    return await window.connection.GET(fullUrl)
  }
}

const userApi = new UserApi
export default userApi