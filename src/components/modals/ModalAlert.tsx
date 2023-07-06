import { Color } from '@styles';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IText } from '../texts';

interface ModalConfirmProps {
    visible: boolean,
    message: string,
    onConfirm: () => void,
    textConfirm?: string,
}

export const ModalAlert = React.memo(({ visible, message, onConfirm,  textConfirm }: ModalConfirmProps) => {
    const [isVisible, setIsVisible] = useState(visible);
    useEffect(() => {
        setIsVisible(visible)
    }, [visible])

    const handleConfirm = () => {
        setIsVisible(false);
        onConfirm();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View style={styles.modalContainer}>
                <View style={styles.container}>
                    <IText style={{ fontSize: 14, fontWeight: 'bold', lineHeight: 22 }}>{message}</IText>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleConfirm} style={[styles.button, {backgroundColor: Color.luckyKing}]}>
                            <IText style={[{ color: Color.white }, styles.textButton]}>{textConfirm ?? "Đồng ý"}</IText>
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
