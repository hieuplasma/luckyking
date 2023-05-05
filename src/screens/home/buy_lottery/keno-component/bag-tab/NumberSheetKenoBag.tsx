import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { Animated, View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from "@styles";
import { IText } from "@components";
import { TitleBagKenoNumberSheet } from "./TitleBagKenoNumberSheet";
import { PerPageBagKeno } from "./PerPageBagKeno";

const lottColor = Color.keno

const Wiget = forwardRef(({ numberSet, onChoose }: any, ref) => {

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

    const [currentNumbers, setCurrentNumbers] = useState([...numberSet])
    const [currentBet, setCurrentBet] = useState(10000)

    const choosing = () => {
        onClose()
        onChoose(currentNumbers, currentBet)
    }

    const changeNumber = useCallback((numbers: any) => {
        setCurrentNumbers(numbers)
    }, [])

    const changeBet = useCallback((bet: number) => {
        setCurrentBet(bet)
    }, [])

    const checkIsOk = useCallback(() => {
        for (const element of currentNumbers)
            if (element === false) return false
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
            <View style={{ flex: 1 }}>
                <TitleBagKenoNumberSheet selected={currentNumbers} />
                <View style={{ flex: 1 }}>
                    <PerPageBagKeno
                        listNumber={currentNumbers}
                        bet={currentBet}
                        onChangeNumber={changeNumber}
                        onChangeBet={changeBet}
                    />
                </View>
                <TouchableOpacity style={[styles.confirmButton, { opacity: checkIsOk() ? 1 : 0.4 }]} onPress={choosing} disabled={!checkIsOk()}>
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
})

export const NumberSheetKenoBag = React.memo(Wiget)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 582
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