import { Image, Images } from "@assets"
import { IText } from "@components"
import { Color } from "@styles"
import { printNumber } from "@utils"
import React, { useCallback, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface TitleSimpleKenoNumberSheetProps {
    indexPage: number,
    swiperRef: any,
    selected: number[],
}

const LonNho = [
    { label: "Lớn", value: 81 },
    { label: "Nhỏ", value: 82 },
    { label: "Hoà LN", value: 83 }
]

const ChanLe = [
    { label: "Chẵn 13+", value: 84 },
    { label: "Hòa CL", value: 85 },
    { label: "Lẻ 13+", value: 86 },
    { label: "Chẵn 11-12", value: 87 },
    { label: "Lẻ 11-12", value: 88 }
]

const getData = {
    81: 'Lớn',
    82: 'Nhỏ',
    83: 'Hoà LN',
    84: 'Chẵn 13+',
    85: 'Hòa CL',
    86: 'Lẻ 13+',
    87: 'Chẵn 11-12',
    88: 'Lẻ 11-12'
}

export const TitleSimpleKenoNumberSheet = React.memo(({ indexPage, swiperRef, selected }: TitleSimpleKenoNumberSheetProps) => {

    // const [selected, setSelected] = useState([11, 32, 58, 60, 61, 80])

    const moveLeft = useCallback(() => {
        if (indexPage > 0) swiperRef.current?.scrollToIndex({ animated: true, index: indexPage - 1 })
    }, [indexPage, swiperRef])

    const moveRight = useCallback(() => {
        if (indexPage < 5) swiperRef.current?.scrollToIndex({ animated: true, index: indexPage + 1 })
    }, [indexPage, swiperRef])

    const typePlay = useCallback(() => {
        if (selected[0] > 80 && selected[0] < 84) return "Lớn nhỏ"
        if (selected[0] > 83 && selected[0] < 89) return "Chẵn lẻ"
        return `Bậc ${selected.length > 0 ? selected.length : "..."}`
    }, [selected])

    const getName = useCallback(() => {
        //@ts-ignore
        return getData[`${selected[0]}`]
    }, [selected])

    return (
        <View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 18 }}>
                <TouchableOpacity
                    disabled={indexPage == 0 ? true : false}
                    style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}
                    onPress={moveLeft}
                >
                    {indexPage > 0 ?
                        <Image source={Images.left_arrow} style={{ width: 12, height: 24 }} tintColor={Color.black} /> : <></>}
                </TouchableOpacity>
                <IText style={styles.title}>
                    {`Hàng ${String.fromCharCode(65 + indexPage)}`}
                </IText>
                <TouchableOpacity
                    disabled={indexPage == 5 ? true : false}
                    style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}
                    onPress={moveRight}
                >
                    {indexPage < 5 ?
                        <Image source={Images.right_arrow} style={{ width: 12, height: 24 }} tintColor={Color.black} /> : <></>}
                </TouchableOpacity>
            </View>
            <IText style={{ fontSize: 18, alignSelf: 'center' }}>
                {"Bộ số được chọn ("}
                <IText style={{ fontSize: 18, color: Color.keno }}>{typePlay()}</IText>
                <IText style={{ fontSize: 18 }}>{")"}</IText>
            </IText>
            <View style={{ alignSelf: 'center', flexDirection: 'row' }} >
                {
                    selected.length == 0 ?
                        <View style={{ width: 20, height: 1, alignSelf: 'center', backgroundColor: Color.keno, marginTop: 20, marginBottom: 1 }} />
                        : selected[0] <= 80 ?
                            selected.map((item: any, index: number) => {
                                return (
                                    <IText key={"" + index} style={{ textDecorationLine: 'underline', marginHorizontal: 3, fontSize: 18, color: Color.keno }}>
                                        {printNumber(item)}
                                    </IText>
                                )
                            })
                            : <IText style={{ fontSize: 18, color: Color.keno }}>
                                {getName()}
                            </IText>
                }
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    title: {
        fontSize: 18, color: Color.black, alignSelf: 'center', fontWeight: 'bold'
    },
})