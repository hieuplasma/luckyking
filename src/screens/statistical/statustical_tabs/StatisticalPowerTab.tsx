import { LotteryType, PowerMegaStatistical } from "@common";
import { IText, ImageHeader } from "@components";
import { StatisticalStackParamList } from "@navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import React, { useCallback, useRef, useState } from "react";
import { Alert, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import PagerView from 'react-native-pager-view';
import Animated from 'react-native-reanimated';
import PoMeNumberStatistical from "../powermega_sub_tabs/PoMeNumberStatistical";
import PoMeHeadTailStatistical from "../powermega_sub_tabs/PoMeHeadTailStatistical";
import PoMeEvenOddStatistical from "../powermega_sub_tabs/PoMeEvenOddStatistical";

import DatePicker from 'react-native-date-picker'
import { dateConvert } from "@utils";
import { Image, Images } from "@assets";

const lottColor = Color.power
const lotteryType = LotteryType.Power
type NavigationProp = StackNavigationProp<StatisticalStackParamList, 'StatisticalPower'>;
type NavigationRoute = RouteProp<StatisticalStackParamList, 'StatisticalPower'>;

export interface StatisticalPowerParamsList { }

export const StatisticalPowerTab = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"Thống kê Power 6/55"} />
            <ExpensiveRerender navigation={navigation} />
        </View>
    )
})

const statistical_type = [
    {
        type: PowerMegaStatistical.NUMBER,
        title: "Bộ số"
    },
    {
        type: PowerMegaStatistical.HEAD_TAIL,
        title: "Đầu đuôi"
    },
    {
        type: PowerMegaStatistical.EVEN_ODD,
        title: "Chẵn lẻ"
    }
]

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

const ExpensiveRerender = React.memo(({ navigation }: any) => {

    const pagerRef = useRef<PagerView>(null)

    const [currentPage, setCurrentPage] = useState(0)
    const [renderedPages, setRenderedPages] = useState<number[]>([]);

    const setPage = useCallback((page: number) => {
        pagerRef.current?.setPage(page)
        setCurrentPage(page)
    }, [])

    const onPageSelected = useCallback((e: any) => {
        const position = e.nativeEvent.position
        setCurrentPage(position)
        if (!renderedPages.includes(position)) {
            setRenderedPages([...renderedPages, position]);
        }
    }, [renderedPages])

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
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 4 }}>
                {
                    statistical_type.map((item, index) => {
                        const check = currentPage == index ? true : false
                        return (
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => setPage(index)}
                                key={item.type}
                                activeOpacity={1}
                            >
                                <View style={styles.circleOut}>
                                    <View style={[styles.circleIn, { backgroundColor: check ? lottColor : Color.transparent }]} />
                                </View>
                                <IText style={{ marginLeft: 4, color: check ? lottColor : Color.black }}>{item.title}</IText>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            {/* <DatePicker date={start} onDateChange={setStart} />
            <DatePicker date={end} onDateChange={setEnd} /> */}

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

            <AnimatedPager
                ref={pagerRef}
                style={styles.pagerView}
                initialPage={0}
                onPageSelected={onPageSelected}
            >
                {renderedPages.includes(0) ?
                    <PoMeNumberStatistical
                        key={PowerMegaStatistical.NUMBER}
                        navigation={navigation}
                        focus={currentPage == 0 ? true : false}
                        start={start}
                        end={end}
                        type={lotteryType}
                    />
                    : <View key={PowerMegaStatistical.NUMBER} />}
                {renderedPages.includes(1) ?
                    <PoMeHeadTailStatistical
                        key={PowerMegaStatistical.HEAD_TAIL}
                        navigation={navigation}
                        focus={currentPage == 1 ? true : false}
                        start={start}
                        end={end}
                        type={lotteryType}
                    />
                    : <View key={PowerMegaStatistical.HEAD_TAIL} />}
                {renderedPages.includes(2) ?
                    <PoMeEvenOddStatistical
                        key={PowerMegaStatistical.EVEN_ODD}
                        navigation={navigation}
                        focus={currentPage == 2 ? true : false}
                        start={start}
                        end={end}
                        type={lotteryType}
                    /> : <View key={PowerMegaStatistical.EVEN_ODD} />}
            </AnimatedPager>
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