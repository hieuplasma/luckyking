import { IText, ImageHeader } from "@components";
import { InstructionStackParamList } from "@navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import React from "react"
import { Dimensions, ScrollView, StyleSheet, View } from "react-native"
import { ImageZoom } from "./component/ImageZoom";
import { Images } from "@assets";
import { TableZoom } from "./component/TableZoom";

type NavigationProp = StackNavigationProp<InstructionStackParamList, 'InstructionMega'>;
type NavigationRoute = RouteProp<InstructionStackParamList, 'InstructionMega'>;

export interface InstructionMegaParamsList { }
interface InstructionMegaProps { }

export const InstructionMega = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title="Hướng dẫn chơi Mega" />
            <ScrollView style={{ flex: 1, padding: 8 }}>
                <IText style={styles.title} uppercase>{title1}</IText>
                <IText style={styles.content}>{content1}</IText>
                <IText style={styles.content}>{note1}</IText>
                <ImageZoom source={Images.co_cau_mega} style={styles.img} />
                <IText style={styles.title} uppercase>{title2}</IText>
                <IText style={styles.content}>{content2}</IText>

                <TableZoom title={"BAO 5 (VNĐ)"} data={bao5} />
                <TableZoom title={"BAO 7 (VNĐ)"} data={bao7} />
                <TableZoom title={"BAO 8 (VNĐ)"} data={bao8} />
                <TableZoom title={"BAO 9 (VNĐ)"} data={bao9} />
                <TableZoom title={"BAO 10 (VNĐ)"} data={bao10} />
                <TableZoom title={"BAO 11 (VNĐ)"} data={bao11} />
                <TableZoom title={"BAO 12 (VNĐ)"} data={bao12} />
                <TableZoom title={"BAO 13 (VNĐ)"} data={bao13} />
                <TableZoom title={"BAO 14 (VNĐ)"} data={bao14} />
                <TableZoom title={"BAO 15 (VNĐ)"} data={bao15} />
                <TableZoom title={"BAO 18 (VNĐ)"} data={bao18} />

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    title: { fontWeight: 'bold', marginTop: 12, fontSize: 18, lineHeight: 24 },
    content: { fontSize: 16 },
    img: { width: windowWidth - 24, height: 300, marginVertical: 12 }
})

const title1 = `1. Cách chơi cơ bản:`

const content1 = `Vé số Mega 6/45 có 45 con số (từ 01 đến 45). Mega 6/45 mở thưởng vào các ngày thứ tư, thứ sáu chủ nhật hàng tuần.
Khi tham gia, khách hàng lựa chọn 6 con số trong tập hợp 45 con số đó để tạo thành 1 bộ số tham gia dự thưởng hay còn gọi là 1 vé (giá 10.000đ cho mỗi vé)
Khi xổ kết quả Mega 6/45 gồm có 6 quả banh mổi quả chứa 1 số khác nhau nếu khách hàng trúng từ 3 số trở lên là trúng thưởng. Không quan trọng vị trí có số là trúng thưởng.`

const note1 = `Ghi chú: O là các số trùng với kết quả quay số mở thưởng, không theo thứ tự
Trong trường hợp vé của người trúng thưởng trúng nhiều hạng giải thưởng thì người trúng thưởng chỉ được lĩnh một hạng giải thưởng cao nhất.
Trong trường hợp có nhiều người trúng thưởng giải Đặc biệt thì giải Đặc biệt được chia đều theo tỷ lệ giá trị tham gia dự thưởng của người trúng thưởng.
Giá trị lĩnh thưởng của các giải thưởng từ Giải Nhất đến Giải Ba được tính theo số lần tham gia dự thưởng của số trúng thưởng (01 lần tham gia dự thưởng mệnh giá 10.000 đồng) nhân với giá trị giải thưởng tương ứng với 01 lần tham gia dự thưởng.`

const title2 = `2. Cách chơi Bao`

