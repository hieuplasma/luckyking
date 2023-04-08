import { Icon, Images, Image } from '@assets';
import { LotteryType } from '@common';
import { CartIcon, HeaderBuyLottery } from '@components';
import { HomeStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, Style } from '@styles';
import { ScreenUtils } from '@utils';
import { useCallback, useState } from 'react';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Max3dScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'Max3dScreen'>;

export interface Max3dScreenParamsList { }

export const Max3dScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const [lotteryType, setLotteryType] = useState(LotteryType.Max3D)

    return (
        <View style={styles.container}>
            <HeaderBuyLottery navigation={navigation} lotteryType={lotteryType} />

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