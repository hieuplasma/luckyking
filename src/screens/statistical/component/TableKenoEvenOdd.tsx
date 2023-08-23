import { IText } from "@components"
import { Color } from "@styles"
import { doNotExits, printNumber } from "@utils"
import React, { useEffect, useState } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Cell, Table, TableWrapper } from "react-native-table-component"

const lottColor = Color.keno
const borderColor = '#BEBCBA'

interface TableProps {
    data: any[],
}

const flexRow = [1.5, 1, 1, 1, 1, 1]
const colorArr = [Color.keno, '#DB4037', '#8D3F3A', '#44AF02', '#9E7303', '#ECAC07']

export const TableKenoEvenOdd = React.memo(({ data }: TableProps) => {

    const [dataDisplay, setDataDisplay] = useState<any[]>([])

    useEffect(() => {
        const tmp = [...data]
        setDataDisplay(convertData(tmp))
    }, [data])

    return (
        <View style={{ flex: 1 }}>
            {
                dataDisplay.length > 1 ?
                    <Table borderStyle={{ borderWidth: 1, borderColor: borderColor }}>
                        <TableWrapper style={styles.wraper}>
                            {
                                dataDisplay[0].map((cellData: any, cellIndex: number) => (
                                    <Cell
                                        style={[{
                                            flex: flexRow[cellIndex],
                                            backgroundColor: doNotExits(cellData) ? Color.transparent : colorArr[cellIndex],
                                        }, styles.cell
                                        ]}
                                        key={cellIndex}
                                        data={cellData}
                                        textStyle={{ fontWeight: 'bold', color: Color.white, fontSize: 14, textAlign: 'center', margin: 4 }}
                                    />
                                ))
                            }
                        </TableWrapper>
                        {
                            dataDisplay.splice(1, 4).map((rowData: any, index: number) => (
                                <TableWrapper key={index} style={styles.wraper}>
                                    {
                                        rowData.map((cellData: any, cellIndex: number) => (
                                            <Cell
                                                style={[{ flex: flexRow[cellIndex] }]}
                                                key={cellIndex}
                                                data={cellData}
                                                textStyle={[styles.textData, { color: colorArr[cellIndex] }]}
                                            />
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                        {
                            dataDisplay.splice(1, dataDisplay.length).map((rowData: any, index: number) => (
                                <TableWrapper key={index} style={styles.wraper}>
                                    {
                                        rowData.map((cellData: any, cellIndex: number) => (
                                            <Cell
                                                style={[{
                                                    flex: flexRow[cellIndex],
                                                    backgroundColor: cellData && cellIndex !== 0 ? colorArr[cellIndex] : Color.transparent
                                                }]}
                                                key={cellIndex}
                                                data={cellData}
                                                textStyle={[styles.textData, { color: cellIndex !== 0 ? Color.white : lottColor }]}
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
    textData: { color: lottColor, alignSelf: 'center', textAlign: 'center', fontSize: 16 },

    wraper: { flexDirection: 'row', minHeight: 26 },

    header: {
        width: '100%', height: 30,
        backgroundColor: lottColor,
        justifyContent: 'center', alignItems: 'center',
        borderTopLeftRadius: 5, borderTopRightRadius: 5
    },

    cell: {
        justifyContent: 'center', alignItems: 'center'
    }
})

function convertData(origin: any[]) {
    const tmp = [...origin]
    if (tmp.length == 0) return []
    tmp.unshift(['', "CHẴN 13+", "CHẴN 11 - 12", "HÒA", "LẺ 11 - 12", "LẺ 13+"])
    tmp[1][0] = 'Số lần nổ'
    tmp[2][0] = 'Bước nổ TB'
    tmp[3][0] = 'Chưa về'
    tmp[4][0] = 'Khan nhất'
    for (let index = 5; index < tmp.length; index++) {
        const time = new Date(tmp[index][0])
        tmp[index][0] = printNumber(time.getHours()) + ":" + printNumber(time.getMinutes())
        for (let i = 1; i < tmp[index].length; i++) {
            if (tmp[index][i] == null) tmp[index][i] = ''
        }
    }
    return tmp
}
