import { lotteryApi } from "@api";
import { BasicHeader, IText } from "@components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import { printDisplayId, printMoney } from "@utils";
import React, { useCallback, useEffect, useRef, useState } from "react"
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import { HistoryKenoStackParamList } from "src/navigation/drawer/HistoryKenoNavigation";
import { DetailOrderSheet } from "../component/DetailOrderSheet";
import { LotteryKenoItem } from "./component/LotteryKenoItem";
import { DELAY_SCREEN, TransactionType } from "@common";
import { HeaderOrder } from "../component/HeaderOrder";

type NavigationProp = StackNavigationProp<HistoryKenoStackParamList, 'OrderKenoScreen'>;
type NavigationRoute = RouteProp<HistoryKenoStackParamList, 'OrderKenoScreen'>;

export interface OrderKenoScreenParamsList { order: any }

export const OrderKenoScreen = React.memo(({ }: any) => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const order = route.params.order
    const [thisOrder, setThisOrder] = useState(route.params.order)
    const [isLoading, setLoading] = useState(false)

    const onRefresh = useCallback(async () => {
        setLoading(true)
        window.loadingIndicator.show()
        const res = await lotteryApi.getOrderById({ orderId: order.id })
        if (res) {
            setThisOrder(res.data)
        }
        setLoading(false)
        window.loadingIndicator.hide()
    }, [])


    const [showBottomSheet, setShowBottomSheet] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            onRefresh()
            setShowBottomSheet(true);
        }, DELAY_SCREEN);
        return () => clearTimeout(timer);
    }, []);

    const sheetRef: any = useRef(null)

    const [sectionData, setSectionData] = useState([])
    const [returnAmount, setReturnAmount] = useState(0)

    useEffect(() => {
        let tmpBoSo = new Set();
        let tmpSection: any = [];
        let index = 0;
        let totalReturn = 0;

        thisOrder.Lottery.map((it: any) => {
            if (tmpBoSo.has(it.NumberLottery.numberDetail)) {
                tmpSection[tmpSection.findIndex((item: any) => item.boSo == it.NumberLottery.numberDetail)].lotteries.push(it)
            }
            else {
                tmpBoSo.add(it.NumberLottery.numberDetail)
                tmpSection.push({ boSo: it.NumberLottery.numberDetail, lotteries: [it], idSection: index })
                index++
            }
        })

        thisOrder.transaction.map((it: any) => {
            if (it.type == TransactionType.Refund) {
                totalReturn = totalReturn + it.amount
            }
        })
        setSectionData(tmpSection)
        setReturnAmount(totalReturn)
    }, [thisOrder])

    const openSheet = useCallback(() => { sheetRef.current?.openSheet() }, [sheetRef])
    const renderSheet = useCallback(() => {
        return (
            <DetailOrderSheet
                ref={sheetRef}
                order={thisOrder}
            />
        )
    }, [sheetRef, thisOrder])

    return (
        <View style={{ flex: 1 }}>
            <BasicHeader
                navigation={navigation}
                title={"Chi tiết đơn " + printDisplayId(thisOrder.displayId)}
                rightAction={
                    <TouchableOpacity style={styles.infoIcon} onPress={openSheet}>
                        <IText style={{ fontSize: 20, fontWeight: 'bold', color: Color.white, marginLeft: 1 }}>{"i"}</IText>
                    </TouchableOpacity>
                }
            />

            <HeaderOrder
                amount={thisOrder.amount + thisOrder.surcharge}
                returnAmount={returnAmount}
                benefits={order.benefits}
            />

            <View style={styles.body}>
                <FlatList
                    style={{ marginHorizontal: -16, paddingHorizontal: 16 }}
                    data={sectionData}
                    extraData={sectionData}
                    renderItem={({ item, index }: any) => {
                        return <LotteryKenoItem section={item} navigation={navigation} />
                    }}
                    keyExtractor={(item: any, index) => String(item.idSection)}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    ListFooterComponent={<View style={{ height: 100 }}></View>}
                />
            </View>

            {showBottomSheet ? renderSheet() : <></>}
        </View>
    )
})

const styles = StyleSheet.create({
    infoIcon: {
        width: 23, height: 23,
        borderRadius: 99, backgroundColor: 'red',
        justifyContent: 'center', alignItems: 'center',
        alignSelf: 'flex-end'
    },
    body: {
        flex: 1, padding: 16, paddingTop: 4
    }
})