import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IText } from '../texts';
import { Color, Style } from '@styles';
import { useDispatch, useSelector } from 'react-redux';
import { InputComponent } from '../input';
import { authApi } from '@api';
import { removeCart, removeToken, removeUser } from '@redux';
import { NavigationUtils } from '@utils';
import { ScreenName } from '@navigation';

interface ModalContact {
    visible: boolean,
    navigation: any,
    onCancel: () => void,
    textCancel?: string,
    textConfirm?: string
}

export const ModalDelAcc = React.memo(({ visible, navigation, onCancel, textCancel, textConfirm }: ModalContact) => {

    const dispatch = useDispatch()

    const phoneNumber = useSelector((state: any) => state.userReducer.phoneNumber);

    const [isVisible, setIsVisible] = useState(visible);
    const [loading, setLoading] = useState(false)

    const [password, setPassword] = useState<string | undefined>("")
    const onChangePassword = useCallback((password?: string) => {
        setPassword(password);
    }, []);

    useEffect(() => {
        setIsVisible(visible)
    }, [visible])

    const handleCancel = useCallback(() => {
        setIsVisible(false)
        setPassword("")
        onCancel()
    }, [onCancel])

    const handleConfirm = useCallback(async () => {
        setLoading(true)
        const res = await authApi.deleteAccount({
            phoneNumber: phoneNumber,
            password: password?.trim()
        })
        setLoading(false)
        if (res.data) {
            if (res.data.message) {
                Alert.alert("Thông báo", res.data.message)
            }
            else {
                Alert.alert("Thông báo", "Tài khoản của Quý khách sẽ bị khóa cho đến khi quá trình xóa tài khoản kết thúc. Cảm ơn quý khách đã sử dụng dịch vụ của LuckyKing.", [
                    {
                        text: 'Ok', onPress: () => {
                            handleCancel()
                            dispatch(removeToken())
                            dispatch(removeUser())
                            dispatch(removeCart())
                            navigation?.closeDrawer();
                            NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication);
                        }
                    },
                ])
            }
        }
    }, [navigation, phoneNumber, password, handleCancel])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={handleCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.container}>
                    <IText style={{ fontSize: 14, fontWeight: 'bold', lineHeight: 22 }}>{"Quý khách vui lòng nhập mật khẩu để khoá tài khoản"}</IText>

                    <InputComponent
                        editable={true}
                        keyboardType="default"
                        value={password}
                        placeholder={'Nhập mật khẩu'}
                        // label={"Mật khẩu"}
                        onChangeText={onChangePassword}
                        containerStyle={{ width: '100%', marginTop: 8 }}
                        secureTextEntry={true}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleCancel} style={[styles.button, { backgroundColor: Color.white }]}>
                            <IText style={[{ color: Color.luckyKing }, styles.textButton]}>{textCancel ?? "Huỷ"}</IText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleConfirm} style={[styles.button, { backgroundColor: Color.luckyKing, width: 150 }]}>
                            <IText style={[{ color: Color.white }, styles.textButton]}>{textConfirm ?? "Xoá tài khoản"}</IText>
                            {loading ? (
                                <ActivityIndicator
                                    size="small"
                                    color={Color.white}
                                    style={{ marginLeft: 8 }}
                                />
                            ) : (
                                <></>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        margin: 32,
        borderRadius: 10,
        alignItems: 'center',
        padding: 20,
        width: windowWidth - 64
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
        borderColor: Color.luckyKing, marginHorizontal: 10,
        flexDirection: 'row'
    },
    textButton: {
        fontWeight: '700',
        fontSize: 16
    }
})
