import { IText } from "@components"
import { Color } from "@styles"
import React, { useEffect } from "react"
import { Dimensions, StyleSheet, View } from "react-native"

const lottColor = Color.keno

const KenoBigSmallStatistical = React.memo(({ navigation }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} />
    )
})
export default KenoBigSmallStatistical

const ExpensiveRerender = React.memo(({ navigation }: any) => {

    useEffect(() => {
        console.log("expensive rerender keno big small")
    })

    return (
        <View style={{ flex: 1 }}>
            <IText>
                {"Lớn nhỏ"}
            </IText>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

})