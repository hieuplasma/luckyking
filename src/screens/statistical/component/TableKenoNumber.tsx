import { IText } from "@components"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Color } from "@styles"
import { printNumber } from "@utils"
import React from "react"
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import { Cell, Row, Rows, Table, TableWrapper } from "react-native-table-component"

const lottColor = Color.keno
const borderColor = '#BEBCBA'

const tableData = [
    [false, 2, '6'],
    [false, 14, '5'],
    [false, 15, '5'],
    [false, 19, '4']
]

interface TableProps {
    title: string[],
    data?: any[],
    toggle?: (number: number) => void
}

export const TableKenoNumber = React.memo(({ title, data, toggle }: TableProps) => {

    const _alertIndex = (index: number) => {
        Alert.alert(`This is row ${index + 1}`);
    }
    const element = (data: any, index: number) => (
        <TouchableOpacity onPress={() => _alertIndex(index)}>
            {/* <View style={styles.btn}>
                <IText style={styles.btnText}>button</IText>
            </View> */}

            <FontAwesomeIcon icon="fa-regular fa-square-check" />
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <Table borderStyle={{ borderWidth: 1, borderColor: borderColor }}>
                <Row data={title} style={styles.head} textStyle={styles.textHead} />
                {
                    tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.wraper}>
                            {
                                rowData.map((cellData, cellIndex) => (
                                    <Cell
                                        key={cellIndex}
                                        data={cellIndex === 0 ? element(cellData, index)
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
        </View>
    )
})


const styles = StyleSheet.create({
    //table style: 
    head: { height: 40, backgroundColor: lottColor },
    textHead: { color: Color.white, alignSelf: 'center', textAlign: 'center' },
    textData: { color: lottColor, alignSelf: 'center', textAlign: 'center' },

    wraper: { flexDirection: 'row' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
})