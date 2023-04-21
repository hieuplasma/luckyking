import { lotteryApi } from '@api';
import { LotteryType } from '@common';
import { HeaderBuyLottery, IText } from '@components';
import { HomeStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getMax3dDraw } from '@redux';
import { Color } from '@styles';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Max3dPlusTab } from './max3d-component/max3dplus/Max3dPlusTab';
import { Max3dTab } from './max3d-component/max3d/Max3dTab';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Max3dScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'Max3dScreen'>;

export interface Max3dScreenParamsList { }

export const Max3dScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const dispatch = useDispatch()

    const [lotteryType, setLotteryType] = useState(LotteryType.Max3D)

    const changeLotteryType = useCallback((type: LotteryType) => {
        window.loadingIndicator.show()
        let timer1 = setTimeout(() => {
            setLotteryType(type)
            clearTimeout(timer1)
            window.loadingIndicator.hide()
        }, 500);

    }, [])

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    useEffect(() => {
        window.loadingIndicator.show()
        const timer = setTimeout(() => {
            window.loadingIndicator.hide()
            setShowBottomSheet(true);
        }, 500); // change delay as needed
        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBuyLottery navigation={navigation} lotteryType={lotteryType} />

            {/* Body View */}
            <View style={{ height: 32, width: windowWidth - 32, marginHorizontal: 16, flexDirection: 'row' }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => changeLotteryType(LotteryType.Max3D)}
                    style={[styles.button, { backgroundColor: lotteryType == LotteryType.Max3D ? Color.max3d : Color.white }]}
                >
                    <IText style={{ fontSize: 16, color: lotteryType == LotteryType.Max3D ? Color.white : Color.max3d }}>
                        {"Max 3D"}
                    </IText>
                </TouchableOpacity>
                <View style={{ width: 8 }} />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => changeLotteryType(LotteryType.Max3DPlus)}
                    style={[styles.button, { backgroundColor: lotteryType == LotteryType.Max3DPlus ? Color.max3d : Color.white }]}
                >
                    <IText style={{ fontSize: 16, color: lotteryType == LotteryType.Max3DPlus ? Color.white : Color.max3d }}>
                        {"Max 3D+"}
                    </IText>
                </TouchableOpacity>
            </View>

            <>
                {lotteryType == LotteryType.Max3D ?
                    <Max3dTab showBottomSheet={showBottomSheet} /> : <Max3dPlusTab showBottomSheet={showBottomSheet} />}
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
        borderColor: Color.max3d
    }
})