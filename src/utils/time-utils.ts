export function dateConvert(param: Date) {
    const date = param.getDate()
    const month = param.getMonth() + 1
    const year = param.getFullYear()
    return (date < 10 ? "0" + date : '' + date) + "/" + (month < 10 ? "0" + month : '' + month) + "/" + year
}

export function dateTimeConvert(param: Date) {
    const date = param.getDate()
    const month = param.getMonth() + 1
    const year = param.getFullYear()
    const hour = param.getHours()
    const min = param.getMinutes()
    return smallThan10(hour) + ":" + smallThan10(min) + " - " + smallThan10(date) + "/" + smallThan10(month)
}

export function fullDateTimeConvert(param: Date) {
    const date = param.getDate()
    const month = param.getMonth() + 1
    const year = param.getFullYear()
    const hour = param.getHours()
    const min = param.getMinutes()
    return smallThan10(hour) + ":" + smallThan10(min) + " - " + smallThan10(date) + "/" + smallThan10(month) + "/" + year
}

export function fullDateTimeConvert2(param: Date) {
    const date = param.getDate()
    const month = param.getMonth() + 1
    const year = param.getFullYear()
    const hour = param.getHours()
    const min = param.getMinutes()
    const second = param.getSeconds()
    return smallThan10(hour) + ":" + smallThan10(min) + ":" + smallThan10(second) + " - " + smallThan10(date) + "/" + smallThan10(month) + "/" + year
}

export

    function smallThan10(param: number) {
    return param < 10 ? "0" + param : '' + param
}

export function printWeekDate(param: Date) {
    const date = param.getDate()
    const month = param.getMonth() + 1
    const year = param.getFullYear()
    const weekDay = param.getDay()
    let tmp = "Thứ 2"
    switch (weekDay) {
        case 1:
            tmp = "Thứ 2"
            break;
        case 2:
            tmp = "Thứ 3"
            break;
        case 3:
            tmp = "Thứ 4"
            break;
        case 4:
            tmp = "Thứ 5"
            break;
        case 5:
            tmp = "Thứ 6"
            break;
        case 6:
            tmp = "Thứ bảy"
            break;
        case 0:
            tmp = "Chủ Nhật"
            break;
        default:
            break;
    }
    return tmp + ", " + (date < 10 ? "0" + date : '' + date) + "/" + (month < 10 ? "0" + month : '' + month) + "/" + year
}