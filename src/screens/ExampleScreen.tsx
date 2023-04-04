import { Icon, Images,Image } from '@assets';
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

export const UserScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={"transparent"} />
            <View style={[styles.headerContainer, { marginTop: safeAreaInsets.top }]}>
                <Icon.Button
                    size={'small'}
                    color={Color.gray}
                    name="ic_back"
                    style={[Style.Space.Padding.Zero]}
                    onPressed={onGoBack}
                />
                <Image source={Images.power_logo} style={styles.imageLogo} />
                <Icon.Button
                    size={'large'}
                    color={Color.gray}
                    name="ic_cart"
                    style={[Style.Space.Padding.Zero]}
                    onPressed={() => { }}
                />
            </View>
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
    imageLogo: {
        height: 44.12, width: 60
    },
    headerContainer: {
        flexDirection: 'row',
        height: ScreenUtils.getHeaderHeight(),
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
})