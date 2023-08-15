import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { LotteryType } from '@common';
import { getBallLott, getColorLott } from '@utils';
import { IText } from '@components';

interface Props {
    currentChoose: any,
    onChoose: (data: any) => void,
    type: LotteryType
}

const types = [
    { label: "Cơ bản", value: 1 },
    { label: "Đảo số", value: 2 },
    { label: "Ôm một vị trí", value: 3 },
    { label: "Bao bộ số", value: 4 }
]

const Wiget = forwardRef(({ currentChoose, onChoose, type }: Props, ref) => {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const lottColor = getColorLott(type)
    const [currentType, setCurrentType] = useState(currentChoose)

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

    const choosing = (type: any) => {
        onClose()
        onChoose(type);
    }

    const [opacity, setOpacity] = useState(new Animated.Value(0))
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
        }).start();
        bottomSheetRef.current?.close()
        setTimeout(() => {
            setIsOpen(false)
        }, 50);
    };

    const onOpen = () => {
        setIsOpen(true)
        setCurrentType(currentChoose)
        bottomSheetRef.current?.expand()
        Animated.timing(opacity, {
            toValue: BACKGROUND_OPACITY,
            duration: 300,
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
                <IText style={{ fontSize: 18, color: Color.black, alignSelf: 'center', fontWeight: 'bold' }}>{"Chọn cách chơi"}</IText>
                <View style={{ paddingHorizontal: 32, paddingVertical: 6, flex: 1 }}>
                    {types.map((item: any, index: number) => {
                        return (
                            <TouchableOpacity activeOpacity={0.4} key={index} style={styles.item} onPress={() => setCurrentType(item)}>
                                <Image source={currentType.value == item.value ? getBallLott(type) : Images.ball_grey} style={styles.ball}></Image>
                                <IText style={{ marginLeft: 12 }}>{`${item.label}`}</IText>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <TouchableOpacity style={[styles.confirmButton, { backgroundColor: lottColor }]} onPress={() => choosing(currentType)}>
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
});

export const TypeSheetMax3d = React.memo(Wiget);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 285
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
    item: { alignItems: 'center', flexDirection: 'row', marginVertical: 6 },
    ball: {
        width: 26, height: 26
    },
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