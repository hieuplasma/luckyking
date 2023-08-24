import { lotteryApi } from "@api"
import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl, ScrollView, View } from "react-native"
import { BuyNowBtn } from "../component/BuyNowBtn"
import { LotteryType } from "@common"
import { TablePoMeNumber } from "../component/TablePoMeNumber"
import { IText } from "@components"
import { doNotExits, printDrawCodeBasic } from "@utils"
import { Color } from "@styles"

interface Props {
    navigation: any,
    focus: boolean,
    start: Date,
    end: Date,
    type: LotteryType
}

const PoMeNumberStatistical = React.memo(({ navigation, focus, start, end, type }: Props) => {
    return (
        <ExpensiveRerender navigation={navigation} focus={focus} start={start} end={end} type={type} />
    )
})
export default PoMeNumberStatistical

const ExpensiveRerender = React.memo(({ navigation, focus, start, end, type }: Props) => {

    const [loading, setLoading] = useState(false)
    const [numbers, setNumbers] = useState<any>([])

    const [fromTo, setFromTo] = useState<any[]>([])

    const getStatistical = useCallback(async () => {
        window.loadingIndicator.show()
        setLoading(true)
        const params = { start, end, type }
        const res = await lotteryApi.getStatisticalPoMeNumber(params)
        if (res) {
            setNumbers(res.data.data)
            setFromTo([res.data.start, res.data.end])
        }
        window.loadingIndicator.hide()
        setLoading(false)
    }, [start, end, type])

    useEffect(() => {
        if (focus)
            getStatistical()
    }, [start, end, focus])

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getStatistical} />
                }>
                {!doNotExits(fromTo[0]) ?
                    <IText style={{ fontStyle: 'italic', marginBottom: 8 }}>
                        {"Thống kê từ kỳ quay "}
                        <IText style={{ color: Color.blue, fontWeight: 'bold' }}>{printDrawCodeBasic(fromTo[0].drawCode)}</IText>
                        {" đến kỳ quay "}
                        <IText style={{ color: Color.blue, fontWeight: 'bold' }}>{printDrawCodeBasic(fromTo[1].drawCode)}</IText>
                    </IText>
                    : <></>}
                <TablePoMeNumber data={numbers} type={type} fromTo={fromTo} />
                <View style={{ height: 20 }} />
            </ScrollView>
            <BuyNowBtn navigation={navigation} type={type} title={"Đặt vé " + (type == LotteryType.Power ? "Power 6/55" : "Mega 6/45 ")} />
        </View>
    )
})
