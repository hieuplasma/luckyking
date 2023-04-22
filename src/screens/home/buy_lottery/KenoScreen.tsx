import { lotteryApi } from '@api';
import { LotteryType } from '@common';
import { HeaderBuyLottery, IText } from '@components';
import { HomeStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { getColorLott } from '@utils';
import { SimpleKenoTab } from './keno-component/SimpleKenoTab';
import { BagKenoTab } from './keno-component/BagKenoTab';
import { NurturingKenoTab } from './keno-component/NurturingKenoTab';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'KenoScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'KenoScreen'>;

export interface KenoScreenParamsList { }

const lottColor = getColorLott(LotteryType.Keno)
const types = [
    { label: "Keno Cơ bản", value: 0 },
    { label: "Bao Keno", value: 1 },
    { label: "Nuôi Keno", value: 2 }
]

export const KenoScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const dispatch = useDispatch()

    const [type, setType] = useState(types[0])

    const changeType = useCallback((type: any) => {
        // setType(type)
        window.loadingIndicator.show()
        let timer1 = setTimeout(() => {
            setType(type)
            clearTimeout(timer1)
            window.loadingIndicator.hide()
        }, 100);
    }, [])

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    useEffect(() => {
        window.loadingIndicator.show()
        const timer = setTimeout(() => {
            setShowBottomSheet(true);
            window.loadingIndicator.hide()
        }, 500); // change delay as needed
        return () => clearTimeout(timer);
    }, []);

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
                <View style={{ width: 8 }} />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => changeType(types[2])}
                    style={[styles.button, { backgroundColor: type.value == 2 ? lottColor : Color.white }]}
                >
                    <IText style={{ fontSize: 16, color: type.value == 2 ? Color.white : lottColor }}>
                        {types[2].label}
                    </IText>
                </TouchableOpacity>
                <View style={{ width: 8 }} />
            </View>

            <>
                {type.value == 0 ?
                    <SimpleKenoTab showBottomSheet={showBottomSheet} />
                    : type.value == 1 ?
                        <BagKenoTab showBottomSheet={showBottomSheet} />
                        : <NurturingKenoTab showBottomSheet={showBottomSheet} />
                }
            </>

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