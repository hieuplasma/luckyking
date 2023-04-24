import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStackParamList, ScreenName } from '@navigation';
import { StatusBar, View, Text, Dimensions, StyleSheet, ScrollView, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { Icon, Image, Images } from '@assets';
import { Color } from '@styles';
import { useDispatch, useSelector } from 'react-redux';
import { lotteryApi } from '@api';
import { getCart, removeCart, removeLottery, updateLottery } from '@redux';
import { NavigationUtils, printMoney } from '@utils';
import { ConsolasText, IText, LogoIcon, ModalConfirm } from '@components';
import { RenderPowerMegaItem } from './RenderPowerMegaItem';
import { LotteryType, OrderMethod } from '@common';
import { RenderMax3dItem } from './RenderMax3dItem';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'CartScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'CartScreen'>;

export interface CartScreenParamsList { }

export const CartScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log("cart screen re-render")
    })

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
            total = total + item.amount
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
        if (cart.length == 0) return window.myalert.show({ title: "Giỏ hàng hiện đang trống rỗng!" })
        window.loadingIndicator.show()
        const res = await lotteryApi.emptyCart({})
        if (res) {
            dispatch(removeCart())
            Alert.alert("Đã làm trống giỏ hàng!")
            setCurrItem(null)
        }
        window.loadingIndicator.hide()
    }

    const openModalEmptyCart = useCallback(() => {
        if (cart.length == 0) return window.myalert.show({ title: "Giỏ hàng hiện đang trống rỗng!" })
        setModal3(true)
    }, [cart])

    const openModalDeleteLottery = (lottery: any) => {
        setCurrItem(lottery)
        setModal1(true)
    }

    const openModalDeleteNumber = (param: any) => {
        setCurrItem(param)
        setModal2(true)
    }

    const orderCart = useCallback(() => {
        let lotteryIds: string[] = []
        cart.map((item: any) => lotteryIds.push(item.id))
        const body = {
            method: OrderMethod.Keep,
            amount: calculateAll(),
            lotteryType: LotteryType.Cart,
            lotteryIds: lotteryIds
        }
        NavigationUtils.navigate(navigation, ScreenName.HomeChild.OrderScreen, { body: body })
    }, [cart])

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
                <IText style={styles.textTitle}>{"GIỎ HÀNG"}</IText>
                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={openModalEmptyCart} >
                    <Image source={Images.trash} style={{ width: 26, height: 26 }}></Image>
                </TouchableOpacity>
            </Image>

            {/* Body View */}
            <FlatList
                style={{ flex: 1, paddingHorizontal: 16 }}
                data={cart}
                renderItem={({ item, index }: any) => {
                    return (
                        item.type == LotteryType.Power || item.type == LotteryType.Mega ?
                            <RenderPowerMegaItem
                                item={item}
                                openModalDeleteLottery={() => openModalDeleteLottery(item)}
                            />
                            : <RenderMax3dItem
                                item={item}
                                openModalDeleteLottery={() => openModalDeleteLottery(item)}
                            />
                    )
                }}
                keyExtractor={(item, index) => String(item.id)}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListFooterComponent={<View style={{ height: 100 }}></View>}
                ListEmptyComponent={
                    <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <IText style={{ fontSize: 20, color: Color.luckyKing, fontWeight: 'bold' }}>{"Giỏ hàng hiện tại đang trống!"}</IText>
                    </View>}
            >
            </FlatList>
            {
                calculateAll() > 0 ?
                    <View style={{ marginBottom: 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 }}>
                        <IText style={{ fontSize: 14, fontWeight: '400' }}>{'Tổng cộng'}</IText>
                        <View style={{ flex: 1 }} />
                        <IText style={{ fontSize: 16, fontWeight: 'bold', marginRight: 16 }}>{`${printMoney(calculateAll())}đ`}</IText>
                        <TouchableOpacity style={styles.buttonPay} onPress={orderCart}>
                            <IText style={{ fontWeight: 'bold', fontSize: 14, color: Color.white }}>{'THANH TOÁN'}</IText>
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
    buttonPay: {
        borderRadius: 10,
        height: 44, width: 120,
        backgroundColor: Color.luckyKing,
        justifyContent: 'center', alignItems: 'center'
    }
})