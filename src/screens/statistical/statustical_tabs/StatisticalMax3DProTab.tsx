import { LotteryType } from "@common";
import { IText, ImageHeader } from "@components";
import { StatisticalStackParamList } from "@navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import React, { useCallback, useRef, useState } from "react";
import { Alert, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

import DatePicker from 'react-native-date-picker'
import { dateConvert } from "@utils";
import { Image, Images } from "@assets";
import { Max3dHeadTailStatistical } from "../max3d_sub_tabs/Max3dHeadTailStatistical";

const lottColor = Color.max3dpro
const lotteryType = LotteryType.Max3DPro
type NavigationProp = StackNavigationProp<StatisticalStackParamList, 'StatisticalMax3dPro'>;
type NavigationRoute = RouteProp<StatisticalStackParamList, 'StatisticalMax3dPro'>;

export interface StatisticalMax3dProParamsList { }

export const StatisticalMax3DProTab = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"Thống kê Max3DPro"} />
            <ExpensiveRerender navigation={navigation} />
        </View>
    )
})

const ExpensiveRerender = React.memo(({ navigation }: any) => {

    let before = new Date()
    before.setMonth(before.getMonth() - 1)
    before.setHours(0)
    const [start, setStart] = useState<Date>(before)
    const [end, setEnd] = useState<Date>(new Date())

    //status of dateimepicker modal
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 8 }}>
                <IText>{"Từ ngày:"}</IText>
                <TouchableOpacity style={styles.datePick} onPress={() => setOpen1(true)}>
                    <IText style={{ fontSize: 16 }}>{dateConvert(start)}</IText>
                    <Image source={Images.down_arrow} style={{ width: 12, height: 6, marginLeft: 8 }} />
                </TouchableOpacity>
                <IText>{"Đến ngày:"}</IText>
                <TouchableOpacity style={styles.datePick} onPress={() => setOpen2(true)}>
                    <IText style={{ fontSize: 16 }}>{dateConvert(end)}</IText>
                    <Image source={Images.down_arrow} style={{ width: 12, height: 6, marginLeft: 8 }} />
                </TouchableOpacity>
            </View>

            <DatePicker
                title={"Chọn ngày kết thúc"}
                confirmText="Xác nhận"
                cancelText="Huỷ"
                modal
                mode="date"
                maximumDate={end}
                open={open1}
                date={start}
                onConfirm={(date) => {
                    const tmp = date
                    setOpen1(false)
                    const distance = (end.getFullYear() - tmp.getFullYear()) * 12 + end.getMonth() - tmp.getMonth()
                    if (distance <= 6) {
                        tmp.setHours(0)
                        setStart(tmp)
                    }
                    else Alert.alert("Thông báo", "Quý khách vui lòng chọn khoảng thời gian dưới 6 tháng")
                }}
                onCancel={() => {
                    setOpen1(false)
                }}
            />
            <DatePicker
                title={"Chọn ngày kết thúc"}
                confirmText="Xác nhận"
                cancelText="Huỷ"
                modal
                mode="date"
                maximumDate={new Date()}
                open={open2}
                date={end}
                onConfirm={(date) => {
                    const tmp = date
                    setOpen2(false)
                    const distance = (tmp.getFullYear() - start.getFullYear()) * 12 + tmp.getMonth() - start.getMonth()
                    if (distance <= 6) {
                        tmp.setHours(20)
                        setEnd(tmp)
                    }
                    else Alert.alert("Thông báo", "Quý khách vui lòng chọn khoảng thời gian dưới 6 tháng")
                }}
                onCancel={() => {
                    setOpen2(false)
                }}
            />

            <Max3dHeadTailStatistical
                navigation={navigation}
                focus={true}
                start={start}
                end={end}
                type={lotteryType}
            />
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    circleOut: {
        width: 16, height: 16,
        borderRadius: 99, borderWidth: 1,
        borderColor: lottColor,
        justifyContent: 'center', alignItems: 'center'
    },
    circleIn: {
        width: 10, height: 10,
        borderRadius: 99, borderWidth: 1,
        borderColor: lottColor
    },
    pagerView: {
        flex: 1, zIndex: -100
    },
    datePick: {
        height: 33, paddingHorizontal: 16,
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10, borderWidth: 1, borderColor: Color.black
    }
})