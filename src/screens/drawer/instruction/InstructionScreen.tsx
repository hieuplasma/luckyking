import React from "react"
import { IText, ImageHeader } from "@components";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@styles";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View, ImageProps } from "react-native";
import { InstructionStackParamList, ScreenName } from "@navigation";
import { Image, Images } from "@assets";
import { NavigationUtils } from "@utils";

type NavigationProp = StackNavigationProp<InstructionStackParamList, 'InstructionScreen'>;
type NavigationRoute = RouteProp<InstructionStackParamList, 'InstructionScreen'>;

export interface InstructionScreenParamsList { }
interface InstructionScreenProps { }

export const InstructionScreen = React.memo((props: any) => {

    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title="Hướng dẫn chơi" />

            <ScrollView style={{ flex: 1, marginTop: 16 }}>
                {
                    types.map(item => {
                        return (
                            <ItemView
                                navigation={navigation}
                                navTo={item.navTo}
                                title={item.title}
                                shortContent={item.shortContent}
                                logo={item.logo}
                                key={item.title}
                            />
                        )
                    })
                }
                <View style={{ height: 100 }} />
            </ScrollView>

        </View>
    )
})

interface ItemViewProps {
    navigation: any,
    navTo: string,
    title: string,
    shortContent: string,
    logo: any
}

const ItemView = React.memo(({ navigation, navTo, title, shortContent, logo }: ItemViewProps) => {
    return (
        <TouchableOpacity style={styles.item} activeOpacity={1}
            onPress={() => NavigationUtils.navigate(navigation, navTo)}>
            <Image source={logo} style={{ width: 100, height: '100%' }} resizeMode="contain" />
            <View style={{ flex: 1, marginLeft: 12 }}>
                <IText style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {title}
                </IText>

                <IText style={{ fontSize: 16 }}>
                    {shortContent}
                </IText>
            </View>
        </TouchableOpacity>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    item: {
        flexDirection: 'row',
        padding: 12,
        borderColor: Color.gray, borderBottomWidth: 1,
        alignItems: 'center'
    }
})

const types = [
    {
        title: "Cách chơi Keno",
        shortContent: "Cơ hội trúng 2 tỷ chỉ với 10.000 đồng - Không trùng kết quả vẫn trúng. Keno được phát hành từ 06 giờ 00 phút và kết thúc chậm nhất 21 giờ 55 phút hàng ngày từ Thứ Hai đến Chủ Nhật với tần suất quay số mở thưởng 5 phút/kỳ, bán vé liên tục trong suốt thời gian của mỗi kỳ quay số mở thưởng.",
        logo: Images.keno_logo,
        navTo: ScreenName.Drawer.InstructionKeno
    },
    {
        title: "Cách chơi Power",
        shortContent: "Chỉ từ 10.000 đồng, chọn 6 số từ 01-55 để có cơ hội trúng thưởng Jackpot 1 từ 30 tỷ đồng, Jackpot 2 từ 3 tỷ đồng. POWER 6/55 quay số mở thưởng vào 18h00 các ngày thứ 3, thứ 5 và thứ 7 hàng tuần",
        logo: Images.power_logo,
        navTo: ScreenName.Drawer.InstructionPower
    },
    {
        title: "Cách chơi Mega",
        shortContent: "Chỉ từ 10.000 đồng, chọn 6 số từ 01-45 để có cơ hội trúng thưởng Jackpot từ 12 tỷ đồng. MEGA 6/45 quay số mở thưởng vào 18h00 các ngày thứ 4, thứ 6 và Chủ Nhật hàng tuần.",
        logo: Images.mega_logo,
        navTo: ScreenName.Drawer.InstructionMega
    },
    {
        title: "Cách chơi Max3D, Max3D+",
        shortContent: "Chỉ từ 10.000 đồng, người tham gia dự thưởng lựa chọn một bộ ba số hoặc hai bộ ba số (đối với cách chơi Max 3D+), trong đó mỗi số được chọn trong tập hợp các số từ 0 đến 9 và so sánh với kết quả quay số mở thưởng để xác định giải thưởng. Max 3D quay số mở thưởng vào 18h00 các ngày thứ 2, thứ 4 và thứ 6 hàng tuần",
        logo: Images.max3d_logo,
        navTo: ScreenName.Drawer.InstructionMax3D
    },
    {
        title: "Cách chơi Max3D Pro",
        shortContent: "Người tham gia dự thưởng lựa chọn hai bộ 3 số từ 000 đến 999 để tạo thành bộ số tham gia dự thưởng. So sánh bộ số tham gia dự thưởng được in trên vé với kết quả quay số mở thưởng để xác định giải thưởng. Max 3D Pro quay số mở thưởng vào 18h00 các ngày thứ 3, thứ 5 và thứ 7 hàng tuần",
        logo: Images.max3dpro_logo,
        navTo: ScreenName.Drawer.InstructionMax3DPro
    }
]