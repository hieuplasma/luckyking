import { Image, Images } from "@assets";
import { HOT_LINE } from "@common";
import { IText, ImageHeader } from "@components";
import { SupportStackParamList } from "@navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View, Dimensions, Linking, Platform, Alert } from "react-native";

type NavigationProp = StackNavigationProp<SupportStackParamList, 'SupportScreen'>;
type NavigationRoute = RouteProp<SupportStackParamList, 'SupportScreen'>;

export interface SupportScreenParamsList { }

//@ts-ignore
const phoneNumber = HOT_LINE.replaceAll('.', '')
const EMAIL = 'luckyking8879@LuckyKing.vn'
const ADDRESS = 'Tầng 4, Tòa Nhà Mỹ Đình Plaza 2, Số 2 Nguyễn Hoàng, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Thành Phố Hà Nội, Việt Nam'

export const SupportScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();

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

    const sendEmail = useCallback(() => {
        const url = `mailto:${EMAIL}`
        if (Platform.OS !== 'android') {
            Linking.canOpenURL(url)
                .then(supported => {
                    if (!supported) {
                        Alert.alert('Email không hợp lệ!');
                    } else {
                        return Linking.openURL(url);
                    }
                })
                .catch(err => console.log(err));
        }
        else Linking.openURL(url)
    }, [EMAIL])

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={'TRUNG TÂM HỖ TRỢ'} />
            <View style={styles.body}>
                <IText style={{ fontStyle: 'italic' }}>
                    {"Nếu Quý khách có vấn đề cần giải quyết, vui lòng liên hệ với bộ phận CSKH của LuckyKing:"}
                </IText>

                <TouchableOpacity
                    style={styles.item}
                    onPress={call}
                    activeOpacity={1}>
                    <Image source={Images.phone} style={{ width: 30, height: 30 }} />
                    <IText style={{ fontWeight: '600', marginLeft: 12 }}> {`Hotline: ${HOT_LINE}`}</IText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.item}
                    onPress={openZalo}
                    activeOpacity={1}>
                    <Image source={Images.zalo} style={{ width: 30, height: 30 }} />
                    <IText style={{ fontWeight: '600', marginLeft: 12 }}> {"Zalo: LuckyKing"}</IText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.item}
                    onPress={sendEmail}
                    activeOpacity={1}>
                    <Image source={Images.email} style={{ width: 30, height: 30 }} tintColor={Color.keno} />
                    <IText style={{ fontWeight: '600', marginLeft: 12 }}> {`Email: ${EMAIL}`}</IText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.item}
                    // onPress={}
                    activeOpacity={1}>
                    <Image source={Images.address} style={{ width: 30, height: 30 }} />
                    <IText style={{ fontWeight: '600', marginLeft: 12, textAlign: 'justify', width: windowWidth - 74 }}>
                        {`Địa chỉ: ${ADDRESS}`}
                    </IText>
                </TouchableOpacity>
            </View>
        </View >
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    body: {
        flex: 1, padding: 16
    },
    item: { flexDirection: 'row', alignItems: 'center', marginTop: 16 }
})