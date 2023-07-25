import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { LotteryType } from '@common';
import { getColorLott, printMoney, printMoneyK, printNumber } from '@utils';
import { ConsolasText, IText } from '@components';
import { TitleNumberSheet } from '../../component/TitleNumberSheet';
import { PerPageMax3dPlus } from './PerPageMax3dPlus';

interface NumberSheet3DPlusProps {
    onChoose: (data1: any, data2: any) => void,
    numberSet: any,
    page?: number,
    type: LotteryType,
    listBets: number[],
    hugePosition: number[]
}

const Wiget = forwardRef(({ onChoose, numberSet, page, type, listBets, hugePosition }: NumberSheet3DPlusProps, ref) => {

    const lottColor = getColorLott(type)

    useEffect(() => {
        // console.log("Number Sheet max3d rerender")
    })

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
    // useEffect(() => {
    //     if (page || page === 0) {
    //         swiperRef.current?.scrollToIndex({ animated: false, index: page })
    //     }
    //     else {
    //         console.log("khong scroll duoc")
    //     }
    // }, [page])

    const [currentNumbers, setCurrentNumbers] = useState([...numberSet])
    const [currentBets, setCurrentBets] = useState([...listBets])

    const choosing = () => {
        onClose()
        onChoose(currentNumbers, currentBets)
    }

    const changeNumber = useCallback((numbers: number[]) => {
        let curr = [...currentNumbers]
        curr[indexPage] = numbers
        setCurrentNumbers(curr)
        console.log(curr)
    }, [currentNumbers, indexPage])

    const changeBet = useCallback((bet: number) => {
        let curr = [...currentBets]
        curr[indexPage] = bet
        setCurrentBets(curr)
    }, [currentBets, indexPage])

    const checkIsOk = useCallback(() => {
        const tmp = [...currentNumbers]
        let len = tmp[0].length
        if (hugePosition[0] > -1) len--
        if (hugePosition[1] > -1) len--
        for (let i = 0; i < tmp.length; i++) {
            const element = tmp[i]
            let count = 0;
            element.map((item: any) => {
                if (item === false) count++
            })
            if (count != 0 && count != len) return false
        }
        return true
    }, [currentNumbers, hugePosition])

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
        setCurrentBets([...listBets])
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

    const [betChangeObj, setBetChangeObj] = useState(0)
    const handleBetChange = useCallback((value: number) => {
        setBetChangeObj(value)
    }, [])
    useEffect(() => {
        changeBet(betChangeObj)
    }, [betChangeObj])

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
                />
                <View style={{ flex: 1, marginTop: 12 }}>
                    <SwiperFlatList
                        index={0}
                        ref={swiperRef}
                        data={currentNumbers}
                        extraData={currentNumbers}
                        renderItem={({ item, index }) => {
                            return (
                                <PerPageMax3dPlus
                                    listNumber={item}
                                    lottColor={lottColor}
                                    hugePosition={hugePosition}
                                    bet={listBets[index]}
                                    onChangeNumber={handleNumberChange}
                                    onChangeBet={handleBetChange}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => "" + index}
                        onChangeIndex={index => onChangeIndex(index)}
                    />
                </View>
                <TouchableOpacity disabled={!checkIsOk()} style={[styles.confirmButton, { backgroundColor: lottColor, opacity: checkIsOk() ? 1 : 0.4 }]} onPress={choosing}>
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet >
    );
});

export const NumberSheet3DPlus = React.memo(Wiget)

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