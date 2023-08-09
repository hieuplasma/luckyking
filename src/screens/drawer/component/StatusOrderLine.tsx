import { Images } from "@assets";
import { OrderStatus } from "@common";
import { IText } from "@components";
import { Color } from "@styles";
import { printMoney } from "@utils";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface StatusLineProps {
    status: OrderStatus,
    printedCount: number,

    totalLottery: number,
    benefits: number,
    bonusCount: number,
    errorCount: number
}

export const StatusOrderLine = React.memo(({ status, printedCount,
    totalLottery, benefits, bonusCount, errorCount }: StatusLineProps) => {

    //@ts-ignore
    const colorStatus = (benefits > 0 ? Color.luckyKing :
        (bonusCount + errorCount < totalLottery) ? Color.keno :
            (errorCount == totalLottery) ? Color.gray : Color.blue)
    return (
        <>
            <View style={styles.lineItem}>
                <View>
                    <View style={[styles.lineItem, { opacity: 1 }]}>
                        <Image source={Images.printed} style={[styles.iconStatus, { tintColor: Color.black }]} />
                        <IText style={{ marginLeft: 8, color: Color.black }}>{`Đã in: `}
                            <IText style={{ fontWeight: 'bold', color: Color.black }}>
                                {`${printedCount}/${totalLottery}`}
                                <IText style={{ fontWeight: 'normal' }}>
                                    {errorCount > 0 ? ` (Hoàn huỷ: ${errorCount})` : ''}
                                </IText>
                            </IText>
                        </IText>
                        <View style={{ flex: 1 }} />
                    </View>

                    {/* 
                    {
                        (status != OrderStatus.ERROR && status != OrderStatus.RETURNED && benefits > 0) ?
                            <View style={styles.lineItem}>
                                <Image source={Images.trophy} style={[styles.iconStatus, { tintColor: colorStatus }]} />
                                <IText style={{ marginLeft: 8, color: colorStatus }}>{"Tiền thưởng: "}</IText>
                                <IText style={{ fontWeight: 'bold', color: colorStatus }}>{`${printMoney(benefits)}đ`}</IText>
                                <View style={{ flex: 1 }} />
                            </View>
                            : <></>
                    } */}
                </View>
                <View style={{ flex: 1 }} />
                {/* <Image source={Images.money} style={[styles.iconStatus, { tintColor: colorStatus }]} />
                <IText style={{ marginLeft: 8, color: colorStatus }}>{`Tính thưởng: `}
                    <IText style={{ fontWeight: 'bold', color: colorStatus }}>
                        {`${bonusCount}/${totalLottery}`}
                    </IText>
                </IText> */}
                {
                    benefits == 0 &&
                    <View style={styles.lineItem}>
                        <IText style={{ color: colorStatus, fontWeight: 'bold' }}>
                            {colorStatus == Color.keno ?
                                (printedCount > 0 ? 'Đợi quay thưởng' : 'Đợi in vé') : ''}
                            {colorStatus == Color.blue || colorStatus == Color.luckyKing ?
                                'Không trúng' : ''}
                            {colorStatus == Color.gray ? 'Đơn hoàn huỷ' : ''}
                        </IText>
                    </View>
                }

                {
                    (status != OrderStatus.ERROR && status != OrderStatus.RETURNED && benefits > 0) ?
                        <View style={styles.lineItem}>
                            <Image source={Images.trophy} style={[styles.iconStatus, { tintColor: colorStatus }]} />
                            <IText style={{ marginLeft: 8, color: colorStatus, fontWeight: 'bold' }}>{"Tiền thưởng: "}</IText>
                            {/* <View style={{ flex: 1 }} /> */}
                            <IText style={{ fontWeight: 'bold', color: colorStatus }}>{`${printMoney(benefits)}đ`}</IText>
                            {/* <View style={{ flex: 1 }} /> */}
                        </View>
                        : <></>
                }

                {/* <View style={{ flex: 1 }} /> */}
            </View>

        </>
    )
})

const styles = StyleSheet.create({
    lineItem: {
        marginTop: 4,
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconStatus: { width: 20, height: 20 }
})