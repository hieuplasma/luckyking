import React, { useCallback, useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ResultStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { BasicHeader, IText, ImageHeader } from "@components";
import { Color } from "@styles";
import { FirstItemMax3d } from "../component/ItemMax3d";
import { LotteryType } from "@common";
import { ListOrderDrawKeno } from "../component/ListOrderDrawKeno";
import { lotteryApi } from "@api";

type NavigationProp = StackNavigationProp<ResultStackParamList, 'DetailMax3d'>;
type NavigationRoute = RouteProp<ResultStackParamList, 'DetailMax3d'>;

export interface ResultMax3dParamsList { data: any, type: LotteryType }

export const DetailResultMax3d = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const data = route.params.data

    const [listOrder, setListOrder] = useState([])

    const getListOrder = useCallback(async () => {
        const res = await lotteryApi.getOrderByDraw({ drawCode: data.drawCode, type: route.params.type })
        if (res) setListOrder(res.data)
    }, [])

    useEffect(() => {
        getListOrder()
    }, [])

    return (
        <View style={styles.container}>
            <BasicHeader navigation={navigation} title={"Chi tiết kết quả"} />
            <ScrollView style={styles.body}>
                <View style={{ marginLeft: -10 }}>
                    <FirstItemMax3d data={route.params.data} hideBtm={true} type={route.params.type} />
                </View>
                <ListOrderDrawKeno
                    listOrder={listOrder}
                    navigation={navigation}
                    lotteryType={route.params.type}
                    drawResult={data} />
            </ScrollView>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    body: {
        flex: 1,
        padding: 10, paddingTop: 0
    },
})