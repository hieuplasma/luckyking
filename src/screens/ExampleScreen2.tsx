import { Icon, Images, Image } from '@assets';
import { MainDrawerParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, Style } from '@styles';
import { ScreenUtils } from '@utils';
import { useCallback } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, Text } from 'react-native';
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
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={"transparent"} />
            <Image source={Images.bg_header} style={[styles.headerContainer, { paddingTop: safeAreaInsets.top }]}>
                <View style={{ flex: 1 }}>
                    <Icon.Button
                        size={'small'}
                        color={Color.white}
                        name="ic_back"
                        style={{ paddingHorizontal: 0 }}
                        onPressed={onGoBack}
                    />
                </View>
                <Text style={styles.textTitle}>{"THÔNG TIN TÀI KHOẢN"}</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }} >
                    <Image source={Images.trash} style={{ width: 26, height: 26 }}></Image>
                </View>
            </Image>
        </View>
    )
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    textTitle: { color: Color.white, fontWeight: 'bold', fontSize: 16 },
    headerContainer: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
})