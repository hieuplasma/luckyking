import React, { useCallback, useEffect, useState } from "react"
import { Dimensions, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { TableKenoNumber } from "../component/TableKenoNumber";
import { lotteryApi } from "@api";
import { BuyNowKeno } from "../component/BuyNowKeno";

const KenoNumberStatistical = React.memo(({ navigation, take, focus }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} take={take} focus={focus} />
    )
})
export default KenoNumberStatistical

const ExpensiveRerender = React.memo(({ navigation, take, focus }: any) => {

    useEffect(() => {
        console.log("expensive rerender keno")
    })

    const [loading, setLoading] = useState(false)

    const [numbers, setNumbers] = useState<number[]>([])

    const [consecutive, setConsecutive] = useState([])
    const [leastCommon, setLeastCommon] = useState([])
    const [mostCommon, setMostCommon] = useState([])
    const [rare, setRare] = useState([])

    const onChangeNumber = useCallback((data: number[]) => {
        setNumbers(data)
    }, [])

    const getStatistical = useCallback(async () => {
        window.loadingIndicator.show()
        setLoading(true)
        const res = await lotteryApi.getStatisticalKenoNumber({ take: take })
        if (res) {
            console.log(res.data)
            setConsecutive(res.data.consecutive)
            setLeastCommon(res.data.leastCommon)
            setMostCommon(res.data.mostCommon)
            setRare(res.data.rare)
            setNumbers([])
        }
        window.loadingIndicator.hide()
        setLoading(false)
    }, [take])

    useEffect(() => {
        if (focus)
            getStatistical()
    }, [take, focus])

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getStatistical} />
                }>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TableKenoNumber title={["Nhiều nhất"]} data={mostCommon} numbers={numbers} onChangeNumber={onChangeNumber} />
                    <View style={{ width: 16 }} />
                    <TableKenoNumber title={["Ít nhất"]} data={leastCommon} numbers={numbers} onChangeNumber={onChangeNumber} />
                </View>

                <View style={{ height: 8 }} />

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TableKenoNumber title={["Chưa về"]} data={rare} numbers={numbers} onChangeNumber={onChangeNumber} />
                    <View style={{ width: 16 }} />
                    <TableKenoNumber title={["Về liên tiếp"]} data={consecutive} numbers={numbers} onChangeNumber={onChangeNumber} />
                </View>

                <View style={{ height: 20 }} />

            </ScrollView>

            <BuyNowKeno navigation={navigation} param={{ numbers: numbers }} />
        </View>
    )
})

const styles = StyleSheet.create({
    //table style: 

})