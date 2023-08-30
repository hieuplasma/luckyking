import { IText, ImageHeader } from '@components';
import { useBackButtonWithNavigation } from '@hooks';
import { LiveStackParamList } from '@navigation';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@styles';
import { printDraw, printDraw2 } from '@utils';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<LiveStackParamList, 'LiveScreen'>;
type NavigationRoute = RouteProp<LiveStackParamList, 'LiveScreen'>;

export interface LiveScreenParamsList { }

const iframestr = `<iframe width="100%" height="40%" src="https://www.youtube.com/embed/LNC6N5QGU9w?vq=hd1080&rel=0&fs=0&controls=0&disablekb=1" width="560" height="315" title="TRỰC TIẾP  KENO" frameborder="0"></iframe>`
export const LiveScreen = React.memo(() => {

  useBackButtonWithNavigation(
    React.useCallback(() => {
      return true;
    }, []),
  );
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();

  const kenoFirstDraw = useSelector((state: any) => state.drawReducer.kenoFirstDraw)

  const [ifr, setIfr] = useState(iframestr)
  const isFocused = useIsFocused()

  // useEffect(() => {
  //   if (isFocused) setIfr(iframestr)
  // }, [isFocused])

  return (
    <View style={styles.container}>
      <ImageHeader title={"Trực tiếp"} />
      {
        isFocused ?
          <WebView
            source={{ html: ifr }}
            style={{ width: '100%', height: '40%' }}
            allowsInlineMediaPlayback={true}
          >
            {/* {
              kenoFirstDraw ?
                <IText style={{ fontStyle: 'italic', color: Color.blue, fontSize: 16, marginTop: (windowHeight - 120) / 2, marginLeft: 4 }}>
                  {"Kỳ quay hiện tại: " + printDraw2(kenoFirstDraw)}
                </IText>
                : <></>
            } */}
          </WebView>
          : <></>
      }

    </View>
  )
});

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})