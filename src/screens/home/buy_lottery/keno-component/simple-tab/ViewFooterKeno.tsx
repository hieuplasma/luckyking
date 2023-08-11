import { IText } from "@components"
import { Color } from "@styles"
import { printDraw, printMoney, printNumber } from "@utils"
import React, { useEffect, useState } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"

interface ViewFooterKenoProps {
    totalCost: number,
    bookLottery: () => void,
}

export const ViewFooterKeno = React.memo(({ totalCost, bookLottery }: ViewFooterKenoProps) => {

    const kenoFirstDraw = useSelector((state: any) => state.drawReducer.kenoFirstDraw)
    const kenoSalesStoppageTime = useSelector((state: any) => state.systemReducer.kenoSalesStoppageTime)

    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(kenoFirstDraw.drawTime).getTime() - kenoSalesStoppageTime * 1000 - now;
            if (distance < 0) {
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                );
                const minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60),
                );
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeRemaining({ days, hours, minutes, seconds });
            }
            () => {
                clearInterval(interval);
            };
        }, 1000);

        return () => clearInterval(interval);
    }, [kenoFirstDraw, kenoSalesStoppageTime]);

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                <IText style={{ color: Color.black, fontSize: 16, marginLeft: 4 }}>{"Giá vé tạm tính"}</IText>
                <IText style={{ color: Color.luckyKing, fontSize: 16, marginRight: 10 }}>{`${printMoney(totalCost)} đ`}</IText>
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.buttonFooterDown} onPress={bookLottery}>
                <IText uppercase style={{ fontWeight: 'bold', color: Color.white, fontSize: 16, marginBottom: -3 }}>
                    {"ĐẶT VÉ NGAY"}
                </IText>
                <IText style={{ color: Color.white, fontStyle: 'italic', fontSize: 12, marginTop: -1 }}>
                    {`Thời gian đặt vé kì #${kenoFirstDraw ? kenoFirstDraw.drawCode : 'undefined'} còn lại: ${printNumber(timeRemaining.minutes)}:${printNumber(timeRemaining.seconds)}`}
                </IText>
            </TouchableOpacity >
        </>

    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    buttonFooterDown: {
        width: windowWidth - 36, height: 44,
        borderRadius: 10, padding: 6,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: Color.keno,
        marginTop: 4
    }
})