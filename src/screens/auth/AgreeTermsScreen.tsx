import { Image, Images, termResource } from "@assets";
import { IText, ImageHeader } from "@components";
import { AuthenticationStackParamList, ScreenName } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { updateToken } from "@redux";
import { Color } from "@styles";
import { NavigationUtils } from "@utils";
import React, { useCallback, useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Platform } from "react-native";
import { useDispatch } from "react-redux";

type NavigationProp = StackNavigationProp<AuthenticationStackParamList, 'AgreeTerms'>;
type NavigationRoute = RouteProp<AuthenticationStackParamList, 'AgreeTerms'>;

interface authInfoProps {
    phoneNumber: string,
    password: string
}
export interface AgreeTermScreenParamsList {
    authInfo?: string
}

export const AgreeTermsScreen = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const dispatch = useDispatch()

    const [agree, setAgree] = useState<Boolean>(false)

    const agreed = useCallback(() => {
        dispatch(updateToken(route.params.authInfo))
        NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.SplashScreen);
    }, [route.params.authInfo])

    const toggle = useCallback(() => {
        setAgree(!agree)
    }, [agree])

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={'ĐIỀU KHOẢN SỬ DỤNG'} />
            <ScrollView style={{ flex: 1, paddingHorizontal: 6 }}>
                <IText style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }} children={termResource.bigTitle} />
                <IText style={{ textAlign: Platform.OS !== 'android' ? 'justify' : 'auto' }} children={termResource.content} />
                <View style={{ height: 60 }} />
            </ScrollView>

            <View style={styles.agreeView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={toggle} activeOpacity={1}>
                        <Image
                            source={agree ? Images.checked_box : Images.check_box}
                            style={{ width: 25, height: 25 }}
                            tintColor={Color.luckyKing}
                        />
                    </TouchableOpacity>
                    <IText style={{ fontSize: 16, marginLeft: 4 }}>{"TÔI ĐÃ ĐỌC VÀ ĐỒNG Ý"}</IText>
                </View>
                <TouchableOpacity
                    style={[styles.btn, { opacity: agree ? 1 : 0.4 }]}
                    activeOpacity={0.8}
                    disabled={!agree}
                    onPress={agreed}
                >
                    <IText children={"Tiếp tục"} style={{ fontSize: 16, fontWeight: 'bold', color: Color.white }} uppercase />
                </TouchableOpacity>
            </View>
        </View>

    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    agreeView: {
        position: 'absolute',
        bottom: 15, left: 0, right: 0,
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center',
        height: 50, width: windowWidth,
        backgroundColor: Color.historyBackground,
        paddingHorizontal: 10
    },
    btn: {
        height: 40,
        justifyContent: 'center', alignItems: 'center',
        paddingHorizontal: 5, backgroundColor: Color.luckyKing,
        borderRadius: 10
    }
})

