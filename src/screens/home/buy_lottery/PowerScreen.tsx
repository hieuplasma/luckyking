import { Images } from "@assets";
import { HomeStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Icon, Image } from "@assets";
import { Color, Dimension, Style } from "@styles";
import { ScreenUtils } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavigationProp = StackNavigationProp<HomeStackParamList, 'PowerScreen'>;
type NavigationRoute = RouteProp<HomeStackParamList, 'PowerScreen'>;

export interface PowerScreenParamsList { }

export interface PowerScreenProps { }

const types = [
    { label: "Bao 5", value: 5 }, //0
    { label: "Cơ bản", value: 6 }, //1
    { label: "Bao 7", value: 7 },//2
    { label: "Bao 8", value: 8 },//3
    { label: "Bao 9", value: 9 },//3
    { label: "Bao 10", value: 10 },//5
    { label: "Bao 11", value: 11 },//6
    { label: "Bao 12", value: 12 },//7
    { label: "Bao 13", value: 13 },//8
    { label: "Bao 14", value: 14 },//9
    { label: "Bao 15", value: 15 },//10
    { label: "Bao 16", value: 16 },//11
    { label: "Bao 17", value: 17 },//12
    { label: "Bao 18", value: 18 },//13
]

const initNumber = [
    [false, false, false, false, false, false], //  numberA:
    [false, false, false, false, false, false], //  numberB: 
    [false, false, false, false, false, false], //  numberC:
    [false, false, false, false, false, false], // numberD: 
    [false, false, false, false, false, false], //  numberE:
    [false, false, false, false, false, false] // numberF:
]

export const PowerScreen = React.memo((props: any) => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<NavigationRoute>();
    const safeAreaInsets = useSafeAreaInsets();

    const [typePlay, setType]: any = useState(types[13]);
    const [numberSet, setNumbers]: any = useState(initNumber)
    const [value, setValue] = useState(0)

    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const randomNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const currentLevel = typePlay.value
        const randomNumbers = new Set();
        while (randomNumbers.size < currentLevel) {
            const randomNumber = Math.floor(Math.random() * 55) + 1;
            let tmp: string = randomNumber + ''
            if (randomNumber < 10) tmp = '0' + randomNumber
            randomNumbers.add(tmp);
        }
        const resultArray = Array.from(randomNumbers);
        currentNumber[index] = resultArray
        setNumbers(currentNumber)
    }

    const deleteNumber = (index: number) => {
        const currentNumber = [...numberSet]
        const currentLevel = typePlay.value
        const resultArray = Array(currentLevel).fill(false);
        currentNumber[index] = resultArray
        setNumbers(currentNumber)
    }

    return (
        <View style={styles.container}>
            {/* //Header */}
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
            {/* //Body */}
            <View style={styles.body}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, color: Color.black }}>
                        {"Số dư tài khoản: "}
                    </Text>
                    <Text style={{ fontSize: 16, color: Color.luckyKing, fontWeight: 'bold' }}>
                        {"10.000.000"}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between' }}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.dropDown}>
                        <Text style={{ fontSize: 13, color: Color.black, lineHeight: 24 }}>{typePlay.label}</Text>
                        <Image source={Images.down_arrow} style={{ width: 12, height: 6 }}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.6} style={styles.dropDown}>
                        <Text style={{ fontSize: 13, color: Color.black, lineHeight: 24 }}>{'01/01/2025'}</Text>
                        <Image source={Images.down_arrow} style={{ width: 12, height: 6 }}></Image>
                    </TouchableOpacity>
                </View>
            </View>

            {/* //Chon so */}
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
                {numberSet.map((item: any, index: number) => {
                    return (
                        <View style={styles.lineNumber}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{String.fromCharCode(65 + index)}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 18, flexWrap: 'wrap' }}>
                                {item.map((number: any) => {
                                    return (
                                        <View style={styles.ballContainer}>
                                            <Image source={number ? Images.ball_power : Images.ball_grey} style={styles.ballStyle}>
                                                <Text style={{ color: Color.white }}>{number}</Text>
                                            </Image>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: 60, justifyContent: 'space-between' }}>
                                <Image source={Images.nofilled_heart} style={{ width: 22, height: 22, }}></Image>
                                {item[0] ?
                                    <TouchableOpacity onPress={() => deleteNumber(index)}>
                                        <Image source={Images.trash} style={{ width: 26, height: 26 }}></Image>
                                    </TouchableOpacity>
                                    : <TouchableOpacity onPress={() => randomNumber(index)}>
                                        <Image source={Images.refresh} style={{ width: 26, height: 26 }}></Image>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    )
                })}
            </ScrollView>

            {/* //Footer */}
            <View style={{ paddingHorizontal: 16, paddingBottom: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.buttonFooterUp} activeOpacity={0.6}>
                        <Image source={Images.filled_heart} style={{ width: 21, height: 19 }}></Image>
                        <Text style={styles.textFooterUp}>{"Yêu thích"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonFooterUp} activeOpacity={0.6}>
                        <Image source={Images.fast_pick} style={{ width: 19, height: 19 }}></Image>
                        <Text style={styles.textFooterUp}>{"Chọn nhanh"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonFooterUp} activeOpacity={0.6}>
                        <View style={{ width: 21, height: 21, borderRadius: 99, backgroundColor: Color.luckyKing, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, color: Color.white }}>TC</Text>
                        </View>
                        <Text style={styles.textFooterUp}>{"Tự chọn"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
                    <Text style={{ color: Color.black, fontSize: 16 }}>{"Giá vé tạm tính"}</Text>
                    <Text style={{ color: Color.luckyKing, fontSize: 16 }}>{`${value} đ`}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                    <TouchableOpacity style={[styles.buttonFooterDown, { backgroundColor: '#0171F5' }]} activeOpacity={0.6}>
                        <Icon.Default
                            size={'large'}
                            color={'white'}
                            name="ic_cart"
                            style={[Style.Space.Padding.Zero]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonFooterDown, { backgroundColor: '#C38E32' }]} activeOpacity={0.6}>
                        <Text style={{ color: Color.white, fontWeight: 'bold', fontSize: 16 }}>{"ĐẶT VÉ"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})

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
    body: {
        marginTop: 10,
        paddingHorizontal: 16
    },
    dropDown: {
        width: (windowWidth - 44) / 2, height: 36,
        borderRadius: 10, padding: 6, paddingHorizontal: 12,
        justifyContent: 'space-between',
        borderColor: Color.black, borderWidth: 1, flexDirection: 'row', alignItems: 'center'
    },
    lineNumber: {
        flexDirection: 'row', marginVertical: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ballContainer: { width: (windowWidth - 146) / 6, justifyContent: 'center', alignItems: 'center', marginVertical: 8 },
    ballStyle: {
        width: 28, height: 28, justifyContent: 'center', alignItems: 'center'
    },
    buttonFooterUp: {
        width: (windowWidth - 48) / 3, height: 32,
        borderRadius: 10, padding: 6,
        justifyContent: 'space-around', alignItems: 'center',
        borderColor: '#FFC42C', backgroundColor: '#FDF9F9',
        borderWidth: 1, flexDirection: 'row'
    },
    textFooterUp: { fontSize: 12, color: Color.luckyKing },
    buttonFooterDown: {
        width: (windowWidth - 36) / 2, height: 44,
        borderRadius: 10, padding: 6,
        justifyContent: 'space-around', alignItems: 'center',
        borderColor: '#FFC42C', backgroundColor: '#FDF9F9',
        borderWidth: 1
    },
})