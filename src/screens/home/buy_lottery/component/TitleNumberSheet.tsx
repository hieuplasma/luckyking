import { Image, Images } from "@assets"
import { IText } from "@components"
import { Color } from "@styles"
import React, { useCallback } from "react"
import { StyleSheet, TouchableOpacity, View, ColorValue } from "react-native"

interface HeaderNumberSheetProps {
    indexPage: number,
    swiperRef: any,
    totalSelected?: number,
    currentLevel?: number
    maxIndex?: number,
    minIndex?: number,
    lottColot?: ColorValue
}

export const TitleNumberSheet = React.memo(({ indexPage, swiperRef, totalSelected, currentLevel, maxIndex, lottColot }: HeaderNumberSheetProps) => {

    const max = maxIndex ? maxIndex : 5

    const moveLeft = useCallback(() => {
        if (indexPage > 0) swiperRef.current?.scrollToIndex({ animated: true, index: indexPage - 1 })
    }, [indexPage, swiperRef])

    const moveRight = useCallback(() => {
        if (indexPage < max) swiperRef.current?.scrollToIndex({ animated: true, index: indexPage + 1 })
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
                {`Chọn bộ số ${String.fromCharCode(65 + indexPage)} `}
                {(totalSelected || totalSelected === 0) ?
                    <>
                        <IText style={styles.title}>
                            {'('}
                        </IText>
                        <IText style={[styles.title, { color: totalSelected == currentLevel ? lottColot : Color.black }]}>
                            {totalSelected}
                        </IText>
                        <IText style={styles.title}>
                            {'/'}
                        </IText>
                        <IText style={[styles.title, { color: lottColot }]}>
                            {currentLevel}
                        </IText>
                        <IText style={styles.title}>
                            {')'}
                        </IText>
                    </>
                    : ``}
            </IText>
            <TouchableOpacity
                disabled={indexPage == max ? true : false}
                style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}
                onPress={moveRight}
            >
                {indexPage < max ?
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