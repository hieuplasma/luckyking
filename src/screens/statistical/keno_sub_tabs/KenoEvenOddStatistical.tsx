import { lotteryApi } from "@api"
import { Color } from "@styles"
import React, { useCallback, useEffect, useState } from "react"
import { Dimensions, RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import { BuyNowKeno } from "../component/BuyNowKeno"
import { BuyNowKeno2 } from "../component/BuyNowKeno2"
import { TableKenoEvenOdd } from "../component/TableKenoEvenOdd"

const lottColor = Color.keno

const KenoEvenOddStatistical = React.memo(({ navigation, take, focus }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} take={take} focus={focus} />
    )
})
export default KenoEvenOddStatistical

const ExpensiveRerender = React.memo(({ navigation, take, focus }: any) => {

    const [loading, setLoading] = useState(false)
    const [evenodd, setEvenodd] = useState<any>([])

    const getStatistical = useCallback(async () => {
        window.loadingIndicator.show()
        setLoading(true)
        const res = await lotteryApi.getStatisticalKenoEvenOdd({ take: take })
        if (res) {
            setEvenodd(res.data)
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
                    <TableKenoEvenOdd data={evenodd} />
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>
            <BuyNowKeno2 navigation={navigation} />
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

})