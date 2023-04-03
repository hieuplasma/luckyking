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
import { printDraw } from '@utils';

interface ChooseTypeSheetProps {
    isVisible?: boolean
    bottomSheetRef: any
    onOpen?: () => void
    onClose?: () => void
    onToggle: (data: number) => void,
    currentChoose: any,
    onChoose: (data: any) => void,
    listDraw: any
}

export const ChooseDrawSheet = React.memo(({ isVisible, bottomSheetRef, onToggle, currentChoose, onChoose, listDraw }: ChooseTypeSheetProps) => {

    const [currentDraw, setCurrentDraw] = useState(currentChoose)
    useEffect(() => {
        setCurrentDraw(currentChoose)
    }, [isVisible])

    const handleClose = () => {
        setCurrentDraw(currentChoose)
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
                <Text style={{ fontSize: 18, color: Color.black, alignSelf: 'center', fontWeight: 'bold' }}>{"Chọn kì quay"}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 6, flex: 1 }}>
                    {listDraw.map((item: any, index: number) => {
                        return (
                            <TouchableOpacity activeOpacity={0.4} key={index} style={styles.item} onPress={() => setCurrentDraw(item)}>
                                <Image source={item.drawCode == currentDraw.drawCode ? Images.checked_box : Images.check_box} style={{ width: 24, height: 24 }}></Image>
                                <Text style={{ fontSize: 14, marginLeft: 18, color: Color.black }}>
                                    {`${printDraw(item)}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <TouchableOpacity style={styles.confirmButton} onPress={() => choosing(currentDraw)}>
                    <Text style={styles.textConfirm}>{`Xác nhận`.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 415
const BACKGROUND_OPACITY = 0.85

const styles = StyleSheet.create({
    sheetContainer: { backgroundColor: '#F4F4F4', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    background: {
        height: windowHeight, width: windowWidth,
        // backgroundColor: '#101010', opacity: BACKGROUND_OPACITY,
        position: 'absolute'
    },
    item: { alignItems: 'center', width: '100%', flexDirection: 'row', marginVertical: 6 },
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