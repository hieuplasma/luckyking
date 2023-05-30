import { IText } from "@components"
import { Color } from "@styles"
import React, { useEffect } from "react"
import { Dimensions, StyleSheet, View } from "react-native"

const lottColor = Color.keno

const KenoEvenOddStatistical = React.memo(({ navigation }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} />
    )
})
export default KenoEvenOddStatistical

const ExpensiveRerender = React.memo(({ navigation }: any) => {

    useEffect(() => {
        console.log("expensive rerender keno even odd")
    })

    return (
        <View style={{ flex: 1 }}>
            <IText>
                {"Chẵn lẻ"}
            </IText>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

})