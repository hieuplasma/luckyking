import { Icon, Image, Images } from "@assets"
import { Color, Style } from "@styles"
import React, { useCallback } from "react"
import { StyleSheet } from "react-native"
import { StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IText } from "../texts"

interface ImageHeaderProps {
    navigation: any,
    title: string
}

export const BasicHeader = React.memo(({ navigation, title }: ImageHeaderProps) => {

    const safeAreaInsets = useSafeAreaInsets();

    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <>
            <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={"transparent"} />
            <View style={[styles.headerContainer, { paddingTop: 0 }]}>
                <View style={{ flex: 1 }}>
                    <Icon.Button
                        size={'small'}
                        color={Color.black}
                        name="ic_back"
                        style={[Style.Space.Padding.Zero]}
                        onPressed={onGoBack}
                    />
                </View>
                <IText style={styles.textTitle}>{title}</IText>
                <View style={{ flex: 1 }} />
            </View>
        </>
    )
})

const styles = StyleSheet.create({
    textTitle: { color: Color.black, fontWeight: 'bold', fontSize: 16, lineHeight: 30 },
    headerContainer: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor:'rgba(160, 160, 160, 0.2)'
    }
})