import { Icon, Images,Image } from '@assets';
import { ImageHeader } from '@components';
import { MainDrawerParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, Style } from '@styles';
import { ScreenUtils } from '@utils';
import { useCallback } from 'react';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<MainDrawerParamList, 'UserStack'>;
type NavigationRoute = RouteProp<MainDrawerParamList, 'UserStack'>;

export interface UserScreenParamsList { }

export const RechargeScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
           <ImageHeader navigation={navigation} title={"NẠP TIỀN"}/>
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