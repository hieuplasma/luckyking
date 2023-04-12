import { Icon, Images, Image } from '@assets';
import { ImageHeader, IText } from '@components';
import { ScreenName, WithdrawStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, Style } from '@styles';
import { NavigationUtils, printMoney, ScreenUtils } from '@utils';
import { useCallback } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<WithdrawStackParamList, 'WithdrawScreen'>;
type NavigationRoute = RouteProp<WithdrawStackParamList, 'WithdrawScreen'>;

export interface WithdrawScreenParamsList { }

export const WithdrawScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const luckykingBalance = useSelector((state: any) => state.userReducer.luckykingBalance)

    return (
        <View style={styles.container}>
            <ImageHeader navigation={navigation} title={"NẠP TIỀN"} />

            
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
    body: {

    }
})