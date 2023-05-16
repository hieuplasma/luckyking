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
    CONFIRMED = "CONFIRMED",//đã nhận tiền, in xong
    ERROR = "ERROR",//Lỗi hết bộ số hay 1 lý do nào đó
    RETURNED = "RETURNED",//đã hoàn lại
    WON = "WON",// ve thang
    PAID = "PAID",// da tra thuong
    NO_PRIZE = "NO_PRIZE",// khong trung thuong

    CART = "CART", // trong giỏ hàng, dành cho vé
}

export function getNameStatus(param: OrderStatus) {
    switch (param) {
        case OrderStatus.PENDING:
        case OrderStatus.LOCK:
            return "Đợi in vé"
        case OrderStatus.CONFIRMED: return "Đã in vé"
        case OrderStatus.ERROR: return "Bị lỗi"
        case OrderStatus.RETURNED: return "Đã huỷ"
        case OrderStatus.WON: return "Trúng thưởng"
        case OrderStatus.PAID: return "Đã trả thưởng"
        case OrderStatus.NO_PRIZE: return "Không trúng thưởng :("
        case OrderStatus.CART: return "Trong giỏ hàng"
        default: return "Không hợp lệ"
    }
}

export type PickingType = 'default' | 'fastpick' | 'selfpick'

export type TicketType = 'keno' | 'basic'

export type SMALL_BIG = 'small' | 'big' | 'draw'
export type EVEN_ODD = 'even' | 'odd' | 'even_11_12' | 'odd_11_12' | 'draw'