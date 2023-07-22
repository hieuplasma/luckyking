import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
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
    { label: "Bao 3 bộ 3 số", value: 3 },
    { label: "Bao 4 bộ 3 số", value: 4 },
    { label: "Bao 5 bộ 3 số", value: 5 },
    { label: "Bao 6 bộ 3 số", value: 6 },
    { label: "Bao 7 bộ 3 số", value: 7 },
    { label: "Bao 8 bộ 3 số", value: 8 },
    { label: "Bao 9 bộ 3 số", value: 9 },
    { label: "Bao 10 bộ 3 số", value: 10 },
    { label: "Bao 11 bộ 3 số", value: 11 },
    { label: "Bao 12 bộ 3 số", value: 12 },
    { label: "Bao 13 bộ 3 số", value: 13 },
    { label: "Bao 14 bộ 3 số", value: 14 },
    { label: "Bao 15 bộ 3 số", value: 15 },
    { label: "Bao 16 bộ 3 số", value: 16 },
    { label: "Bao 17 bộ 3 số", value: 17 },
    { label: "Bao 18 bộ 3 số", value: 18 },
    { label: "Bao 19 bộ 3 số", value: 19 },
    { label: "Bao 20 bộ 3 số", value: 20 },

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
                <ScrollView>
                    <View style={{ paddingHorizontal: 32, paddingVertical: 6, flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {types.map((item: any, index: number) => {
                            return (
                                <TouchableOpacity activeOpacity={0.4} key={index} style={styles.item} onPress={() => setCurrentType(item)}>
                                    <Image source={currentType.value == item.value ? getBallLott(type) : Images.ball_grey} style={styles.ball}></Image>
                                    <IText style={{ marginLeft: 12 }}>{`${item.label}`}</IText>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                <TouchableOpacity style={[styles.confirmButton, { backgroundColor: lottColor }]} onPress={() => choosing(currentType)}>
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
});

export const MultiBagSheet = React.memo(Wiget);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 500
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