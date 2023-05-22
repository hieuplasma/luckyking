import React, { useCallback, useEffect, useState } from "react";
import { FirstItemKeno } from "../component/ItemKeno";
import { StackNavigationProp } from "@react-navigation/stack";
import { ResultStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { BasicHeader, IText, ImageHeader } from "@components";
import { Color } from "@styles";
import { lotteryApi } from "@api";
import { LotteryType } from "@common";
import { ListOrderDrawKeno } from "../component/ListOrderDrawKeno";

type NavigationProp = StackNavigationProp<ResultStackParamList, 'DetailKeno'>;
type NavigationRoute = RouteProp<ResultStackParamList, 'DetailKeno'>;

export interface ResultKenoParamsList { data: any }

export const DetailResultKeno = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const data = route.params.data

    const [listOrder, setListOrder] = useState([])

    const getListOrder = useCallback(async () => {
        const res = await lotteryApi.getOrderByDraw({ drawCode: data.drawCode, type: LotteryType.Keno })
        if (res) setListOrder(res.data)
    }, [])

    useEffect(() => {
        getListOrder()
    }, [])

    return (
        <View style={styles.container}>
            <BasicHeader navigation={navigation} title={"Chi tiết kết quả"} />
            <ScrollView style={styles.body}>
                <FirstItemKeno data={data} hideBtm={true} />
                <ListOrderDrawKeno
                    listOrder={listOrder}
                    navigation={navigation}
                    lotteryType={LotteryType.Keno}
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
        padding: 10
    },
})