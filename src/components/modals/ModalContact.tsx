import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IText } from '../texts';
import { Image, Images } from '@assets';
import { Linking } from 'react-native';
import { HOT_LINE } from '@common';

interface ModalContact {
    visible: boolean,
    onCancel: () => void
}

//@ts-ignore
const phoneNumber = HOT_LINE.replaceAll('.', '')

export const ModalContact = React.memo(({ visible, onCancel }: ModalContact) => {
    const [isVisible, setIsVisible] = useState(visible);
    useEffect(() => {
        setIsVisible(visible)
    }, [visible])

    const handleCancel = () => {
        setIsVisible(false);
        onCancel();
    };

    const call = useCallback(() => {
        let url = phoneNumber
        if (Platform.OS !== 'android') {
            url = `telprompt:${phoneNumber}`;
        }
        else {
            url = `tel:${phoneNumber}`;
        }
        if (Platform.OS !== 'android') {
            Linking.canOpenURL(url)
                .then(supported => {
                    if (!supported) {
                        Alert.alert('Thông báo', 'Số điện thoại CSKH của chúng tôi hiện đang bảo trì!');
                    } else {
                        return Linking.openURL(url);
                    }
                })
                .catch(err => console.log(err));
        }
        else Linking.openURL(url);
    }, [])

    const openZalo = useCallback(() => {
        const url = `https://zalo.me/${phoneNumber}`
        if (Platform.OS !== 'android') {
            Linking.canOpenURL(url)
                .then(supported => {
                    if (!supported) {
                        Alert.alert('Thông báo', 'Tài khoản Zalo của chúng tôi hiện đang bảo trì!');
                    } else {
                        return Linking.openURL(url);
                    }
                })
                .catch(err => console.log(err));
        }
        else Linking.openURL(url);
        Linking.openURL(url);
    }, [])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={handleCancel}
        >
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={handleCancel}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={call}
                        activeOpacity={1}>
                        <Image source={Images.phone} style={{ width: 30, height: 30 }} />
                        <IText style={{ fontWeight: 'bold', marginLeft: 12 }}> {`Hotline: ${HOT_LINE}`}</IText>
                    </TouchableOpacity>
                    <View style={{ height: 8 }}></View>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={openZalo}
                        activeOpacity={1}>
                        <Image source={Images.zalo} style={{ width: 30, height: 30 }} />
                        <IText style={{ fontWeight: 'bold', marginLeft: 12 }}> {"Zalo: LuckyKing"}</IText>
                    </TouchableOpacity>

                    <Image source={Images.exit} style={styles.btnExit} />
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
        paddingTop: 30, paddingBottom: 20,
    },
    item: { flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 40 },
    btnExit: {
        width: 20, height: 20,
        position: 'absolute',
        top: 5, right: 5
    }
})
