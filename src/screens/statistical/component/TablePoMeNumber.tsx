import { Image, Images } from "@assets"
import { LotteryType } from "@common"
import { IText } from "@components"
import { Color } from "@styles"
import { getColorLott, printDraw, printDrawCode, printNumber } from "@utils"
import React, { useCallback, useEffect, useState } from "react"
import { Dimensions, Modal, StyleSheet, TouchableOpacity, View } from "react-native"
import { Cell, Table, TableWrapper } from "react-native-table-component"

const borderColor = '#BEBCBA'

interface TableProps {
    data: any[],
    type: LotteryType,
    fromTo: any[]
}

const flexRow = [1, 2, 4, 1.5]

export const TablePoMeNumber = React.memo(({ data, type, fromTo }: TableProps) => {

    const lottColor = getColorLott(type)

    const [displayData, setDisplayData] = useState(data)
    const [sortIns, setSortIns] = useState(false)
    useEffect(() => {
        const tmp = [...data]
        if (sortIns) tmp.sort((a: any, b: any) => a[1] - b[1])
        else tmp.sort((a: any, b: any) => b[1] - a[1])
        setDisplayData(tmp)
    }, [data, sortIns])

    const toggleSort = useCallback(() => {
        setSortIns(!sortIns)
    }, [sortIns])

    const [detail, setDetail] = useState<any>([])
    const [visible, setVisible] = useState(false)

    const openDetail = useCallback(async (rowData: number) => {
        setDetail(rowData)
        setVisible(true)
    }, [type])

    return (
        <View style={{ flex: 1 }}>
            {
                displayData.length > 0 ?
                    <Table borderStyle={{ borderWidth: 1, borderColor: borderColor }}>
                        <TableWrapper style={styles.wraper}>
                            {
                                ['Bộ số', "Số lần về", "Kỳ về gần nhất", "Chi tiết"].map((cellData: any, cellIndex: number) => (
                                    <Cell
                                        style={{ flex: flexRow[cellIndex] }}
                                        key={cellIndex}
                                        data={cellIndex !== 1 ?
                                            cellData :
                                            <TouchableOpacity
                                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}
                                                onPress={toggleSort}>
                                                <IText style={{ fontWeight: 'bold' }}>{cellData}</IText>
                                                <Image
                                                    source={Images.triangle}
                                                    style={{
                                                        width: 10, height: 10, marginLeft: 4,
                                                        transform: [{ rotate: sortIns ? '-90deg' : '90deg' }]
                                                    }}
                                                />
                                            </TouchableOpacity>}
                                        textStyle={[styles.textData, { fontWeight: 'bold' }]}
                                    />
                                ))
                            }
                        </TableWrapper>
                        {
                            displayData.map((rowData: any, index: number) => (
                                <TableWrapper key={index} style={styles.wraper}>
                                    {
                                        rowData.map((cellData: any, cellIndex: number) => (
                                            cellIndex <= 3 ?
                                                <Cell
                                                    style={{ flex: flexRow[cellIndex] }}
                                                    key={cellIndex}
                                                    data={cellIndex == 0 ?
                                                        <IText style={{ fontWeight: 'bold', color: lottColor, textAlign: 'center' }}>{printNumber(cellData)}</IText>
                                                        : cellIndex !== 3 ? cellData
                                                            : cellData == 0 ? "-"
                                                                : <IText style={{ textAlign: 'center', color: Color.blue }} onPress={() => openDetail(rowData)}>
                                                                    {"Xem"}
                                                                </IText>}
                                                    textStyle={styles.textData}
                                                />
                                                : <></>
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
            <ModalDetail
                visible={visible}
                data={detail} onCancel={() => setVisible(false)}
                fromTo={fromTo}
                type={type}
            />
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    //table style: 
    textHead: { color: Color.white, alignSelf: 'center', textAlign: 'center', fontSize: 16 },
    textData: { color: Color.black, alignSelf: 'center', textAlign: 'center' },

    wraper: { flexDirection: 'row', minHeight: 26 },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        backgroundColor: '#F4F4F4',
        margin: 20,
        width: windowWidth - 40,
        borderRadius: 10,
        padding: 20
    },
    btnExit: {
        width: 20, height: 20,
        position: 'absolute',
        top: 0, right: 0
    }
})

const ModalDetail = React.memo(({ visible, data, onCancel, fromTo, type }: any) => {

    const lottColor = getColorLott(type)

    const [isVisible, setIsVisible] = useState(visible);
    useEffect(() => {
        setIsVisible(visible)
    }, [visible])

    const handleCancel = () => {
        setIsVisible(false);
        onCancel();
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={handleCancel}
        >
            <TouchableOpacity style={styles.modalContainer} onPress={handleCancel}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleCancel} activeOpacity={1}>
                        <Image source={Images.exit} style={styles.btnExit} />
                    </TouchableOpacity>
                    {isVisible ?
                        <>
                            <IText>
                                {"Từ kỳ - ngày: "}
                                <IText style={{ fontWeight: 'bold', color: Color.blue }}>
                                    {printDraw(fromTo[0])}
                                </IText>
                            </IText>
                            <IText>
                                {"Đến kỳ - ngày: "}
                                <IText style={{ fontWeight: 'bold', color: Color.blue }}>
                                    {printDraw(fromTo[1])}
                                </IText>
                            </IText>
                        </>
                        : <></>}
                    <View style={{height: 16}}/>
                    <Table borderStyle={{ borderWidth: 1, borderColor: borderColor}}>
                        {
                            convertData(data).map((rowData: any, index: number) => (
                                <TableWrapper key={index} style={styles.wraper}>
                                    {
                                        rowData.map((cellData: any, cellIndex: number) => (
                                            cellIndex <= 3 ?
                                                <Cell
                                                    style={{ flex: 1 }}
                                                    key={cellIndex}
                                                    data={cellData}
                                                    textStyle={[styles.textData,
                                                    {
                                                        fontWeight: index == 0 && cellIndex == 1 ? 'bold' : 'normal',
                                                        color: index == 0 && cellIndex == 1 ? lottColor : Color.black
                                                    }]}
                                                />
                                                : <></>
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                </View>
            </TouchableOpacity>
        </Modal>
    )
})

function convertData(origin: any[]) {
    const tmp = [...origin]
    let res = [
        ['Bộ số', tmp[0]],
        ['Số lần về', tmp[1]],
        ['Số lần nổ Jackpot', tmp[4]],
        ['Số kỳ chưa về', tmp[5]],
        ['Kỳ - ngày về gần nhất', tmp[2]]
    ]
    console.log(res)
    return res
}