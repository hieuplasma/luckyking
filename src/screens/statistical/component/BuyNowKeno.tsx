import { IText } from "@components";
import { ScreenName } from "@navigation";
import { Color } from "@styles";
import { NavigationUtils } from "@utils";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const lottColor = Color.keno

export const BuyNowKeno = React.memo(({ navigation, param }: any) => {
    const safeAreaInsets = useSafeAreaInsets();

    const navigateBuy = useCallback((type: string) => {
        let tmp = { ...param }
        tmp.type = type
        NavigationUtils.navigate(navigation, ScreenName.HomeChild.KenoScreen, tmp)
    }, [param])
    return (
        <View style={{ height: 40, justifyContent: 'space-between', flexDirection: 'row', marginBottom: safeAreaInsets.bottom }}>
            <TouchableOpacity style={styles.btn} activeOpacity={.6} onPress={() => navigateBuy('normal')}>
                <IText style={{ fontWeight: 'bold', color: Color.white }}>
                    {"ĐẶT VÉ KENO THƯỜNG"}
                </IText>
            </TouchableOpacity>
            <View style={{ width: 16 }} />
            <TouchableOpacity style={styles.btn} activeOpacity={.6} onPress={() => navigateBuy('bag')}>
                <IText style={{ fontWeight: 'bold', color: Color.white }}>
                    {"ĐẶT VÉ BAO"}
                </IText>
            </TouchableOpacity>
        </View>
    )
})

const styles = StyleSheet.create({
    btn: {
        flex: 1, backgroundColor: lottColor,
        justifyContent: 'center', alignItems: 'center', borderRadius: 10
    }
})