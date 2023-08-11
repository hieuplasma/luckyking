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

type NavigationProp = StackNavigationProp<InstructionStackParamList, 'InstructionPower'>;
type NavigationRoute = RouteProp<InstructionStackParamList, 'InstructionPower'>;

export interface InstructionPowerParamsList { }
interface InstructionPowerProps { }

export const InstructionPower = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title="Hướng dẫn chơi Power" />
            <ScrollView style={{ flex: 1, padding: 8 }}>
                <IText style={styles.title} uppercase>{title1}</IText>
                <IText style={styles.content}>{content1}</IText>
                <IText style={styles.content}>{note1}</IText>
                <ImageZoom source={Images.co_cau_power} style={styles.img} />
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

                <IText style={styles.content}>{note2}</IText>
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

const content1 = `Giới thiệu Xổ số Power 6/55: là loại hình xổ số điện toán có cách chơi gần giống như Mega 6/45. Người chơi sẽ chọn 6 cặp số trong tập hợp 55 cặp số từ 01 - 55 để tạo thành một bộ số tham gia dự thưởng.
Đặc điểm của Power 6/55: Có 55 cặp số trong 1 lồng cầu (từ 01 đến 55).
Kết quả sẽ được xác định qua 7 lần quay số. Nếu sau mỗi kỳ xổ vẫn chưa tìm được người trúng jackpot (đặc biệt) thì số tiền sẽ được cộng dồn liên tục, không có giới hạn cho đến khi có người thắng giải.
Nhưng trong trường hợp có nhiều người cùng trúng giải Jackpot thì giải thưởng sẽ được chia theo giá trị tham gia dự thưởng của người chơi.
Không Trúng Jackpot 1 vẫn có cơ hội trúng Jackpot 2: Xổ số Power 6/55 có 2 giải Jackpot trong 1 kỳ quay số mở thưởng.
Giải Jackpot 1 có mức khởi điểm tối thiểu là 30 tỷ đồng được xác định thông qua 6 lần quay số chính thức.
Điểm hay của Power 6/55 nằm ở chổ khi chỉ trúng 5 con số với kết quả xổ của giải Jackpot 1 thì Quý Khách vẫn có cơ hội nhận giải Jackpot 2 với giá trị tối thiểu là 3 tỷ đồng thông qua sự xuất hiện của “Quả Cầu Đặc Biệt” chứa cặp số cuối cùng để tìm ra người thắng.`

const note1 = `Ghi chú: O là các số trùng với kết quả quay số mở thưởng, không theo thứ tự
Trong trường hợp vé của người trúng thưởng trúng nhiều hạng giải thưởng thì người trúng thưởng chỉ được lĩnh một hạng giải thưởng cao nhất.
Trong trường hợp có nhiều người trúng thưởng giải Jackpot thì giải Jackpot được chia đều theo tỷ lệ giá trị tham gia dự thưởng của người trúng thưởng.
Giá trị lĩnh thưởng của các giải thưởng từ Giải Nhất đến Giải Ba được tính theo số lần tham gia dự thưởng của số trúng thưởng (01 lần tham gia dự thưởng mệnh giá 10.000 đồng) nhân với giá trị giải thưởng tương ứng với 01 lần tham gia dự thưởng.`

const title2 = `2. Cách chơi Bao:`

const content2 = `Khách hàng có thể chọn cách chơi vé bao sẽ có xác suất trúng cao hơn và trúng được nhiều giải khác nhau.
Vé bao là khi khách hàng chọn mua nhiều hơn 6 con số và hệ thống sẽ tự động đảo các con số đó thành nhiều bộ, mỗi bộ có 6 con số không giống nhau và số lượng bộ tuỳ theo bao nhiều ít con hay bao nhiều con.
Cơ cấu giải thưởng vé chơi Bao:`

const note2 = `*** : Làm tròn đến 2 chữ số sau số thập phân
Jackpot 1*: Một phần chia của giải Jackpot 1
Jackpot 2*: Có nghĩa là Jackpot 2 được chia thành 6 phần đều nhau . Nếu không có người trúng khác, thì chỉ duy nhất một người trúng thưởng nhận đủ 6 phần của Jackpot 2 (100% giá trị)**`

const bao5 = [
    ["TRÚNG 2 SỐ", "200.000"],
    ["TRÚNG 3 SỐ", "3.850.000"],
    ["TRÚNG 4 SỐ", "104.000.000"],
    ["TRÚNG 4 SỐ + BONUS NUMBER", "(JACKPOT 2*x2) + 24 Triệu Đồng"],
    ["TRÚNG 5 SỐ", "JACKPOT 1* + JACKPOT 2* + 1,920 Tỷ Đồng"]
]

const bao7 = [
    ["TRÚNG 3 SỐ", "200.000"],
    ["TRÚNG 4 SỐ", "1.700.000"],
    ["TRÚNG 5 SỐ", "82.500.000"],
    ["TRÚNG 5 SỐ + BONUS NUMBER", "JACKPOT 2* + 42,5 Triệu Đồng"],
    ["TRÚNG 6 SỐ", "JACKPOT 1* + 240 Triệu Đồng"],
    ["TRÚNG 6 SỐ + BONUS NUMBER", "JACKPOT 1* + JACKPOT 2*"]
]

