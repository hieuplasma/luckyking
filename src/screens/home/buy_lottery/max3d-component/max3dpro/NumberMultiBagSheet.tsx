import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { IText } from '@components';
import { TitleNumberSheet } from '../../component/TitleNumberSheet';
import { PerPageMultiBagSheet } from './PerPageMultiBagSheet';

interface Props {
    onChoose: (data1: any) => void,
    numberSet: any,
    page?: number,
}

const lottColor = Color.max3dpro

const Wiget = forwardRef(({ onChoose, numberSet, page }: Props, ref) => {

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
    //     console.log(page)
    //     try {
    //         (page || page === 0) ? swiperRef.current?.scrollToIndex({ animated: false, index: page }) : console.log("khong scroll duoc")
    //     } catch (error) {

    //     }
    // }, [page])

    const [currentNumbers, setCurrentNumbers] = useState([...numberSet])

    const choosing = () => {
        onClose()
        onChoose(currentNumbers)
    }

    const changeNumber = useCallback((numbers: any) => {
        let curr = [...currentNumbers]
        curr[indexPage] = numbers
        setCurrentNumbers(curr)
    }, [currentNumbers, indexPage])

    const checkIsOk = useCallback(() => {
        const tmp = [...currentNumbers]
        for (let i = 0; i < tmp.length; i++) {
            for (const element of tmp[i]) {
                if (element === false) return false
            }
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
                    maxIndex={currentNumbers.length - 1} />
                <ScrollView style={{ flex: 1, marginTop: 12 }}>
                    <SwiperFlatList
                        index={0}
                        ref={swiperRef}
                        data={currentNumbers}
                        extraData={currentNumbers}
                        renderItem={({ item, index }) => {
                            return (
                                <PerPageMultiBagSheet
                                    listNumber={item}
                                    onChangeNumber={handleNumberChange}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => "" + index}
                        onChangeIndex={index => onChangeIndex(index)}
                    />
                </ScrollView>
                <TouchableOpacity disabled={!checkIsOk()} style={[styles.confirmButton, { backgroundColor: lottColor, opacity: checkIsOk() ? 1 : 0.4 }]} onPress={choosing}>
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet >
    );
});

export const NumberMultiBagSheet = React.memo(Wiget)

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