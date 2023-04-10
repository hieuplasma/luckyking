import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { LotteryType } from '@common';
import { getColorLott } from '@utils';
import { ConsolasText } from '@components';

interface ChooseTypeSheetProps {
    onChoose: (data: any) => void,
    numberSet: any,
    page?: number,
    type: LotteryType
}

const fullNumber = Array.from({ length: 55 }, (_, index) => index + 1);

export const ChooseNumberSheet = forwardRef(({ onChoose, numberSet, page, type }: ChooseTypeSheetProps, ref) => {

    const lottColor = getColorLott(type)

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const swiperRef = useRef<SwiperFlatList>(null);

    useEffect(() => {
        console.log('ChooseNumberSheet has been re-rendered');
    });

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

    const [indexPage, setIndexPage] = useState(0)
    const onChangeIndex = (index: any) => {
        setIndexPage(index.index)
    }
    useEffect(() => {
        (page || page === 0) ? swiperRef.current?.scrollToIndex({ animated: false, index: page }) : {}
    }, [page])

    const [currentNumbers, setCurrentNumbers] = useState([...numberSet])
    const [currentLevel, setCurrentLevel] = useState([...numberSet[0]].length)

    const choosing = () => {
        onClose()
        onChoose(currentNumbers)
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
                            <TouchableOpacity style={[styles.ball, { backgroundColor: check ? lottColor : '#E9E6E6' }]} onPress={() => changeNumber(number)}>
                                <ConsolasText style={[styles.textBall, { color: check ? Color.white : Color.black }]}>{printNumber(number)}</ConsolasText>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        )
    }, [changeNumber]);

    const [opacity, setOpacity] = useState(new Animated.Value(0))
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        bottomSheetRef.current?.close()
        setTimeout(() => {
            setIsOpen(false)
        }, 50);
    };

    const onOpen = () => {
        setIsOpen(true)
        setCurrentNumbers([...numberSet])
        setCurrentLevel([...numberSet[0]].length)
        bottomSheetRef.current?.expand()
        Animated.timing(opacity, {
            toValue: BACKGROUND_OPACITY,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const renderBackDrop = () => (
        <Animated.View
            style={[styles.background, { opacity: opacity }]}>
            <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={onClose}
            />
        </Animated.View>
    );

    const handleSheetAnimate = (from: number, to: number) => {
        if (to == -1) onClose()
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[SHEET_HEIGHT]}
            enablePanDownToClose={true}
            index={-1}
            backdropComponent={() => (
                isOpen ?
                    renderBackDrop()
                    : null
            )}
            onAnimate={handleSheetAnimate}
            backgroundStyle={styles.sheetContainer}
        >
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 18 }}>
                    <TouchableOpacity disabled={indexPage == 0 ? true : false} style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}
                        onPress={() => swiperRef.current?.scrollToIndex({ animated: true, index: indexPage - 1 })}
                    >
                        {indexPage > 0 ?
                            <Image source={Images.left_arrow} style={{ width: 12, height: 24 }} tintColor={Color.black} /> : <></>}
                    </TouchableOpacity>
                    <Text style={styles.title}>{`Chọn bộ số ${String.fromCharCode(65 + indexPage)} (${totalSelected()}/${currentLevel})`}</Text>
                    <TouchableOpacity disabled={indexPage == 5 ? true : false} style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}
                        onPress={() => swiperRef.current?.scrollToIndex({ animated: true, index: indexPage + 1 })}
                    >
                        {indexPage < 5 ?
                            <Image source={Images.right_arrow} style={{ width: 12, height: 24 }} tintColor={Color.black} /> : <></>}
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginTop: 12 }}>
                    <SwiperFlatList
                        index={0}
                        ref={swiperRef}
                        data={currentNumbers}
                        onChangeIndex={index => onChangeIndex(index)}
                        renderItem={({ item, index }) => ItemView(item, index)}
                    />
                </View>
                <TouchableOpacity disabled={!checkIsOk()} style={[styles.confirmButton, { backgroundColor: lottColor, opacity: checkIsOk() ? 1 : 0.4 }]} onPress={choosing}>
                    <Text style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </BottomSheet >
    );
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 520
const BACKGROUND_OPACITY = 0.85

const styles = StyleSheet.create({
    sheetContainer: { backgroundColor: '#F4F4F4', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    background: {
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
    textBall: { fontSize: 16, marginTop: 2 },
    confirmButton: {
        margin: 16, backgroundColor: Color.power, borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        height: 44, width: windowWidth - 32
    },
    textConfirm: {
        color: Color.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})