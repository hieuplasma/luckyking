import { Icon, Image, Images } from "@assets"
import { Color, Style } from "@styles"
import React, { useCallback, useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IText } from "../texts"
import _ from "lodash"

interface ImageHeaderProps {
    navigation?: any,
    title?: string
}

export const ImageHeader = React.memo(({ navigation, title }: ImageHeaderProps) => {

    const safeAreaInsets = useSafeAreaInsets();

    const [block, setBlock] = useState(false)
    const onGoBack = useCallback(() => {
        if (!block && navigation) {
            navigation.goBack()
            setBlock(true)
        }
    }, [navigation]);

    return (
        <>
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={"transparent"} />
            <Image source={Images.bg_header} style={[styles.headerContainer, { paddingTop: safeAreaInsets.top }]}>
                {title ?
                    <>
                        <TouchableOpacity style={{ flex: 1, flexDirection:'row', alignItems:'center'}} onPress={onGoBack}>
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
                        <IText uppercase style={[styles.textTitle]}>{title}</IText>
                        <View style={{ flex: 1, marginTop: safeAreaInsets.top }} />
                    </>
                    : <></>}
            </Image>
        </>
    )
})

const styles = StyleSheet.create({
    textTitle: { color: Color.white, fontWeight: 'bold', fontSize: 16, lineHeight: 24 },
    headerContainer: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    }
})