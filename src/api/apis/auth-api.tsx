import { API_URI } from '../config';

class AuthApi {
  login = async (body: any) => {
    let fullUrl = API_URI.LOGIN;
    return await window.connection.POST(fullUrl, body);
  };

  checkPhoneNumber = async (body: any) => {
    let fullUrl = API_URI.CHECK_PHONENUMBER;
    return await window.connection.POST(fullUrl, body);
  };

  register = async (body: any, firebaseToken: string) => {
    let fullUrl = API_URI.REGISTER;
    return await window.connection.requestApi("POST", fullUrl, body, null, null, firebaseToken)
  }

  forgetPass = async (body: any, firebaseToken: string) => {
    let fullUrl = API_URI.FORGET_PASSWORD;
    return await window.connection.requestApi("POST", fullUrl, body, null, null, firebaseToken)
  }

  deleteAccount = async (body: any) => {
    let fullUrl = API_URI.DELETE_ACCOUNT;
    return await window.connection.POST(fullUrl, body);
  }
}

const authApi = new AuthApi();
export default authApi;
