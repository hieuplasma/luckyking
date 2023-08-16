import { Image, Images } from '@assets';
import { OTPSender } from '@common';
import { IText } from '@components';
import { saveOTPSender } from '@redux';
import { Color } from '@styles';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface ModalConfirmProps {
    visible: boolean,
    phoneNumber?: string,
    onConfirm: () => void,
    onCancel: () => void
    textConfirm?: string,
}

const zaloContent = "LuckyKing sẽ gửi mã xác thực OTP qua Zalo của số điện thoại trên. Quý khách vui lòng kiểm tra Zalo số điện thoại trên để nhận mã OTP!"
const voiceContent = "LuckyKing sẽ gửi mã xác thực OTP qua cuộc gọi tới số điện thoại trên. Quý khách vui lòng nghe máy để nhận mã OTP!"

export const ModalConfirmSendOTP = React.memo(({ visible, phoneNumber, onConfirm, onCancel, textConfirm }: ModalConfirmProps) => {

    const dispatch = useDispatch()
    const otpSender = useSelector((state: any) => state.systemReducer.otpSender)

    const [isVisible, setIsVisible] = useState(visible);
    useEffect(() => {
        setIsVisible(visible)
    }, [visible])

    const handleConfirm = () => {
        setIsVisible(false);
        onConfirm();
    };

    const handleCancel = useCallback(() => {
        setIsVisible(false);
        onCancel();
    }, [onCancel])

    const chooseZaloOTP = useCallback(() => {
        dispatch(saveOTPSender({ otpSender: OTPSender.ZALO }))
    }, [])
    const chooseVoiceOTP = useCallback(() => {
        dispatch(saveOTPSender({ otpSender: OTPSender.VOICE_OTP }))
    }, [])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={handleCancel}>
                <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => { }}>
                    <IText>{'Số điện thoại của quý khách là:'}</IText>
                    <IText style={{ fontWeight: 'bold' }}>{phoneNumber}</IText>
                    <IText>{''}</IText>
                    <IText>{'Lựa chọn hình thức nhận mã xác thực OTP:'}</IText>

                    <TouchableOpacity style={styles.lineCheck} activeOpacity={1} onPress={chooseVoiceOTP}>
                        <Image
                            source={otpSender == OTPSender.VOICE_OTP ? Images.checked_box : Images.check_box}
                            tintColor={otpSender == OTPSender.VOICE_OTP ? Color.luckyKing : Color.gray} style={styles.checkbox}
                        />
                        <IText style={{ marginLeft: 16, fontWeight: 'bold', width: 60}}>{'Cuộc gọi'}</IText>
                        <Image source={Images.phone} style={styles.ic} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lineCheck} activeOpacity={1} onPress={chooseZaloOTP}>
                        <Image
                            source={otpSender == OTPSender.ZALO ? Images.checked_box : Images.check_box}
                            tintColor={otpSender == OTPSender.ZALO ? Color.luckyKing : Color.gray} style={styles.checkbox}
                        />
                        <IText style={{ marginLeft: 16, fontWeight: 'bold', width: 60 }}>{'Zalo OTP'}</IText>
                        <Image source={Images.zalo} style={styles.ic} />

                    </TouchableOpacity>
                    <IText style={{minHeight: 60, marginTop: 10}}>
                        {otpSender == OTPSender.ZALO ?
                            zaloContent : voiceContent}
                    </IText>

                    <View style={styles.line} />

                    <IText style={{ color: Color.luckyKing, textAlign: 'center' }}
                        onPress={handleConfirm}>
                        {textConfirm ? textConfirm : 'Đã hiểu'}
                    </IText>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 10,
        // alignItems: 'center',
        padding: 10,
        width: windowWidth - 40
    },
    line: {
        height: 1, marginHorizontal: -10,
        backgroundColor: '#CBCACA', marginVertical: 10
    },
    lineCheck: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
    checkbox: {
        width: 26, height: 26, marginLeft: 4
    },
    ic: {
        width: 20, height: 20, marginLeft: 4
    }
})
