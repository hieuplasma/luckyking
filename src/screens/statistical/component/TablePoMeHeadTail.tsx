import { LotteryType, MIN_HEIGHT_TABLE } from "@common"
import { IText } from "@components"
import { Color } from "@styles"
import { getColorLott } from "@utils"
import React, { useMemo } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Cell, Table, TableWrapper } from "react-native-table-component"

const lottColor = Color.keno
const borderColor = '#BEBCBA'

interface TableProps {
    data: any[],
    mode: string // 'head' 'tail'
    type: LotteryType
}

const flexRow = [1, 2, 3]

export const TablePoMeHeadTail = React.memo(({ data, mode, type }: TableProps) => {

    const numbers = useMemo(() => {
        if (mode == 'head') {
            if (type == LotteryType.Power) return Array.from({ length: 6 }, (_, index) => index);
            if (type == LotteryType.Mega) return Array.from({ length: 5 }, (_, index) => index);
        }
        else return Array.from({ length: 10 }, (_, index) => index);
    }, [mode, type])

    const lottColor = getColorLott(type)

    return (
        <View style={{ flex: 1 }}>
            {
                data.length > 0 ?
                    <Table borderStyle={{ borderWidth: 1, borderColor: borderColor }}>
                        <TableWrapper style={{ height: 52, flexDirection: 'row' }}>
                            <TableWrapper style={{ height: 52, flex: 1 }}>
                                <Cell
                                    style={{ flex: 1, height: 52 }}
                                    data={"Kỳ - ngày quay"}
                                    textStyle={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}
                                />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column', minHeight: MIN_HEIGHT_TABLE, flex: 2 }}>
                                <TableWrapper style={styles.wraper}>
                                    <Cell
                                        style={{ flex: 1, height: 26 }}
                                        data={mode == 'head' ? "Đầu số" : "Đuôi số"}
                                        textStyle={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}
                                    />
                                </TableWrapper>
                                <TableWrapper style={styles.wraper}>
                                    {
                                        numbers?.map((cellData: any, cellIndex: number) => (
                                            <Cell
                                                style={{ flex: 1 }}
                                                key={cellIndex}
                                                data={cellData}
                                                textStyle={{ fontWeight: 'bold', color: lottColor, textAlign: 'center' }}
                                            />
                                        ))
                                    }
                                </TableWrapper>
                            </TableWrapper>
                        </TableWrapper>
                        {
                            data.map((rowData: any, index: number) => (
                                <TableWrapper key={index} style={styles.wraper}>
                                    {
                                        rowData.map((cellData: any, cellIndex: number) => (
                                            //@ts-ignore
                                            <TableWrapper style={{ flex: cellIndex == 0 ? numbers?.length / 2 : 1 }}>
                                                <Cell
                                                    style={{ flex: 1, minHeight: MIN_HEIGHT_TABLE }}
                                                    key={cellIndex}
                                                    data={cellData}
                                                    textStyle={styles.textData}
                                                />
                                            </TableWrapper>
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
    head: { height: MIN_HEIGHT_TABLE, backgroundColor: lottColor },
    textHead: { color: Color.white, alignSelf: 'center', textAlign: 'center', fontSize: 16 },
    textData: { color: Color.black, alignSelf: 'center', textAlign: 'center' },

    wraper: { flexDirection: 'row', minHeight: MIN_HEIGHT_TABLE },

    header: {
        width: '100%', height: 30,
        backgroundColor: lottColor,
        justifyContent: 'center', alignItems: 'center',
        borderTopLeftRadius: 5, borderTopRightRadius: 5
    }
})