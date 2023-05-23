import { lotteryApi } from "@api";
import { LotteryType } from "@common";
import { BasicHeader, IText, LogoIcon } from "@components";
import { ScanStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FirstItemKeno } from "../result/component/ItemKeno";
import { FirstItemMega } from "../result/component/ItemMega";
import { FirstItemPower } from "../result/component/ItemPower";
import { FirstItemMax3d } from "../result/component/ItemMax3d";
import { caculateLotteryBenefits, getLotteryName, getSpecialValueKeno, kenoAnalysis, printMoney, printNumber } from "@utils";

type NavigationProp = StackNavigationProp<ScanStackParamList, 'ScanResult'>;
type NavigationRoute = RouteProp<ScanStackParamList, 'ScanResult'>;

export interface ScanResultScreenParamsList { data: any }

export const ScanResultScreen = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const scan_result = route.params.data

    useEffect(() => {
        const scan_result = route.params.data
        console.log(scan_result)
        getResult(scan_result.KY_QUAY, scan_result.LOAI_VE)
    }, [route.params.data])

    const [drawResult, setDrawResult] = useState<any>(false)
    const [benefits, setBenefits]: any = useState(false)

    const getResult = useCallback(async (drawCode: number, type: LotteryType) => {
        window.loadingIndicator.show()
        const res = await lotteryApi.getResultByDrawCode({ drawCode: drawCode, type: type })
        if (res) {
            setDrawResult(res.data)
            if (res.data.drawn) {
                setBenefits(caculateLotteryBenefits(scan_result, res.data))
                console.log(caculateLotteryBenefits(scan_result, res.data))
            }
        }
        window.loadingIndicator.hide()
    }, [])

    const renderResultDraw = useCallback(() => {
        if (!drawResult) return (
            <ActivityIndicator size="large" />
        )
        switch (route.params.data.LOAI_VE) {
            case LotteryType.Keno: return <FirstItemKeno data={drawResult} hideBtm={true} />
            case LotteryType.Mega: return <FirstItemMega data={drawResult} hideBtm={true} />
            case LotteryType.Power: return <FirstItemPower data={drawResult} hideBtm={true} />
            case LotteryType.Max3D:
            case LotteryType.Max3DPlus:
            case LotteryType.Max3DPro:
                return <FirstItemMax3d data={drawResult} hideBtm={true} type={route.params.data.LOAI_VE} />
            default:
                return (
                    <IText style={{ textAlign: 'center', marginTop: 48, fontSize: 20 }}>{"Vé không đúng định dạng"}</IText>
                )
        }
    }, [drawResult, route.params.data])

    const checking = useCallback((number: number, bac: number) => {
        if (!drawResult) return false
        if (!drawResult.drawn) return false

        if (scan_result.LOAI_VE == LotteryType.Keno ||
            scan_result.LOAI_VE == LotteryType.Power ||
            scan_result.LOAI_VE == LotteryType.Mega) {

            if (scan_result.LOAI_VE == LotteryType.Power) {
                if (drawResult.specialNumber == number) return true
            }

            const result = drawResult.result.split("-").map(Number)
            if (result.includes(parseInt(number.toString()))) return true

            if (bac > 10 && scan_result.LOAI_VE == LotteryType.Keno) {
                const analysis = kenoAnalysis(result)
                //@ts-ignore
                if (analysis.event_number.includes(parseInt(number)))
                    return true
            }
        }
        else {
            if (drawResult.special.includes(number)) return true
            if (drawResult.first.includes(number)) return true
            if (drawResult.second.includes(number)) return true
            if (drawResult.third.includes(number)) return true
        }

        return false
    }, [drawResult])

    const printNumberScan = useCallback((number: any, bac: number) => {
        if (parseInt(number) > 80 && bac > 10) {
            return getSpecialValueKeno(number)
        }
        else return printNumber(number)
    }, [])

    const renderResult = useCallback(() => {
        if (!drawResult.drawn || !benefits) return (
            <IText style={[styles.result_txt, { color: Color.luckyKing }]} uppercase>
                {"Chưa có kết quả"}
            </IText>
        )
        if (benefits.totalBenefits == 0) return (
            <IText style={[styles.result_txt, { color: Color.blue }]} uppercase>
                {"Không trúng thưởng :("}
            </IText>
        )
        return (
            <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row' }}>
                    <IText style={{ fontWeight: 'bold' }}>{"Giải thưởng: "}</IText>
                    <IText style={{ fontWeight: 'bold', color: Color.luckyKing }}>{`${printMoney(benefits.totalBenefits)}đ`}</IText>
                </View>
                {
                    benefits.detailBenefits.map((item: any) => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={item.row}>
                                <IText >
                                    <IText style={{ fontWeight: 'bold', color: Color.blue }}>
                                        {`${item.row}: `}
                                    </IText>
                                    <IText>{item.detail}</IText>
                                </IText>
                                <IText style={{ fontWeight: 'bold', color: Color.luckyKing }}>{`${printMoney(item.benefits)}đ`}</IText>
                            </View>
                        )
                    })
                }
            </View>
        )
    }, [drawResult, benefits])

    return (
        <View style={[styles.container]}>
            <BasicHeader
                navigation={navigation}
                title={"Quét vé so kết quả"}
            />

            {/* <View style={{height: 100}}></View> */}

            <ScrollView style={styles.body}>
                {renderResultDraw()}

                <View style={{ paddingHorizontal: 8 }}>
                    <IText style={{ fontWeight: 'bold', fontSize: 18, marginTop: 8 }}>
                        {"Kết quả quét vé:"}
                    </IText>
                    <IText style={{ fontSize: 14, color: Color.blue }}>
                        {`Loại vé: ${getLotteryName(scan_result.LOAI_VE)}  -  Ngày mua:  ${scan_result.NGAY_MUA}`}
                    </IText>
                    {
                        scan_result.DAY_SO_MUA.map((it: any, id: number) => {
                            let numbers: number[] = it.boSo
                            return (
                                <View style={styles.lineNumber} key={'' + it.boSo + id}>
                                    <IText style={{ fontSize: 16, color: Color.blue, fontWeight: 'bold' }}>
                                        {String.fromCharCode(65 + id)}
                                    </IText>
                                    <View style={{ marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8, flex: 1 }}>
                                        {
                                            numbers.map((number: any, id2: number) => {
                                                const check = checking(number, it.bac)
                                                return (
                                                    <IText style={[styles.textBall, { color: check ? Color.luckyKing : Color.black }]} key={id2}>
                                                        {`${printNumberScan(number, it.bac)}`}
                                                    </IText>
                                                )
                                            })
                                        }
                                    </View>
                                    <IText style={{ color: Color.blue, fontSize: 16, fontWeight: 'bold' }}>{`${printMoney(it.tienCuoc)}đ`}</IText>
                                </View>
                            )
                        })
                    }
                    <IText style={styles.total_txt}>
                        {`Tổng giá tiền: `}
                        <IText style={{ fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>
                            {`${printMoney(scan_result.TOTAL)}đ`}
                        </IText>
                    </IText>
                </View>


                <IText style={styles.result_txt} uppercase>
                    {"Kết quả quay thưởng"}
                </IText>

                {renderResult()}
            </ScrollView>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.buyLotteryBackGround,
    },
    body: {
        flex: 1, padding: 10
    },
    lineNumber: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textBall: { fontSize: 16, marginHorizontal: 5, fontWeight: 'bold' },
    total_txt: {
        alignSelf: 'flex-end',
        fontSize: 16
    },
    result_txt: { marginTop: 16, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }
})