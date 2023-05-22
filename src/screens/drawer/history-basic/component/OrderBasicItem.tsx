import { Image, Images } from "@assets";
import { OrderStatus } from "@common";
import { IText } from "@components";
import { Color } from "@styles";
import { printDisplayId, printMoney } from "@utils";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

interface OrderItemProps {
    order: any,
    onPress: () => void
}

const list: any = {
    power655: '6/55',
    mega645: '6/45',
    max3d: '3D',
    max3dpro: '3DPro',
    max3dplus: '3D+'
}

export const OrderBasicItem = React.memo(({ order, onPress }: OrderItemProps) => {

    const user = useSelector((state: any) => state.userReducer)

    const createdAt = new Date(order.createdAt)

    const [listType, setType] = useState<any>([])
    const [benefit, setBenefit] = useState(0)

    useEffect(() => {
        let tmp = new Set()
        let tmpType: any = new Set()
        let money = 0
        order.Lottery.map((it: any) => {
            if (tmp.has(it.drawCode)) { }
            else {
                tmp.add(it.drawCode)
                tmpType.add(list[it.type])
            }
            money = money + it.benefits
        })
        setType(Array.from(tmpType))
        setBenefit(money)
    }, [order])

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
            <IText style={{ fontWeight: 'bold', }}>
                {createdAt.toLocaleDateString()}
            </IText>
            <View style={styles.lineItem}>
                <IText>{`Nhận: ${user.fullName}`}</IText>
                <IText>{printDisplayId(order.displayId)}</IText>
            </View>

            <View style={styles.lineItem}>
                <IText>
                    {"Giữ hộ: "}
                    {
                        listType.map((type: string, index: number) => {
                            return (<IText key={type}>{type + (index == listType.length - 1 ? "" : ",")}</IText>)
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

            {
                (order.status == OrderStatus.PENDING || order.status == OrderStatus.LOCK)
                && <View style={styles.lineItem}>
                    <Image source={Images.print} style={styles.iconStatus} />
                    <IText style={{ marginLeft: 12, color: '#F97701' }}>{"Đợi in vé"}</IText>
                    <View style={{ flex: 1 }} />
                </View>
            }

            {
                (order.status == OrderStatus.CONFIRMED)
                && <View style={styles.lineItem}>
                    <Image source={Images.printed} style={styles.iconStatus} />
                    <IText style={{ marginLeft: 12, color: '#F97701' }}>{"Đã in vé"}</IText>
                    <View style={{ flex: 1 }} />
                </View>
            }

            {
                (order.status == OrderStatus.WON)
                && <View style={styles.lineItem}>
                    <Image source={Images.trophy} style={styles.iconStatus} />
                    <IText style={{ marginLeft: 12, color: Color.luckyKing }}>{"Trúng thưởng"}</IText>
                    <View style={{ flex: 1 }} />
                    <IText style={{ fontWeight: 'bold', color: Color.luckyKing }}>{`${printMoney(benefit)}đ`}</IText>
                </View>
            }

            {
                (order.status == OrderStatus.PAID)
                && <View style={styles.lineItem}>
                    <Image source={Images.trophy} style={styles.iconStatus} />
                    <IText style={{ marginLeft: 12, color: Color.luckyKing }}>{"Đã trả thưởng"}</IText>
                    <View style={{ flex: 1 }} />
                    <IText style={{ fontWeight: 'bold', color: Color.luckyKing }}>{`${printMoney(benefit)}đ`}</IText>
                </View>
            }

            {
                (order.status == OrderStatus.NO_PRIZE)
                && <View style={styles.lineItem}>
                    <Image source={Images.trophy} style={styles.iconStatus} />
                    <IText style={{ marginLeft: 12, color: Color.luckyKing }}>{"Không trúng thưởng :("}</IText>
                    <View style={{ flex: 1 }} />
                    <IText style={{ fontWeight: 'bold', color: Color.luckyKing }}>{`${printMoney(benefit)}đ`}</IText>
                </View>
            }
        </TouchableOpacity>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    itemContainer: {
        width: windowWidth - 32, margin: 8, paddingVertical: 8, marginHorizontal: 16,
        borderBottomColor: 'rgba(160, 160, 160, 0.2)', borderBottomWidth: 1
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