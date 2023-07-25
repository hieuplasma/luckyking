import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, ColorValue } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { LotteryType } from '@common';
import { getColorLott, printNumber } from '@utils';
import { ConsolasText, IText } from '@components';
import { PerPagePowerMegaView } from './PerPagePowerMegaView';
import { TitleNumberSheet } from '../component/TitleNumberSheet';

interface ChooseTypeSheetProps {
    onChoose: (data: any) => void,
    numberSet: any,
    page?: number,
    type: LotteryType
}

const Wiget = forwardRef(({ onChoose, numberSet, page, type }: ChooseTypeSheetProps, ref) => {

    const lottColor = getColorLott(type)

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const swiperRef = useRef<SwiperFlatList>(null);

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

    const [indexPage, setIndexPage]: any = useState(0)

    // useEffect(() => {
    //     if (page || page === 0) {
    //         swiperRef.current?.scrollToIndex({ animated: false, index: page })
    //     }
    //     else {
    //         console.log("khong scroll duoc")
    //     }
    // }, [page])

    const [currentNumbers, setCurrentNumbers] = useState([...numberSet])
    const [currentLevel, setCurrentLevel] = useState([...numberSet[0]].length)

    const choosing = () => {
        onClose()
        onChoose(currentNumbers)
    }

    const totalSelected = useCallback(() => {
        const curr = [...currentNumbers]
        let count = 0;
        for (let i = 0; i < curr[indexPage].length; i++) {
            if (curr[indexPage][i] !== false) count++
        }
        return count
    }, [currentNumbers, indexPage])

    const changeNumber = useCallback((numbers: any) => {
        let curr = [...currentNumbers]
        curr[indexPage] = numbers
        setCurrentNumbers(curr)
    }, [currentNumbers, indexPage])

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
        if (page || page === 0) {
            swiperRef.current?.scrollToIndex({ animated: false, index: page })
        }
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

    const [numberChangeObj, setNumberChangeObj] = useState([])
    const handleNumberChange = useCallback((value: any) => {
        setNumberChangeObj(value)
    }, [])
    useEffect(() => {
        changeNumber(numberChangeObj)
    }, [numberChangeObj])

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
                <TitleNumberSheet
                    indexPage={indexPage}
                    swiperRef={swiperRef}
                    totalSelected={totalSelected()}
                    currentLevel={currentLevel}
                    lottColot={lottColor}
                />
                <View style={{ flex: 1, marginTop: 12 }}>
                    <SwiperFlatList
                        // onViewableItemsChanged={(params) => setIndexPage(params.changed?.[0]?.index)}
                        // useReactNativeGestureHandler={true}
                        index={0}
                        ref={swiperRef}
                        data={currentNumbers}
                        renderItem={({ item }) => {
                            return (
                                <PerPagePowerMegaView
                                    listNumber={item}
                                    lottColor={lottColor}
                                    onNumberChange={handleNumberChange}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => "" + index}
                        extraData={currentNumbers}
                        onChangeIndex={(index) => setIndexPage(index.index)}
                    />
                </View>
                <TouchableOpacity disabled={!checkIsOk()} style={[styles.confirmButton, { backgroundColor: lottColor, opacity: checkIsOk() ? 1 : 0.4 }]} onPress={choosing}>
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet >
    );
});

export const ChooseNumberSheet = React.memo(Wiget)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 520
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