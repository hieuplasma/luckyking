export function dateConvert(param: Date) {
    const date = param.getDate()
    const month = param.getMonth() + 1
    const year = param.getFullYear()
    return (date < 10 ? "0" + date : '' + date) + "/" + (month < 10 ? "0" + month : '' + month) + "/" + year
}