const content2 = `Khách hàng có thể chọn cách chơi vé bao sẽ có xác suất trúng cao hơn và trúng được nhiều giải khác nhau.
Vé bao là khi khách hàng chọn mua nhiều hơn 6 con số và hệ thống sẽ tự động đảo các con số đó thành nhiều bộ, mỗi bộ có 6 con số không giống nhau và số lượng bộ tuỳ theo bao ít con hay bao nhiều con.
Cơ cấu giải thưởng vé chơi Bao:`

const bao5 = [
    ['TRÚNG 2 SỐ', '120.000'],
    ['TRÚNG 3 SỐ', '2.010.000'],
    ['TRÚNG 4 SỐ', '31.400.000'],
    ['TRÚNG 5 SỐ', 'JACKPOT + 390 Triệu Đồng']
]

const bao7 = [
    ['TRÚNG 3 SỐ', '120.000'],
    ['TRÚNG 4 SỐ', '1.020.000'],
    ['TRÚNG 5 SỐ', '21.500.000'],
    ['TRÚNG 6 SỐ', 'JACKPOT + 60 Triệu Đồng']
]

const bao8 = [
    ['TRÚNG 3 SỐ', '300.000'],
    ['TRÚNG 4 SỐ', '2.280.000'],
    ['TRÚNG 5 SỐ', '34.800.000'],
    ['TRÚNG 6 SỐ', 'JACKPOT + 124,5 Triệu Đồng']
]

const bao9 = [
    ['TRÚNG 3 SỐ', '600.000'],
    ['TRÚNG 4 SỐ', '4.200.000'],
    ['TRÚNG 5 SỐ', '50.200.000'],
    ['TRÚNG 6 SỐ', 'JACKPOT + 194,1 Triệu Đồng']
]

const bao10 = [
    ['TRÚNG 3 SỐ', '1.050.000'],
    ['TRÚNG 4 SỐ', '6.900.000'],
    ['TRÚNG 5 SỐ', '68.000.000'],
    ['TRÚNG 6 SỐ', 'JACKPOT + 269,4 Triệu Đồng']
]

const bao11 = [
    ['TRÚNG 3 SỐ', '1.680.000'],
    ['TRÚNG 4 SỐ', '10.500.000'],
    ['TRÚNG 5 SỐ', '88.500.000'],
    ['TRÚNG 6 SỐ', 'JACKPOT + 351 Triệu Đồng']
]

const bao12 = [
    ['TRÚNG 3 SỐ', '2.520.000'],
    ['TRÚNG 4 SỐ', '15.120.000'],
    ['TRÚNG 5 SỐ', '112.000.000'],
    ['TRÚNG 6 SỐ', 'JACKPOT + 439,5 Triệu Đồng']
]


const bao13 = [
    ['TRÚNG 3 SỐ', '3.600.000'],
    ['TRÚNG 4 SỐ', '20.880.000'],
    ['TRÚNG 5 SỐ', '138.800.000'],
    ['TRÚNG 6 SỐ', 'JACKPOT + 535,5 Triệu Đồng']
]

const bao14 = [
    ['TRÚNG 3 SỐ', '4.950.000'],
    ['TRÚNG 4 SỐ', '27.900.000'],
    ['TRÚNG 5 SỐ', '169.200.000'],
    ['TRÚNG 6 SỐ', 'JACKPOT + 639,6 Triệu Đồng']
]

const bao15 = [
    ['TRÚNG 3 SỐ', '6.600.000'],
    ['TRÚNG 4 SỐ', '36.300.000'],
    ['TRÚNG 5 SỐ', '203.500.000'],
    ['TRÚNG 6 SỐ', 'JACKPOT + 752,4 Triệu Đồng']
]

const bao18 = [
    ['TRÚNG 3 SỐ', '13.650.000'],
    ['TRÚNG 4 SỐ', '70.980.000'],
    ['TRÚNG 5 SỐ', '332.800.000'],
    ['TRÚNG 6 SỐ', 'JACKPOT + 1,149 Tỷ Đồng']
]