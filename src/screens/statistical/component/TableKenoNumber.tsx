import { Image, Images } from "@assets"
import { IText } from "@components"
import { Color } from "@styles"
import { printNumber } from "@utils"
import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Alert, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { Cell, Row, Rows, Table, TableWrapper } from "react-native-table-component"

const lottColor = Color.keno
const borderColor = '#BEBCBA'

const tableData = [
    [2, 2, '6'],
    [14, 14, '5'],
    [15, 15, '5'],
    [19, 19, '4'],
    [2, 2, '6'],
    [14, 14, '5'],
    [15, 15, '5'],
    [19, 19, '4'],
    [2, 2, '6'],
    [14, 14, '5']
]

interface TableProps {
    title: string[],
    data?: any,
    toggle?: (number: number) => void,
    numbers: any[],
    onChangeNumber: (data: number[]) => void
}

export const TableKenoNumber = React.memo(({ title, data, numbers, onChangeNumber }: TableProps) => {

    const [toggleObj, setToggleObj] = useState({ number: -1, value: false })
    const handleToggle = useCallback((number: number, value: boolean) => {
        setToggleObj({ number: number, value: value })
    }, [])
    useEffect(() => {
        const newList = [...numbers]
        if (toggleObj.value) {
            newList.push(toggleObj.number)
        }
        else {
            const index = newList.indexOf(toggleObj.number);
            newList.splice(index, 1);
        }
        onChangeNumber(newList)
    }, [toggleObj])

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <IText style={styles.textHead}>{title[0]}</IText>
            </View>
            {
                data ?
                    <Table borderStyle={{ borderWidth: 1, borderColor: borderColor }}>
                        {/* <Row data={title} style={styles.head} textStyle={styles.textHead} /> */}
                        {
                            data.map((rowData: any, index: number) => (
                                <TableWrapper key={index} style={styles.wraper}>
                                    {
                                        rowData.map((cellData: any, cellIndex: number) => (
                                            <Cell
                                                key={cellIndex}
                                                data={cellIndex === 0 ?
                                                    <Element
                                                        number={cellData}
                                                        check={numbers.includes(cellData)}
                                                        onToggle={handleToggle}
                                                    />
                                                    : cellIndex === 1 ? printNumber(cellData)
                                                        : cellData + " lần"}
                                                textStyle={styles.textData}
                                            />
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                    : <IText style={{
                        fontWeight: 'bold', textAlign: 'center',
                        color: Color.luckyKing, marginTop: 32,
                        marginBottom: 32
                    }}>
                        {"Đang tải dữ liệu ..."}
                    </IText>
                // <ActivityIndicator size={"large"} color={Color.luckyKing} style={{ marginVertical: 32 }} />
            }
        </View>
    )
})

const Element = React.memo(({ number, check, onToggle }: any) => {

    const handlePress = useCallback(() => {
        onToggle(number, !check);
    }, [onToggle, number, check]);
    return (
        <TouchableOpacity onPress={handlePress} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: 15, height: 15 }} source={check ? Images.checked_box : Images.check_box} tintColor={lottColor} />
        </TouchableOpacity>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    //table style: 
    head: { height: 26, backgroundColor: lottColor },
    textHead: { color: Color.white, alignSelf: 'center', textAlign: 'center' },
    textData: { color: lottColor, alignSelf: 'center', textAlign: 'center' },

    wraper: { flexDirection: 'row' },

    header: {
        width: '100%', height: 26,
        backgroundColor: lottColor,
        justifyContent: 'center', alignItems: 'center',
        borderTopLeftRadius: 5, borderTopRightRadius: 5
    }
})