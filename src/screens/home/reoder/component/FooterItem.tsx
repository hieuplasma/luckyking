import { Image, Images } from "@assets"
import { LotteryType } from "@common"
import { IText } from "@components"
import { Color } from "@styles"
import { printDraw, printDrawCode, printMoney, printNumber, printWeekDate } from "@utils"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { ColorValue, StyleSheet, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"

interface FooterItemProps {
    item: any,
    lottColor: ColorValue,
    deleteLottery?: () => void
    changeDraw: (drawSelected: any[],
        onChangeDraw: (draw: any) => void,
        listDraw: any[],
        type: LotteryType) => void,
    init?: boolean,
    onPickedDraw: (picked: any[]) => void
}

export const FooterItem = React.memo(({ item, lottColor, deleteLottery, changeDraw, init, onPickedDraw }: FooterItemProps) => {

    var listDraw: any = []
    if (lottColor == Color.power)
        listDraw = useSelector((state: any) => state.drawReducer.powerListDraw)
    else if (lottColor == Color.mega)
        listDraw = useSelector((state: any) => state.drawReducer.megaListDraw)
    else if (lottColor == Color.max3d || lottColor == Color.max3d)
        listDraw = useSelector((state: any) => state.drawReducer.max3dListDraw)
    else if (lottColor == Color.max3dpro)
        listDraw = useSelector((state: any) => state.drawReducer.max3dProListDraw)
    else if (lottColor == Color.keno)
        listDraw = useSelector((state: any) => state.drawReducer.kenoListDraw)

    const [drawSelected, setDraw]: any = useState(listDraw.length > 0 ? [listDraw[0]] : [])
    const onChangeDraw = useCallback((draw: any) => setDraw(draw), [])

    const edit = useCallback(() => {
        changeDraw(drawSelected, onChangeDraw, listDraw, item.type)
    }, [drawSelected, onChangeDraw, listDraw, item.type])

    useEffect(() => {
        if (init) edit()
    }, [])

    useEffect(() => {
        if (listDraw.length == 0) return setDraw([])
        let tmp = [...drawSelected]
        for (let i = 0; i < drawSelected.length; i++) {
            if (!listDraw.includes(drawSelected[i])) {
                tmp.splice(i, 1);
                break;
            }
        }
        if (tmp.length == 0) tmp = [listDraw[0]]
        setDraw(tmp)
    }, [listDraw])

    useEffect(() => {
        onPickedDraw(drawSelected)
    }, [drawSelected])

    return (
        <>
            <View style={styles.lineBottom}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {
                        drawSelected.map((item: any, indexCode: number) => {
                            return (

                                <IText style={{ fontSize: 14, fontWeight: '400' }} key={indexCode}>
                                    {`Kỳ ${printDraw(item)}`}
                                </IText>

                            )
                        })
                    }
                </View>
                <TouchableOpacity onPress={edit}>
                    <Image source={Images.edit_pen} style={styles.iconTrash}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.lineBottom}>
                <IText style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {`Giá trị vé:`}
                </IText>
                <IText style={{ color: lottColor, marginLeft: 12, fontSize: 14, fontWeight: 'bold' }}>
                    {`${printMoney(item.amount * drawSelected.length)}đ`}
                </IText>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={deleteLottery}>
                    <Image source={Images.trash} style={styles.iconTrash}></Image>
                </TouchableOpacity>
            </View>
        </>
    )
})

const styles = StyleSheet.create({
    iconTrash: { width: 28, height: 28 },
    lineBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12
    },
})