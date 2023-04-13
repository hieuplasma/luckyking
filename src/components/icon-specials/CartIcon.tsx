import { Image, Images } from "@assets"
import { ScreenName } from "@navigation"
import { Color } from "@styles"
import { NavigationUtils } from "@utils"
import React from "react"
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle, TextStyle, ColorValue } from "react-native"
import { ImageStyle } from "react-native-fast-image"
import { useSelector } from "react-redux"

interface CartIconProps {
    navigation: any,
    style?: ImageStyle,
    badgeStyle?: ViewStyle,
    textBadgeStyle?: TextStyle,
    tintColor?: ColorValue
}
export const CartIcon = React.memo(({ navigation, style, badgeStyle, textBadgeStyle, tintColor }: CartIconProps) => {

    const cart = useSelector((state: any) => state.cartReducer.cart)

    return (
        <TouchableOpacity onPress={() => NavigationUtils.navigate(navigation, ScreenName.HomeChild.CartScreen)}>
            <Image source={Images.cart_nofilled} style={[{ width: 26, height: 26 }, style || {}]} tintColor={tintColor || undefined}>
                {
                    cart.length > 0 ?
                        <View style={[styles.badgeNumber, badgeStyle || {}]}>
                            <Text style={[styles.textBadge, textBadgeStyle || {}]}>{cart.length}</Text>
                        </View> : <></>
                }
            </Image>
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    badgeNumber: {
        position: 'absolute', top: 0, right: 0,
        width: 11, height: 11, borderRadius: 99,
        backgroundColor: Color.luckyKing,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textBadge: {
        fontSize: 7, fontWeight: 'bold', color: Color.white
    },
})