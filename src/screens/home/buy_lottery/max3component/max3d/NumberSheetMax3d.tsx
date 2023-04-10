import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { LotteryType } from '@common';
import { getColorLott, printNumber } from '@utils';
import { ConsolasText, IText } from '@components';

interface NumberSheetMax3dProps {
    onChoose: (data: any) => void,
    numberSet: any,
    page?: number,
    type: LotteryType
}

const column = [0, 1, 2]
const fullNumber = Array.from({ length: 10 }, (_, index) => index);

export const NumberSheetMax3d = forwardRef(({ onChoose, numberSet, page, type }: NumberSheetMax3dProps, ref) => {

    const lottColor = getColorLott(type)

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const swiperRef = useRef<SwiperFlatList>(null);

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

    const changeNumber = (number: number, columnId: number,) => {
        let curr = [...currentNumbers]
        let tmp = [...curr[indexPage]]
        if (tmp[columnId] === number) tmp[columnId] = false
        else tmp[columnId] = number
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
        return (
            <View style={{ marginHorizontal: 32, width: windowWidth - 64, flexDirection: 'row' }} key={index}>
                {column.map((columnId: number) => {
                    return (
                        <View key={columnId + ""}>
                            {
                                fullNumber.map((number: number, index2: number) => {
                                    const check = (item[columnId] === number ? true : false)
                                    return (
                                        <View style={styles.ballContainer} key={number + ':::' + index2}  >
                                            <TouchableOpacity style={[styles.ball, { backgroundColor: check ? lottColor : '#E9E6E6' }]} onPress={() => changeNumber(number, columnId)}>
                                                <ConsolasText style={[styles.textBall, { color: check ? Color.white : Color.black }]}>{printNumber(number)}</ConsolasText>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                })}
            </View>
        )
    }, [numberSet, changeNumber]);

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
                    <IText style={styles.title}>{`Chọn bộ số ${String.fromCharCode(65 + indexPage)}`}</IText>
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
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet >
    );
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 630
const BACKGROUND_OPACITY = 0.85

const styles = StyleSheet.create({
    sheetContainer: { backgroundColor: '#F4F4F4', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    background: {
        backgroundColor: '#000',
        position: 'absolute',
        top: -1000,
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
        fontWeight: 'bold',
    }
})