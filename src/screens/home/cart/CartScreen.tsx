import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStackParamList } from '@navigation';
import { StatusBar, View, Text, Dimensions, StyleSheet, ScrollView, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useState } from 'react';
import { Icon, Image, Images } from '@assets';
import { Color } from '@styles';
import { useDispatch, useSelector } from 'react-redux';
import { lotteryApi } from '@api';
import { getCart, removeCart, removeLottery, updateLottery } from '@redux';
import { getColorLott, printDraw, printDrawCode, printMoney, printNumber, printTypePlay, printWeekDate } from '@utils';
import { LotteryType, NumberDetail } from '@common';
import { LogoIcon, ModalConfirm } from '@components';

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

    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)

    const [currItem, setCurrItem]: any = useState(null)

    const deleteLottety = async (id: string) => {
        window.loadingIndicator.show()
        const res = await lotteryApi.deleteItemCart({ lotteryId: id })
        if (res) {
            dispatch(removeLottery({ lotteryId: id }))
            Alert.alert("Đã xoá vé thành công!")
            setCurrItem(null)
        }
        window.loadingIndicator.hide()
    }

    const deleteNumber = async (id: string, index: number, lotteryId: string) => {
        window.loadingIndicator.show()
        const res = await lotteryApi.deleteNumberLottery({ numberId: id, position: index })
        if (res) {
            dispatch(updateLottery({ lotteryId: lotteryId, number: res.data }))
            Alert.alert("Đã xoá bộ số thành công!")
            setCurrItem(null)
        }
        window.loadingIndicator.hide()
    }

    const deleteAll = async () => {
        window.loadingIndicator.show()
        const res = await lotteryApi.emptyCart({})
        if (res) {
            dispatch(removeCart())
            Alert.alert("Đã làm trống giỏ hàng!")
            setCurrItem(null)
        }
        window.loadingIndicator.hide()
    }


    const openModalDeleteLottery = (lottery: any) => {
        setCurrItem(lottery)
        setModal1(true)
    }

    const openModalDeleteNumber = (param: any) => {
        setCurrItem(param)
        setModal2(true)
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
                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={() => setModal3(true)} >
                    <Image source={Images.trash} style={{ width: 26, height: 26 }}></Image>
                </TouchableOpacity>
            </Image>

            {/* Body View */}
            <FlatList
                style={{ flex: 1, paddingHorizontal: 16 }}
                data={cart}
                renderItem={({ item, index }: any) => {
                    const numberDetail: NumberDetail[] = JSON.parse(item.NumberLottery.numberDetail.toString())
                    const lottColor = getColorLott(item.type)
                    return (
                        <View style={styles.borderItem}>
                            <LogoIcon type={item.type}/>
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
                                                                    <View key={number + '' + id2} style={[styles.ball, {backgroundColor: lottColor}]}>
                                                                        <Text style={styles.textBall}>
                                                                            {`${printNumber(number)}`}
                                                                        </Text>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                    {/* <TouchableOpacity onPress={() => {
                                                        openModalDeleteNumber({
                                                            lotteryId: item.id,
                                                            id: item.NumberLottery.id,
                                                            indexLott: index,
                                                            indexNum: id,
                                                            type: item.type
                                                        })
                                                    }}>
                                                        <Image source={Images.trash} style={styles.iconTrash}></Image>
                                                    </TouchableOpacity> */}
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
                                <Text style={{ color: lottColor, marginLeft: 12, fontSize: 14, fontWeight: 'bold' }}>
                                    {`${printMoney(item.bets)}đ`}
                                </Text>
                                <View style={{ flex: 1 }} />
                                <TouchableOpacity onPress={() => openModalDeleteLottery(item)}>
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

            {/* Modal xoa ve */}
            <ModalConfirm
                visible={modal1}
                message={`Bạn có muốn xoá vé ${currItem?.type} này không?`}
                onConfirm={() => {
                    setModal1(false)
                    deleteLottety(currItem.id)
                }}
                onCancel={() => setModal1(false)}
            />

            {/* Modal xoa bo so */}
            {/* <ModalConfirm
                visible={modal2}
                message={`Bạn có muốn xoá bộ vé ${String.fromCharCode(65 + currItem?.indexNum)} loại hình ${currItem?.type} của vé ${printNumber(currItem?.indexLott + 1)} không?`}
                onConfirm={() => {
                    setModal2(false)
                    deleteNumber(currItem?.id, currItem?.indexNum, currItem?.lotteryId)
                }}
                onCancel={() => setModal2(false)}
            /> */}

            {/* Modal Empty Cart */}
            <ModalConfirm
                visible={modal3}
                message={`Bạn có muốn xóa tất cả vé trong giỏ hàng không?`}
                onConfirm={() => {
                    setModal3(false)
                    deleteAll()
                }}
                onCancel={() => setModal3(false)}
            />

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