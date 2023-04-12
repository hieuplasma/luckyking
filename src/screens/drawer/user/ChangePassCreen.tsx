import { Icon, Images, Image } from '@assets';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, Style } from '@styles';
import React, { useCallback, useState } from 'react';
import {
    StyleSheet, View, Dimensions, StatusBar,
    Text, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator, Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserStackParamList } from 'src/navigation/UserNavigation';
import { useHeaderHeight } from '@react-navigation/elements'
import { doNotExits } from '@utils';
import { ScrollView } from 'react-native';
import { userApi } from '@api';
import { useDispatch, useSelector } from 'react-redux';
import { ImageHeader } from '@components';

type NavigationProp = StackNavigationProp<UserStackParamList, 'ChangePassScreen'>;
type NavigationRoute = RouteProp<UserStackParamList, 'ChangePassScreen'>;

export interface ChangePassScreenParamsList { }

export const ChangePassScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const height = useHeaderHeight()

    const user = useSelector((state: any) => state.userReducer)

    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const [sercure1, setSercure1] = useState(true)
    const [sercure2, setSercure2] = useState(true)
    const [sercure3, setSercure3] = useState(true)

    const [isLoading, setLoading] = useState(false)

    const updatePassWord = async () => {
        if (doNotExits(oldPass)) {
            return Alert.alert("Thông báo", "Bạn không được để trống mật khẩu hiện tại")
        }
        if (doNotExits(newPass)) {
            return Alert.alert("Thông báo", "Bạn không được để trống mật khẩu mới")
        }
        if (doNotExits(confirmPass)) {
            return Alert.alert("Thông báo", "Bạn không được để trống xác nhận mật khẩu")
        }
        if (newPass !== confirmPass) {
            return Alert.alert("Thông báo", "Xác nhận mật khẩu không chính xác")
        }
        setLoading(true)
        const body = {
            phoneNumber: user.phoneNumber,
            oldPassword: oldPass,
            newPassword: newPass
        }

        let res = await userApi.updatePassword(body)
        if (res) {
            if (res.data.phoneNumber) {
                Alert.alert("Thành công", "Cập nhật mật khẩu thành công")
                setOldPass("")
                setNewPass("")
                setConfirmPass("")
            }
            else Alert.alert("Lỗi", JSON.stringify(res.data).toString())
        }
        setLoading(false)
    }


    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"ĐỔI MẬT KHẨU"} />

            {/* Body View */}
            <View style={{ width: '100%', marginTop: 37, alignItems: 'center' }}>
                <Image source={Images.big_lock} style={{ width: 65, height: 65 }}></Image>
            </View>

            <KeyboardAvoidingView keyboardVerticalOffset={height + 45} behavior="padding"
                style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, marginTop: 40, paddingHorizontal: 16 }}>
                    <ItemView
                        label={"Mật khẩu hiện tại"}
                        value={oldPass}
                        setValue={(text: string) => setOldPass(text)}
                        sercure={sercure1}
                        setSercure={() => setSercure1(!sercure1)}
                    />
                    <ItemView
                        label={"Mật khẩu mới"}
                        value={newPass}
                        setValue={(text: string) => setNewPass(text)}
                        sercure={sercure2}
                        setSercure={() => setSercure2(!sercure2)}
                    />
                    <ItemView
                        label={"Xác nhận mật khẩu mới"}
                        value={confirmPass}
                        setValue={(text: string) => setConfirmPass(text)}
                        sercure={sercure3}
                        setSercure={() => setSercure3(!sercure3)}
                    />
                    <Text style={{ fontSize: 14, color: Color.luckyKing, marginTop: 24, marginLeft: 8 }}>
                        {"Chú ý: Độ dài mật khẩu phải từ 8 - 16 kí tự"}
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity style={styles.buttonUpdate} activeOpacity={0.8} disabled={isLoading} onPress={updatePassWord}>
                <Text style={styles.textTitle}>{"CẬP NHẬT MẬT KHẨU"}</Text>
                {isLoading ?
                    <ActivityIndicator size="small" color={Color.white} style={{ marginLeft: 8 }} />
                    : <></>}
            </TouchableOpacity>
        </View>
    )
});

const ItemView = ({ label, value, setValue, sercure, setSercure }: any) => {
    return (
        <>
            <Text style={{ marginLeft: 12, fontSize: 12, fontStyle: 'italic', marginTop: 16 }}>{doNotExits(value) ? "" : label}</Text>
            <View style={styles.borderItem}>
                <Image style={{ width: 25, height: 30 }} source={Images.small_lock}></Image>
                <TextInput
                    style={{ backgroundColor: Color.white, height: 43, marginLeft: 4, flex: 1, fontFamily: 'myriadpro-regular' }}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                    placeholder={label}
                    placeholderTextColor={'#A19C9C'}
                    autoCorrect={false}
                    secureTextEntry={sercure}
                />
                <TouchableOpacity onPress={setSercure}>
                    <Image source={sercure ? Images.eye_close : Images.eye_open} style={{ width: 35, height: 35 }}></Image>
                </TouchableOpacity>
            </View></>
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
    borderItem: {
        width: '100%', height: 45,
        borderRadius: 10, borderWidth: 1,
        borderColor: '#E7E3E3', alignItems: 'center',
        flexDirection: 'row', paddingHorizontal: 16,
        marginTop: 2,
    },
    buttonUpdate: {
        width: windowWidth - 32, height: 45,
        borderRadius: 10, flexDirection: 'row',
        backgroundColor: Color.luckyKing, alignItems: 'center',
        justifyContent: 'center', margin: 24, marginHorizontal: 16
    }
})