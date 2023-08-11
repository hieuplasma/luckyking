import { IText, ImageHeader } from "@components";
import { InstructionStackParamList } from "@navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import React from "react"
import { Dimensions, ScrollView, StyleSheet, View } from "react-native"
import { TableZoom } from "./component/TableZoom";

type NavigationProp = StackNavigationProp<InstructionStackParamList, 'InstructionMax3DPro'>;
type NavigationRoute = RouteProp<InstructionStackParamList, 'InstructionMax3DPro'>;

export interface InstructionMax3dProParamsList { }
interface InstructionMax3dProProps { }

export const InstructionMax3DPro = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title="Hướng dẫn chơi Max3d Pro" />
            <ScrollView style={{ flex: 1, padding: 8 }}>
                <IText style={styles.content}>{intro}</IText>
                <IText style={styles.title} uppercase>{title1}</IText>
                <IText style={styles.content}>{content1}</IText>

                <TableZoom title={"Cơ cấu giải thưởng vé số Max3D Pro"} data={normal} flexPart={[1, 3, 1]} />

                <IText style={styles.content}>{note1}</IText>

                <IText style={styles.title} uppercase>{title2}</IText>

                <IText style={styles.content}>{content2a}</IText>
                <TableZoom data={bao3} flexPart={[2, 2, 3, 2]} headerTitle={true} />

                <IText style={styles.content}>{content2b}</IText>
                <TableZoom data={baomulti} flexPart={[1, 3, 1]} headerTitle={true} />

                <IText style={styles.content}>{note2}</IText>

                <View style={{height: 100}}/>
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

const intro = `Người tham gia dự thưởng lựa chọn hai bộ 3 số từ 000 đến 999 để tạo thành bộ số tham gia dự thưởng. So sánh bộ số tham gia dự thưởng được in trên vé với kết quả quay số mở thưởng để xác định giải thưởng.
Max 3D Pro quay số mở thưởng vào 18h00 các ngày thứ 3, thứ 5 và thứ 7 hàng tuần`

const title1 = `1. Cơ cấu và giá trị giải thưởng cho cách chơi hai bộ 3 số cơ bản`

const content1 = `a) Gồm 8 hạng giải và được quay số mở thưởng 20 lần trong mỗi kỳ quay số mở thưởng để chọn ra 20 bộ số trúng giải, cụ thể như sau:
- Bộ số Giải Đặc biệt: Quay số mở thưởng 02 lần chọn ra 2 bộ ba số.
- Bộ số Giải Nhất: Quay số mở thưởng 04 lần chọn ra 4 bộ ba số.
- Bộ số Giải Nhì: Quay số mở thưởng 06 lần chọn ra 6 bộ ba số.
- Bộ số Giải Ba: Quay số mở thưởng 08 lần chọn ra 8 bộ ba số.
b) Cơ cấu giải thưởng tương ứng với giá trị một (01) lần tham gia dự thưởng mệnh giá 10.000 đồng cụ thể như sau:`

const note1 = `- Cơ cấu giải thưởng này áp dụng với vé dự thưởng gồm hai bộ ba số khác nhau. Nếu người tham gia dự thưởng chọn hai bộ ba số giống nhau, giá trị giải thưởng sẽ cao gấp hai lần giá trị nêu ở bảng trên cho các hạng giải thưởng từ giải Nhất đến giải Sáu, bằng tổng giá trị giải Đặc biệt và giải phụ Đặc biệt cho hạng giải Đặc biệt/phụ Đặc biệt.
- Trường hợp người tham gia dự thưởng có kết hợp hai bộ ba số tham gia dự thưởng trúng nhiều giải thưởng, người tham gia dự thưởng được lĩnh thưởng bằng tổng số giải thưởng
- Giá trị lĩnh thưởng được tính theo số lần tham gia dự thưởng của bộ số trúng thưởng (01 lần tham gia dự thưởng mệnh giá 10.000 đồng) nhân với giá trị giải thưởng tương ứng với 01 lần tham gia dự thưởng`

const title2 = `2. Cơ cấu và giá trị giải thưởng cho cách chơi nhiều bộ số`

const content2a = `a) Chơi bao bộ ba số:
- Người tham gia dự thưởng lựa chọn 3 số trong tập hợp các số từ 0 đến 9. Sau đó, hệ thống phần mềm sẽ giúp người chơi tạo ra tất cả các kết hợp có 3 số trong các số mà người chơi đã chọn để tạo thành các bộ ba số đầu để kết hợp tham gia dự thưởng.
- Người tham gia dự thưởng lựa chọn 3 số trong tập hợp các số từ 0 đến 9. Sau đó, hệ thống phần mềm sẽ giúp người chơi tạo ra tất cả các kết hợp có 3 số trong các số mà người chơi đã chọn để tạo thành các bộ ba số sau để kết hợp tham gia dự thưởng.
So sánh kết hợp hai bộ ba số trên vé với kết quả quay số mở thưởng để xác định giải thưởng.`

const content2b = `b) Chơi bao nhiều bộ ba số:
Người tham gia dự thưởng lựa chọn từ 3 đến 20 bộ ba số. Mỗi số trong bộ ba số được chọn trong tập hợp các số từ 0 đến 9. Sau đó, hệ thống phần mềm sẽ giúp người chơi tạo ra tất cả các kết hợp 2 bộ ba số trong các bộ ba số mà người chơi đã chọn để tham gia dự thưởng. So sánh các kết hợp hai bộ ba số với kết quả quay số mở thưởng để xác định giải thưởng`

