import { DELAY_SCREEN, DELAY_TAB, LotteryType } from '@common';
import { HeaderBuyLottery, IText, ModalAlert } from '@components';
import { HomeStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getColorLott } from '@utils';
import { SimpleKenoTab } from './keno-component/SimpleKenoTab';
import { BagKenoTab } from './keno-component/BagKenoTab';
import { NurturingKenoTab } from './keno-component/NurturingKenoTab';
import { useDispatch, useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'KenoScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'KenoScreen'>;

export interface KenoScreenParamsList {
    numbers?: number[]
    type?: string
}

const lottColor = getColorLott(LotteryType.Keno)
const types = [
    { label: "Keno Cơ bản", value: 0 },
    { label: "Bao Keno", value: 1 },
    { label: "Nuôi Keno", value: 2 }
]

const alertContentKeno = 'Do đặc thù thời gian quay số Keno rất ngắn, nên trong các trường hợp bất khả kháng như lỗi đường truyền, lỗi máy in vé của Vietlott..., kỳ QSMT thực tế in trên vé có thể khác so với kỳ QSMT mà Quý khách lựa chọn. Vé Keno mà Quý khách nhận được sẽ được in ở kỳ QSMT gần nhất mà hệ thống có thể đáp ứng sau khi Quý khách thanh toán thành công.'

export const KenoScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>()
    const dispatch = useDispatch()

    const alertKeno = useSelector((state: any) => state.systemReducer.alertKeno)

    const [type, setType] = useState(types[0])

    const changeType = useCallback((type: any) => {
        // setType(type)
        window.loadingIndicator.show()
        let timer1 = setTimeout(() => {
            setType(type)
            clearTimeout(timer1)
            window.loadingIndicator.hide()
        }, DELAY_TAB);
    }, [])

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    useEffect(() => {
        window.loadingIndicator.show()
        const timer = setTimeout(() => {
            setShowBottomSheet(true);
            window.loadingIndicator.hide()
        }, DELAY_SCREEN); // change delay as needed
        return () => clearTimeout(timer);
    }, []);

    const [numbers, setNumbers] = useState<number[] | undefined>(undefined)

    useEffect(() => {
        if (route.params?.numbers) {
            setNumbers(route.params.numbers)
        }
        if (route.params?.type) {
            if (route.params.type == 'normal') changeType(types[0])
            else if (route.params.type == 'bag') changeType(types[1])
        }

    }, [route.params])

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBuyLottery navigation={navigation} lotteryType={LotteryType.Keno} />

            {/* Body View */}
            <View style={{ height: 32, width: windowWidth - 32, marginHorizontal: 16, flexDirection: 'row' }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => changeType(types[0])}
                    style={[styles.button, { backgroundColor: type.value == 0 ? lottColor : Color.white }]}
                >
                    <IText style={{ fontSize: 16, color: type.value == 0 ? Color.white : lottColor }}>
                        {types[0].label}
                    </IText>
                </TouchableOpacity>
                <View style={{ width: 8 }} />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => changeType(types[1])}
                    style={[styles.button, { backgroundColor: type.value == 1 ? lottColor : Color.white }]}
                >
                    <IText style={{ fontSize: 16, color: type.value == 1 ? Color.white : lottColor }}>
                        {types[1].label}
                    </IText>
                </TouchableOpacity>
                {/* <View style={{ width: 8 }} />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => changeType(types[2])}
                    style={[styles.button, { backgroundColor: type.value == 2 ? lottColor : Color.white }]}
                >
                    <IText style={{ fontSize: 16, color: type.value == 2 ? Color.white : lottColor }}>
                        {types[2].label}
                    </IText>
                </TouchableOpacity>
                <View style={{ width: 8 }} /> */}
            </View>

            <>
                {type.value == 0 ?
                    <SimpleKenoTab showBottomSheet={showBottomSheet} navigation={navigation} paramNumber={numbers} />
                    : type.value == 1 ?
                        <BagKenoTab showBottomSheet={showBottomSheet} navigation={navigation} paramNumber={numbers}/>
                        : <NurturingKenoTab showBottomSheet={showBottomSheet} />
                }
            </>

            <ModalAlert visible={alertKeno} alertContent={alertContentKeno} typeAlert='keno' />
        </SafeAreaView>
    )
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.buyLotteryBackGround
    },
    button: {
        flex: 1,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 10, borderWidth: 1,
        borderColor: Color.keno
    }
})