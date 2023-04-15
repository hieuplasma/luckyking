import { Image, Images } from "@assets";
import { LotteryType } from "@common";
import { IText } from "@components";
import { Color } from "@styles";
import React, { useCallback, useRef, useState } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { ChangeBetButton } from "../../component/ChangeBetButton";
import { MultiBagSheet } from "./MultiBagSheet";

const lottColor = Color.max3dpro

export const MultiBagView = React.memo(({ }: any) => {

    const chooseTypeRef: any = useRef(null)

    const [typePlay, setType] = useState({ label: "Bao 3 bộ 3 số", value: 3 },)

    const onChangeType = useCallback((type: any) => {
        setType(type)
        // const arr = Array.from({ length: MAX_SET }, () => Array(type.value).fill(false));
        // setNumbers(arr)
    }, [])
    const openTypeSheet = useCallback(() => { chooseTypeRef.current?.openSheet() }, [chooseTypeRef])
    const renderTypeSheet = useCallback(() => {
        return (
            <MultiBagSheet
                ref={chooseTypeRef}
                currentChoose={typePlay}
                onChoose={onChangeType}
                type={LotteryType.Max3DPro}
            />
        )
    }, [chooseTypeRef, onChangeType, typePlay])

    const [currentBet, setCurrentBet] = useState(10000)

    return (
        <>
        <View style={{ flex: 1 }}>
            <View style={styles.body}>
                <View style={{ flexDirection: 'row', paddingTop: 5, justifyContent: 'space-between' }}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.dropDown} onPress={openTypeSheet}>
                        <IText style={{ fontSize: 13 }}>{`Bao ${typePlay.value} bộ 3 số`}</IText>
                        <Image source={Images.down_arrow} style={{ width: 12, height: 6 }}></Image>
                    </TouchableOpacity>

                    <ChangeBetButton
                        style={styles.changeBet}
                        currentBet={currentBet}
                        increase={() => setCurrentBet(currentBet + 10000)}
                        decrease={() => setCurrentBet(currentBet - 10000)}
                        color={lottColor}
                        max={300000}
                        min={10000}
                    />
                </View>
            </View>

          
        </View>
        {renderTypeSheet()}
        </>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    body: {
        marginTop: 5,
        paddingHorizontal: 16
    },
    dropDown: {
        width: (windowWidth - 44) / 2, height: 36,
        borderRadius: 10, padding: 6, paddingHorizontal: 12,
        justifyContent: 'space-between',
        borderColor: Color.black, borderWidth: 1, flexDirection: 'row', alignItems: 'center'
    },
    changeBet: {
        width: (windowWidth - 44) / 2, height: 36,
        borderRadius: 10
    },
    lineNumber: {
        flexDirection: 'row', marginVertical: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})