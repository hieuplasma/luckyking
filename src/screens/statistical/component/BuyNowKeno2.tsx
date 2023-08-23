import { IText } from "@components";
import { ScreenName } from "@navigation";
import { Color } from "@styles";
import { NavigationUtils } from "@utils";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const lottColor = Color.keno

export const BuyNowKeno2 = React.memo(({ navigation }: any) => {
    const safeAreaInsets = useSafeAreaInsets();

    const navigateBuy = useCallback(() => {
        NavigationUtils.navigate(navigation, ScreenName.HomeChild.KenoScreen)
    }, [])
    return (
        <View style={{ height: 40, justifyContent: 'space-between', flexDirection: 'row', marginBottom: safeAreaInsets.bottom }}>
            <TouchableOpacity style={styles.btn} activeOpacity={.6} onPress={navigateBuy}>
                <IText style={{ fontWeight: 'bold', color: Color.white }}>
                    {"ĐẶT VÉ"}
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