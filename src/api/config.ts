export enum TYPE_API {
  POST = 'POST',
  GET = 'GET'
}

export const RESPONSE_TIMEOUT = 15000;
export const TIMEOUT_MESSAGE = "request timeout"

/** config for debug */
const config = {
  // host: 'http://192.168.246.46:3001'
  host: 'http://192.168.246.47:3001'
};

/** config for VPS */
// const config = {
//   host: 'http://103.162.31.84:3003',
// };

/** config for Production */
// const config = {
//   host: 'http://42.96.40.239',
// };

// const config = {
//   host: 'https://api.luckyking.vn',
// };

export const API_HOST = config.host;

export const API_URI = {
  CHEATE_REGISTER: "/auth/register",
  REGISTER: "/auth/sercure/register",
  CHEATE_FORGET_PASSWORD: "/auth/forgot-password",
  FORGET_PASSWORD: "/auth/sercure/forgot-password",
  LOGIN: "/auth/login",
  SERCURE_LOGIN: "/sercure/auth/login",
  DELETE_ACCOUNT: "/auth/delete-account",

  UNVERIFIED_LOGIN: '/auth/unverified-login',
  VERIFIED_LOGIN: '/auth/otp-verified/login',
  VERIFIED_REGISTER: '/auth/otp-verified/register',
  VERIFIED_FORGET_PASSWORD: '/auth/otp-verified/forgot-password',

  CREATE_OTP: '/otp/create-otp',
  CONFIRM_OTP: '/otp/confirm-otp',

  GET_PRIORITY: '/auth/priority-number',

  CHECK_PHONENUMBER: "/auth/check",

  GET_USER_INFO: "/users/get-info",
  UPDATE_USER_INFO: "/users/update-info",
  GET_BALANCE: "/users/get-all-wallet",
  GET_ALL_BANK: "/users/get-all-bank",
  GET_ALL_BANK_WITHDRAW: "/users/get-all-bank-withdraw",

  UPDATE_PASSWORD: "/auth/update-password",

  GET_FIREBASE_TOKEN: "/device/get-firebase-token",
  UPDATE_FCM_TOKEN: "/device/update-token",

  BOOK_LOTTERY_KENO: "/order/add-keno",
  BOOK_LOTTERY_POWER_MEGA: "/order/add-power-mega",
  BOOK_LOTTERY_MAX3D: "/order/add-max3d",
  BOOK_LOTTERY_CART: "/order/add-multi",
  RE_ORDER: "/order/re-order",
  GET_ALL_ORDER: "/order/get-all",
  GET_ALL_ORDER2: "/order/get-all-group",
  GET_ORDER_DRAW: "/order/get-by-draw",
  GET_ORDER_BY_ID: "/order/get-by-id",

  GET_SCHEDULE_KENO: "/result/schedule/keno",
  GET_SCHEDULE_POWER: "/result/schedule/power",
  GET_SCHEDULE_MEGA: "/result/schedule/mega",
  GET_SCHEDULE_MAX3D: "/result/schedule/max3d",

  GET_RESULT_KENO: "/result/keno",
  GET_RESULT_POWER: "/result/power",
  GET_RESULT_MEGA: "/result/mega",
  GET_RESULT_MAX3D: "/result/max3d",
  GET_RESULT_BY_DRAWCODE: "/result/get-by-draw",

  VIEW_JACKPOT: "/result/jackpot",
  GET_CONFIG: "/system/config",
  GET_POPUP: "/system/popup",

  GET_LIST_ITEM_CART: "/cart/list",
  ADD_POWER_MEGA_CART: "/cart/add-power-mega",
  ADD_MAX3D_CART: "/cart/add-max3d",
  DELETE_LOTTERY_CART: "/cart/delete",
  DELETE_LOTTERY_NUMBER: "/cart/delete-number",
  EDIT_LOTTERY_CART: "/cart/update",
  EMPTY_CART: "/cart/empty",

  TRANSACTION_HISTORY: "/transaction/list",
  WITHDRAW_TO_LUCKYKING: "/transaction/withdraw-luckyking",
  WITHDRAW_TO_BANK: "/transaction/withdraw-bank-acount",
  MONEY_ACCOUNT_HISTORY: "/transaction/money-account",
  REWARD_WALLET_HISTORY: "/transaction/reward-wallet",

  STATISTICAL_KENO_NUMBER: "/statistical/keno-number",
  STATISTICAL_KENO_HEADTAIL: "/statistical/keno-headtail",
  STATISTICAL_KENO_BIGSMALL: "/statistical/keno-bigsmall",
  STATISTICAL_KENO_EVENODD: "/statistical/keno-evenodd",

  STATISTICAL_POME_NUMBER: "/statistical/pome-number",
  STATISTICAL_POME_HEADTAIL: "/statistical/pome-headtail",
  STATISTICAL_POME_EVENODD: "/statistical/pome-evenodd",

}