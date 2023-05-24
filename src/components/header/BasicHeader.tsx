import { Icon, Image, Images } from "@assets"
import { Color, Style } from "@styles"
import { ScreenUtils } from "@utils"
import React, { useCallback } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IText } from "../texts"

interface ImageHeaderProps {
    navigation: any,
    title: string,
    rightAction?: any
}

export const BasicHeader = React.memo(({ navigation, title, rightAction }: ImageHeaderProps) => {

    const safeAreaInsets = useSafeAreaInsets();

    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <>
            <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={"transparent"} />
            <View style={[styles.headerContainer, { paddingTop: safeAreaInsets.top }]}>
                <TouchableOpacity style={{ flex: 1 }} onPress={onGoBack}>
                    <Icon.Button
                        size={'small'}
                        color={Color.black}
                        name="ic_back"
                        style={[Style.Space.Padding.Zero]}
                        onPressed={onGoBack}
                    />
                </TouchableOpacity>
                <IText style={styles.textTitle}>{title}</IText>
                <View style={{ flex: 1 }}>
                    {rightAction ? rightAction : <></>}
                </View>
            </View>
        </>
    )
})

const styles = StyleSheet.create({
    textTitle: { color: Color.black, fontWeight: 'bold', fontSize: 16, lineHeight: 30 },
    headerContainer: {
        flexDirection: 'row',
        // height: 40,
        height: ScreenUtils.getHeaderHeight() + 40,
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(160, 160, 160, 0.2)'
    }
})