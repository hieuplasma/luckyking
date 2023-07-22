import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, ColorValue } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { LotteryType } from '@common';
import { getColorLott } from '@utils';
import { ConsolasText, IText } from '@components';

interface BagNumberSheetProps {
    onChoose: (data1: any) => void,
    numberSet: any,
    type: LotteryType,
    bagPosition: number
}

const fullNumber = Array.from({ length: 10 }, (_, index) => index);

export const BagNumberSheet = forwardRef(({ onChoose, numberSet, type, bagPosition }: BagNumberSheetProps, ref) => {

    const lottColor = getColorLott(type)

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

    const [currentNumbers, setCurrentNumbers] = useState([...numberSet])

    const choosing = () => {
        onClose()
        onChoose(currentNumbers)
    }

    const changeNumber = (number: number, columnId: number,) => {
        let tmp = [...currentNumbers]
        tmp[columnId] = number
        setCurrentNumbers(tmp)
    }

    const checkIsOk = useCallback(() => {
        const tmp = [...currentNumbers]
        let len = tmp.length
        for (const element of tmp) {
            let count = 0;
            if (element === false) count++
            if (count != 0 && count != len) return false
        }
        return true
    }, [currentNumbers])

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
            <View style={{ flex: 1, paddingTop: 12, justifyContent: 'space-between'}}>
                <View style={{ marginHorizontal: 16, width: windowWidth - 32 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View style={styles.half}>
                            {
                                bagPosition == 1 ?
                                    <View style={[styles.boxNumber, { borderColor: lottColor, width: 100 }]}>
                                        <ConsolasText style={{ color: lottColor, fontSize: 16 }}>{"Bộ bao số"}</ConsolasText>
                                    </View>
                                    : [0, 1, 2].map((columnId: number, index: number) => {
                                        return (
                                            <ItemView
                                                key={index}
                                                columnId={columnId}
                                                currentNumbers={currentNumbers}
                                                lottColor={lottColor}
                                                changeNumber={changeNumber}
                                            />
                                        )
                                    })
                            }
                        </View>
                        <View style={{ height: '100%', width: 1, backgroundColor: "#DADADA", borderRadius: 10 }} />
                        <View style={styles.half}>
                            {
                                bagPosition == 2 ?
                                    <View style={[styles.boxNumber, { borderColor: lottColor, width: 100 }]}>
                                        <ConsolasText style={{ color: lottColor, fontSize: 16 }}>{"Bộ bao số"}</ConsolasText>
                                    </View>
                                    : [0, 1, 2].map((columnId: number, index: number) => {
                                        return (
                                            <ItemView
                                                key={index}
                                                columnId={columnId}
                                                currentNumbers={currentNumbers}
                                                lottColor={lottColor}
                                                changeNumber={changeNumber}
                                            />
                                        )
                                    })
                            }
                        </View>
                    </View>
                </View>
                <TouchableOpacity disabled={!checkIsOk()} style={[styles.confirmButton, { backgroundColor: lottColor, opacity: checkIsOk() ? 1 : 0.4 }]} onPress={choosing}>
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet >
    );
});

interface ItemViewProps {
    columnId: number,
    currentNumbers: any,
    lottColor: ColorValue,
    changeNumber: (number: number, columnId: number) => void
}
const ItemView = React.memo(({ columnId, currentNumbers, lottColor, changeNumber }: ItemViewProps) => {
    return (
        <View key={columnId + ""}>
            {
                fullNumber.map((number: number, index2: number) => {
                    const check = (currentNumbers[columnId] === number ? true : false)
                    return (
                        <View style={styles.ballContainer} key={number + ':::' + index2}  >
                            <TouchableOpacity activeOpacity={0.8} style={[styles.ball, { backgroundColor: check ? lottColor : '#E9E6E6' }]} onPress={() => changeNumber(number, columnId)}>
                                <ConsolasText style={[styles.textBall, { color: check ? Color.white : Color.black }]}>{number}</ConsolasText>
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 590
const BACKGROUND_OPACITY = 0.85

const styles = StyleSheet.create({
    sheetContainer: { backgroundColor: '#F4F4F4', borderTopLeftRadius: 20, borderTopRightRadius: 20},
    background: {
        backgroundColor: '#000',
        position: 'absolute',
        top: -1000,
        left: 0,
        right: 0,
        bottom: -100,
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
    boxNumber: {
        width: 70, height: 28,
        marginVertical: 4, borderRadius: 15,
        borderWidth: 1, justifyContent: 'space-evenly',
        alignItems: 'center', flexDirection: 'row'
    },
    half: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }
})