import { Color } from "@styles"
import { OrderStatus } from "./enum"

export const VERSION = '1.0.6'

export const constanst = 'CONSTANTS'
export const MAX_SET = 6

export const KENO_NUMBER = 80
export const MEGA_NUMBER = 45
export const POWER_NUMBER = 55
export const MAX3D_NUMBER = 9
export const MAX_SET_MAX3D = 3

export const DELAY_TAB = 100 // miliseconds
export const DELAY_SCREEN = 100 // miliseconds

export const HOT_LINE = '0866.79.88.79'
export const ZALO_LINK = 'https://zalo.me/2096217051699563199'
export const WEBSITE = 'https://luckyking.vn'

export const PASSWORD_MIN = 6
export const PASSWORD_MAX = 16

export const MIN_HEIGHT_TABLE = 26

export const LIST_STATUS = {
    PRINTED: [OrderStatus.CONFIRMED, OrderStatus.WON, OrderStatus.PAID, OrderStatus.NO_PRIZE],
    BOOKED: [OrderStatus.PENDING, OrderStatus.LOCK,
    OrderStatus.CONFIRMED, OrderStatus.PRINTED,
    OrderStatus.WON, OrderStatus.PAID, OrderStatus.NO_PRIZE],
    PENDING: [OrderStatus.PENDING, OrderStatus.LOCK, OrderStatus.PRINTED],
    WAITING: [OrderStatus.PENDING, OrderStatus.LOCK, OrderStatus.PRINTED, OrderStatus.CONFIRMED],
    DONE: [OrderStatus.WON, OrderStatus.PAID, OrderStatus.NO_PRIZE],
    ERROR: [OrderStatus.ERROR, OrderStatus.RETURNED]
}

export const LOTTRERY_COLOR_STATUS = {
    PENDING: '#0171F5',
    LOCK: '#0171F5',
    PRINTED: '#0171F5',
    CONFIRMED: '#0171F5',
    WON: Color.luckyKing,
    PAID: Color.luckyKing,
    NO_PRIZE: '#010BF5',
    RETURNED: Color.gray,
    ERROR: Color.gray
}