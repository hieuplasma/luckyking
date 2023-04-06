import { API_URI } from "../config";

class AuthApi {
  login = async (body: any) => {
    let fullUrl = API_URI.LOGIN;
    console.log(JSON.stringify(body))
    return await window.connection.POST(fullUrl, body)
  }
}

const authApi = new AuthApi
export default authApi