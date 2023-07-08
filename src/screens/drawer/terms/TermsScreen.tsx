import { ImageHeader } from "@components";
import { TermsStackParamList } from "@navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Dimensions } from "react-native";

type NavigationProp = StackNavigationProp<TermsStackParamList, 'TermsScreen'>;
type NavigationRoute = RouteProp<TermsStackParamList, 'TermsScreen'>;

export interface TermScreenParamsList { }

export const TermScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();
    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={'ĐIỀU KHOẢN SỬ DỤNG'} />
            <View style={{flex: 1}}>
                <webview src="./terms.html">

                </webview>

            </View>
        </View>

    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    }
})