import { Image, Images } from "@assets";
import { LotteryType } from "@common";
import { IText } from "@components";
import { ScreenName } from "@navigation";
import { Color } from "@styles";
import { NavigationUtils, getColorLott, printMoney } from "@utils";
import React, { useCallback } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

interface ViewFooterProps {
    totalCost: number,
    addToCart: () => void,
    bookLottery: () => void,
    lotteryType: LotteryType,
    navigation: any
}

export const ViewFooter2 = React.memo(({ totalCost, addToCart, bookLottery, lotteryType, navigation }: ViewFooterProps) => {

    const lottColor = getColorLott(lotteryType)
    const cart = useSelector((state: any) => state.cartReducer.cart)

    const goToCart = useCallback(() => {
        NavigationUtils.navigate(navigation, ScreenName.HomeChild.CartScreen)
    }, [navigation])

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                <IText style={{ color: Color.black, fontSize: 16 }}>{"Giá vé tạm tính"}</IText>
                <IText style={{ color: Color.luckyKing, fontSize: 16 }}>{`${printMoney(totalCost)} đ`}</IText>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                <TouchableOpacity style={[styles.buttonFooterDown, { backgroundColor: Color.blue }]} activeOpacity={0.6} onPress={addToCart}>
                    <Image source={Images.add_cart} style={{ width: 26, height: 26 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonFooterDown, { backgroundColor: lottColor }]} activeOpacity={0.6} onPress={cart.length > 0 ? goToCart : bookLottery}>
                    {
                        cart.length > 0 ?
                            <IText style={{ color: Color.white, fontWeight: 'bold', fontSize: 16 }}>{"XEM GIỎ HÀNG"}</IText>
                            : <IText style={{ color: Color.white, fontWeight: 'bold', fontSize: 16 }}>{"ĐẶT VÉ"}</IText>
                    }
                </TouchableOpacity>
            </View>
        </>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    buttonFooterDown: {
        width: (windowWidth - 36) / 2, height: 44,
        borderRadius: 10, padding: 6,
        justifyContent: 'space-around', alignItems: 'center',
        backgroundColor: '#FDF9F9'
    }
})