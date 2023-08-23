import { IText, ImageHeader } from "@components";
import { Color } from "@styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import PagerView from 'react-native-pager-view';
import Animated from 'react-native-reanimated';
import DropDownPicker from "react-native-dropdown-picker";
import { KenoStatistical } from "@common";
import KenoBigSmallStatistical from "../keno_sub_tabs/KenoBigSmallStatistical";
import KenoHeadTailStatistical from "../keno_sub_tabs/KenoHeadTailStatistical";
import KenoNumberStatistical from "../keno_sub_tabs/KenoNumberStatistical";
import KenoEvenOddStatistical from "../keno_sub_tabs/KenoEvenOddStatistical";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StatisticalStackParamList } from "@navigation";

type NavigationProp = StackNavigationProp<StatisticalStackParamList, 'StatisticalKeno'>;
type NavigationRoute = RouteProp<StatisticalStackParamList, 'StatisticalKeno'>;

export interface StatisticalKenoParamsList { }

const lottColor = Color.keno

export const StatisticalKenoTab = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"Thống kê Keno"} />
            <ExpensiveRerender navigation={navigation} />
        </View>
    )
})

const statistical_type = [
    {
        type: KenoStatistical.NUMBER,
        title: "Bộ số"
    },
    {
        type: KenoStatistical.HEAD_TAIL,
        title: "Đầu đuôi"
    },
    {
        type: KenoStatistical.BIG_SMALL,
        title: "Lớn nhỏ"
    },
    {
        type: KenoStatistical.EVEN_ODD,
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

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(10);
    const [items, setItems] = useState([
        { label: '10 kỳ gần nhất', value: 10 },
        { label: '20 kỳ gần nhất', value: 20 },
        { label: '30 kỳ gần nhất', value: 30 },
        { label: '50 kỳ gần nhất', value: 50 },
        { label: '100 kỳ gần nhất', value: 100 },
        { label: '200 kỳ gần nhất', value: 200 },
        { label: '300 kỳ gần nhất', value: 300 },
        { label: '500 kỳ gần nhất', value: 500 },
        { label: '1000 kỳ gần nhất', value: 1000 },
    ]);

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
                {/* <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => { }}
                >
                    <View style={styles.circleOut}>
                        <View style={[styles.circleIn, { backgroundColor: Color.transparent }]} />
                    </View>
                    <IText style={{ marginLeft: 2 }}>{"Nâng cao"}</IText>
                </TouchableOpacity> */}
            </View>

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                itemKey={'value'}
                textStyle={{ fontSize: 16, fontFamily: 'myriadpro-regular' }}
                containerStyle={{ width: 180, minHeight: 30, alignSelf: 'center' }}
                style={{ minHeight: 30, marginBottom: 10 }}
                props={{ activeOpacity: 1 }}
                dropDownContainerStyle={{ height: 500 }}
            />

            <AnimatedPager
                ref={pagerRef}
                style={styles.pagerView}
                initialPage={0}
                onPageSelected={onPageSelected}
            >
                {renderedPages.includes(0) ?
                    <KenoNumberStatistical
                        key={KenoStatistical.NUMBER}
                        navigation={navigation} take={value}
                        focus={currentPage == 0 ? true : false}
                    />
                    : <View key={KenoStatistical.NUMBER} />}
                {renderedPages.includes(1) ?
                    <KenoHeadTailStatistical
                        key={KenoStatistical.HEAD_TAIL}
                        navigation={navigation} take={value}
                        focus={currentPage == 1 ? true : false}
                    />
                    : <View key={KenoStatistical.HEAD_TAIL} />}
                {renderedPages.includes(2) ?
                    <KenoBigSmallStatistical
                        key={KenoStatistical.BIG_SMALL}
                        navigation={navigation} take={value}
                        focus={currentPage == 2 ? true : false}
                    /> : <View key={KenoStatistical.BIG_SMALL} />}
                {renderedPages.includes(3) ?
                    <KenoEvenOddStatistical
                        key={KenoStatistical.EVEN_ODD}
                        navigation={navigation}
                        take={value}
                        focus={currentPage == 3 ? true : false}
                    /> : <View key={KenoStatistical.EVEN_ODD} />}
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
    }
})