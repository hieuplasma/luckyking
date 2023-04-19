import { Image, Images } from "@assets"
import { IText } from "@components"
import { Color } from "@styles"
import React, { useCallback } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface HeaderNumberSheetProps {
    indexPage: number,
    swiperRef: any,
    totalSelected?: number,
    currentLevel?: number
}

export const TitleNumberSheet = React.memo(({ indexPage, swiperRef, totalSelected, currentLevel }: HeaderNumberSheetProps) => {

    const moveLeft = useCallback(() => {
        if (indexPage > 0) swiperRef.current?.scrollToIndex({ animated: true, index: indexPage - 1 })
    }, [indexPage, swiperRef])

    const moveRight = useCallback(() => {
        if (indexPage < 5) swiperRef.current?.scrollToIndex({ animated: true, index: indexPage + 1 })
    }, [indexPage, swiperRef])
    return (
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
                {`Chọn bộ số ${String.fromCharCode(65 + indexPage)} ${(totalSelected || totalSelected === 0) ? `(${totalSelected}/${currentLevel})` : ``}`}
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
    )
})

const styles = StyleSheet.create({
    title: {
        fontSize: 18, color: Color.black, alignSelf: 'center', fontWeight: 'bold'
    },
})