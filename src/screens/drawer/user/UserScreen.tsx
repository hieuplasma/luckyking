import { Images, Image } from '@assets';
import { ScreenName, UserStackParamList } from '@navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Color } from '@styles';
import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    RefreshControl,
    Alert,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import { userApi } from '@api';
import { updateUser } from '@redux';
import { doNotExits, NavigationUtils } from '@utils';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageHeader, IText, ModalDelAcc } from '@components';
import { MarginLeft } from 'src/styles/SpaceStyles';

type NavigationProp = StackNavigationProp<UserStackParamList, 'UserScreen'>;
type NavigationRoute = RouteProp<UserStackParamList, 'UserScreen'>;

export interface UserScreenParamsList { }

const contentDelete = `Sau khi xóa tài khoản, Quý khách sẽ không thể tiếp tục sử dụng tài khoản này với ứng dụng LuckyKing.

Số dư còn lại trong tài khoản mua vé và tài khoản thưởng sẽ bị vô hiệu và không thể sử dụng ngay sau khi Quý khách thực hiện việc xóa tài khoản này (Vui lòng sử dụng hết số dự trong các tài khoản trước khi xóa tài khoản).

Sau khi xóa tài khoản, các vé mà Quý khách đã mua nhưng chưa đến kì quay thưởng sẽ không thuộc quyền sở hữu của Quý khách nữa và trong trường hợp các vé này trúng thưởng thì số tiền trúng thưởng cũng không thuộc về Quý khách; đồng thời tiền mua vé của những vé này cũng sẽ không được hoàn lại cho Quý khách  (Vui lòng chờ các vé mà Quý khách đã mua được quay thưởng hết trước khi khóa tài khoản).`

export const UserScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();
    const height = useHeaderHeight();

    const dispatch = useDispatch();

    const [refreshing, setRefresing] = useState(false);
    const onRefresh = useCallback(async () => {
        setRefresing(true);
        await getUser();
        setRefresing(false);
        setLoading(false)
    }, []);

    useEffect(() => {
        getUser();
    }, [navigation]);

    async function getUser() {
        const res = await userApi.getuserInfo();
        if (res?.data) {
            dispatch(updateUser(res.data));
            setFullName(res.data.fullName);
            setPhoneNumber(res.data.phoneNumber);
            setPeronNumber(res.data.personNumber);
            setIdentify(res.data.identify);
            setEmail(res.data.email);
            setAddress(res.data.address);
        }
    }

    const user = useSelector((state: any) => state.userReducer);

    const [fullName, setFullName] = useState(user.fullName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [personNumber, setPeronNumber] = useState(user.personNumber);
    const [identify, setIdentify] = useState(user.identify);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);

    const [isLoading, setLoading] = useState(false);

    const [delAccVisible, setDelAccVisible] = useState(false)

    const checkIdentify = useCallback((val: string) => {
        if (val.trim().length != 12) return false;
        if (!/^\d+$/.test(val.trim())) return false;
        return true;
    }, []);

    const updateUserInfo = async () => {
        if (doNotExits(fullName)) {
            return Alert.alert('Thông báo', 'Bạn không được để trống Họ và tên');
        }
        if (doNotExits(identify)) {
            return Alert.alert('Thông báo', 'Bạn không được để trống CCCD');
        }
        // if (!checkIdentify(identify)) {
        //     return Alert.alert('Thông báo', 'Số CCCD không hợp lệ!');
        // }

        setLoading(true);
        const body = {
            fullName: fullName?.trim(),
            identify: identify?.trim(),
            email: email?.trim(),
            address: address?.trim(),
            personNumber: personNumber?.trim(),
        };
        // if (doNotExits(email)) delete body.email
        let res = await userApi.updateUserInfo(body);
        if (res) {
            if (res.data) dispatch(updateUser(res.data));
            Alert.alert('Thành công', 'Cập nhật thành công');
        }
        setLoading(false);
    };

    const deleteAccount = useCallback(() => {
        Alert.alert("Lưu ý", contentDelete, [
            {
                text: 'Huỷ xoá',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Xoá tài khoản', onPress: () => setDelAccVisible(true) },
        ])
    }, [])

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={'THÔNG TIN TÀI KHOẢN'} />

            {/* Body */}
            <KeyboardAvoidingView
                keyboardVerticalOffset={height + 45}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <ScrollView
                    style={styles.body}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <ItemView
                        label={'Họ và tên'}
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
                        label={'Số điện thoại'}
                        value={phoneNumber}
                        setValue={(text: string) => setPhoneNumber(text)}
                        force={true}
                        disable={true}
                    />
                    {/* <ItemView
                        label={'Mã số cá nhân'}
                        value={personNumber}
                        setValue={(text: string) => setPeronNumber(text)}
                        force={false}
                    />
                    <IText
                        style={{
                            fontSize: 14,
                            marginTop: 4,
                            marginLeft: 16,
                            fontStyle: 'italic',
                        }}>
                        {'(Gồm 8 số như 12345678, 66666666, 88888888....)'}
                    </IText> */}
                    <ItemView
                        label={'CCCD'}
                        value={identify}
                        setValue={(text: string) => setIdentify(text)}
                        force={true}
                    />
                    <ItemView
                        label={'Email'}
                        value={email}
                        setValue={(text: string) => setEmail(text)}
                        force={false}
                    />
                    <ItemView
                        label={'Địa chỉ'}
                        value={address}
                        setValue={(text: string) => setAddress(text)}
                        force={false}
                    />

                    <TouchableOpacity
                        style={styles.borderItem}
                        onPress={() =>
                            NavigationUtils.navigate(
                                navigation,
                                ScreenName.Drawer.ChangePassScreen,
                            )
                        }>
                        <IText style={styles.textItem}>{'Đổi mật khẩu'}</IText>
                        <Image
                            source={Images.right_arrow}
                            tintColor={Color.black}
                            style={{ width: 10, height: 20 }}></Image>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.btmView}>
                <TouchableOpacity
                    style={styles.buttonUpdate}
                    activeOpacity={0.8}
                    disabled={isLoading}
                    onPress={updateUserInfo}>
                    <IText style={styles.textTitle}>{'CẬP NHẬT'}</IText>
                    {isLoading ? (
                        <ActivityIndicator
                            size="small"
                            color={Color.white}
                            style={{ marginLeft: 8 }}
                        />
                    ) : (
                        <></>
                    )}
                </TouchableOpacity>
                <View style={{ width: 12 }}></View>
                <TouchableOpacity
                    style={styles.btnDelete}
                    activeOpacity={0.8}
                    disabled={isLoading}
                    onPress={deleteAccount}>
                    <Image source={Images.empty_trash} tintColor={Color.white} style={{ width: 20, height: 20 }} resizeMode='contain' />
                    <IText style={[styles.textTitle, { marginLeft: 4 }]}>{'Xoá tài khoản'}</IText>
                </TouchableOpacity>
            </View>

            <ModalDelAcc visible={delAccVisible} navigation={navigation} onCancel={() => setDelAccVisible(false)} />
        </View>
    );
});

