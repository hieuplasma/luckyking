import { Image, Images } from "@assets"
import { IText } from "@components"
import { Color } from "@styles"
import { printNumber } from "@utils"
import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface TitleBagKenoNumberSheetProps {
    selected: any[],
}

export const TitleBagKenoNumberSheet = React.memo(({ selected }: TitleBagKenoNumberSheetProps) => {

    const [count, setCount] = useState(0)

    useEffect(() => {
        let count = 0
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] !== false) count++
        }
        setCount(count)
    }, [selected])

    return (
        <View>
            <IText style={{ fontSize: 18, alignSelf: 'center' }}>
                {"Bộ số được chọn ("}
                <IText style={{ fontSize: 18, color: Color.keno }}>{count}</IText>
                <IText style={{ fontSize: 18, color: Color.keno }}>{`/${selected.length}`}</IText>
                <IText style={{ fontSize: 18 }}>{")"}</IText>
            </IText>
            <View style={{ alignSelf: 'center', flexDirection: 'row' }} >
                {
                    count == 0 ?
                        <View style={{ width: 20, height: 1, alignSelf: 'center', backgroundColor: Color.keno, marginTop: 20, marginBottom: 1 }} />
                        : selected.map((item: any, index: number) => {
                            return (
                                <IText key={"" + index} style={{ textDecorationLine: 'underline', marginHorizontal: 3, fontSize: 18, color: Color.keno }}>
                                    {printNumber(item)}
                                </IText>
                            )
                        })
                }
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    title: {
        fontSize: 18, color: Color.black, alignSelf: 'center', fontWeight: 'bold'
    },
})