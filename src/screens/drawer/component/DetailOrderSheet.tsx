import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { dateTimeConvert, fullDateTimeConvert, fullDateTimeConvert2, getColorLott, printDisplayId, printDraw, printMoney, printNumber } from '@utils';
import { LotteryType } from '@common';
import { IText } from '@components';
import { useSelector } from 'react-redux';

interface Props {
    order: any
}

const Wiget = forwardRef(({ order }: Props, ref) => {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const user = useSelector((state: any) => state.userReducer)

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

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
            <View style={{ flex: 1, paddingBottom: 30, paddingHorizontal: 16 }}>

                <IText style={styles.bigTitle}>
                    {"Thông tin đơn " + printDisplayId(order.displayId)}
                </IText>

                <View style={{ height: 8 }} />
                <View style={styles.titleContainer}>
                    <IText style={styles.smallTitle}>{"Thông tin đơn hàng"}</IText>
                </View>
                <View style={styles.lineTx}>
                    <IText>{"Mã đơn hàng:"}</IText>
                    <IText>{printDisplayId(order.displayId)}</IText>
                </View>
                <View style={styles.lineTx}>
                    <IText>{"Thời gian đặt vé:"}</IText>
                    <IText>{fullDateTimeConvert2(new Date(order.createdAt))}</IText>
                </View>
                <View style={styles.lineTx}>
                    <IText>{"Thời gian bán vé:"}</IText>
                    <IText>{order.confirmAt ? fullDateTimeConvert2(new Date(order.confirmAt)) : "Chưa bán"}</IText>
                </View>

                <View style={styles.line} />

                <View style={styles.titleContainer}>
                    <IText style={styles.smallTitle}>{"Thông tin thanh toán:"}</IText>
                </View>
                <View style={styles.lineTx}>
                    <IText>{"Tiền vé:"}</IText>
                    <IText>{`${printMoney(order.amount)}đ`}</IText>
                </View>
                <View style={styles.lineTx}>
                    <IText>{"Phí giao dịch:"}</IText>
                    <IText>{`${printMoney(order.surcharge)}đ`}</IText>
                </View>
                <View style={styles.lineTx}>
                    <IText>{"Tổng tiền:"}</IText>
                    <IText>{`${printMoney(order.amount + order.surcharge)}đ`}</IText>
                </View>
                <View style={styles.lineTx}>
                    <IText>{"Hình thức thanh toán:"}</IText>
                    <IText>{"Tài khoản LuckyKing"}</IText>
                </View>

                <View style={styles.line}/>

                <View style={styles.titleContainer}>
                    <IText style={styles.smallTitle}>{"Thông tin khách hàng:"}</IText>
                </View>
                <View style={styles.lineTx}>
                    <IText>{"Người nhận:"}</IText>
                    <IText>{user.fullName}</IText>
                </View>
                <View style={styles.lineTx}>
                    <IText>{"Số CMND/CCCD:"}</IText>
                    <IText>{user.identify}</IText>
                </View>
                <View style={styles.lineTx}>
                    <IText>{"Số điện thoại:"}</IText>
                    <IText>{user.phoneNumber}</IText>
                </View>

            </View>
        </BottomSheet>
    );
});

export const DetailOrderSheet = React.memo(Wiget);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 560
const BACKGROUND_OPACITY = 0.85

const styles = StyleSheet.create({
    sheetContainer: { backgroundColor: '#F4F4F4', borderTopLeftRadius: 20, borderTopRightRadius: 20, },
    background: {
        backgroundColor: '#000',
        position: 'absolute',
        top: -1000,
        left: 0,
        right: 0,
        bottom: 0,
    },
    titleContainer: {
        marginHorizontal: -16, paddingHorizontal: 16,
        backgroundColor: '#FAF5F5',
        height: 24, marginTop: 12,
        justifyContent: 'center'
    },
    bigTitle: {
        fontSize: 18, fontWeight: 'bold',
        alignSelf: 'center',
    },
    smallTitle: {
        fontWeight: 'bold'
    },
    lineTx: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    line: {
        marginTop: 12,
        width: '100%',
        height: 1, backgroundColor: '#A0A0A0',
        opacity: 0.2
    }
})