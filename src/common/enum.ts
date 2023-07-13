export enum LotteryType {
    KenoBao = "kenobao",
    Keno = "keno",
    Mega = "mega645",
    Power = "power655",
    Max3D = "max3d",
    Max3DPlus = "max3dplus",
    Max3DPro = "max3dpro",
    Cart = "cart"
}

export type LotteryEnumType = keyof typeof LotteryType;

export enum OrderMethod {
    Keep = "keep",
    Deliver = "deliver"
}

export enum OrderStatus {
    PENDING = "PENDING", // đã trả tiền, chờ khoá đơn
    LOCK = "LOCK", // đã khoá đơn, chờ in
    PRINTED = "PRINTED", // đã in 1 phần vé của order
    CONFIRMED = "CONFIRMED",//đã nhận tiền, in xong
    ERROR = "ERROR",//Lỗi hết bộ số hay 1 lý do nào đó
    RETURNED = "RETURNED",//đã hoàn lại
    WON = "WON",// ve thang
    PAID = "PAID",// da tra thuong
    NO_PRIZE = "NO_PRIZE",// khong trung thuong

    CART = "CART", // trong giỏ hàng, dành cho vé
}

export enum TransactionType {
    Recharge = "recharge",
    WithDraw = "withdraw",
    Rewarded = "rewarded",
    BuyLottery = "buylottery",
    Refund = "refund"
}

export enum TransactionDestination {
    LUCKY_KING = "Ví LuckyKing",
    REWARD = "Ví nhận thưởng"
}

export function getLotteyNameStatus(param: OrderStatus) {
    switch (param) {
        case OrderStatus.PENDING:
        case OrderStatus.LOCK:
            return "Đợi in vé"
        case OrderStatus.PRINTED:
            return "Đang in vé"
        case OrderStatus.CONFIRMED: return "Chờ kết quả"
        case OrderStatus.ERROR: return "Vé bị lỗi"
        case OrderStatus.RETURNED: return "Vé đã huỷ"
        case OrderStatus.WON: return "Vé trúng thưởng"
        case OrderStatus.PAID: return "Đã trả thưởng"
        case OrderStatus.NO_PRIZE: return "Không trúng"
        case OrderStatus.CART: return "Trong giỏ hàng"
        default: return "Không hợp lệ"
    }
}

export type PickingType = 'default' | 'fastpick' | 'selfpick'

export type TicketType = 'keno' | 'basic'

export type SMALL_BIG = 'small' | 'big' | 'draw'
export type EVEN_ODD = 'even' | 'odd' | 'even_11_12' | 'odd_11_12' | 'draw'

export enum KenoStatistical {
    EVEN_ODD = "even_odd",
    HEAD_TAIL = "head_tail",
    NUMBER = "number",
    BIG_SMALL = "big_small",
    ADVANCE = "advance"
}