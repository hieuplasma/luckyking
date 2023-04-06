import { Color } from '@styles';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ModalConfirmProps {
    visible: boolean,
    message: string,
    onConfirm: () => void,
    onCancel: () => void,
    textConfirm?: string,
    textCancel?: string
}

export const ModalConfirm = React.memo(({ visible, message, onConfirm, onCancel, textConfirm, textCancel }: ModalConfirmProps) => {
    const [isVisible, setIsVisible] = useState(visible);
    useEffect(() => {
        setIsVisible(visible)
    }, [visible])

    const handleConfirm = () => {
        setIsVisible(false);
        onConfirm();
    };

    const handleCancel = () => {
        setIsVisible(false);
        onCancel();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={handleCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', lineHeight: 22 }}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleCancel} style={[styles.button, { backgroundColor: Color.white }]}>
                            <Text style={[{ color: Color.luckyKing }, styles.textButton]}>{textCancel ?? "Huỷ"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleConfirm} style={[styles.button, {backgroundColor: Color.luckyKing}]}>
                            <Text style={[{ color: Color.white }, styles.textButton]}>{textConfirm ?? "Đồng ý"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        alignItems: 'center',
        padding: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    button: {
        width: 120, height: 44,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 10, borderWidth: 1,
        borderColor: Color.luckyKing, marginHorizontal: 10
    },
    textButton: {
        fontWeight: '700',
        fontSize: 16
    }
})
