import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

interface Type {
    label: string,
    value: number
}

interface ChooseTypeSheetProps {
    isVisible?: boolean
    bottomSheetRef: any
    onOpen?: () => void
    onClose?: () => void
    onToggle: (data: number) => void,
    currentChoose: any,
    onChoose: (data: any) => void
}

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

export const ChooseTypeSheet = ({ isVisible, bottomSheetRef, onToggle, currentChoose, onChoose }: ChooseTypeSheetProps) => {

    const [currentType, setCurrentType] = useState(currentChoose)
    useEffect(() => {
        setCurrentType(currentChoose)
    }, [currentChoose, isVisible])

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        onToggle(index)
    }, []);

    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            BACKGROUND_OPACITY,
            [0, 1],
            [0, 1],
            Extrapolate.CLAMP
        ),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            styles.background,
            {
                backgroundColor: "#101010",
            },
            containerAnimatedStyle,
        ],
        [styles.background, containerAnimatedStyle]
    );

    const choosing = (type: any) => {
        onChoose(type)
        bottomSheetRef.current?.close();
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[SHEET_HEIGHT]}
            enablePanDownToClose={true}
            index={-1}
            backgroundStyle={styles.sheetContainer}
            backdropComponent={() => (
                isVisible ?
                    <Animated.View style={containerStyle}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={handleClose}>
                        </TouchableOpacity>
                    </Animated.View>
                    : null
            )}
            onChange={handleSheetChanges}
        >
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, color: Color.black, alignSelf: 'center', fontWeight: 'bold' }}>{"Chọn cách chơi"}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 50, paddingVertical: 6, flex: 1 }}>
                    {types.map((item: any, index: number) => {
                        return (
                            <TouchableOpacity activeOpacity={0.4} key={index} style={styles.item} onPress={() => setCurrentType(item)}>
                                {index % 2 == 1 ? <View style={{ flex: 1 }} /> : <></>}
                                <Image source={currentType.value == item.value ? Images.ball_power : Images.ball_grey} style={styles.ball}></Image>
                                <Text style={{ marginLeft: 12, width: 50 }}>{`${item.label}`}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <TouchableOpacity style={styles.confirmButton} onPress={() => choosing(currentType)}>
                    <Text style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 400
const BACKGROUND_OPACITY = 0.85

const styles = StyleSheet.create({
    sheetContainer: { backgroundColor: '#F4F4F4', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    background: {
        height: windowHeight, width: windowWidth,
        // backgroundColor: '#101010', opacity: BACKGROUND_OPACITY,
        position: 'absolute'
    },
    item: { alignItems: 'center', width: '50%', flexDirection: 'row', marginVertical: 6 },
    ball: {
        width: 26, height: 26
    },
    confirmButton: {
        margin: 16, backgroundColor: '#C38E32', borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        height: 44, width: windowWidth - 32
    },
    textConfirm: {
        color: Color.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})