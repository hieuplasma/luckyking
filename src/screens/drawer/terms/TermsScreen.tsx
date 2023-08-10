import { termResource } from "@assets";
import { IText, ImageHeader } from "@components";
import { TermsStackParamList } from "@navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import React from "react";
import { StyleSheet, View, Dimensions, ScrollView, Platform } from "react-native";

type NavigationProp = StackNavigationProp<TermsStackParamList, 'TermsScreen'>;
type NavigationRoute = RouteProp<TermsStackParamList, 'TermsScreen'>;

export interface TermScreenParamsList { }

export const TermScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();
    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={'ĐIỀU KHOẢN SỬ DỤNG'} />
            <ScrollView style={{ flex: 1, paddingHorizontal: 6 }}>
                <IText style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }} children={termResource.bigTitle} />
                <IText style={{ textAlign: Platform.OS !== 'android' ? 'justify' : 'auto' }} children={termResource.content} />
                <View style={{ height: 30 }} />
            </ScrollView>
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

