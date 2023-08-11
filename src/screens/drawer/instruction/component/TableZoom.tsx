import { IText } from "@components";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { Color } from "@styles";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";

interface TableZoomeProps {
    title?: string
    data: any[],
    flexPart?: number[],
    headerTitle?: boolean
}

export const TableZoom = React.memo(({ title, data, flexPart, headerTitle }: TableZoomeProps) => {
    return (
        <View style={{ flex: 1, marginVertical: 12 }}>
            {title ?
                <View style={styles.header}>
                    <IText style={styles.textHead}>{title}</IText>
                </View>
                : <></>}
            {
                headerTitle ?
                    <TableWrapper style={[styles.wraper,
                    {
                        backgroundColor: Color.luckyKing,
                        borderTopLeftRadius: 5, borderTopRightRadius: 5
                    }]}>
                        {
                            data[0].map((cellData: any, cellIndex: number) => (
                                <Cell
                                    key={cellIndex}
                                    data={cellData}
                                    textStyle={[styles.textData, { color: Color.white }]}
                                    style={{ flex: flexPart ? flexPart[cellIndex] : 1, padding: 8 }}
                                />
                            ))
                        }
                    </TableWrapper>
                    : <></>
            }
            <Table borderStyle={{ borderWidth: 1, borderColor: Color.gray }}>
                {
                    (headerTitle ? data.splice(1, data.length) : data).map((rowData: any, index: number) => (
                        <TableWrapper key={index} style={styles.wraper}>
                            {
                                rowData.map((cellData: any, cellIndex: number) => (
                                    <Cell
                                        key={cellIndex}
                                        data={cellData}
                                        textStyle={styles.textData}
                                        style={{ flex: flexPart ? flexPart[cellIndex] : 1, padding: 8 }}
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

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    //table style: 
    head: { height: 26, backgroundColor: Color.luckyKing },
    textHead: { color: Color.white, alignSelf: 'center', textAlign: 'center', fontSize: 18 },
    textData: { alignSelf: 'center', textAlign: 'center' },

    wraper: { flexDirection: 'row', width: '100%', minHeight: 45 },

    header: {
        width: '100%', height: 60,
        backgroundColor: Color.luckyKing,
        justifyContent: 'center', alignItems: 'center',
        borderTopLeftRadius: 5, borderTopRightRadius: 5
    }
})