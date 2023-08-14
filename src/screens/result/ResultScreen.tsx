import { IText, ImageHeader } from '@components';
import { ResultStackParamList } from '@navigation';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import Animated from 'react-native-reanimated';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LotteryType } from '@common';
import { Color } from '@styles';
import { useBackButtonWithNavigation } from '@hooks';

type NavigationProp = StackNavigationProp<ResultStackParamList, 'Result'>;
type NavigationRoute = RouteProp<ResultStackParamList, 'Result'>;

export interface ResultScreenParamsList { tab: LotteryType }

const list_type = [
  {
    type: [[LotteryType.Keno]],
    title: "Keno"
  },
  {
    type: [[LotteryType.Mega]],
    title: "Mega"
  },
  {
    type: [[LotteryType.Power]],
    title: "Power"
  },
  {
    type: [LotteryType.Max3D, LotteryType.Max3DPlus],
    title: "Max3D/3D+"
  },
  {
    type: [LotteryType.Max3DPro],
    title: "Max3DPro"
  }
]

const ResultKenoTab = React.lazy(() => import('./result_tabs/ResultKenoTab'));
const ResultMegaTab = React.lazy(() => import('./result_tabs/ResultMegaTab'));
const ResultPowerTab = React.lazy(() => import('./result_tabs/ResultPowerTab'));
const ResultMax3dTab = React.lazy(() => import('./result_tabs/ResultMax3dTab'));
const ResultMax3dProTab = React.lazy(() => import('./result_tabs/ResultMax3dProTab'));

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

export const ResultScreen = () => {

  useBackButtonWithNavigation(
    React.useCallback(() => {
      return true;
    }, []),
  );

  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const pagerRef = useRef<PagerView>(null)

  const [currentPage, setCurrentPage] = useState(0)
  const [renderedPages, setRenderedPages] = useState<number[]>([]);

  const setPage = useCallback((page: number) => {
    pagerRef.current?.setPage(page)
    setCurrentPage(page)
  }, [])

  const onPageSelected = useCallback((e: any) => {
    const position = e.nativeEvent.position
    setCurrentPage(position)
    if (!renderedPages.includes(position)) {
      setRenderedPages([...renderedPages, position]);
    }
  }, [renderedPages])

  useEffect(() => {
    if (route?.params?.tab && isFocused) {
      const tab = route.params.tab
      if (tab == LotteryType.Keno) setPage(0)
      else if (tab == LotteryType.Mega) setPage(1)
      else if (tab == LotteryType.Power) setPage (2)
      else if (tab == LotteryType.Max3D || tab == LotteryType.Max3DPlus) setPage(3)
      else if (tab == LotteryType.Max3DPro) setPage(4)
    }
  }, [route?.params?.tab, isFocused])

  return (
    <View style={styles.container}>
      <ImageHeader title={"Kết quả"} />

      <View style={styles.body}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
          {
            list_type.map((item, index) => {
              const check = currentPage == index ? true : false
              return (
                <IText key={index} onPress={() => setPage(index)}
                  style={[
                    { fontSize: 15 },
                    { textDecorationLine: check ? 'underline' : 'none' },
                    { color: check ? Color.luckyKing : Color.black }
                  ]}>{item.title}</IText>
              )
            })
          }
        </View>

        <AnimatedPager
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={onPageSelected}
        >
          {renderedPages.includes(0) ? <ResultKenoTab key={LotteryType.Keno} navigation={navigation} /> : <View key={LotteryType.Keno}></View>}
          {renderedPages.includes(1) ? <ResultMegaTab key={LotteryType.Mega} navigation={navigation} /> : <View key={LotteryType.Mega}></View>}
          {renderedPages.includes(2) ? <ResultPowerTab key={LotteryType.Power} navigation={navigation} /> : <View key={LotteryType.Power}></View>}
          {renderedPages.includes(3) ? <ResultMax3dTab key={LotteryType.Max3D} navigation={navigation} /> : <View key={LotteryType.Max3D}></View>}
          {renderedPages.includes(4) ? <ResultMax3dProTab key={LotteryType.Max3DPro} navigation={navigation} /> : <View key={LotteryType.Max3DPro}></View>}
        </AnimatedPager>
      </View>
    </View >
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Color.white
  },
  body: {
    flex: 1, padding: 10
  },
  pagerView: {
    flex: 1
  }
})

