import { dateConvert } from "@utils";

export const groupBySortedFlucs = (sortedArray: any[]) => {
    const res: any[] = []
    let currentValue = undefined
    let currentIndex = -1;
    for (const element of sortedArray) {
        const date = dateConvert(new Date(element.transaction.createdAt))
        if (dateConvert(new Date(element.transaction.createdAt)) == currentValue) {
            res[currentIndex].data.push(element)
        }
        else {
            currentIndex++;
            currentValue = date
            res[currentIndex] = {
                key: currentValue,
                data: [element]
            }
        }
    }
    return res
};
