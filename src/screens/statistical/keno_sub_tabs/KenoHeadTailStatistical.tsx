import { lotteryApi } from "@api"
import React, { useCallback, useEffect, useState } from "react"
import { Dimensions, RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import { BuyNowKeno } from "../component/BuyNowKeno"
import { TableKenoHeadTail } from "../component/TableKenoHeadTail"

const KenoHeadTailStatistical = React.memo(({ navigation, take, focus }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} take={take} focus={focus} />
    )
})
export default KenoHeadTailStatistical

const ExpensiveRerender = React.memo(({ navigation, take, focus }: any) => {

    useEffect(() => {
        console.log("expensive rerender keno")
    })

    const [loading, setLoading] = useState(false)
    const [start, setStart] = useState<any>([])
    const [end, setEnd] = useState<any>([])

    const getStatistical = useCallback(async () => {
        window.loadingIndicator.show()
        setLoading(true)
        const res = await lotteryApi.getStatisticalKenoHeadTail({ take: take })
        if (res) {
            setStart(res.data.start)
            setEnd(res.data.end)
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
                    <TableKenoHeadTail title={["Đầu số"]} data={start} max={8} />
                    <View style={{ width: 16 }} />
                    <TableKenoHeadTail title={["Đuôi số"]} data={end} />
                </View>


                <View style={{ height: 20 }} />
            </ScrollView>
            <BuyNowKeno navigation={navigation} param={{}} />
        </View>
    )
})