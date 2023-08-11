import { Image, Images } from "@assets";
import { IText, ImageHeader } from "@components";
import { InstructionStackParamList } from "@navigation";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import React from "react"
import { Dimensions, ScrollView, StyleSheet, View } from "react-native"
import { ImageZoom } from "./component/ImageZoom";

type NavigationProp = StackNavigationProp<InstructionStackParamList, 'InstructionKeno'>;
type NavigationRoute = RouteProp<InstructionStackParamList, 'InstructionKeno'>;

export interface InstructionKenoParamsList { }
interface InstructionKenoProps { }

export const InstructionKeno = React.memo(() => {

    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title="Hướng dẫn chơi Keno" />
            <ScrollView style={{ flex: 1, padding: 8 }}>
                <IText style={styles.content}>{intro}</IText>
                <IText style={styles.title} uppercase>{title1}</IText>
                <IText style={styles.content}>{content1}</IText>
                <ImageZoom source={Images.co_cau_keno} style={styles.img} />
                <IText style={styles.title} uppercase>{title2}</IText>
                <IText style={styles.content}>{content2}</IText>
                <ImageZoom source={Images.co_cau_keno2} style={styles.img} />

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

const intro = `Những Điểm Hấp Dẫn Của Xổ Số Keno:
• Chỉ với 10k, trúng tới "2 Tỷ"
• Tỷ lệ trúng thưởng "Cao nhất thị trường" (4:1)
• "Nhiều hạng giải thưởng" lớn nhỏ. Quay số mở thưởng xổ 20 số/Kỳ
• Quay số 10 phút/lần, 96 kỳ/ngày, từ 06:00 đến 22:00 tất cả các ngày trong tuần.
• Là sản phẩm duy nhất "Không trùng số nào vẫn trúng".`

const title1 = `1. Cách chơi Keno cơ bản`

const content1 = `Trong xổ số Keno Vietlott ngoài việc bạn chọn 10 con số để tham gia dự thưởng thì bạn có thể chọn 1,2,3,4,5,6,7,8 hoặc 9 số mỗi số lượng số bạn chọn tương ứng với bậc 1,2,3,4,5,6,7,8 hoặc 9.
CƠ CẤU GIẢI THƯỞNG KENO CƠ BẢN
(Cơ cấu giả thưởng cho tờ vé 10.000 đồng, nếu tham gia nhiều hơn thì giải thưởng nhận được gấp nhiều lần tương ứng)`

const title2 = `2. Cách Keno chơi bổ sung`

const content2 = `Các cách chơi bổ sung dựa vào kết quả Quay số mở thưởng của cách chơi cơ bản để xác định giải thưởng.
Cơ cấu giải thưởng cho một (01) vé tham gia dự thưởng mệnh giá 10.000 đồng cụ thể như sau.`

const note2 = `Người trúng thưởng chỉ được lĩnh một hạng giải thưởng duy nhất tương ứng với mỗi cách chơi bổ sung.
Giá trị lĩnh thưởng đươc tính theo số lần tham gia dự thưởng của cách chơi bổ sung (01 lần tham gia dự thưởng mệnh giá 10.000 đồng) nhân với giá trị giải thưởng tương ứng với 01 lần tham gia dự thưởng.
Trường hợp có sự thay đổi về số lượng, cơ cấu, giá trị của các giải thưởng thì Vietlott sẽ có thông báo bổ sung.`