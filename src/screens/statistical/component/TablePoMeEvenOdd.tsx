import { LotteryType } from "@common"
import { IText } from "@components"
import { Color } from "@styles"
import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Cell, Table, TableWrapper } from "react-native-table-component"

const borderColor = '#BEBCBA'

interface TableProps {
    data: any[],
    type: LotteryType
}

const flexRow = [2, 1, 1]

export const TablePoMeEvenOdd = React.memo(({ data, type }: TableProps) => {

    return (
        <View style={{ flex: 1 }}>
            {
                data.length > 0 ?
                    <Table borderStyle={{ borderWidth: 1, borderColor: borderColor }}>
                        <TableWrapper style={styles.wraper}>
                            {
                                ['Kỳ - ngày quay', "Chẵn", "Lẻ"].map((cellData: any, cellIndex: number) => (
                                    <Cell
                                        style={{ flex: flexRow[cellIndex] }}
                                        key={cellIndex}
                                        data={cellData}
                                        textStyle={[styles.textData, { fontWeight: 'bold' }]}
                                    />
                                ))
                            }
                        </TableWrapper>
                        {
                            data.map((rowData: any, index: number) => (
                                <TableWrapper key={index} style={styles.wraper}>
                                    {
                                        rowData.map((cellData: any, cellIndex: number) => (
                                            <Cell
                                                style={{ flex: flexRow[cellIndex] }}
                                                key={cellIndex}
                                                data={cellData}
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
    head: { height: 26, backgroundColor: Color.black },
    textHead: { color: Color.white, alignSelf: 'center', textAlign: 'center', fontSize: 16 },
    textData: { color: Color.black, alignSelf: 'center', textAlign: 'center' },

    wraper: { flexDirection: 'row', minHeight: 26 },
})