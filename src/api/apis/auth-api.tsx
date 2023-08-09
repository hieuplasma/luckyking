import { normalizePhoneNumber } from '@utils';
import { API_URI } from '../config';

class AuthApi {
  login = async (body: any) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.LOGIN;
    return await window.connection.POST(fullUrl, body);
  };

  sercureLogin = async (body: any, firebaseToken: string) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.SERCURE_LOGIN;
    return await window.connection.requestApi("POST", fullUrl, body, null, null, firebaseToken)
  };

  checkPhoneNumber = async (body: any) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.CHECK_PHONENUMBER;
    return await window.connection.POST(fullUrl, body);
  };

  register = async (body: any, firebaseToken: string) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.REGISTER;
    return await window.connection.requestApi("POST", fullUrl, body, null, null, firebaseToken)
  }

  forgetPass = async (body: any, firebaseToken: string) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.FORGET_PASSWORD;
    return await window.connection.requestApi("POST", fullUrl, body, null, null, firebaseToken)
  }

  deleteAccount = async (body: any) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.DELETE_ACCOUNT;
    return await window.connection.POST(fullUrl, body);
  }

  unverifiedLogin = async (body: any) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.UNVERIFIED_LOGIN;
    return await window.connection.POST(fullUrl, body);
  };

  verifiedLogin = async (body: any, token: string) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.VERIFIED_LOGIN;
    return await window.connection.requestApi("POST", fullUrl, body, null, null, token)
  };

  verifiedRegister = async (body: any, token: string) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.VERIFIED_REGISTER;
    return await window.connection.requestApi("POST", fullUrl, body, null, null, token)
  };

  verifiedForgotPass = async (body: any, token: string) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.VERIFIED_FORGET_PASSWORD;
    return await window.connection.requestApi("POST", fullUrl, body, null, null, token)
  };

  createOTP = async (body: any) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.CREATE_OTP;
    return await window.connection.POST(fullUrl, body);
  };

  confirmOTP = async (body: any) => {
    if (body.phoneNumber) body.phoneNumber = normalizePhoneNumber(body.phoneNumber)
    let fullUrl = API_URI.CONFIRM_OTP;
    return await window.connection.POST(fullUrl, body);
  };
}

const authApi = new AuthApi();
export default authApi;
