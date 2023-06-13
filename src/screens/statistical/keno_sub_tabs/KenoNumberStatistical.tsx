import { IText } from "@components";
import { Color } from "@styles"
import React, { useEffect } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { Table, Row, Rows, Cols, TableWrapper, Col } from 'react-native-table-component';
import { TableKenoNumber } from "../component/TableKenoNumber";
const lottColor = Color.keno
const borderColor = '#BEBCBA'

const tableData = [
    ['02', '6'],
    ['14', '5'],
    ['16', '5'],
    ['19', '4']
]
const KenoNumberStatistical = React.memo(({ navigation }: any) => {
    return (
        <ExpensiveRerender navigation={navigation} />
    )
})
export default KenoNumberStatistical

const ExpensiveRerender = React.memo(({ navigation }: any) => {

    // const element = (data: any, index: number) => (
    //     <TouchableOpacity onPress={() => this._alertIndex(index)}>
    //         <View style={styles.btn}>
    //             <IText style={styles.btnText}>button</IText>
    //         </View>
    //     </TouchableOpacity>
    // );

    return (
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
           <TableKenoNumber title={["Nhiều nhất"]}/>

            <View style={{ width: 16 }} />

            <View style={{ flex: 1 }}>
                <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
                    <Row data={["Ít nhất"]} style={styles.head} textStyle={styles.textHead} />
                    <Rows data={tableData} textStyle={styles.textData} />
                </Table>
            </View>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const widthArr = Array(colData.length).fill((windowWidth - 32) / 6)
// const widthArrHeader = Array(6).fill((windowWidth - 32) / 6)
// const heightArr = Array(tableData.length).fill(26)

const styles = StyleSheet.create({
    //table style: 
    head: { height: 40, backgroundColor: lottColor },
    textHead: { color: Color.white, alignSelf: 'center', textAlign: 'center' },
    textData: { color: lottColor, alignSelf: 'center', textAlign: 'center' },

    wraper: { flexDirection: 'row' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
})