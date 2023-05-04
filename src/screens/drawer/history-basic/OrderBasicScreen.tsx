import { BasicHeader, IText } from "@components";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import { printDisplayId, printMoney } from "@utils";
import React, { useCallback, useEffect, useRef, useState } from "react"
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { HistoryBasicStackParamList } from "@navigation";
import { DetailOrderSheet } from "../component/DetailOrderSheet";
import { LotteryBasicItem } from "./component/LotteryBasicItem";
import DropDownPicker from "react-native-dropdown-picker";
import { DELAY_SCREEN, OrderStatus } from "@common";

type NavigationProp = StackNavigationProp<HistoryBasicStackParamList, 'OrderBasicScreen'>;
type NavigationRoute = RouteProp<HistoryBasicStackParamList, 'OrderBasicScreen'>;

type Status = 'pending' | 'complete' | 'returned'

export interface OrderBasicScreenParamsList { order: any, status: Status }

export const OrderBasicScreen = React.memo(({ }: any) => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    useEffect(() => {
        window.loadingIndicator.show()
        const timer = setTimeout(() => {
            window.loadingIndicator.hide()
            setShowBottomSheet(true);
        }, DELAY_SCREEN);
        return () => clearTimeout(timer);
    }, []);

    const order = route.params.order
    const status = route.params.status
    const createdAt = new Date(order.createdAt)

    const sheetRef: any = useRef(null)

    const [sectionData, setSectionData] = useState(order.Lottery)

    const openSheet = useCallback(() => { sheetRef.current?.openSheet() }, [sheetRef])
    const renderSheet = useCallback(() => {
        return (
            <DetailOrderSheet
                ref={sheetRef}
                order={order}
            />
        )
    }, [sheetRef, order])

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('all');
    const [items, setItems] = useState([
        { label: 'Tất cả', value: 'all', key: '1' },
        { label: 'Power', value: 'power655', key: '2' },
        { label: 'Mega', value: 'mega645', key: '3' },
        { label: 'Max3D', value: 'max3d', key: '4' },
        { label: 'Max3D+', value: 'max3dplus', key: '5' },
        { label: 'Max3DPro', value: 'max3dpro', key: '6' },
    ]);

    const [openStatus, setOpenStatus] = useState(false)
    const [valueStatus, setValueStatus] = useState('all');
    const [itemsStatus, setItemsStatus] = useState([
        { label: 'Tất cả', value: 'all', key: '1' },
        { label: 'Chưa xổ', value: OrderStatus.CONFIRMED, key: '2' },
        { label: 'Không trúng', value: OrderStatus.NO_PRIZE, key: '3' },
        { label: 'Trúng thưởng', value: OrderStatus.WON, key: '4' },
        { label: 'Đã trả thưởng', value: OrderStatus.PAID, key: '5' },
    ]);

    useEffect(() => {
        let tmp = [...order.Lottery]
        if (value != 'all')
            tmp = tmp.filter((param: any) => { return param.type == value })
        if (valueStatus != 'all')
            tmp = tmp.filter((param: any) => { return param.status == valueStatus })
        setSectionData(tmp)
    }, [value, valueStatus])

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

            {
                (status == 'pending' || status == 'returned') ?
                    <View style={styles.top}>
                        <IText style={{ fontWeight: 'bold' }}>{"Chọn loại vé cần xem trong đơn:"}</IText>
                        <View style={{ flex: 1 }} />
                        {/* Vao lib sua activeOpacity={1}*/}
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            itemKey={'value'}
                            textStyle={{ fontSize: 13 }}
                            containerStyle={{ width: 120, minHeight: 30 }}
                            style={{ minHeight: 30 }}
                        />
                    </View>
                    :
                    <View style={[styles.top, { justifyContent: 'space-around' }]}>
                        <View>
                            <IText style={{ fontWeight: 'bold' }}>{"Chọn loại vé:"}</IText>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setItems={setItems}
                                setOpen={setOpen}
                                setValue={setValue}
                                itemKey={'value'}
                                textStyle={{ fontSize: 13 }}
                                containerStyle={{ width: 120, minHeight: 30, marginTop: 8 }}
                                style={{ minHeight: 30 }}
                            />
                        </View>
                        <View>
                            <IText style={{ fontWeight: 'bold' }}>{"Trạng thái:"}</IText>
                            <DropDownPicker
                                open={openStatus}
                                value={valueStatus}
                                items={itemsStatus}
                                setItems={setItemsStatus}
                                setOpen={setOpenStatus}
                                setValue={setValueStatus}
                                itemKey={'value'}
                                textStyle={{ fontSize: 13 }}
                                containerStyle={{ width: 150, minHeight: 30, marginTop: 8 }}
                                style={{ minHeight: 30 }}
                            />
                        </View>
                    </View>
            }

            <View style={styles.body}>
                <FlatList
                    style={{ marginHorizontal: -16, paddingHorizontal: 16 }}
                    data={sectionData}
                    extraData={sectionData}
                    renderItem={({ item, index }: any) => {
                        return (<LotteryBasicItem lottery={item} tab={status}/>)
                    }
                    }
                    keyExtractor={(item: any, index) => item.id}
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
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconPayment: { width: 18, height: 18 },
    body: {
        flex: 1, padding: 16, paddingTop: 4, zIndex: -100
    }
})