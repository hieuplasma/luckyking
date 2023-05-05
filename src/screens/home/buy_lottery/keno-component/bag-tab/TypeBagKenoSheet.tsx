import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { IText } from '@components';

interface Type {
    label: string,
    value: number
}

interface ChooseTypeSheetProps {
    currentChoose: any,
    onChoose: (data: any) => void,
}

const bags = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const levels = [2, 3, 4, 5, 6, 7, 8, 9, 10]

const lottColor = Color.keno

const Wiget = forwardRef(({ currentChoose, onChoose }: ChooseTypeSheetProps, ref) => {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const [currentBag, setCurrentBag] = useState(-1)
    const [currentLevel, setCurrentLevel] = useState(-1)

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

    useEffect(() => {
        console.log('ChooseTypeSheet has been re-rendered ');
    });

    const choosing = () => {
        onClose()
        onChoose({ bag: currentBag, level: currentLevel });
    }

    const pickBag = useCallback((number: any) => {
        setCurrentBag(number)
        console.log(currentLevel)
        if (currentLevel >= number) setCurrentLevel(-1)
    }, [currentLevel])

    const pickLevel = useCallback((number: any) => {
        setCurrentLevel(number)
    }, [])

    const [opacity, setOpacity] = useState(new Animated.Value(0))
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
        }).start();
        bottomSheetRef.current?.close()
        setTimeout(() => {
            setIsOpen(false)
        }, 50);
    };

    const onOpen = () => {
        setIsOpen(true)
        setCurrentBag(currentChoose.bag)
        setCurrentLevel(currentChoose.level)
        bottomSheetRef.current?.expand()
        Animated.timing(opacity, {
            toValue: BACKGROUND_OPACITY,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const renderBackDrop = () => (
        <Animated.View
            style={[styles.background, { opacity: opacity }]}>
            <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={onClose}
            />
        </Animated.View>
    );

    const handleSheetAnimate = (from: number, to: number) => {
        if (to == -1) onClose()
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[SHEET_HEIGHT]}
            enablePanDownToClose={true}
            index={-1}
            backdropComponent={() => (
                isOpen ?
                    renderBackDrop()
                    : null
            )}
            onAnimate={handleSheetAnimate}
            backgroundStyle={styles.sheetContainer}
        >
            <View style={{ flex: 1 }}>
                <IText style={[styles.textBold, { alignSelf: 'center', }]}>
                    {"Chọn cách bao"}
                </IText>

                <View style={{ width: 280, marginTop: 10, flex: 1, alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <IText style={styles.textBold}>{"Chọn loại bao"}</IText>
                        <IText style={styles.textBold}>{"Chọn bậc chơi"}</IText>
                    </View>
                    <View style={styles.lineUnder} />

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1 }}>
                            {bags.map((item: number) => {
                                return (<PerBag
                                    item={item} key={item + ""} onPick={pickBag} check={item == currentBag ? true : false} />)
                            })}
                        </View>
                        <View style={styles.verticalLine} />
                        <View style={{ flex: 1 }}>
                            {levels.map((item: number) => {
                                return (<PerLevel
                                    key={item + ""}
                                    item={item}
                                    onPick={pickLevel}
                                    check={item == currentLevel ? true : false}
                                    posible={item < currentBag ? true : false}
                                />)
                            })}
                        </View>
                    </View>

                </View>

                <TouchableOpacity
                    style={[styles.confirmButton, { opacity: currentLevel == -1 ? 0.4 : 1 }]}
                    onPress={choosing}
                    disabled={currentLevel == -1 ? true : false}
                >
                    <IText style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</IText>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
});

export const TypeBagKenoSheet = React.memo(Wiget);

const PerBag = React.memo(({ item, onPick, check }: any) => {
    const handlePress = useCallback(() => {
        onPick(item)
    }, [item, onPick])
    return (
        <TouchableOpacity style={styles.perItem} onPress={handlePress} activeOpacity={0.7}>
            <Image source={check ? Images.ball_keno : Images.ball_grey} style={styles.ball} />
            <IText style={{ marginLeft: 8 }}>{`Bao ${item}`}</IText>
        </TouchableOpacity>
    )
})

const PerLevel = React.memo(({ item, onPick, check, posible }: any) => {
    const handlePress = useCallback(() => {
        onPick(item)
    }, [item, onPick])
    return (
        <TouchableOpacity
            style={[styles.perItem, { opacity: posible ? 1 : 0.5 }]}
            disabled={!posible}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Image source={check ? Images.ball_keno : Images.ball_grey} style={styles.ball} />
            <IText style={{ marginLeft: 8 }}>{`Bậc ${item}`}</IText>
        </TouchableOpacity>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 500
const BACKGROUND_OPACITY = 0.85

const styles = StyleSheet.create({
    sheetContainer: { backgroundColor: '#F4F4F4', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    background: {
        backgroundColor: '#000',
        position: 'absolute',
        top: -1000,
        left: 0,
        right: 0,
        bottom: 0,
    },
    item: { alignItems: 'center', width: '50%', flexDirection: 'row', marginVertical: 6 },
    ball: {
        width: 26, height: 26
    },
    confirmButton: {
        margin: 16, backgroundColor: lottColor, borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        height: 44, width: windowWidth - 32, marginBottom: 4
    },
    textConfirm: {
        color: Color.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    textBold: { fontSize: 18, color: Color.black, fontWeight: 'bold' },
    lineUnder: { width: '100%', height: 1, backgroundColor: '#E2E0E0', marginTop: 4 },
    verticalLine: {
        width: 1,
        height: '100%', backgroundColor: '#E2E0E0'
    },
    perItem: { flexDirection: 'row', marginBottom: 8, marginLeft: 32 }
})