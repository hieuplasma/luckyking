import { IText } from '@components';
import { Color } from '@styles';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ModalConfirmProps {
    visible: boolean,
    phoneNumber?: string,
    onConfirm: () => void,
    onCancel: () => void
    textConfirm?: string,
}

export const ModalConfirmSendOTP = React.memo(({ visible, phoneNumber, onConfirm, onCancel, textConfirm }: ModalConfirmProps) => {
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

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={handleCancel}>
                <View style={styles.container}>
                    <IText>{'Số điện thoại của quý khách là:'}</IText>
                    <IText style={{ fontWeight: 'bold' }}>{phoneNumber}</IText>
                    <IText>{''}</IText>
                    <IText>
                        {"LuckyKing sẽ gửi mã xác thực OTP qua Zalo của số điện thoại trên, Quý khách vui lòng kiểm tra Zalo số điện thoại trên để nhận mã OTP!"}
                    </IText>

                    <View style={styles.line} />

                    <IText style={{ color: Color.luckyKing, textAlign: 'center' }}
                        onPress={handleConfirm}>
                        {textConfirm ? textConfirm : 'Đã hiểu'}
                    </IText>
                </View>
            </TouchableOpacity>
        </Modal>
    );
});


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
        padding: 10
    },
    line: {
        height: 1, marginHorizontal: -10,
        backgroundColor: '#CBCACA', marginVertical: 10
    }
})
