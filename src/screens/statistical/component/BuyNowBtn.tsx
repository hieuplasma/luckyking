import { LotteryType } from "@common";
import { IText } from "@components";
import { ScreenName } from "@navigation";
import { Color } from "@styles";
import { NavigationUtils, getColorLott } from "@utils";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
    navigation: any;
    type: LotteryType;
    title?: string
}

export const BuyNowBtn = React.memo(({ navigation, type, title = "ĐẶT VÉ" }: Props) => {
    const safeAreaInsets = useSafeAreaInsets();

    const navigateBuy = useCallback(() => {
        let destination = ScreenName.HomeChild.KenoScreen
        switch (type) {
            case LotteryType.Keno:
                destination = ScreenName.HomeChild.KenoScreen
                break;
            case LotteryType.Power:
                destination = ScreenName.HomeChild.PowerScreen
                break;
            case LotteryType.Mega:
                destination = ScreenName.HomeChild.MegaScreen
                break;
            case LotteryType.Max3D:
                destination = ScreenName.HomeChild.Max3dScreen
                break;
            case LotteryType.Max3DPro:
                destination = ScreenName.HomeChild.Max3dProScreen
                break;
            default:
                break;
        }
        NavigationUtils.navigate(navigation, destination)
    }, [type])
    return (
        <View style={{ height: 40, justifyContent: 'center', flexDirection: 'row', marginBottom: safeAreaInsets.bottom }}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: getColorLott(type) }]} activeOpacity={.6} onPress={navigateBuy}>
                <IText style={{ fontWeight: 'bold', color: Color.white }} uppercase>
                    {title}
                </IText>
            </TouchableOpacity>
        </View>
    )
})

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center', alignItems: 'center', borderRadius: 10,
        minWidth: 150, height: 40, paddingHorizontal: 20
    }
})