import { Image, Images } from "@assets";
import { LIST_STATUS } from "@common";
import { IText } from "@components";
import { Color } from "@styles";
import { dateConvert, printDisplayId, printDraw2, printMoney } from "@utils";
import React, { useEffect, useState } from "react";
import { ColorValue, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { StatusOrderLine } from "../../component/StatusOrderLine";

interface OrderItemProps {
    order: any,
    onPress: () => void,
    bgColor?: ColorValue
}

export const OrderItem = React.memo(({ order, onPress, bgColor }: OrderItemProps) => {

    const user = useSelector((state: any) => state.userReducer)

    const createdAt = new Date(order.createdAt)

    const [listDraw, setListDraw] = useState<any>([])
    const [printedCount, setPrintedCount] = useState(0)
    const [bonusCount, setBonusCount] = useState(0)

    useEffect(() => {
        let tmp = new Set()
        let tmpDraw: any = []
        let totalPrinted = 0;
        let totalBonus = 0

        order.Lottery.map((it: any) => {
            if (tmp.has(it.drawCode)) { }
            else {
                tmp.add(it.drawCode)
                tmpDraw.push({ drawCode: it.drawCode, drawTime: it.drawTime })
            }
            if (LIST_STATUS.PRINTED.includes(it.status)) totalPrinted++
            if (it.result) totalBonus ++
        })

        setListDraw(tmpDraw)
        setPrintedCount(totalPrinted)
        setBonusCount(totalBonus)
    }, [order])

    return (
        <TouchableOpacity style={[styles.itemContainer, { backgroundColor: bgColor }]} onPress={onPress}>
            <IText style={{ fontWeight: 'bold', }}>
                {dateConvert(createdAt)}
            </IText>
            <View style={styles.lineItem}>
                <IText>{`Nhận: ${user.fullName}`}</IText>
                <IText style={{fontWeight:'bold'}}>{printDisplayId(order.displayId)}</IText>
            </View>

            <View style={styles.lineItem}>
                <View>
                    {listDraw.map((item: any, index: number) => {
                        return (
                            <IText style={styles.txItem} key={'' + index}>{printDraw2(item)}</IText>
                        )
                    })}
                </View>
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
            />

        </TouchableOpacity>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    itemContainer: {
        width: windowWidth, paddingVertical: 12, paddingHorizontal: 16,
        // borderBottomColor: 'rgba(160, 160, 160, 0.2)', borderBottomWidth: 1
    },
    lineItem: {
        marginTop: 12,
        flexDirection: 'row', justifyContent: 'space-between'
    },
    txItem: {
        color: '#4F4D4D'
    },
    iconPayment: { width: 18, height: 18 },
    iconStatus: { width: 23, height: 23 }
})