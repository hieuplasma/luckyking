import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStackParamList, ScreenName } from '@navigation';
import { StatusBar, View, Dimensions, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon, Image, Images } from '@assets';
import { Color } from '@styles';
import { NavigationUtils, getLotteryName, printMoney } from '@utils';
import { IText, ModalAlert, ModalConfirm } from '@components';
import { DELAY_SCREEN, LotteryType } from '@common';
import { PowerMegaItem } from './component/PowerMegaItem';
import { Max3dItem } from './component/Max3dItem';
import { KenoItem } from './component/KenoItem';
import { ChooseDrawKeno } from '../buy_lottery/keno-component/simple-tab/ChooseDrawKeno';
import { ChooseDrawSheet } from '../buy_lottery/component/ChooseDrawSheet';
import { useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'ReorderScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'ReorderScreen'>;

export interface ReorderScreenParamsList { lotteries: any[], ticketType: string }

export const ReorderScreen = React.memo(() => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const [list, setList] = useState(route.params?.lotteries)
    const [showBottomSheet, setShowBottomSheet] = useState(false)

    const chooseDrawRef: any = useRef(null);

    useEffect(() => {
        setList(route.params?.lotteries)
    }, [route.params?.lotteries])

    useEffect(() => {
        window.loadingIndicator.show()
        const timer = setTimeout(() => {
            window.loadingIndicator.hide()
            setShowBottomSheet(true);
        }, DELAY_SCREEN); // change delay as needed
        return () => clearTimeout(timer);
    }, []);

    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const calculateAll = useCallback(() => {
        let total = 0
        list.map((item: any) => {
            total = total + item.amount * (item.drawSelected?.length ? item.drawSelected?.length : 1)
        })
        return total
    }, [list])

    const deleteLottery = useCallback((index: number) => {
        let newList = [...list]
        newList.splice(index, 1)
        setList(newList)
        if (newList.length == 0) navigation.goBack()
    }, [list, navigation])

    const [refObj, setRefObj] = useState<any>({})
    const openDrawSheet = useCallback((
        drawSelected: any[],
        onChangeDraw: (draw: any) => void,
        listDraw: any[],
        type: LotteryType
    ) => {
        setRefObj({ drawSelected, onChangeDraw, listDraw, type })
    }, [])
    const renderDrawSheet = useCallback(() => {
        if (route?.params?.ticketType == 'basic')
            return (
                <ChooseDrawSheet
                    ref={chooseDrawRef}
                    currentChoose={refObj.drawSelected}
                    onChoose={refObj.onChangeDraw}
                    listDraw={refObj.listDraw}
                    type={refObj.type}
                />
            )
        else return (
            <ChooseDrawKeno
                ref={chooseDrawRef}
                currentChoose={refObj.drawSelected}
                onChoose={refObj.onChangeDraw}
            // listDraw={refObj.listDraw}
            // type={refObj.type}
            />
        )
    }, [chooseDrawRef, refObj, route?.params?.ticketType])
    useEffect(() => {
        chooseDrawRef.current?.openSheet()
    }, [renderDrawSheet])

    const onPickedDraw = useCallback((drawSelected: any[], index: number) => {
        let newList = [...list]
        newList[index].drawSelected = drawSelected
        setList(newList)
    }, [list])

    const reorder = useCallback(() => {
        const body = {
            lotteryType: route?.params?.ticketType,
            ticketType: route?.params?.ticketType,
            lotteries: list,
            amount: calculateAll(),
            orderType: 'reorder'
        }
        navigation.navigate('OrderScreen', { body })
    }, [list, route?.params?.ticketType])

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={"transparent"} />
            <Image source={Images.bg_header} style={[styles.headerContainer, { paddingTop: safeAreaInsets.top }]}>
                <TouchableOpacity style={{ flex: 1 }} onPress={onGoBack}>
                    <Icon.Button
                        size={'small'}
                        color={Color.white}
                        name="ic_back"
                        style={{ paddingHorizontal: 0 }}
                        onPressed={onGoBack}
                    />
                </TouchableOpacity>
                <IText style={styles.textTitle}>{"ĐẶT LẠI ĐƠN"}</IText>
                <View style={{ flex: 1 }} />
            </Image>

            {/* Body View */}
            <FlatList
                style={{ flex: 1, paddingHorizontal: 16 }}
                data={list}
                extraData={list}
                renderItem={({ item, index }: any) => {
                    return (
                        item.type == LotteryType.Power || item.type == LotteryType.Mega ?
                            <PowerMegaItem
                                item={item}
                                deleteLottery={() => deleteLottery(index)}
                                changeDraw={openDrawSheet}
                                init={index == 0 ? true : false}
                                onPickedDraw={(drawSlected) => onPickedDraw(drawSlected, index)}
                            />
                            : item.type == LotteryType.Keno ?
                                <KenoItem
                                    item={item}
                                    deleteLottery={() => deleteLottery(index)}
                                    changeDraw={openDrawSheet}
                                    init={index == 0 ? true : false}
                                    onPickedDraw={(drawSlected) => onPickedDraw(drawSlected, index)}
                                />
                                : < Max3dItem
                                    item={item}
                                    deleteLottery={() => deleteLottery(index)}
                                    changeDraw={openDrawSheet}
                                    init={index == 0 ? true : false}
                                    onPickedDraw={(drawSlected) => onPickedDraw(drawSlected, index)}
                                />
                    )
                }}
                keyExtractor={(item, index) => String(item.id)}
                ListFooterComponent={<View style={{ height: 100 }}></View>}
            >
            </FlatList>
            {
                calculateAll() > 0 ?
                    <View style={{ marginBottom: 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 }}>
                        <IText style={{ fontSize: 14, fontWeight: '400' }}>{'Tổng cộng'}</IText>
                        <View style={{ flex: 1 }} />
                        <IText style={{ fontSize: 16, fontWeight: 'bold', marginRight: 16 }}>{`${printMoney(calculateAll())}đ`}</IText>
                        <TouchableOpacity style={styles.buttonPay} onPress={reorder}>
                            <IText style={{ fontWeight: 'bold', fontSize: 14, color: Color.white }}>{'THANH TOÁN'}</IText>
                        </TouchableOpacity>
                    </View>
                    : <></>
            }

            {
                showBottomSheet && refObj.listDraw ?
                    renderDrawSheet()
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
    buttonPay: {
        borderRadius: 10,
        height: 44, width: 120,
        backgroundColor: Color.luckyKing,
        justifyContent: 'center', alignItems: 'center'
    }
})