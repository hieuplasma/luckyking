import { ConsolasText, IText } from "@components";
import { Color } from "@styles";
import React from "react";
import { ColorValue } from "react-native";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";

interface GeneratedNumberProps {
    generated: string[],
    lottColor: ColorValue
}

export const GeneratedNumber = React.memo(({ generated, lottColor }: GeneratedNumberProps) => {
    return (
        <>
            <IText style={{ fontSize: 16, color: Color.blue, fontWeight: 'bold', marginTop: 5, alignSelf: 'center' }}>
                {`Các bộ số được tạo (${generated.length} bộ)`}
            </IText>
            <ScrollView style={styles.boxGenerated}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        generated.map((item: any, index: number) =>
                            <View key={index + ""} style={{ flexDirection: 'row' }}>
                                <ConsolasText style={[styles.textGenerated, { color: lottColor }]}>{item}</ConsolasText>
                                {
                                    lottColor == Color.max3d ?
                                        <></>
                                        : <View style={styles.lineContainer} >
                                            <View style={styles.line} />
                                        </View>
                                }
                            </View>
                        )
                    }
                </View>
            </ScrollView>

        </>
    )
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    boxGenerated: {
        height: 86, width: windowWidth - 32,
        borderRadius: 10, backgroundColor: '#F3F2F2',
        padding: 5
    },
    lineContainer: {
        height: 20, width: 1,
        alignSelf: 'center',
        alignItems: 'center', justifyContent: 'center'
    },
    line: {
        height: 11, width: 1,
        alignSelf: 'center', backgroundColor: '#B2AFAF',
        borderRadius: 10, marginBottom: 6
    },
    textGenerated: {
        fontSize: 16,
        marginHorizontal: 8, marginVertical: 5
    }
})