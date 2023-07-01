import { Image, Images } from "@assets";
import { IText } from "@components";
import { Color } from "@styles";
import { printMoney } from "@utils";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

interface HeaderOrderProps {
    amount: number,
    returnAmount: number,
    benefits: number
}

export const HeaderOrder = React.memo(({amount, returnAmount, benefits}: HeaderOrderProps) => {
    return (
        <View style={styles.top}>
            <View>
                <IText style={{ textAlign: 'center' }}>{"Thanh toán"}</IText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={Images.luckyking_logo} style={styles.iconPayment} />
                    <IText style={{ marginLeft: 8, color: Color.luckyPayment, fontWeight: 'bold' }}>
                        {`${printMoney(amount)}đ`}
                    </IText>
                </View>
            </View>

            <View>
                <IText style={{ textAlign: 'center' }}>{"Hoàn huỷ"}</IText>
                <IText style={{ textAlign: 'center', color: Color.mega, fontWeight: 'bold' }}>
                    {`${printMoney(returnAmount)}đ`}
                </IText>
            </View>

            <View>
                <IText style={{ textAlign: 'center' }}>{"Trúng thưởng"}</IText>
                <IText style={{ textAlign: 'center', color: Color.luckyKing, fontWeight: 'bold' }}>
                    {`${printMoney(benefits)}đ`}
                </IText>
            </View>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    top: {
        width: windowWidth - 32, marginHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1, borderBottomColor: 'rgba(51, 51, 51, 0.2)',
        flexDirection: 'row', justifyContent: 'space-between'
    },
    iconPayment: { width: 18, height: 18 },
})