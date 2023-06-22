import { Icon, Image, Images } from "@assets"
import { Color, Style } from "@styles"
import React, { useCallback } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IText } from "../texts"

interface ImageHeaderProps {
    navigation?: any,
    title: string
}

export const ImageHeader = React.memo(({ navigation, title }: ImageHeaderProps) => {

    const safeAreaInsets = useSafeAreaInsets();

    const onGoBack = useCallback(() => {
        if (navigation)
            navigation.goBack();
    }, [navigation]);

    return (
        <>
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={"transparent"} />
            <Image source={Images.bg_header} style={[styles.headerContainer, { paddingTop: safeAreaInsets.top }]}>
                <TouchableOpacity style={{ flex: 1 }} onPress={onGoBack}>
                    {
                        navigation ?
                            <Icon.Button
                                size={'small'}
                                color={Color.white}
                                name="ic_back"
                                style={[Style.Space.Padding.Zero]}
                                onPressed={onGoBack}
                            /> : <></>
                    }
                </TouchableOpacity>
                <IText uppercase style={styles.textTitle}>{title}</IText>
                <View style={{ flex: 1 }} />
            </Image>
        </>
    )
})

const styles = StyleSheet.create({
    textTitle: { color: Color.white, fontWeight: 'bold', fontSize: 16, lineHeight: 20 },
    headerContainer: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    }
})