import { Images } from "@assets";
import { LIST_STATUS, LOTTRERY_COLOR_STATUS, OrderStatus } from "@common";
import { IText } from "@components";
import { Color } from "@styles";
import { printMoney } from "@utils";
import React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";

interface StatusLineProps {
    status: OrderStatus,
    printedCount: number,

    totalLottery: number,
    benefits: number,
    bonusCount: number
}

export const StatusOrderLine = React.memo(({ status, printedCount, totalLottery, benefits, bonusCount }: StatusLineProps) => {

    //@ts-ignore
    const colorStatus = Color.luckyKing
    return (
        <>
            <View style={styles.lineItem}>
                <Image source={Images.printed} style={styles.iconStatus} />
                <IText style={{ marginLeft: 8, color: colorStatus }}>{`Đã in: `}
                    <IText style={{ fontWeight: 'bold', color: colorStatus }}>
                        {`${printedCount}/${totalLottery}`}
                    </IText>
                </IText>
                <View style={{ flex: 1 }} />
                <Image source={Images.money} style={[styles.iconStatus, { tintColor: colorStatus }]} />
                <IText style={{ marginLeft: 8, color: colorStatus }}>{`Tính thưởng: `}
                    <IText style={{ fontWeight: 'bold', color: colorStatus }}>
                        {`${bonusCount}/${totalLottery}`}
                    </IText>
                </IText>

                {/* <View style={{ flex: 1 }} /> */}
            </View>
            {
                (status != OrderStatus.ERROR && status != OrderStatus.RETURNED) ?
                    <View style={styles.lineItem}>
                        <Image source={Images.trophy} style={[styles.iconStatus, { tintColor: colorStatus }]} />
                        <IText style={{ marginLeft: 8, color: colorStatus }}>{"Tiền thưởng: "}</IText>
                        {/* <View style={{ flex: 1 }} /> */}
                        <IText style={{ fontWeight: 'bold', color: colorStatus }}>{`${printMoney(benefits)}đ`}</IText>
                        <View style={{ flex: 1 }} />
                    </View>
                    : <></>
            }
        </>
    )
})

const styles = StyleSheet.create({
    lineItem: {
        marginTop: 12,
        flexDirection: 'row', justifyContent: 'space-between'
    },
    iconStatus: { width: 20, height: 20 }
})