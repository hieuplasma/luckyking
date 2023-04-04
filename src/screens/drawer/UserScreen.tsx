import { Icon, Images, Image } from '@assets';
import { ScreenName } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Color, Style } from '@styles';
import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet, View, Dimensions, StatusBar,
    Text, TextInput, ScrollView, TouchableOpacity,
    KeyboardAvoidingView, RefreshControl, Alert, ActivityIndicator
} from 'react-native';
// import { TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements'
import { userApi } from '@api';
import { updateUser } from '@redux'
import { doNotExits, NavigationUtils } from '@utils'
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackParamList } from 'src/navigation/UserNavigation';

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

    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    async function getUser() {
        const res = await userApi.getuserInfo()
        console.log(res.data)
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
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={"transparent"} />
            <Image source={Images.bg_header} style={[styles.headerContainer, { paddingTop: safeAreaInsets.top }]}>
                <View style={{ flex: 1 }}>
                    <Icon.Button
                        size={'small'}
                        color={Color.white}
                        name="ic_back"
                        style={[Style.Space.Padding.Zero]}
                        onPressed={onGoBack}
                    />
                </View>
                <Text style={styles.textTitle}>{"THÔNG TIN TÀI KHOẢN"}</Text>
                <View style={{ flex: 1 }} />
            </Image>

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
                    <Text style={{ fontSize: 12, marginTop: 4, marginLeft: 2, fontStyle: "italic" }}>
                        {"(Gồm 8 số như 12345678, 66666666, 88888888....)"}
                    </Text>
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
                        label={"Address"}
                        value={address}
                        setValue={(text: string) => setAddress(text)}
                        force={false}
                    />

                    <TouchableOpacity style={styles.borderItem}
                        onPress={() => NavigationUtils.navigate(navigation, ScreenName.Drawer.ChangePassScreen)}
                    >
                        <Text style={styles.textItem}>{"Đổi mật khẩu"}</Text>
                        <Image source={Images.right_arrow} tintColor={Color.black} style={{ width: 10, height: 20 }}></Image>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity style={styles.buttonUpdate} activeOpacity={0.8} disabled={isLoading} onPress={updateUserInfo}>
                <Text style={styles.textTitle}>{"CẬP NHẬT"}</Text>
                {isLoading ?
                    <ActivityIndicator size="small" color={Color.white} style={{ marginLeft: 8 }} />
                    : <></>}
            </TouchableOpacity>
        </View>
    )
});

const ItemView = ({ label, value, setValue, force, disable }: any) => {
    return (
        <View style={styles.borderItem}>
            <Text style={styles.textItem}>{label}</Text>
            {force ? <Image source={Images.star} style={{ width: 12, height: 12, marginTop: -12, marginLeft: 2 }}></Image> : <></>}
            <View style={{ flex: 1 }} />
            <TextInput
                style={{ backgroundColor: Color.white, height: 43 }}
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
    headerContainer: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },

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
        fontSize: 14
    },
    buttonUpdate: {
        width: windowWidth - 32, height: 45,
        borderRadius: 10, flexDirection: 'row',
        backgroundColor: Color.luckyKing, alignItems: 'center',
        justifyContent: 'center', margin: 24, marginHorizontal: 16
    }
})