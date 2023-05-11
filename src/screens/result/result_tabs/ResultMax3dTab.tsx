import { IText } from "@components";
import { Color } from "@styles";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

const lottColor = Color.max3d

const ResultMax3dTab = React.memo(() => {
    return (
        <ExpensiveRerender />
    )
})
export default ResultMax3dTab

const ExpensiveRerender = React.memo(() => {

    useEffect(() => {
        console.log("expensive rerender max3d")
    })

    const [pressed, setPressed] = useState(false)
    const toggle = useCallback(() => {
        setPressed(!pressed)
    }, [pressed])
    return (
        <View style={{ flex: 1, backgroundColor: pressed ? lottColor : Color.transparent }}>
            <TouchableOpacity onPress={toggle}>
                <IText>{lottColor}</IText>
            </TouchableOpacity>
        </View>
    )
})