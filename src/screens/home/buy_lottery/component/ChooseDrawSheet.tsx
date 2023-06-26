import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { getColorLott, printDraw } from '@utils';
import { LotteryType } from '@common';
import { IText } from '@components';

interface ChooseTypeSheetProps {
    currentChoose: any,
    onChoose: (data: any) => void,
    listDraw: any,
    type: LotteryType
}

const ChooseDrawSheetComponent = forwardRef(({ currentChoose, onChoose, listDraw, type }: ChooseTypeSheetProps, ref) => {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const lottColor = getColorLott(type)
    const [currentDraw, setCurrentDraw] = useState(currentChoose)

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

    const choosing = (type: any) => {
        onClose()
        onChoose(type);
    }

    const changeDraw = useCallback((item: any) => {
        const newList = [...currentDraw]
        if (newList.includes(item)) {
            if (newList.length > 1) {
                const index = newList.indexOf(item)
                newList.splice(index, 1)
            }
        }
        else newList.push(item)
        setCurrentDraw(newList)
    }, [currentDraw])

    const selectAll = useCallback(() => {
        setCurrentDraw(listDraw)
    }, [listDraw])

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
                <IText style={styles.titleSheet}>{"Chọn kì quay"}</IText>
                <View style={{ flexDirection: 'row', flex: 1, paddingHorizontal: 24, paddingVertical: 6 }}>
                    <View style={styles.listDrawContainer}>
                        {listDraw.map((item: any, index: number) => {
                            return (
                                <TouchableOpacity activeOpacity={0.4} key={index} style={styles.item} onPress={() => changeDraw(item)}>
                                    <Image
                                        source={currentDraw.includes(item) ? Images.checked_box : Images.check_box}
                                        style={{ width: 24, height: 24 }}
                                        tintColor={currentDraw.includes(item) ? lottColor : '#130F26'}
                                    />
                                    <IText style={{ fontSize: 14, marginLeft: 18, color: Color.black }}>
                                        {`${printDraw(item)}`}
                                    </IText>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <TouchableOpacity activeOpacity={0.4} style={styles.item} onPress={selectAll}>
                            <Image
                                source={currentDraw.length == listDraw.length ? Images.checked_box : Images.check_box}
                                style={{ width: 24, height: 24 }}
                                tintColor={currentDraw.length == listDraw.length ? lottColor : '#130F26'}
                            />
                            <IText style={{ fontSize: 14, marginLeft: 12, color: Color.black }}>
                                {'Chọn hết'}
                            </IText>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={[styles.confirmButton, { backgroundColor: lottColor }]} onPress={() => choosing(currentDraw)}>
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
});

export const ChooseDrawSheet = React.memo(ChooseDrawSheetComponent);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 415
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
    item: {
        alignItems: 'center',
        flexDirection: 'row', marginVertical: 6
    },
    listDrawContainer: {
        flex: 1,
        // flexDirection: 'row', flexWrap: 'wrap',
        justifyContent: 'center',
        // backgroundColor:'blue',
    },
    titleSheet: {
        fontSize: 18,
        color: Color.black, alignSelf: 'center',
        fontWeight: 'bold'
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