const bao8 = [
    ["TRÚNG 3 SỐ", "500.000"],
    ["TRÚNG 4 SỐ", "3.800.000"],
    ["TRÚNG 5 SỐ", "128.000.000"],
    ["TRÚNG 5 SỐ + BONUS NUMBER", "JACKPOT 2* + 88 Triệu Đồng"],
    ["TRÚNG 6 SỐ", "JACKPOT 1* + 487.5 Triệu Đồng"],
    ["TRÚNG 6 SỐ + BONUS NUMBER", "JACKPOT 1* + JACKPOT 2* +  247.5 Triệu Đồng"]
]

const bao9 = [
    ['TRÚNG 3 SỐ', '1.000.000'],
    ['TRÚNG 4 SỐ', '7.000.000'],
    ['TRÚNG 5 SỐ', '177.000.000'],
    ['TRÚNG 5 SỐ + BONUS NUMBER', 'JACKPOT 2* + 137 Triệu Đồng'],
    ['TRÚNG 6 SỐ', 'JACKPOT 1* + 743,5 Triệu Đồng'],
    [
        'TRÚNG 6 SỐ + BONUS NUMBER',
        'JACKPOT 1* + JACKPOT 2* + 503,5 Triệu Đồng'
    ]
]

const bao10 = [
    ['TRÚNG 3 SỐ', '1.750.000'],
    ['TRÚNG 4 SỐ', '11.500.000'],
    ['TRÚNG 5 SỐ', '230.000.000'],
    ['TRÚNG 5 SỐ + BONUS NUMBER', 'JACKPOT 2* + 190 Triệu Đồng'],
    ['TRÚNG 6 SỐ', 'JACKPOT 1* + 1,00 Tỷ Đồng**'],
    [
        'TRÚNG 6 SỐ + BONUS NUMBER',
        'JACKPOT 1* + JACKPOT 2* + 769 Triệu Đồng'
    ]
]

const bao11 = [
    ['TRÚNG 3 SỐ', '2.800.000'],
    ['TRÚNG 4 SỐ', '17.500.000'],
    ['TRÚNG 5 SỐ', '287.500.000'],
    ['TRÚNG 5 SỐ + BONUS NUMBER', 'JACKPOT 2* + 247,5 Triệu Đồng'],
    ['TRÚNG 6 SỐ', 'JACKPOT 1* + 1,28 Tỷ Đồng**'],
    [
        'TRÚNG 6 SỐ + BONUS NUMBER',
        'JACKPOT 1* + JACKPOT 2* + 1,04 Tỷ Đồng**'
    ]
]

const bao12 = [
    ['TRÚNG 3 SỐ', '4.200.000'],
    ['TRÚNG 4 SỐ', '25.200.000'],
    ['TRÚNG 5 SỐ', '350.000.000'],
    ['TRÚNG 5 SỐ + BONUS NUMBER', 'JACKPOT 2* + 310 Triệu Đồng'],
    ['TRÚNG 6 SỐ', 'JACKPOT 1* + 1,57 Tỷ Đồng**'],
    [
        'TRÚNG 6 SỐ + BONUS NUMBER',
        'JACKPOT 1* + JACKPOT 2* + 1,33 Tỷ Đồng**'
    ]
]

const bao13 = [
    ['TRÚNG 3 SỐ', '6.000.000'],
    ['TRÚNG 4 SỐ', '34.800.000'],
    ['TRÚNG 5 SỐ', '418.000.000'],
    ['TRÚNG 5 SỐ + BONUS NUMBER', 'JACKPOT 2* + 378 Triệu Đồng'],
    ['TRÚNG 6 SỐ', 'JACKPOT 1* + 1,87 Tỷ Đồng**'],
    [
        'TRÚNG 6 SỐ + BONUS NUMBER',
        'JACKPOT 1* + JACKPOT 2* + 1,63 Tỷ Đồng**'
    ]
]

const bao14 = [
    ['TRÚNG 3 SỐ', '8.250.000'],
    ['TRÚNG 4 SỐ', '46.500.000'],
    ['TRÚNG 5 SỐ', '492.000.000'],
    ['TRÚNG 5 SỐ + BONUS NUMBER', 'JACKPOT 2* + 452 Triệu Đồng'],
    ['TRÚNG 6 SỐ', 'JACKPOT 1* + 2,18 Tỷ Đồng**'],
    [
        'TRÚNG 6 SỐ + BONUS NUMBER',
        'JACKPOT 1* + JACKPOT* 2 + 1,94 Tỷ Đồng**'
    ]
]

const bao15 = [
    ['TRÚNG 3 SỐ', '11.000.000'],
    ['TRÚNG 4 SỐ', '60.500.000'],
    ['TRÚNG 5 SỐ', '572.500.000'],
    ['TRÚNG 5 SỐ + BONUS NUMBER', 'JACKPOT 2* + 532,5Triệu Đồng'],
    ['TRÚNG 6 SỐ', 'JACKPOT 1* + 2,51 Tỷ Đồng**'],
    [
        'TRÚNG 6 SỐ + BONUS NUMBER',
        'JACKPOT 1* + JACKPOT 2* + 2,27 Tỷ Đồng**'
    ]
]

const bao18 = [
    ['TRÚNG 3 SỐ', '22.750.000'],
    ['TRÚNG 4 SỐ', '118.300.000'],
    ['TRÚNG 5 SỐ', '858.000.000'],
    ['TRÚNG 5 SỐ + BONUS NUMBER', 'JACKPOT 2* + 818 Triệu Đồng'],
    ['TRÚNG 6 SỐ', 'JACKPOT 1* + 3,59 Tỷ Đồng**'],
    [
        'TRÚNG 6 SỐ + BONUS NUMBER',
        'JACKPOT 1* + JACKPOT 2* + 3,35 Tỷ Đồng**'
    ]
]