const note2 = `b) Chơi bao nhiều bộ ba số:
Người tham gia dự thưởng lựa chọn từ 3 đến 20 bộ ba số. Mỗi số trong bộ ba số được chọn trong tập hợp các số từ 0 đến 9. Sau đó, hệ thống phần mềm sẽ giúp người chơi tạo ra tất cả các kết hợp 2 bộ ba số trong các bộ ba số mà người chơi đã chọn để tham gia dự thưởng. So sánh các kết hợp hai bộ ba số với kết quả quay số mở thưởng để xác định giải thưởng`

const normal = [
    [
        'Giải Đặc biệt',
        'Trùng hai bộ ba số quay thưởng giải Đặc biệt theo đúng thứ tự quay',
        '2.000.000.000'
    ],
    [
        'Giải phụ Đặc biệt',
        'Trùng hai bộ ba số quay thưởng giải Đặc biệt ngược thứ tự quay',
        '400.000.000'
    ],
    [
        'Giải Nhất',
        'Trùng bất kỳ 2 trong 4 bộ ba số quay thưởng giải Nhất',
        '30.000.000'
    ],
    [
        'Giải Nhì',
        'Trùng bất kỳ 2 trong 6 bộ ba số quay thưởng giải Nhì',
        '10.000.000'
    ],
    [
        'Giải Ba',
        'Trùng bất kỳ 2 trong 8 bộ ba số quay thưởng giải Ba',
        '4.000.000'
    ],
    [
        'Giải Tư',
        'Trùng bất kỳ 2 bộ ba số quay thưởng của giải Đặc biệt, Nhất, Nhì hoặc Ba',
        '1.000.000'
    ],
    [
        'Giải Năm',
        'Trùng 1 bộ ba số quay thưởng giải Đặc biệt bất kỳ',
        '100.000'
    ],
    [
        'Giải Sáu',
        'Trùng 1 bộ ba số quay thưởng giải Nhất, Nhì hoặc Ba bất kỳ',
        '40.000'
    ]
]

const bao3 = [
    [
        'Cách chọn số cho bộ ba số đầu',
        'Cách chọn số cho bộ ba số sau',
        'Tổng số cách kết hợp hai bộ ba số để tham gia dự thưởng',
        'Tổng giá trị tham gia dự thưởng'
    ],
    [
        'Chọn 3 số khác nhau (ví dụ: 123)',
        'Chọn 3 số khác nhau (ví dụ: 123)',
        '36',
        '360.000 đồng'
    ],
    [
        'Chọn 3 số khác nhau (ví dụ: 123)',
        'Chọn 2 số giống nhau (ví dụ: 112)',
        '18',
        '180.000 đồng'
    ],
    [
        'Chọn 2 số giống nhau (ví dụ: 112)',
        'Chọn 3 số khác nhau (ví dụ: 123)',
        '18',
        '180.000 đồng'
    ],
    [
        'Chọn 2 số giống nhau (ví dụ: 112)',
        'Chọn 2 số giống nhau (ví dụ: 112)',
        '09',
        '90.000 đồng'
    ],
    [
        'Chọn 3 số giống nhau (ví dụ: 111)',
        'Chọn 3 số khác nhau (ví dụ: 123)',
        '06',
        '60.000 đồng'
    ],
    [
        'Chọn 3 số khác nhau (ví dụ: 123)',
        'Chọn 3 số giống nhau (ví dụ: 111)',
        '06',
        '60.000 đồng'
    ],
    [
        'Chọn 3 số giống nhau (ví dụ: 111)',
        'Chọn 2 số giống nhau (ví dụ: 112)',
        '03',
        '30.000 đồng'
    ],
    [
        'Chọn 2 số giống nhau (ví dụ: 112)',
        'Chọn 3 số giống nhau (ví dụ: 111)',
        '03',
        '30.000 đồng'
    ]
]

const baomulti = [
    [
        'Số lượng các bộ ba số được chọn',
        'Tổng số cách kết hợp hai bộ ba số để tham gia dự thưởng',
        'Tổng giá trị tham gia dự thưởng'
    ],
    ['3 bộ ba số', '06', '60.000 đồng'],
    ['4 bộ ba số', '12', '120.000 đồng'],
    ['5 bộ ba số', '20', '200.000 đồng'],
    ['6 bộ ba số', '30', '300.000 đồng'],
    ['7 bộ ba số', '42', '420.000 đồng'],
    ['8 bộ ba số', '56', '560.000 đồng'],
    ['9 bộ ba số', '72', '720.000 đồng'],
    ['10 bộ ba số', '90', '900.000 đồng'],
    ['11 bộ ba số', '110', '1.100.000 đồng'],
    ['12 bộ ba số', '132', '1.320.000 đồng'],
    ['13 bộ ba số', '156', '1.560.000 đồng'],
    ['14 bộ ba số', '182', '1.820.000 đồng'],
    ['15 bộ ba số', '210', '2.100.000 đồng'],
    ['16 bộ ba số', '240', '2.400.000 đồng'],
    ['17 bộ ba số', '272', '2.720.000 đồng'],
    ['18 bộ ba số', '306', '3.060.000 đồng'],
    ['19 bộ ba số', '342', '3.420.000 đồng'],
    ['20 bộ ba số', '380', '3.800.000 đồng']
]