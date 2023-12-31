import { Image, Images } from "@assets";
import { LIST_STATUS, LotteryType, OrderStatus } from "@common";
import { IText } from "@components";
import { Color } from "@styles";
import { dateConvert, getColorLott, printDisplayId, printMoney } from "@utils";
import React, { useEffect, useState } from "react";
import { ColorValue, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { StatusOrderLine } from "../../component/StatusOrderLine";

interface OrderItemProps {
    order: any,
    onPress: () => void,
    bgColor?: ColorValue
}

const list: any = {
    power655: '6/55',
    mega645: '6/45',
    max3d: '3D',
    max3dpro: '3DPro',
    max3dplus: '3D+'
}

export const OrderBasicItem = React.memo(({ order, onPress }: OrderItemProps) => {

    const [listType, setType] = useState<any>([])
    const [printedCount, setPrintedCount] = useState(0)
    const [bonusCount, setBonusCount] = useState(0)
    const [errorCount, setErrorCount] = useState(0)

    useEffect(() => {
        let totalPrinted = 0;
        let totalBonus = 0;
        let totalError = 0;
        let tmpType: any = new Set()
        order.Lottery.map((it: any) => {
            tmpType.add(it.type)
            if (LIST_STATUS.PRINTED.includes(it.status)) totalPrinted++
            if (it.result) totalBonus++
            if (it.status == OrderStatus.ERROR || it.status == OrderStatus.RETURNED) totalError++
        })
        setType(Array.from(tmpType))
        setPrintedCount(totalPrinted)
        setBonusCount(totalBonus)
        setErrorCount(totalError)
    }, [order])

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
            <View style={styles.lineItem}>
                <IText style={{ fontWeight: 'normal' }}>{"Mã đơn hàng: "}
                    <IText style={{ fontWeight: 'bold' }}>
                        {printDisplayId(order.displayId)}
                    </IText>
                </IText>
            </View>

            <View style={styles.lineItem}>
                <IText>
                    {"Loại vé:  "}
                    {
                        listType.map((type: LotteryType, index: number) => {
                            return (<IText
                                style={{ fontWeight: 'bold', color: getColorLott(type) }}
                                key={type}>{list[type] + (index == listType.length - 1 ? "" : ", ")}</IText>)
                        })
                    }
                </IText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={Images.luckyking_logo} style={styles.iconPayment} />
                    <IText style={{ marginLeft: 8, color: Color.luckyPayment, fontWeight: 'bold' }}>
                        {`${printMoney(order.amount + order.surcharge)}đ`}
                    </IText>
                </View>
            </View>

            <StatusOrderLine
                status={order.status}
                printedCount={printedCount}
                totalLottery={order.Lottery.length}
                benefits={order.benefits}
                bonusCount={bonusCount}
                errorCount={errorCount}
            />
        </TouchableOpacity>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    itemContainer: {
        width: windowWidth, paddingTop: 4, paddingHorizontal: 16, paddingBottom: 8,
        borderBottomColor: 'rgba(160, 160, 160, 0.4)', borderBottomWidth: 1,
    },
    lineItem: {
        marginTop: 4,
        flexDirection: 'row', justifyContent: 'space-between'
    },
    txItem: {
        color: '#4F4D4D'
    },
    iconPayment: { width: 18, height: 18 },
    iconStatus: { width: 23, height: 23 }
})