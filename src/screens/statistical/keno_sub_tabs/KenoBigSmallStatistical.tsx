import { lotteryApi } from "@api"
import { IText } from "@components"
import { Color } from "@styles"
import React, { useCallback, useEffect, useState } from "react"
import { Dimensions, RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import { BuyNowKeno2 } from "../component/BuyNowKeno2"
import { TableKenoBigSmall } from "../component/TableKenoBigSmall"

const lottColor = Color.keno

const KenoBigSmallStatistical = React.memo(({ navigation, take, focus }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} take={take} focus={focus} />
    )
})
export default KenoBigSmallStatistical

const ExpensiveRerender = React.memo(({ navigation, take, focus }: any) => {

    const [loading, setLoading] = useState(false)
    const [bigSmall, setBigSmall] = useState<any>([])

    const getStatistical = useCallback(async () => {
        window.loadingIndicator.show()
        setLoading(true)
        const res = await lotteryApi.getStatisticalKenoBigSmall({ take: take })
        if (res) {
            setBigSmall(res.data)
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
                    <TableKenoBigSmall data={bigSmall} />
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>
            <BuyNowKeno2 navigation={navigation} />
        </View>
    )
})
