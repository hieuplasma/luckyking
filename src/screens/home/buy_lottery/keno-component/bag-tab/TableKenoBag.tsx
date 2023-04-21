import { IText } from "@components";
import { Color } from "@styles";
import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Table, Row, Rows, Cols, TableWrapper, Col } from 'react-native-table-component';

const tableHead = ['Bao ', 'Bậc', 'Số bộ số', 'Tổng tiền', "Số số trúng", "Tiền thưởng"]

const colData = ['4', '2', '6',]
// const tableData = [
//     ['4', '2', '6', '60K', '2 số', '90K'],
//     ['4', '2', '6', '60K', '2 số', '90K'],
//     ['4', '2', '6', '60K', '2 số', '90K'],
// ]
const tableData = [
    ['60K', '2 số', '90K'],
    ['60K', '3 số', '270K'],
    ['60K', '4 số', '540K'],
]



const lottColor = Color.keno

export const TableKenoBag = React.memo(({ }: any) => {
    return (
        <View style={{ paddingHorizontal: 16 }}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#BEBCBA' }}>
                <Row data={tableHead} widthArr={widthArrHeader} style={styles.head} textStyle={styles.textHead} />
                <TableWrapper style={{ flexDirection: 'row' }}>
                    <Row data={colData} widthArr={widthArr} textStyle={styles.textData} />
                    <TableWrapper style={{ flexDirection: 'row' }}>
                        <Rows data={tableData} widthArr={widthArr} textStyle={styles.textData} style={{ height: 26 }} />
                    </TableWrapper>
                </TableWrapper>
            </Table>
            <IText style={{
                color: Color.blue, fontStyle: 'italic',
                textDecorationLine: 'underline',
                fontSize: 16, marginVertical: 4
            }}>
                {"Xem chi tiết bảng cơ cấu giải thưởng Bao keno tại đây"}
            </IText>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthArr = Array(colData.length).fill((windowWidth - 32) / 6)
const widthArrHeader = Array(6).fill((windowWidth - 32) / 6)
const heightArr = Array(tableData.length).fill(26)

const styles = StyleSheet.create({
    //table style: 
    head: { height: 40, backgroundColor: lottColor },
    textHead: { color: Color.white, alignSelf: 'center', textAlign: 'center' },
    textData: { color: lottColor, alignSelf: 'center', textAlign: 'center' },

    wraper: { flexDirection: 'row' }
})