import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Animated, ScrollView, FlatList, TextInput } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from '@styles';
import { Image, Images } from '@assets'
import { IText } from '@components';
import customData from './bank.json';
import { doNotExits } from '@utils';

interface Props {
    onChoose: (data: any) => void,
}

const listBank = customData.data

const Wiget = forwardRef(({ onChoose }: Props, ref) => {

    const bottomSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
        openSheet: onOpen,
        closeSheet: onClose
    }));

    const choosing = (data: any) => {
        onClose()
        onChoose(data);
    }

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

    const [currentList, setCurrentList] = useState(listBank)

    const [filterText, setFilterText] = useState('')
    const onChangeText = useCallback((txt: string) => {
        setFilterText(txt)
        const chars = txt.toLowerCase().split('')
        setCurrentList(listBank.filter((param: any) => {
            if (doNotExits(txt)) return true
            for (const element of chars)
                if (!param.shortName.toLowerCase().includes(element)) return false
            return true
        }))
    }, [])

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
                <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
                    <IText style={{ fontSize: 18, color: Color.black, fontWeight: 'bold' }}>
                        {"Chọn "}

                    </IText>
                    <TextInput
                        style={{ fontSize: 18, color: Color.black, fontWeight: 'bold' }}
                        placeholder={"ngân hàng"}
                        value={filterText}
                        onChangeText={onChangeText}
                    />
                </View>

                <FlatList
                    style={{ marginTop: 8, flex: 1 }}
                    data={currentList}
                    extraData={currentList}
                    renderItem={({ item, index }: any) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: index % 2 == 0 ? Color.white : "#EFEEEC",
                                    paddingHorizontal: 16, alignItems: 'center', paddingVertical: 4
                                }}
                                onPress={() => choosing(item)}>
                                <Image style={{ width: 60, height: 45 }} source={{ uri: item.logo }} resizeMode='contain' />
                                <View style={{ marginLeft: 4, justifyContent: 'center', flex: 1 }}>
                                    <IText style={{ fontWeight: 'bold' }}>{`${item.shortName} (${item.code})`}</IText>
                                    <IText style={{ width: '100%' }}>{item.name}</IText>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item: any, index) => String(item.shortName)}
                    ListFooterComponent={<View style={{ height: 100 }}></View>}
                />
            </View>
        </BottomSheet>
    );
});

export const ChooseBankSheet = React.memo(Wiget);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SHEET_HEIGHT = 600
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
        margin: 16, backgroundColor: Color.power, borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        height: 44, width: windowWidth - 32
    },
    textConfirm: {
        color: Color.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})