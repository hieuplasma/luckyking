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
}

const userApi = new UserApi
export default userApi