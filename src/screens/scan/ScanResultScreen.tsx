import { BasicHeader, IText } from "@components";
import { ScanStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavigationProp = StackNavigationProp<ScanStackParamList, 'ScanResult'>;
type NavigationRoute = RouteProp<ScanStackParamList, 'ScanResult'>;

export interface ScanResultScreenParamsList { data: any }

export const ScanResultScreen = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const scan_result = route.params.data



    return (
        <View style={styles.container}>
            <BasicHeader
                navigation={navigation}
                title={"Quét vé so kết quả"}
            />

            <IText>
                {`Data scan được\n${scan_result}`}
            </IText>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.buyLotteryBackGround
    }
})