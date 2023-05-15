import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ResultStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, StyleSheet, View } from "react-native";
import { BasicHeader, IText } from "@components";
import { Color } from "@styles";
import { FirstItemPower } from "../component/ItemPower";
import { PeriodStructure } from "../component/PeriodStructure";
import { LotteryType } from "@common";

type NavigationProp = StackNavigationProp<ResultStackParamList, 'DetailPower'>;
type NavigationRoute = RouteProp<ResultStackParamList, 'DetailPower'>;

export interface ResultPowerParamsList { data: any }

export const DetailResultPower = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const data = route.params.data

    return (
        <View style={styles.container}>
            <BasicHeader navigation={navigation} title={"Chi tiết kết quả"} />
            <View style={styles.body}>
                <FirstItemPower data={data} hideBtm={true} />

                <PeriodStructure
                    type={LotteryType.Power}
                    jackpot1={data.jackpot1}
                    jackpot2={data.jackpot2}
                    first={40000000}
                    second={500000}
                    third={50000}
                />

                <IText style={{ marginTop: 8, fontWeight: '600', fontSize: 15 }}>
                    {"Quý khách đã không mua vé nào cho kỳ này"}
                </IText>
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
    },
})