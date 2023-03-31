import { API_URI } from "./url";

class UserApi {
  getuserInfo = async () => {
    let fullUrl = API_URI.GET_USER_INFO;
    return await window.connection.GET(fullUrl)
  }
}

const userApi = new UserApi
export default userApi