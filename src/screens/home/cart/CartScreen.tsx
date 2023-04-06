import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStackParamList } from '@navigation';
import { StatusBar, View, Text, Dimensions, StyleSheet, ScrollView, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react';
import { Icon, Image, Images } from '@assets';
import { Color } from '@styles';
import { useDispatch, useSelector } from 'react-redux';
import { lotteryApi } from '@api';
import { getCart } from '@redux';
import { printDraw, printDrawCode, printMoney, printNumber, printTypePlay, printWeekDate } from '@utils';
import { LotteryType, NumberDetail } from '@common';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'CartScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'CartScreen'>;

export interface CartScreenParamsList { }

export const CartScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const dispatch = useDispatch()

    const cart = useSelector((state: any) => state.cartReducer.cart)

    const [refreshing, setRefresing] = useState(false)
    const onRefresh = async () => {
        setRefresing(true)
        await getListItem()
        setRefresing(false)
    }

    async function getListItem() {
        const res = await lotteryApi.getListItemCart()
        if (res?.data) {
            dispatch(getCart(res?.data))
        }
    }

    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const calculateAll = () => {
        const list = [...cart]
        let total = 0
        list.map((item) => {
            total = total + item.bets
        })
        return total
    }

    const deleteLottety = (id: string) => {

    }

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
                <Text style={styles.textTitle}>{"GIỎ HÀNG"}</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }} >
                    <Image source={Images.trash} style={{ width: 26, height: 26 }}></Image>
                </View>
            </Image>

            {/* Body View */}
            <FlatList
                style={{ flex: 1, paddingHorizontal: 16 }}
                data={cart}
                renderItem={({ item, index }: any) => {
                    const numberDetail: NumberDetail[] = JSON.parse(item.NumberLottery.numberDetail.toString())
                    return (
                        <View style={styles.borderItem}>
                            <Image source={Images.power_logo} style={{ height: 44.12, width: 60, alignSelf: 'center' }}></Image>
                            <Text style={styles.textType}>{`${printTypePlay(item.NumberLottery.level, item.type)}`}</Text>
                            <View>
                                {
                                    numberDetail.map((it: any, id: number) => {
                                        const numbers: number[] = it.boSo.split("-").map(Number);
                                        return (
                                            <View key={'' + it.boSo + id}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                                    <Text style={{ fontSize: 18, fontWeight: '600', color: Color.black }}>
                                                        {String.fromCharCode(65 + id)}
                                                    </Text>
                                                    <View style={{ marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                                        {
                                                            numbers.map((number: number, id2: number) => {
                                                                return (
                                                                    <View key={number + '' + id} style={styles.ball}>
                                                                        <Text style={styles.textBall}>
                                                                            {`${printNumber(number)}`}
                                                                        </Text>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                    <Image source={Images.trash} style={styles.iconTrash}></Image>
                                                </View>
                                                <View style={styles.underLine} />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View style={styles.lineBottom}>
                                <Text style={{ fontSize: 14, fontWeight: '400' }}>
                                    {`Kỳ ${printDrawCode(item.drawCode)} - ${printWeekDate(new Date(item.drawTime))}`}
                                </Text>
                                <Image source={Images.edit_pen} style={styles.iconTrash}></Image>
                            </View>
                            <View style={styles.lineBottom}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    {`Vé ${printNumber(index + 1)}:`}
                                </Text>
                                <Text style={{ color: Color.power, marginLeft: 12, fontSize: 14, fontWeight: 'bold' }}>
                                    {`${printMoney(item.bets)}đ`}
                                </Text>
                                <View style={{ flex: 1 }} />
                                <TouchableOpacity onPress={() => deleteLottety(item.id)}>
                                    <Image source={Images.trash} style={styles.iconTrash}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => String(item.id)}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListFooterComponent={<View style={{ height: 100 }}></View>}
            >
            </FlatList>
            {
                calculateAll() > 0 ?
                    <View style={{ marginBottom: 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 }}>
                        <Text style={{ fontSize: 14, fontWeight: '400' }}>{'Tổng cộng'}</Text>
                        <View style={{ flex: 1 }} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 16 }}>{`${printMoney(calculateAll())}đ`}</Text>
                        <TouchableOpacity style={styles.buttonPay}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: Color.white }}>{'THANH TOÁN'}</Text>
                        </TouchableOpacity>
                    </View>
                    : <></>
            }
        </View>
    )
});

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

    borderItem: {
        width: windowWidth - 32,
        // shadow
        shadowOffset: { width: 6, height: 5 },
        shadowRadius: 15,
        shadowColor: '#EC6C3C',
        shadowOpacity: 0.2,
        elevation: 3,
        // borderWidth: 1,
        borderColor: '#A0A0A0',
        marginTop: 16,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingTop: 6,
        padding: 16,
    },
    textType: {
        color: '#1E2022',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 7
    },
    underLine: {
        width: windowWidth - 32, height: 1,
        backgroundColor: '#A0A0A0', marginHorizontal: -16,
        marginTop: 12, opacity: 0.2
    },
    ball: {
        width: 24, height: 24, borderRadius: 99,
        backgroundColor: Color.power,
        justifyContent: 'center', alignItems: 'center',
        margin: 5
    },
    textBall: { fontSize: 13, color: Color.white },
    iconTrash: { width: 28, height: 28 },
    lineBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
    buttonPay: { borderRadius: 10, height: 44, width: 120, backgroundColor: Color.luckyKing, justifyContent: 'center', alignItems: 'center' }
})