import { Image, Images } from "@assets"
import { IText } from "@components"
import { Color } from "@styles"
import { getSpecialValueKeno, printNumber } from "@utils"
import React, { useCallback, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface TitleSimpleKenoNumberSheetProps {
    indexPage: number,
    swiperRef: any,
    selected: any[],
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
        return getSpecialValueKeno(selected[0])
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
                        : (selected[0] == 'TC') ?
                            selected.map((item: any, index: number) => {
                                return (
                                    <IText key={"" + index} style={{ textDecorationLine: 'underline', marginHorizontal: 3, fontSize: 18, color: Color.keno }}>
                                        {'TC'}
                                    </IText>
                                )
                            })
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