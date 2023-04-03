import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";
import { printDraw } from '@utils';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

interface ChooseTypeSheetProps {
    isVisible?: boolean
    bottomSheetRef: any
    onOpen?: () => void
    onClose?: () => void
    onToggle: (data: number) => void,
    currentChoose: any,
    onChoose: (data: any) => void,
    numberSet: any,
    page?: number
}

const fullNumber = Array.from({ length: 55 }, (_, index) => index + 1);

export const ChooseNumberSheet = React.memo(({ isVisible, bottomSheetRef, onToggle, onChoose, numberSet, page }: ChooseTypeSheetProps) => {

    // ref
    const swiperRef = useRef<SwiperFlatList>(null);

    const [indexPage, setIndexPage] = useState(0)
    const onChangeIndex = (index: any) => {
        setIndexPage(index.index)
    }

    const [currentNumbers, setCurrentNumbers] = useState([...numberSet])
    const [currentLevel, setCurrentLevel] = useState([...numberSet[0]].length)
    useEffect(() => {
        setCurrentNumbers([...numberSet])
        setCurrentLevel([...numberSet[0]].length)
    }, [numberSet])

    useEffect(() => {
        (page || page === 0) ? swiperRef.current?.scrollToIndex({ animated: false, index: page }) : {}
    }, [page])

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        if (index == 0) setCurrentNumbers([...numberSet])
        onToggle(index)
    }, []);

    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            BACKGROUND_OPACITY,
            [0, 1],
            [0, 1],
            Extrapolate.CLAMP
        ),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            styles.background,
            {
                backgroundColor: "#101010",
            },
            containerAnimatedStyle,
        ],
        [styles.background, containerAnimatedStyle]
    );

    const choosing = () => {
        onChoose(currentNumbers)
        bottomSheetRef.current?.close();
    }

    const totalSelected = () => {
        const curr = [...currentNumbers]
        let count = 0;
        for (let i = 0; i < curr[indexPage].length; i++) {
            if (curr[indexPage][i] !== false) count++
        }
        return count
    }

    const changeNumber = (number: number) => {
        let curr = [...currentNumbers]
        let tmp = [...curr[indexPage]]
        if (tmp.includes(number)) tmp[tmp.indexOf(number)] = false
        else tmp[tmp.indexOf(false)] = number
        curr[indexPage] = tmp
        setCurrentNumbers(curr)
    }

    const checkIsOk = useCallback(() => {
        const tmp = [...currentNumbers]
        const len = tmp[0].length
        for (let i = 0; i < tmp.length; i++) {
            const element = tmp[i]
            let count = 0;
            element.map((item: any) => {
                if (item === false) count++
            })
            if (count != 0 && count != len) return false
        }
        return true
    }, [numberSet, currentNumbers])

    const ItemView = useCallback((item: any, index: number) => {
        const printNumber = (number: any) => {
            if (number === false) return ""
            if (number < 10) return '0' + number
            return number
        }
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 24, width: windowWidth - 48 }} key={index}>
                {fullNumber.map((number: number, index2: number) => {
                    const check = (item.includes(number) ? true : false)
                    return (
                        <View style={styles.ballContainer} key={index + ':::' + index2}  >
                            <TouchableOpacity style={[styles.ball, { backgroundColor: check ? '#C38E32' : '#E9E6E6' }]} onPress={() => changeNumber(number)}>
                                <Text style={[styles.textBall, { color: check ? Color.white : Color.black }]}>{printNumber(number)}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        )
    }, [changeNumber]);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[SHEET_HEIGHT]}
            enablePanDownToClose={true}
            index={-1}
            backgroundStyle={styles.sheetContainer}
            backdropComponent={() => (
                isVisible ?
                    <Animated.View style={containerStyle}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={handleClose}>
                        </TouchableOpacity>
                    </Animated.View>
                    : null
            )}
            onChange={handleSheetChanges}
        >
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{`Chọn bộ số ${String.fromCharCode(65 + indexPage)} (${totalSelected()}/${currentLevel})`}</Text>
                <View style={{ flex: 1, marginTop: 12 }}>
                    <SwiperFlatList
                        index={0}
                        ref={swiperRef}
                        data={currentNumbers}
                        onChangeIndex={index => onChangeIndex(index)}
                        renderItem={({ item, index }) => ItemView(item, index)}
                    />
                </View>
                <TouchableOpacity disabled={!checkIsOk()} style={[styles.confirmButton, { backgroundColor: checkIsOk() ? '#C38E32' : '#FCCF81' }]} onPress={() => choosing()}>
                    <Text style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 520
const BACKGROUND_OPACITY = 0.85

const styles = StyleSheet.create({
    sheetContainer: { backgroundColor: '#F4F4F4', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    background: {
        height: windowHeight, width: windowWidth,
        // backgroundColor: '#101010', opacity: BACKGROUND_OPACITY,
        position: 'absolute'
    },
    title: {
        fontSize: 18, color: Color.black, alignSelf: 'center', fontWeight: 'bold'
    },
    ballContainer: {
        width: (windowWidth - 48) / 8, height: 44,
        justifyContent: 'center', alignItems: 'center'
    },
    ball: {
        width: 32, height: 32,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 99, backgroundColor: '#E9E6E6'
    },
    textBall: { fontWeight: '400', fontSize: 16, color: Color.black },
    confirmButton: {
        margin: 16, backgroundColor: '#C38E32', borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        height: 44, width: windowWidth - 32
    },
    textConfirm: {
        color: Color.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})