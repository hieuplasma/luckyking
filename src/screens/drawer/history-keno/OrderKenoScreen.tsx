import { lotteryApi } from "@api";
import { Image, Images } from "@assets";
import { BasicHeader, IText } from "@components";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import { printDisplayId, printMoney } from "@utils";
import React, { useCallback, useEffect, useRef, useState } from "react"
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { HistoryKenoStackParamList } from "src/navigation/drawer/HistoryKenoNavigation";
import { LotteryItem } from "./component/LotteryKenoItem";
import { DetailOrderSheet } from "./component/DetailOrderSheet";

type NavigationProp = StackNavigationProp<HistoryKenoStackParamList, 'OrderKenoScreen'>;
type NavigationRoute = RouteProp<HistoryKenoStackParamList, 'OrderKenoScreen'>;

export interface OrderKenoScreenParamsList { order: any }

export const OrderKenoScreen = React.memo(({ }: any) => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    useEffect(() => {
        window.loadingIndicator.show()
        const timer = setTimeout(() => {
            window.loadingIndicator.hide()
            setShowBottomSheet(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const order = route.params.order
    const createdAt = new Date(order.createdAt)

    const sheetRef: any = useRef(null)

    const [sectionData, setSectionData] = useState([])
    const [benefit, setBenefit] = useState(0)

    useEffect(() => {
        let tmpBoSo = new Set()
        let tmpSection: any = []
        let money = 0
        order.Lottery.map((it: any) => {
            if (tmpBoSo.has(it.NumberLottery.numberDetail)) {
                tmpSection[tmpSection.findIndex((item: any) => item.boSo == it.NumberLottery.numberDetail)].lotteries.push(it)
            }
            else {
                tmpBoSo.add(it.NumberLottery.numberDetail)
                tmpSection.push({ boSo: it.NumberLottery.numberDetail, lotteries: [it] })
            }
            money = money + it.benefits
        })
        setSectionData(tmpSection)
        setBenefit(money)
    }, [order])

    const openSheet = useCallback(() => { sheetRef.current?.openSheet() }, [sheetRef])
    const renderSheet = useCallback(() => {
        return (
            <DetailOrderSheet
                ref={sheetRef}
                order={order}
            />
        )
    }, [sheetRef, order])

    return (
        <View style={{ flex: 1 }}>
            <BasicHeader
                navigation={navigation}
                title={"Chi tiết đơn " + printDisplayId(order.displayId)}
                rightAction={
                    <TouchableOpacity style={styles.infoIcon} onPress={openSheet}>
                        <IText style={{ fontSize: 20, fontWeight: 'bold', color: Color.white, marginLeft: 1 }}>{"i"}</IText>
                    </TouchableOpacity>
                }
            />

            <View style={styles.top}>
                <View>
                    <IText style={{ textAlign: 'center' }}>{"Thanh toán"}</IText>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={Images.luckyking_logo} style={styles.iconPayment} />
                        <IText style={{ marginLeft: 8, color: Color.luckyPayment, fontWeight: 'bold' }}>
                            {`${printMoney(order.amount + order.surcharge)}đ`}
                        </IText>
                    </View>
                </View>

                <View>
                    <IText style={{ textAlign: 'center' }}>{"Hoàn huỷ"}</IText>
                    <IText style={{ textAlign: 'center', color: Color.mega, fontWeight: 'bold' }}>
                        {`${printMoney(0)}đ`}
                    </IText>
                </View>

                <View>
                    <IText style={{ textAlign: 'center' }}>{"Trúng thưởng"}</IText>
                    <IText style={{ textAlign: 'center', color: Color.luckyKing, fontWeight: 'bold' }}>
                        {`${printMoney(benefit)}đ`}
                    </IText>
                </View>
            </View>

            <View style={styles.body}>
                <FlatList
                    style={{ marginHorizontal: -16, paddingHorizontal: 16 }}
                    data={sectionData}
                    extraData={sectionData}
                    renderItem={({ item, index }: any) => {
                        return <LotteryItem section={item} />
                    }}
                    keyExtractor={(item: any, index) => String(item.boSo)}
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
    top: {
        width: WINDOW_WIDTH - 32, marginHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1, borderBottomColor: 'rgba(51, 51, 51, 0.2)',
        flexDirection: 'row', justifyContent: 'space-between'
    },
    iconPayment: { width: 18, height: 18 },
    body: {
        flex: 1, padding: 16, paddingTop: 4
    }
})