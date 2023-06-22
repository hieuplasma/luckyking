import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, FlatList, ActivityIndicator } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { getColorLott, printDraw } from '@utils';
import { LotteryType } from '@common';
import { IText } from '@components';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { lotteryApi } from '@api';
import { loadMoreKenoDraw } from '@redux';

interface ChooseTypeSheetProps {
    currentChoose: any,
    onChoose: (data: any) => void,
}

const lottColor = Color.keno

const Wiget = forwardRef(({ currentChoose, onChoose }: ChooseTypeSheetProps, ref) => {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const listDraw = useSelector((state: any) => state.drawReducer.kenoListDraw)

    const dispatch = useDispatch()

    const specificInclude = useCallback((array: any, element: any) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].drawCode == element.drawCode) return true
        }
        return false
    }, [])

    useEffect(() => {
        if (listDraw.length == 0) return setCurrentDraw([])
        let tmp = [...currentDraw]
        for (let i = 0; i < currentDraw.length; i++) {
            if (!specificInclude(listDraw, currentDraw[i]))
                tmp.splice(i, 1)
        }
        if (tmp.length == 0) tmp = [listDraw[0]]
        setCurrentDraw(tmp)
    }, [listDraw])

    const [currentDraw, setCurrentDraw] = useState(currentChoose)

    const changeDraw = (item: any) => {
        const newList = [...currentDraw]
        if (specificInclude(newList, item)) {
            if (newList.length > 1) {
                const index = newList.indexOf(item)
                newList.splice(index, 1)
            }
        }
        else newList.push(item)
        setCurrentDraw(newList)
    }

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

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

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity activeOpacity={0.4} style={styles.item} onPress={() => changeDraw(item)}>
                <Image
                    source={specificInclude(currentDraw, item) ? Images.checked_box : Images.check_box}
                    style={{ width: 24, height: 24 }}
                    tintColor={specificInclude(currentDraw, item) ? lottColor : '#130F26'}
                />
                <IText style={{ fontSize: 14, marginLeft: 18, color: Color.black }}>
                    {`${printDraw(item)}`}
                </IText>
            </TouchableOpacity>
        )
    }

    const loadMore = useCallback(async () => {
        if (isOpen) {
            const res = await lotteryApi.getScheduleKeno({ skip: listDraw.length, take: 20 })
            if (res) dispatch(loadMoreKenoDraw(res.data))
        }
    }, [listDraw, isOpen])

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
                <FlatList
                    style={{ paddingHorizontal: 24, paddingVertical: 6, flex: 1 }}
                    data={listDraw}
                    extraData={listDraw}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => renderItem(item)}
                    ListFooterComponent={<View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='small' />
                    </View>}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    maxToRenderPerBatch={10}
                />
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