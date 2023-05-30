import { lotteryApi } from "@api";
import { IText } from "@components";
import { Color } from "@styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import PagerView from 'react-native-pager-view';
import Animated from 'react-native-reanimated';
import DropDownPicker from "react-native-dropdown-picker";
import { KenoStatistical } from "@common";
import KenoBigSmallStatistical from "../keno_sub_tabs/KenoBigSmallStatistical";
import KenoHeadTailStatistical from "../keno_sub_tabs/KenoHeadTailStatistical";
import KenoNumberStatistical from "../keno_sub_tabs/KenoNumberStatistical";
import KenoEvenOddStatistical from "../keno_sub_tabs/KenoEvenOddStatistical";

const lottColor = Color.keno

const StatisticalKenoTab = React.memo(({ navigation }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} />
    )
})
export default StatisticalKenoTab

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

    useEffect(() => {
        console.log("expensive rerender keno")
    })

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
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 4 }}>
                {
                    statistical_type.map((item, index) => {
                        const check = currentPage == index ? true : false
                        return (
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => setPage(index)}
                                key={item.type}
                            >
                                <View style={styles.circleOut}>
                                    <View style={[styles.circleIn, { backgroundColor: check ? lottColor : Color.transparent }]} />
                                </View>
                                <IText style={{ marginLeft: 2 }}>{item.title}</IText>
                            </TouchableOpacity>
                        )
                    })
                }
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => { }}
                >
                    <View style={styles.circleOut}>
                        <View style={[styles.circleIn, { backgroundColor: Color.transparent }]} />
                    </View>
                    <IText style={{ marginLeft: 2 }}>{"Nâng cao"}</IText>
                </TouchableOpacity>
            </View>

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                itemKey={'value'}
                textStyle={{ fontSize: 13 }}
                containerStyle={{ width: 180, minHeight: 30, alignSelf:'center' }}
                style={{ minHeight: 30 }}
            />

            <AnimatedPager
                ref={pagerRef}
                style={styles.pagerView}
                initialPage={0}
                onPageSelected={onPageSelected}
            >
                {renderedPages.includes(0) ? <KenoNumberStatistical key={KenoStatistical.NUMBER} navigation={navigation} /> : <View key={KenoStatistical.NUMBER} />}
                {renderedPages.includes(1) ? <KenoHeadTailStatistical key={KenoStatistical.HEAD_TAIL} navigation={navigation} /> : <View key={KenoStatistical.HEAD_TAIL} />}
                {renderedPages.includes(2) ? <KenoBigSmallStatistical key={KenoStatistical.BIG_SMALL} navigation={navigation} /> : <View key={KenoStatistical.BIG_SMALL} />}
                {renderedPages.includes(3) ? <KenoEvenOddStatistical key={KenoStatistical.EVEN_ODD} navigation={navigation} /> : <View key={KenoStatistical.EVEN_ODD} />}
            </AnimatedPager>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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