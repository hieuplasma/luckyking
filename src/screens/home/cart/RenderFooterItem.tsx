import { Image, Images } from "@assets"
import { IText } from "@components"
import { printDrawCode, printMoney, printNumber, printWeekDate } from "@utils"
import React from "react"
import { ColorValue, StyleSheet, TouchableOpacity, View } from "react-native"

interface RenderFooterItemProps {
    item: any,
    lottColor: ColorValue,
    openModalDeleteLottery: () => void
}

export const RenderFooterItem = React.memo(({ item, lottColor, openModalDeleteLottery }: RenderFooterItemProps) => {
    return (
        <>
            {/* {
                item.drawCode.map((code: number, indexCode: number) => {
                    return (
                        <View style={styles.lineBottom} key={code}>
                            <IText style={{ fontSize: 14, fontWeight: '400' }}>
                                {`Kỳ ${printDrawCode(item.drawCode[indexCode])} - ${printWeekDate(new Date(item.drawTime[indexCode]))}`}
                            </IText>
                        </View>
                    )
                })
            } */}
            <View style={styles.lineBottom}>
                <IText style={{ fontSize: 14, fontWeight: '400' }}>
                    {`Kỳ ${printDrawCode(item.drawCode)} - ${printWeekDate(new Date(item.drawTime))}`}
                </IText>
            </View>
            <View style={styles.lineBottom}>
                <IText style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {`Vé #${printNumber(item.displayId)}:`}
                </IText>
                <IText style={{ color: lottColor, marginLeft: 12, fontSize: 14, fontWeight: 'bold' }}>
                    {`${printMoney(item.amount)}đ`}
                </IText>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={openModalDeleteLottery}>
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