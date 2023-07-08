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
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Số điện thoại không tồn tại!');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch(err => console.log(err));
    }, [])

    const openZalo = useCallback(() => {
        const url = `https://zalo.me/${phoneNumber}`
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Tài khoản không tồn tại!');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch(err => console.log(err));
    }, [])
    
    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={'TRUNG TÂM HỖ TRỢ'} />
            <View style={styles.body}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={call}
                    activeOpacity={1}>
                    <Image source={Images.phone} style={{ width: 30, height: 30 }} />
                    <IText style={{ fontWeight: '600', marginLeft: 12 }}> {`Hotline: ${HOT_LINE}`}</IText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}
                    onPress={openZalo}
                    activeOpacity={1}>
                    <Image source={Images.zalo} style={{ width: 30, height: 30 }} />
                    <IText style={{ fontWeight: '600', marginLeft: 12 }}> {"Zalo: LuckyKing"}</IText>
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
    }
})