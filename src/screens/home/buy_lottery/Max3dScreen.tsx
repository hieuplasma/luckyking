import { Icon, Images, Image } from '@assets';
import { LotteryType } from '@common';
import { CartIcon, HeaderBuyLottery } from '@components';
import { HomeStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, Style } from '@styles';
import { ScreenUtils } from '@utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ViewAbove } from './component/ViewAbove';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Max3dScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'Max3dScreen'>;

export interface Max3dScreenParamsList { }

export const Max3dScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const [lotteryType, setLotteryType] = useState(LotteryType.Max3D)

    const listDraw = useSelector((state: any) => state.drawReducer.max3dListDraw)

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 6 });
    const [drawSelected, setDraw]: any = useState(listDraw[0])
    // const [numberSet, setNumbers]: any = useState(initNumber)
    const [totalCost, setTotalCost] = useState(0)

    // ref
    const chooseTypeRef: any = useRef(null);
    const chooseDrawRef: any = useRef(null);
    const chooseNumberRef: any = useRef(null);
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBottomSheet(true);
        }, 500); // change delay as needed
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <HeaderBuyLottery navigation={navigation} lotteryType={lotteryType} />
            <ViewAbove typePlay={typePlay} drawSelected={drawSelected} openTypeSheet={()=> {}} openDrawSheet={()=> {}} />
            {/* Body View */}

        </View>
    )
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.buyLotteryBackGround
    },
})