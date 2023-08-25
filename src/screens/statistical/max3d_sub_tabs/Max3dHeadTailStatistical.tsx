import { lotteryApi } from "@api"
import { Color } from "@styles"
import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl, ScrollView, View } from "react-native"
import { BuyNowBtn } from "../component/BuyNowBtn"
import { LotteryType } from "@common"
import { doNotExits, printDrawCodeBasic } from "@utils"
import { IText } from "@components"
import { TablePoMeHeadTail } from "../component/TablePoMeHeadTail"

interface Props {
    navigation: any,
    focus: boolean,
    start: Date,
    end: Date,
    type: LotteryType
}

export const Max3dHeadTailStatistical = React.memo(({ navigation, focus, start, end, type }: Props) => {
    return (
        <ExpensiveRerender navigation={navigation} focus={focus} start={start} end={end} type={type} />
    )
})

const ExpensiveRerender = React.memo(({ navigation, focus, start, end, type }: Props) => {

    const [loading, setLoading] = useState(false)
    const [head, setHead] = useState([])
    const [mid, setMid] = useState([])
    const [tail, setTail] = useState([])
    const [fromTo, setFromTo] = useState<any[]>([])

    const getStatistical = useCallback(async () => {
        window.loadingIndicator.show()
        setLoading(true)
        const params = { start, end, type }
        const res = await lotteryApi.getStatisticalMax3dHeadTail(params)
        if (res) {
            console.log(res.data)
            setHead(res.data.head)
            setTail(res.data.tail)
            setMid(res.data.mid)
            setFromTo([res.data.start, res.data.end])
        }
        window.loadingIndicator.hide()
        setLoading(false)
    }, [start, end, type])

    useEffect(() => {
        if (focus)
            getStatistical()
    }, [focus, start, end])

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
                <TablePoMeHeadTail data={head} type={type} mode="head" />
                <View style={{ height: 40 }} />
                <TablePoMeHeadTail data={mid} type={type} mode="mid" />
                <View style={{ height: 40 }} />
                <TablePoMeHeadTail data={tail} type={type} mode="tail" />
                <View style={{ height: 20 }} />
            </ScrollView>
            <BuyNowBtn navigation={navigation} type={type}
                title={"Đặt vé " + (type == LotteryType.Max3DPro ? "Max3DPro" : "Max3D/3D+")} />
        </View>
    )
})
