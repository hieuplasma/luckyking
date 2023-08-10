import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IText } from '../texts';
import { Image, Images } from '@assets';
import { Color } from '@styles';
import { useDispatch } from 'react-redux';
import { saveAlertCart, saveAlertKeno, saveAlertTesting, savePopupId } from '@redux';

interface ModalContact {
    visible: boolean,
    alertContent: string,
    typeAlert: string,
    popupId?: number
}

export const ModalAlert = React.memo(({ visible, alertContent, typeAlert, popupId }: ModalContact) => {

    const dispatch = useDispatch()

    const [isVisible, setIsVisible] = useState(visible);
    const [save, setSave] = useState(false)

    const toggleSave = useCallback(() => {
        setSave(!save)
    }, [save])

    useEffect(() => {
        setIsVisible(visible)
    }, [visible])

    const handleCancel = useCallback(() => {
        setIsVisible(false)
        if (save) {
            if (typeAlert == 'popup') dispatch(savePopupId({ popupId: popupId }))
            else if (typeAlert == 'testing') dispatch(saveAlertTesting({ expand: false }))
            else if (typeAlert == 'keno') dispatch(saveAlertKeno({ expand: false }))
            else if (typeAlert == 'cart') dispatch(saveAlertCart({ expand: false }))
        }
    }, [save, typeAlert])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={handleCancel}
        >
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <IText uppercase style={{ fontWeight: 'bold', color: Color.white }}>{"Thông báo"}</IText>
                    </View>
                    <View style={styles.body}>
                        <IText style={{ textAlign: Platform.OS !== 'android' ? 'justify' : 'auto', fontWeight: 'bold' }}>
                            {alertContent}
                        </IText>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 12 }} activeOpacity={1} onPress={toggleSave}>
                            <Image source={save ? Images.checked_box : Images.check_box} style={{ width: 20, height: 20 }} />
                            <IText style={{ marginLeft: 4 }}>{"Tôi đã hiểu, không hiển thị lần sau"}</IText>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.footer} activeOpacity={1} onPress={handleCancel}>
                        <IText uppercase style={{ textAlign: 'center', color: Color.luckyKing, fontWeight: 'bold' }}>
                            {"ĐÃ HIỂU"}
                        </IText>
                    </TouchableOpacity>
                </View>
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
        margin: 30,
        width: windowWidth - 60,
        borderRadius: 10,
    },
    header: {
        height: 35, backgroundColor: Color.luckyKing,
        justifyContent: 'center', alignItems: 'center',
        borderTopLeftRadius: 10, borderTopRightRadius: 10
    },
    body: {
        paddingHorizontal: 20, paddingVertical: 10
    },
    footer: {
        width: '100%',
        height: 35,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 10
    }
})
