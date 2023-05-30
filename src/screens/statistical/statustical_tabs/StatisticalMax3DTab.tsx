import { lotteryApi } from "@api";
import { IText } from "@components";
import { Color } from "@styles";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, View } from "react-native";

const lottColor = Color.max3d

const StatisticalMax3DTab = React.memo(({ navigation }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} />
    )
})
export default StatisticalMax3DTab

const ExpensiveRerender = React.memo(({ navigation }: any) => {

    useEffect(() => {
        console.log("expensive rerender keno")
    })

    return (
        <View style={{ flex: 1 }}>

        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

})