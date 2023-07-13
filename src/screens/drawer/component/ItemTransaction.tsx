import { Image, Images } from "@assets"
import { IText } from "@components"
import { fullDateTimeConvert2, printMoney } from "@utils"
import React from "react"
import { View } from "react-native"

export const ItemTransaction = React.memo(({ item }: any) => {
    const add = (item.balanceBefore > item.balanceAfter) ? false : true
    return (
        <View style={{
            height: 50, width: '100%',
            paddingHorizontal: 8, alignItems: 'center',
            backgroundColor: add ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
            flexDirection: 'row',
            borderBottomColor: 'rgba(160, 160, 160, 0.4)', borderBottomWidth: 1,
        }}>
            <Image style={{ width: 36, height: 36 }} source={Images.cash_flow} />
            <View style={{ marginLeft: 8, justifyContent: 'center' }}>
                <IText style={{ fontWeight: 'bold' }}>{item.transaction?.description}</IText>
                <IText>{fullDateTimeConvert2(new Date(item.transaction?.createdAt))}</IText>
            </View>
            <View style={{ flex: 1 }} />
            <IText style={{ fontWeight: 'bold' }}>
                {`${add ? '+' : '-'} ${printMoney(item.transaction?.amount)}đ`}
            </IText>
        </View>
    )
})
