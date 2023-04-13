import { Icon, Image, Images } from "@assets";
import { LotteryType } from "@common";
import { Color, Style } from "@styles";
import { ScreenUtils } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CartIcon } from "../icon-specials";

interface HeaderBuyLotteryProps {
    navigation: any
    lotteryType: LotteryType
}
export const HeaderBuyLottery = React.memo(({ navigation, lotteryType }: HeaderBuyLotteryProps) => {

    const safeAreaInsets = useSafeAreaInsets();
    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const [logo, setLogo] = useState({ source: Images.power_logo, style: { height: 44.12, width: 60 } })
    useEffect(() => {
        switch (lotteryType) {
            case LotteryType.Power:
                setLogo({ source: Images.power_logo, style: { height: 44.12, width: 60 } })
                break;
            case LotteryType.Mega:
                setLogo({ source: Images.mega_logo, style: { height: 44, width: 78.57 } })
                break;
            case LotteryType.Max3D:
                setLogo({ source: Images.max3d_logo, style: { height: 82.79, width: 90 } })
                break;
            case LotteryType.Max3DPlus:
                setLogo({ source: Images.max3dplus_logo, style: { height: 44, width: 80 } })
                break;
            default:
                break;
        }
    }, [lotteryType])

    return (
        <>
            <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={"transparent"} />
            {/* //Header */}
            <View style={[styles.headerContainer, { marginTop: 0 }]}>
                <View style={{ flex: 1 }}>
                    <Icon.Button
                        size={'small'}
                        color={Color.gray}
                        name="ic_back"
                        style={[Style.Space.Padding.Zero]}
                        onPressed={onGoBack}
                    />
                </View>
                <Image source={logo.source} style={logo.style} />
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <CartIcon navigation={navigation} />
                </View>
            </View>
        </>
    )
})

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        height: ScreenUtils.getHeaderHeight(),
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    imageLogo: {
        height: 44, width: 78.57
    },
})