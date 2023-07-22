import { Image, Images } from '@assets';
import { BasicHeader, IText } from '@components';
import { RechargeStackParamList, } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { SafeAreaView, StyleSheet, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import { useCallback } from 'react';

type NavigationProp = StackNavigationProp<RechargeStackParamList, 'BankRechargeScreen'>;
type NavigationRoute = RouteProp<RechargeStackParamList, 'BankRechargeScreen'>;

const listBank = [
    {
        "id": 21,
        "name": "Ngân hàng TMCP Quân đội",
        "code": "MB",
        "bin": "970422",
        "shortName": "MBBank",
        "logo": "https://api.vietqr.io/img/MB.png",
        "transferSupported": 1,
        "lookupSupported": 1,
        "short_name": "MBBank",
        "support": 3,
        "isTransfer": 1,
        "swift_code": "MSCBVNVX",
        "STK": "586888879"
    },
    {
        "id": 39,
        "name": "Ngân hàng TMCP Tiên Phong",
        "code": "TPB",
        "bin": "970423",
        "shortName": "TPBank",
        "logo": "https://api.vietqr.io/img/TPB.png",
        "transferSupported": 1,
        "lookupSupported": 1,
        "short_name": "TPBank",
        "support": 3,
        "isTransfer": 1,
        "swift_code": "TPBVVNVX",
        "STK": "11133888879"
    },
]

export interface BankRechargeScreenParamsList { }

export const BankRechargeScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const user = useSelector((state: any) => state.userReducer)

    const copyToClipboard = (text: string, extra: string = '') => {
        Clipboard.setString(text);
        Alert.alert("Thông báo", `Đã sao chép ${extra}!`)
    };

    const copyContent = useCallback(() => {
        copyToClipboard(`NAP${user.phoneNumber}`, 'nội dung chuyển khoản')
    }, [user])

    const copySTK = useCallback((STK: string) => {
        copyToClipboard(`${STK}`, 'số tài khoản')
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <BasicHeader navigation={navigation} title={"Nạp tiền qua chuyển khoản ngân hàng"} />

            <View style={{ padding: 8 }}>
                <IText style={{ fontWeight: 'bold' }}>
                    <IText style={{ color: Color.luckyKing }}>
                        {"LuckyKing"}
                    </IText>
                    {" hỗ trợ nạp số dư tài khoản mua vé qua hình thức chuyển khoản Ngân hàng với nội dung như sau:"}
                </IText>

                <View style={styles.line} />

                <IText style={{ fontStyle: 'italic', marginTop: 8 }}>
                    {"Người thụ hưởng:"}
                </IText>
                <IText style={{ fontWeight: 'bold' }}>{"Công ty TNHH Giải trí số LuckyKing"}</IText>

                <View style={styles.line} />

                <IText style={{ fontStyle: 'italic', marginTop: 8 }}>
                    {"Số tài khoản - Chuyển khoản tới 1 trong số các TK sau:"}
                </IText>
                {/* <View style={styles.boxBankAccount}>
                    <Image source={Images.vietcom_bank} style={{ width: 45, height: 45 }} />
                    <View style={{ marginLeft: 4, justifyContent: 'center', flex: 1 }}>
                        <IText style={{ fontWeight: 'bold' }}>{"0011001234567"}</IText>
                        <IText>{"Vietcombank - CN: Trụ sở"}</IText>
                    </View>
                    <TouchableOpacity style={styles.boxCopy} onPress={() => copyToClipboard(`0011001234567`)}>
                        <IText style={{ fontWeight: 'bold', fontSize: 16, color: Color.blue }}>{"Sao chép"}</IText>
                    </TouchableOpacity>
                </View> */}
                {/* <View style={styles.boxBankAccount}>
                    <Image source={Images.mb_bank} style={{ width: 45, height: 45 }} />
                    <View style={{ marginLeft: 4, justifyContent: 'center', flex: 1 }}>
                        <IText style={{ fontWeight: 'bold' }}>{"586888879"}</IText>
                        <IText>{"MBBank - CN: Hà Nội"}</IText>
                    </View>
                    <TouchableOpacity style={styles.boxCopy} onPress={() => copyToClipboard(`0011001234567`)}>
                        <IText style={{ fontWeight: 'bold', fontSize: 16, color: Color.blue }}>{"Sao chép"}</IText>
                    </TouchableOpacity>
                </View> */}
                {
                    listBank.map(item => {
                        return (
                            <View style={styles.boxBankAccount} key={item.shortName}>
                                <Image source={{ uri: item.logo }} style={{ width: 45, height: 45 }} resizeMode='contain' />
                                <View style={{ marginLeft: 4, justifyContent: 'center', flex: 1 }}>
                                    <IText style={{ fontWeight: 'bold' }}>{item.STK}</IText>
                                    <IText>{item.name}</IText>
                                </View>
                                <TouchableOpacity style={styles.boxCopy} onPress={() => copySTK(item.STK)}>
                                    <IText style={{ fontWeight: 'bold', fontSize: 16, color: Color.blue }}>{"Sao chép"}</IText>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }

                <IText style={{ fontStyle: 'italic', marginTop: 8 }}>
                    {"Nội dung chuyển khoản:"}
                </IText>
                <View style={styles.contentBlock}>
                    <View style={styles.boxInside}>
                        <IText uppercase style={styles.textInside}>{`NAP${user.phoneNumber}`}</IText>
                    </View>
                    <TouchableOpacity style={[styles.boxInside, { paddingHorizontal: 4 }]} onPress={copyContent}>
                        <IText style={styles.textInside}>{"Sao chép"}</IText>
                    </TouchableOpacity>
                </View>

                <IText style={{ fontStyle: 'italic', marginTop: 8 }}>
                    <IText style={{ fontWeight: 'bold', textAlign: 'justify' }}>{"Lưu ý:"}</IText>
                    {" Nếu Quý khách ghi sai hoặc quên ghi nội dung Chuyển khoản vui lòng liên hệ với bộ phận CSKH của LuckyKing "}
                </IText>

                <View style={{ marginTop: 4, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={Images.phone} style={{ width: 30, height: 30 }} />
                    <IText style={{ fontWeight: 'bold', marginLeft: 12 }}>{"Hotline: 0866.79.88.79"}</IText>
                </View>
                <View style={{ marginTop: 4, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={Images.zalo} style={{ width: 30, height: 30 }} />
                    <View style={{ marginLeft: 12, justifyContent: 'center', width: windowWidth - 58 }}>
                        <IText style={{ fontWeight: 'bold' }}>{"Zalo: LuckyKing"}</IText>
                        <IText style={{ fontStyle: 'italic' }}>{"(Vui lòng gửi kèm hình ảnh chuyển khoản thành công)"}</IText>
                    </View>
                </View>

                <IText style={{ fontStyle: 'italic', marginTop: 8, color: Color.luckyKing }}>
                    {"(*) Lưu ý: Nếu sau 4h tài khoản vẫn chưa được nạp vui lòng liên hệ với bộ phận CSKH của LuckyKing như trên."}
                </IText>
            </View>
        </View>
    )
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    contentBlock: {
        width: windowWidth - 16, height: 36, marginTop: 4,
        alignItems: 'center', justifyContent: 'space-between',
        borderRadius: 10, backgroundColor: Color.blue,
        paddingLeft: 15, paddingRight: 5, flexDirection: 'row'
    },
    boxInside: {
        height: 26, backgroundColor: Color.white,
        borderRadius: 5, alignItems: 'center',
        paddingHorizontal: 3
    },
    textInside: {
        fontWeight: 'bold',
        color: Color.luckyKing, marginTop: 4
    },
    line: {
        width: windowWidth - 16, marginLeft: -8,
        backgroundColor: '#A0A0A0', opacity: 0.2,
        marginTop: 8, height: 1
    },
    boxBankAccount: {
        height: 70, borderColor: '#DADADA',
        borderWidth: 1, borderRadius: 10,
        width: windowWidth - 16, marginTop: 4,
        alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 4, flexDirection: 'row'
    },
    boxCopy: {
        borderRadius: 10, borderColor: Color.blue,
        borderWidth: 1,
        alignItems: 'center', justifyContent: 'center',
        width: 92, height: 36
    }
})