const ItemView = ({ label, value, setValue, force, disable, ...rest }: any) => {

    const [isTyping, setIsTyping] = useState(false);
    const textInputRef = React.useRef<any>(null)

    const focus = useCallback(() => {
        textInputRef.current?.focus()
    }, [textInputRef])

    const onFocus = useCallback(() => {
        setIsTyping(true);
    }, []);

    const onBlur = useCallback((e?: any) => {
        setIsTyping(false);
        rest?.onBlur?.(e);
    }, [rest?.onBlur]);

    return (
        <TouchableOpacity style={[styles.borderItem, { opacity: disable ? 0.6 : 1, borderColor: isTyping ? Color.primary : '#E7E3E3' }]}
            onPress={focus} activeOpacity={1} disabled={disable}>
            <IText style={styles.textItem}>{label}</IText>
            {force ? (
                <Image
                    source={Images.star}
                    style={{ width: 8, height: 8, marginTop: -9, marginLeft: 2 }}></Image>
            ) : (
                <></>
            )}
            <View style={{ flex: 1 }} />
            <TextInput
                ref={textInputRef}
                style={{
                    backgroundColor: Color.white,
                    height: 43,
                    fontFamily: 'myriadpro-regular',
                    color: Color.black,
                }}
                value={value}
                onChangeText={text => setValue(text)}
                placeholder={'Chưa cập nhật'}
                placeholderTextColor={'#A19C9C'}
                autoCorrect={false}
                editable={disable ? false : true}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </TouchableOpacity>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    textTitle: { color: Color.white, fontWeight: 'bold', fontSize: 16 },
    body: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    borderItem: {
        width: '100%',
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E7E3E3',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 16,
        justifyContent: 'space-between',
    },
    textItem: {},
    btmView: {
        flexDirection: 'row', height: 45,
        marginBottom: 24, width: windowWidth - 32,
        marginHorizontal: 16,
        justifyContent: 'space-between'
    },
    buttonUpdate: {
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: Color.luckyKing,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnDelete: {
        // width: 150,
        flex: 1,
        height: 45,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: Color.gray,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
    }
});
