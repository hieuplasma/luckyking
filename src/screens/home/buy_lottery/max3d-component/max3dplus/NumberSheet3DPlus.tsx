import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { LotteryType } from '@common';
import { getColorLott, printMoney, printMoneyK, printNumber } from '@utils';
import { ConsolasText, IText } from '@components';
import { ChangeBetButton } from '../../component/ChangeBetButton';

interface NumberSheet3DPlusProps {
    onChoose: (data1: any, data2: any) => void,
    numberSet: any,
    page?: number,
    type: LotteryType,
    listBets: number[],
    hugePosition: number[]
}

const betMilestones = [
    10000, 20000, 30000, 50000, 100000, 200000, 300000
]

const column = [0, 1, 2]
const fullNumber = Array.from({ length: 10 }, (_, index) => index);

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
    useEffect(() => {
        (page || page === 0) ? swiperRef.current?.scrollToIndex({ animated: false, index: page }) : {}
    }, [page])

    const [currentNumbers, setCurrentNumbers] = useState([...numberSet])
    const [currentBets, setCurrentBets] = useState([...listBets])

    const choosing = () => {
        onClose()
        onChoose(currentNumbers, currentBets)
    }

    const changeNumber = (number: number, columnId: number,) => {
        let curr = [...currentNumbers]
        let tmp = [...curr[indexPage]]
        tmp[columnId] = number
        curr[indexPage] = tmp
        setCurrentNumbers(curr)
    }

    const changeBet = useCallback((bet: number, index: number) => {
        let curr = [...currentBets]
        curr[index] = bet
        setCurrentBets(curr)
    }, [currentBets])

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
    }, [currentNumbers])

    const [toggleObj, setToggleObj] = useState({ number: -1, columnId: -1 })
    const handleToggle = useCallback((number: number, columnId: number) => {
        setToggleObj({ number: number, columnId: columnId })
    }, []);

    useEffect(() => {
        changeNumber(toggleObj.number, toggleObj.columnId)
    }, [toggleObj])

    const ItemView = useCallback((item: any, index: number) => {
        return (
            <View style={{ marginHorizontal: 8, width: windowWidth - 16 }}>
                <View style={{ height: 440, flexDirection: 'row', justifyContent: 'space-between' }} key={index}>
                    {[0, 1, 2].map((columnId: number) => {
                        const filled = hugePosition.includes(columnId) ? true : false
                        return (
                            <View key={columnId + ""}>
                                {
                                    fullNumber.map((number: number, index2: number) => {
                                        const check = (item[columnId] === number ? true : false) || filled
                                        return (
                                            <MemoizedBallNumber
                                                key={index2}
                                                number={number}
                                                lottColor={lottColor}
                                                onToggle={handleToggle}
                                                check={check}
                                                filled={filled}
                                                columnId={columnId}
                                            />
                                        )
                                    })
                                }
                            </View>
                        )
                    })}
                    <View style={{ height: '100%', width: 1, backgroundColor: "#DADADA", borderRadius: 10 }} />
                    {[3, 4, 5].map((columnId: number) => {
                        const filled = hugePosition.includes(columnId) ? true : false
                        return (
                            <View key={columnId + ""}>
                                {
                                    fullNumber.map((number: number, index2: number) => {
                                        const check = (item[columnId] === number ? true : false) || filled
                                        return (
                                            <MemoizedBallNumber
                                                key={index2}
                                                number={number}
                                                lottColor={lottColor}
                                                onToggle={handleToggle}
                                                check={check}
                                                filled={filled}
                                                columnId={columnId}
                                            />
                                        )
                                    })
                                }
                            </View>
                        )
                    })}
                    <View style={{}}>
                        {
                            betMilestones.map((bet: number) => {
                                const check = bet == currentBets[indexPage] ? true : false
                                return (
                                    <TouchableOpacity key={bet} style={[styles.betBlock, { backgroundColor: check ? Color.max3d : Color.white }]}
                                        onPress={() => changeBet(bet, index)}>
                                        <IText style={[styles.textBet, { color: check ? Color.white : Color.max3d }]}>{printMoneyK(bet)}</IText>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        {/* <View style={[styles.betBlock, { backgroundColor: other ? Color.max3d : Color.white }]}>
                        <IText style={[styles.textBet, { color: other ? Color.white : Color.max3d }]}>{"Khác"}
                        </IText>
                    </View> */}
                    </View>

                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <ChangeBetButton
                        currentBet={currentBets[indexPage]}
                        increase={() => changeBet(currentBets[indexPage] + 10000, indexPage)}
                        decrease={() => changeBet(currentBets[indexPage] - 10000, indexPage)}
                        color={lottColor}
                        max={300000}
                        min={10000}
                    /></View>
            </View>
        )
    }, [currentNumbers, currentBets, changeBet, changeNumber]);

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

export const NumberSheet3DPlus = React.memo(Wiget)


const MemoizedBallNumber = React.memo(({ number, lottColor, onToggle, check, filled, columnId }: any) => {
    const handlePress = useCallback(() => {
        onToggle(number, columnId);
    }, [onToggle, number, check]);

    return (
        <View style={styles.ballContainer}  >
            <TouchableOpacity disabled={filled} activeOpacity={0.8} style={[styles.ball, { backgroundColor: check ? lottColor : '#E9E6E6' }]} onPress={handlePress}>
                <ConsolasText style={[styles.textBall, { color: check ? Color.white : Color.black, marginTop: filled ? -2 : 2 }]}>{filled ? "✽" : number}</ConsolasText>
            </TouchableOpacity>
        </View>
    )
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
    textBall: { fontSize: 16 },
    confirmButton: {
        margin: 16, backgroundColor: Color.power, borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        height: 44, width: windowWidth - 32
    },
    textConfirm: {
        color: Color.white,
        fontSize: 16,
        fontWeight: 'bold',
    },

    betBlock: {
        width: 63, height: 26, marginVertical: 9,
        borderRadius: 10, borderWidth: 1, borderColor: Color.max3d,
        justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
    },
    textBet: {
        fontSize: 16, color: Color.max3d
    }
})