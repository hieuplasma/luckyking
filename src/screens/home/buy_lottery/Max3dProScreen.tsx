import { lotteryApi } from '@api';
import { LotteryType } from '@common';
import { HeaderBuyLottery, IText } from '@components';
import { HomeStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getMax3dDraw, getMax3dProDraw } from '@redux';
import { Color } from '@styles';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Max3dPlusTab } from './max3component/max3dplus/Max3dPlusTab';
import { Max3dTab } from './max3component/max3d/Max3dTab';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Max3dScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'Max3dScreen'>;

export interface Max3dProScreenParamsList { }

export const Max3dScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const dispatch = useDispatch()

    const getListDraw = async () => {
        const listMax3dPro = await lotteryApi.getScheduleMax3d({ type: LotteryType.Max3DPro, take: 6, skip: 0 })
        if (listMax3dPro) {
            if (listMax3dPro.data.length > 0) {
                dispatch(getMax3dProDraw(listMax3dPro.data))
            }
        }
    }

    useEffect(() => {
        getListDraw()
    }, [])

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBottomSheet(true);
        }, 500); // change delay as needed
        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBuyLottery navigation={navigation} lotteryType={LotteryType.Max3DPro} />
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