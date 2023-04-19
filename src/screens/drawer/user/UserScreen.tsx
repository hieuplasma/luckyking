import { Icon, Images, Image } from '@assets';
import { ScreenName, UserStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Color, Style } from '@styles';
import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet, View, Dimensions, StatusBar,
    Text, TextInput, ScrollView, TouchableOpacity,
    KeyboardAvoidingView, RefreshControl, Alert, ActivityIndicator, SafeAreaView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements'
import { userApi } from '@api';
import { updateUser } from '@redux'
import { doNotExits, NavigationUtils } from '@utils'
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageHeader, IText } from '@components';

type NavigationProp = StackNavigationProp<UserStackParamList, 'UserScreen'>;
type NavigationRoute = RouteProp<UserStackParamList, 'UserScreen'>;

export interface UserScreenParamsList { }

export const UserScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const height = useHeaderHeight()

    const dispatch = useDispatch()

    const [refreshing, setRefresing] = useState(false)
    const onRefresh = async () => {
        setRefresing(true)
        await getUser()
        setRefresing(false)
    }

    useEffect(() => {
        () => getUser()
    }, [navigation])

    async function getUser() {
        const res = await userApi.getuserInfo()
        // console.log(res.data)
        if (res?.data) {
            dispatch(updateUser(res.data))
            setFullName(res.data.fullName)
            setPhoneNumber(res.data.phoneNumber)
            setPeronNumber(res.data.personNumber)
            setIdentify(res.data.identify)
            setEmail(res.data.email)
            setAddress(res.data.address)
        }
    }

    const user = useSelector((state: any) => state.userReducer)

    const [fullName, setFullName] = useState(user.fullName)
    const [nickName, setNickName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const [personNumber, setPeronNumber] = useState(user.personNumber)
    const [identify, setIdentify] = useState(user.identify)
    const [email, setEmail] = useState(user.email)
    const [address, setAddress] = useState(user.address)

    const [isLoading, setLoading] = useState(false)

    const updateUserInfo = async () => {
        if (doNotExits(fullName)) {
            return Alert.alert("Thông báo", "Bạn không được để trống Họ và tên")
        }
        if (doNotExits(identify)) {
            return Alert.alert("Thông báo", "Bạn không được để trống CMND/CCCD")
        }

        setLoading(true)
        const body = {
            fullName: fullName,
            identify: identify,
            email: email,
            address: address
        }
        if (doNotExits(email)) delete body.email
        let res = await userApi.updateUserInfo(body)
        if (res) {
            if (res.data) dispatch(updateUser(res.data))
            Alert.alert("Thành công", "Cập nhật thành công")
        }
        setLoading(false)
    }

    return (
        <View style={styles.container} >
            <ImageHeader navigation={navigation} title={"THÔNG TIN TÀI KHOẢN"} />

            {/* Body */}
            <KeyboardAvoidingView keyboardVerticalOffset={height + 45} behavior="padding" style={{ flex: 1 }}>
                <ScrollView style={styles.body}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <ItemView
                        label={"Họ và tên"}
                        value={fullName}
                        setValue={(text: string) => setFullName(text)}
                        force={true}
                    />
                    {/* <ItemView
                    label={"Bí danh"}
                    value={nickName}
                    setValue={(text: string) => setNickName(text)}
                    force={false}
                /> */}
                    <ItemView
                        label={"Số điện thoại"}
                        value={phoneNumber}
                        setValue={(text: string) => setPhoneNumber(text)}
                        force={true} disable={true}
                    />
                    <ItemView
                        label={"Mã số cá nhân"}
                        value={personNumber}
                        setValue={(text: string) => setPeronNumber(text)}
                        force={false}
                    />
                    <IText style={{ fontSize: 14, marginTop: 4, marginLeft: 16, fontStyle: "italic" }}>
                        {"(Gồm 8 số như 12345678, 66666666, 88888888....)"}
                    </IText>
                    <ItemView
                        label={"CMND/CCCD"}
                        value={identify}
                        setValue={(text: string) => setIdentify(text)}
                        force={true}
                    />
                    <ItemView
                        label={"Email"}
                        value={email}
                        setValue={(text: string) => setEmail(text)}
                        force={false}
                    />
                    <ItemView
                        label={"Địa chỉ"}
                        value={address}
                        setValue={(text: string) => setAddress(text)}
                        force={false}
                    />

                    <TouchableOpacity style={styles.borderItem}
                        onPress={() => NavigationUtils.navigate(navigation, ScreenName.Drawer.ChangePassScreen)}
                    >
                        <IText style={styles.textItem}>{"Đổi mật khẩu"}</IText>
                        <Image source={Images.right_arrow} tintColor={Color.black} style={{ width: 10, height: 20 }}></Image>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity style={styles.buttonUpdate} activeOpacity={0.8} disabled={isLoading} onPress={updateUserInfo}>
                <IText style={styles.textTitle}>{"CẬP NHẬT"}</IText>
                {isLoading ?
                    <ActivityIndicator size="small" color={Color.white} style={{ marginLeft: 8 }} />
                    : <></>}
            </TouchableOpacity>
        </View>
    )
});

const ItemView = ({ label, value, setValue, force, disable }: any) => {
    return (
        <View style={[styles.borderItem, { opacity: disable ? 0.6 : 1 }]}>
            <IText style={styles.textItem}>{label}</IText>
            {force ? <Image source={Images.star} style={{ width: 8, height: 8, marginTop: -9, marginLeft: 2 }}></Image> : <></>}
            <View style={{ flex: 1 }} />
            <TextInput
                style={{
                    backgroundColor: Color.white,
                    height: 43, fontFamily: 'myriadpro-regular',
                    color: Color.black
                }}
                value={value}
                onChangeText={(text) => setValue(text)}
                placeholder={"Chưa cập nhật"}
                placeholderTextColor={'#A19C9C'}
                autoCorrect={false}
                editable={disable ? false : true}
            />
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    textTitle: { color: Color.white, fontWeight: 'bold', fontSize: 16 },
    body: {
        paddingHorizontal: 16, paddingBottom: 24
    },
    borderItem: {
        width: '100%', height: 45,
        borderRadius: 10, borderWidth: 1,
        borderColor: '#E7E3E3', alignItems: 'center',
        flexDirection: 'row', paddingHorizontal: 16,
        marginTop: 16, justifyContent: 'space-between'
    },
    textItem: {
    },
    buttonUpdate: {
        width: windowWidth - 32, height: 45,
        borderRadius: 10, flexDirection: 'row',
        backgroundColor: Color.luckyKing, alignItems: 'center',
        justifyContent: 'center', margin: 24, marginHorizontal: 16
    }
})