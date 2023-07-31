import { Icon, Image, Images } from "@assets";
import { LotteryType } from "@common";
import { Color, Style } from "@styles";
import { ScreenUtils } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { CartIcon } from "../icon-specials";

interface HeaderBuyLotteryProps {
    navigation: any
    lotteryType: LotteryType
}

export const HeaderBuyLottery = React.memo(({ navigation, lotteryType }: HeaderBuyLotteryProps) => {

    const [block, setBlock] = useState(false)

    const onGoBack = useCallback(() => {
        if (!block) {
            navigation.goBack()
            setBlock(true)
        }
    }, [navigation, block]);

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
            case LotteryType.Max3DPlus:
                setLogo({ source: Images.max3d_logo, style: { height: 82.79, width: 90 } })
                break;
            // case LotteryType.Max3DPlus:
            //     setLogo({ source: Images.max3dplus_logo, style: { height: 44, width: 80 } })
            //     break;
            case LotteryType.Max3DPro:
                setLogo({ source: Images.max3dpro_logo, style: { height: 50, width: 75 } })
                break;
            case LotteryType.Keno:
                setLogo({ source: Images.keno_logo, style: { height: 50, width: 75 } })
                break;
            default:
                break;
        }
    }, [lotteryType])

    return (
        <>
            <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={"transparent"} />
            {/* //Header */}
            <View style={[styles.headerContainer]}>
                <TouchableOpacity style={{ flex: 1, paddingVertical: 20 }} onPress={onGoBack}>
                    <Icon.Button
                        size={'small'}
                        color={Color.gray}
                        name="ic_back"
                        style={[Style.Space.Padding.Zero]}
                        onPressed={onGoBack}
                    />
                </TouchableOpacity>
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