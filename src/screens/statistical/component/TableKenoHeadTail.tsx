import { IText } from "@components"
import { Color } from "@styles"
import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Cell, Table, TableWrapper } from "react-native-table-component"

const lottColor = Color.keno
const borderColor = '#BEBCBA'

interface TableProps {
    title: string[],
    data: any[],
    max?: number
}

const flexRow = [1, 2, 3]

export const TableKenoHeadTail = React.memo(({ title, data, max }: TableProps) => {

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <IText style={styles.textHead}>{title[0]}</IText>
            </View>
            {
                data.length > 0 ?
                    <Table borderStyle={{ borderWidth: 1, borderColor: borderColor }}>
                        {
                            data.map((rowData: any, index: number) => (
                                max && rowData[0] > max ?
                                    <></>
                                    :
                                    <TableWrapper key={index} style={styles.wraper}>
                                        {
                                            rowData.map((cellData: any, cellIndex: number) => (
                                                <Cell
                                                    style={{ flex: flexRow[cellIndex] }}
                                                    key={cellIndex}
                                                    data={cellIndex === 0 ?
                                                        cellData : cellData + " lần"}
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
            }
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    //table style: 
    head: { height: 26, backgroundColor: lottColor },
    textHead: { color: Color.white, alignSelf: 'center', textAlign: 'center', fontSize: 16 },
    textData: { color: lottColor, alignSelf: 'center', textAlign: 'center' },

    wraper: { flexDirection: 'row', height: 26 },

    header: {
        width: '100%', height: 30,
        backgroundColor: lottColor,
        justifyContent: 'center', alignItems: 'center',
        borderTopLeftRadius: 5, borderTopRightRadius: 5
    }
})