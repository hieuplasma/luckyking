import { IText } from "@components";
import { Color } from "@styles"
import React, { useCallback, useEffect, useState } from "react"
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Table, Row, Rows, Cols, TableWrapper, Col } from 'react-native-table-component';
import { TableKenoNumber } from "../component/TableKenoNumber";

const lottColor = Color.keno

const KenoNumberStatistical = React.memo(({ navigation }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} />
    )
})
export default KenoNumberStatistical

const ExpensiveRerender = React.memo(({ navigation }: any) => {

    const [numbers, setNumbers] = useState<number[]>([])

    const onChangeNumber = useCallback((data: number[]) => {
        setNumbers(data)
    }, [])

    return (
        <View style={{ flex: 1, marginTop: 10 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TableKenoNumber title={["Nhiều nhất"]} numbers={numbers} onChangeNumber={onChangeNumber} />
                    <View style={{ width: 16 }} />
                    <TableKenoNumber title={["Ít nhất"]} numbers={numbers} onChangeNumber={onChangeNumber} />
                </View>

                <View style={{ height: 8 }} />

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TableKenoNumber title={["Chưa về"]} numbers={numbers} onChangeNumber={onChangeNumber} />
                    <View style={{ width: 16 }} />
                    <TableKenoNumber title={["Về liên tiếp"]} numbers={numbers} onChangeNumber={onChangeNumber} />
                </View>

                <View style={{ height: 20 }} />

            </ScrollView>
        </View>
    )
})

const styles = StyleSheet.create({
    //table style: 

})