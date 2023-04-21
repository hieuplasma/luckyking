import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { getColorLott, printDraw } from '@utils';
import { LotteryType } from '@common';
import { IText } from '@components';
import { useSelector } from 'react-redux';

interface ChooseTypeSheetProps {
    currentChoose: any,
    onChoose: (data: any) => void,
}

const lottColor = Color.keno

const Wiget = forwardRef(({ currentChoose, onChoose }: ChooseTypeSheetProps, ref) => {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const listDraw = useSelector((state: any) => state.drawReducer.kenoListDraw)

    useEffect(() => {
        if (!listDraw.includes(currentDraw)) {
            setCurrentDraw(listDraw[0])
        }
    }, [listDraw])

    const [currentDraw, setCurrentDraw] = useState(currentChoose)

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

    useEffect(() => {
        console.log('ChooseDrawSheet has been re-rendered, ');
    });

    const choosing = (draw: any) => {
        onClose()
        onChoose(draw);
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
        setCurrentDraw(currentChoose)
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
                <IText style={{ fontSize: 18, color: Color.black, alignSelf: 'center', fontWeight: 'bold' }}>{"Chọn kì quay"}</IText>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 6, flex: 1 }}>
                        {listDraw.map((item: any, index: number) => {
                            return (
                                <TouchableOpacity activeOpacity={0.4} key={index} style={styles.item} onPress={() => setCurrentDraw(item)}>
                                    <Image
                                        source={item.drawCode == currentDraw.drawCode ? Images.checked_box : Images.check_box}
                                        style={{ width: 24, height: 24 }}
                                        tintColor={item.drawCode == currentDraw.drawCode ? lottColor : '#130F26'}
                                    />
                                    <IText style={{ fontSize: 14, marginLeft: 18, color: Color.black }}>
                                        {`${printDraw(item)}`}
                                    </IText>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                <TouchableOpacity style={[styles.confirmButton, { backgroundColor: lottColor }]} onPress={() => choosing(currentDraw)}>
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
});

export const ChooseDrawKeno = React.memo(Wiget);

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
    item: { alignItems: 'center', width: '100%', flexDirection: 'row', marginVertical: 6 },
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