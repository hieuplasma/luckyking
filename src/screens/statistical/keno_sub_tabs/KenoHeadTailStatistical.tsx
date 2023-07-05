import { Color } from "@styles"
import React, { useEffect } from "react"
import { Dimensions, StyleSheet, View } from "react-native"

const lottColor = Color.keno

const KenoHeadTailStatistical = React.memo(({ navigation }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} />
    )
})
export default KenoHeadTailStatistical

const ExpensiveRerender = React.memo(({ navigation }: any) => {

    useEffect(() => {
        console.log("expensive rerender keno head tail")
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