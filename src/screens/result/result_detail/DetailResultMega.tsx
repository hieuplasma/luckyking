import React, { useCallback, useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ResultStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, StyleSheet, View } from "react-native";
import { BasicHeader, IText } from "@components";
import { Color } from "@styles";
import { FirstItemMega } from "../component/ItemMega";
import { BallLine } from "../component/BallLine";
import { LotteryType } from "@common";
import { printMoney } from "@utils";
import { PeriodStructure } from "../component/PeriodStructure";
import { ListOrderDrawKeno } from "../component/ListOrderDrawKeno";
import { lotteryApi } from "@api";

type NavigationProp = StackNavigationProp<ResultStackParamList, 'DetailMega'>;
type NavigationRoute = RouteProp<ResultStackParamList, 'DetailMega'>;

export interface ResultMegaParamsList { data: any }

export const DetailResultMega = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const data = route.params.data

    const [listOrder, setListOrder] = useState([])

    const getListOrder = useCallback(async () => {
        const res = await lotteryApi.getOrderByDraw({ drawCode: data.drawCode, type: LotteryType.Mega })
        if (res) setListOrder(res.data)
    }, [])

    useEffect(() => {
        getListOrder()
    }, [])

    return (
        <View style={styles.container}>
            <BasicHeader navigation={navigation} title={"Chi tiết kết quả"} />
            <View style={styles.body}>
                <FirstItemMega data={data} hideBtm={true} />

                <PeriodStructure
                    type={LotteryType.Mega}
                    jackpot1={data.jackpot1}
                    first={10000000}
                    second={300000}
                    third={30000}
                />

                <ListOrderDrawKeno
                    listOrder={listOrder}
                    navigation={navigation}
                    lotteryType={LotteryType.Mega}
                    drawResult={data} />
            </View>
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
    }
})