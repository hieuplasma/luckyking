export enum TYPE_API {
  POST = 'POST',
  GET = 'GET'
}

export const RESPONSE_TIMEOUT = 15000;
export const TIMEOUT_MESSAGE = "request timeout"

/** config for debug */
// const config = {
//   host:'http://192.168.246.104:3001',
// };

/** config for VPS */
// const config = {
//   host: 'http://103.162.31.84:3003',
// };

/** config for Production */
const config = {
  host: 'http://42.96.40.239',
};

export const API_HOST = config.host;

export const API_URI = {
  CHEATE_REGISTER: "/auth/register",
  REGISTER: "/auth/sercure/register",
  CHEATE_FORGET_PASSWORD: "/auth/forgot-password",
  FORGET_PASSWORD: "/auth/sercure/forgot-password",
  LOGIN: "/auth/login",

  GET_USER_INFO: "/users/get-info",
  UPDATE_USER_INFO: "/users/update-info",

  UPDATE_PASSWORD: "/auth/update-password",

  GET_FIREBASE_TOKEN:"/device/get-firebase-token",
  UPDATE_FCM_TOKEN:"/device/update-token",

  BOOK_LOTTERY_KENO: "/order/add-keno",
  BOOK_LOTTERY_POWER_MEGA: "/order/add-power-mega",
  BOOK_LOTTERY_MAX3D: "/order/add-max3d",
  BOOK_LOTTERY_CART: "/order/add-multi",
  GET_ALL_ORDER: "/order/get-all",
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
}