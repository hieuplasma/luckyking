import React from "react";
import { FirstItemKeno } from "../component/ItemKeno";
import { StackNavigationProp } from "@react-navigation/stack";
import { ResultStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, StyleSheet, View } from "react-native";
import { BasicHeader, IText, ImageHeader } from "@components";
import { Color } from "@styles";

type NavigationProp = StackNavigationProp<ResultStackParamList, 'DetailKeno'>;
type NavigationRoute = RouteProp<ResultStackParamList, 'DetailKeno'>;

export interface ResultKenoParamsList { data: any }

export const DetailResultKeno = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <BasicHeader navigation={navigation} title={"Chi tiết kết quả"} />
            <View style={styles.body}>
                <FirstItemKeno data={route.params.data} hideBtm={true} />
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