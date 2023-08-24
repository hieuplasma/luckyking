import { Icon, Image, Images } from "@assets";
import { LotteryType } from "@common";
import { Color, Style } from "@styles";
import { NavigationUtils, ScreenUtils, getColorLott } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { CartIcon } from "../icon-specials";
import { ScreenName } from "@navigation";

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

    const [logo, setLogo] = useState({ source: Images.power_logo, style: { height: 50, width: 90 } })
    useEffect(() => {
        switch (lotteryType) {
            case LotteryType.Power:
                setLogo({ source: Images.power_logo, style: { height: 50, width: 90 } })
                break;
            case LotteryType.Mega:
                setLogo({ source: Images.mega_logo, style: { height: 50, width: 90 } })
                break;
            case LotteryType.Max3D:
            case LotteryType.Max3DPlus:
                setLogo({ source: Images.max3d_logo, style: { height: 50, width: 90 } })
                break;
            // case LotteryType.Max3DPlus:
            //     setLogo({ source: Images.max3dplus_logo, style: { height: 44, width: 80 } })
            //     break;
            case LotteryType.Max3DPro:
                setLogo({ source: Images.max3dpro_logo, style: { height: 50, width: 90 } })
                break;
            case LotteryType.Keno:
                setLogo({ source: Images.keno_logo, style: { height: 50, width: 90 } })
                break;
            default:
                break;
        }
    }, [lotteryType])

    const navToInstruction = useCallback(() => {
        let destination = ScreenName.Drawer.InstructionKeno
        switch (lotteryType) {
            case LotteryType.Keno:
                destination = ScreenName.Drawer.InstructionKeno
                break;
            case LotteryType.Power:
                destination = ScreenName.Drawer.InstructionPower
                break;
            case LotteryType.Mega:
                destination = ScreenName.Drawer.InstructionMega
                break;
            case LotteryType.Max3D:
                destination = ScreenName.Drawer.InstructionMax3D
                break;
            case LotteryType.Max3DPro:
                destination = ScreenName.Drawer.InstructionMax3DPro
                break;
            default:
                break;
        }
        NavigationUtils.navigate(navigation, ScreenName.Drawer.InstructionStack, { screen: destination })
    }, [lotteryType])

    const navToStatistical = useCallback(() => {
        let destination = ScreenName.StatisticalChild.StatisticalKeno
        switch (lotteryType) {
            case LotteryType.Keno:
                destination = ScreenName.StatisticalChild.StatisticalKeno
                break;
            case LotteryType.Power:
                destination = ScreenName.StatisticalChild.StatisticalPower
                break;
            case LotteryType.Mega:
                destination = ScreenName.StatisticalChild.StatisticalMega
                break;
            case LotteryType.Max3D:
                destination = ScreenName.StatisticalChild.StatisticalMax3d
                break;
            case LotteryType.Max3DPro:
                destination = ScreenName.StatisticalChild.StatisticalPower
                break;
            default:
                break;
        }
        NavigationUtils.navigate(navigation, destination)
    }, [lotteryType, navigation])

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
                <Image source={logo.source} style={logo.style} resizeMode='contain' />
                <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={navToInstruction}>
                        <Image source={Images.instruction} style={{ width: 25, height: 25, marginRight: 12 }} tintColor={getColorLott(lotteryType)} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navToStatistical}>
                        <Image source={Images.statistical} style={{ width: 25, height: 25, marginRight: 12 }} tintColor={getColorLott(lotteryType)} />
                    </TouchableOpacity>
                    {lotteryType !== LotteryType.Keno ?
                        <CartIcon navigation={navigation} /> : <></>}
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