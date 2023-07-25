import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Animated, View, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Color } from "@styles";
import { TitleSimpleKenoNumberSheet } from "./TitleSimpleKenoNumberSheet";
import { PerPageSimpleKeno } from "./PerPageSimpleKeno";
import { IText } from "@components";

const lottColor = Color.keno

const Wiget = forwardRef(({ page, numberSet, listBets, onChoose }: any, ref) => {

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const swiperRef = useRef<SwiperFlatList>(null);

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

    const [indexPage, setIndexPage] = useState(0)
    const onChangeIndex = useCallback((index: any) => {
        setIndexPage(index.index)
    }, [])
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

    const changeNumber = useCallback((numbers: any) => {
        let curr = [...currentNumbers]
        curr[indexPage] = numbers
        setCurrentNumbers(curr)
    }, [currentNumbers, indexPage])

    const changeBet = useCallback((bet: number) => {
        let curr = [...currentBets]
        curr[indexPage] = bet
        setCurrentBets(curr)
    }, [currentBets, indexPage])

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
                <TitleSimpleKenoNumberSheet
                    indexPage={indexPage}
                    selected={currentNumbers[indexPage]}
                    swiperRef={swiperRef}
                />
                <ScrollView style={{ flex: 1 }}>
                    <SwiperFlatList
                        index={0}
                        ref={swiperRef}
                        data={currentNumbers}
                        extraData={currentNumbers}
                        // useReactNativeGestureHandler
                        renderItem={({ item, index }) => {
                            return (
                                <PerPageSimpleKeno
                                    listNumber={item}
                                    bet={listBets[index]}
                                    onChangeNumber={handleNumberChange}
                                    onChangeBet={handleBetChange}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => "" + index}
                        onChangeIndex={onChangeIndex}
                    />
                    <View style={{ height: 300 }} />
                </ScrollView>
                <TouchableOpacity style={styles.confirmButton} onPress={choosing}>
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
})

export const NumberSheetSimpleKeno = React.memo(Wiget)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 1000
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
        margin: 16, backgroundColor: Color.keno, borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        height: 44, width: windowWidth - 32, marginBottom: 4, marginTop: 8
    },
    textConfirm: {
        color: Color.white,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: lottColor
    }
})