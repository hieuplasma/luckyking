export enum LotteryType {
    KenoBao = "kenobao",
    Keno = "keno",
    Mega = "mega645",
    Power = "power655",
    Max3D = "max3d",
    Max3DPlus = "max3dplus",
    Max3DPro = "max3dpro"
}

export type LotteryEnumType = keyof typeof LotteryType;

export enum OrderMethod {
    Keep = "keep",
    Deliver = "deliver"
}

export enum OrderStatus {
    PENDING = "PENDING", // chưa xử lý
    CONFIRMED = "CONFIRMED",//đã nhận tiền
    ERROR = "ERROR",//Lỗi hết bộ số hay 1 lý do nào đó
    RETURNED = "RETURNED",//đã trả lại
    WON = "WON",// ve thang
    PAID = "PAID",// da tra thuong
    NO_PRIZE = "NO_PRIZE",// khong trung thuong
    CART = "CART", // trong gio hang
}
