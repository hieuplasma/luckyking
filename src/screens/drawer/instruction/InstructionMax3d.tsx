import { IText, ImageHeader } from "@components";
import { InstructionStackParamList } from "@navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import React from "react"
import { Dimensions, ScrollView, StyleSheet, View } from "react-native"
import { TableZoom } from "./component/TableZoom";

type NavigationProp = StackNavigationProp<InstructionStackParamList, 'InstructionMax3D'>;
type NavigationRoute = RouteProp<InstructionStackParamList, 'InstructionMax3D'>;

export interface InstructionMax3DParamsList { }
interface InstructionMax3DProps { }

export const InstructionMax3D = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title="Hướng dẫn chơi Max3D, Max3D+" />
            <ScrollView style={{ flex: 1, padding: 8 }}>
                <IText style={styles.content}>{intro}</IText>
                <IText style={styles.title} uppercase>{title1}</IText>
                <IText style={styles.content}>{content1}</IText>

                <TableZoom title={"Cơ cấu giải thưởng vé số Max3D"} data={max3d} flexPart={[1, 3, 1]} />

                <IText style={styles.content}>{note1}</IText>
                <IText style={styles.title} uppercase>{title2}</IText>
                <IText style={styles.content}>{content2}</IText>

                <TableZoom title={"Cơ cấu giải thưởng vé số Max3D+"} data={max3dplus} flexPart={[1, 3, 1]} />

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

const intro = `Chỉ từ 10.000 đồng, chọn 3 chữ số từ 000-999 để có cơ hội trúng thưởng nhận các giải thưởng hấp dẫn. Max 3D quay số mở thưởng vào 18h00 các ngày thứ 2, thứ 4 và thứ 6 hàng tuần.`

const title1 = `1. Cơ cấu và giá trị giải thưởng cho cách chơi một số có 3 chữ số (Max 3D cơ bản)`

const content1 = `a) Gồm 4 hạng giải và được quay số mở thưởng 20 lần trong mỗi kỳ quay số mở thưởng để chọn ra 20 số trúng giải, cụ thể như sau:
Giải Đặc biệt: Quay số mở thưởng 02 lần chọn ra 2 số có 3 chữ số.
Giải Nhất: Quay số mở thưởng 04 lần chọn ra 4 số, mỗi số có 3 chữ số.
Giải Nhì: Quay số mở thưởng 06 lần chọn ra 6 số, mỗi số có 3 chữ số.
Giải Ba: Quay số mở thưởng 08 lần chọn ra 8 số, mỗi số có 3 chữ số.
b) Cơ cấu giải thưởng tương ứng với giá trị một (01) lần tham gia dự thưởng mệnh giá 10.000 đồng cụ thể như sau:`

const note1 = `Trường hợp người tham gia dự thưởng có số tham gia dự thưởng trúng nhiều giải thưởng, người tham gia dự thưởng được lĩnh thưởng bằng tổng số giải thưởng:
Khách hàng có thể tăng mức đặt cược lên nhiều hơn (bội số của 10.000 đồng) để tăng giá trị lĩnh thưởng.`

const title2 = `2. Cơ cấu và giá trị giải thưởng cho cách chơi hai bộ số có 3 chữ số (Max 3D+).`

const content2 = `a) Gồm 7 hạng giải và dựa vào kết quả quay số mở thưởng của cách chơi một số có 3 chữ số cơ bản để xác định giải thưởng:
b) Cơ cấu giải thưởng tương ứng với giá trị một (01) lần tham gia dự thưởng mệnh giá 10.000 đồng cụ thể như sau:`

const note2 = `Trường hợp người tham gia dự thưởng có số tham gia dự thưởng trúng nhiều giải thưởng, người tham gia dự thưởng được lĩnh thưởng bằng tổng số giải thưởng
Cơ cấu giải thưởng này áp dụng với vé dự thưởng gồm hai bộ số 3 chữ số khác nhau. Nếu người tham gia dự thưởng chọn hai số 3 chữ số giống nhau, giá trị giải thưởng sẽ cao gấp hai lần giá trị nêu ở bảng trên
Khách hàng có thể tăng mức đặt cược lên nhiều hơn (bội số của 10.000 đồng) để tăng giá trị lĩnh thưởng.`

const max3d = [
    [
        'Giải Đặc Biệt',
        'Trùng bất kỳ 1 trong 2 bộ ba số quay thưởng giải Đặc biệt theo đúng thứ tự các số',
        '1.000.000'
    ],
    [
        'Giải Nhất',
        'Trùng bất kỳ 1 trong 4 bộ ba số quay thưởng giải Nhất theo đúng thứ tự các số',
        '350.000'
    ],
    [
        'Giải Nhì',
        'Trùng bất kỳ 1 trong 6 bộ ba số quay thưởng giải Nhì theo đúng thứ tự của các số',
        '210.000'
    ],
    [
        'Giải Ba',
        'Trùng bất kỳ 1 trong 8 bộ ba số quay thưởng giải Ba theo đúng thứ tự của các số',
        '100.000'
    ]
]

const max3dplus = [
    [
        'Giải Đặc biệt',
        'Trùng hai bộ ba số quay thưởng giải Đặc biệt',
        '1.000.000.000'
    ],
    [
        'Giải Nhất',
        'Trùng bất kỳ 2 trong 4 bộ ba số quay thưởng giải Nhất',
        '40.000.000'
    ],
    [
        'Giải Nhì',
        'Trùng bất kỳ 2 trong 6 bộ ba số quay thưởng giải Nhì',
        '10.000.000'
    ],
    [
        'Giải Ba',
        'Trùng bất kỳ 2 trong 8 bộ ba số quay thưởng giải Ba',
        '5.000.000'
    ],
    [
        'Giải tư',
        'Trùng bất kỳ 2 bộ ba số quay thưởng của giải Đặc biệt, Nhất, Nhì hoặc Ba',
        '1.000.000'
    ],
    [
        'Giải năm',
        'Trùng 1 bộ ba số quay thưởng giải Đặc biệt bất kỳ',
        '150.000'
    ],
    [
        'Giải sáu',
        'Trùng 1 bộ ba số quay thưởng giải Nhất, Nhì hoặc Ba bất kỳ',
        '40.000'
    ]
]