import { LotteryType } from '@common';
import { IText, ImageHeader } from '@components';
import { useBackButtonWithNavigation } from '@hooks';
import { StatisticalStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import Animated from 'react-native-reanimated';
import { Color } from '@styles';

type NavigationProp = StackNavigationProp<StatisticalStackParamList, 'Statistical'>;
type NavigationRoute = RouteProp<StatisticalStackParamList, 'Statistical'>;

export interface StatisticalScreenParamsList { }

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

const StatisticalKenoTab = React.lazy(() => import('./statustical_tabs/StatisticalKenoTab'));
const StatisticalMegaTab = React.lazy(() => import('./statustical_tabs/StatisticalMegaTab'));
const StatisticalPowerTab = React.lazy(() => import('./statustical_tabs/StatisticalPowerTab'));
const StatisticalMax3DTab = React.lazy(() => import('./statustical_tabs/StatisticalMax3DTab'));
const StatisticalMax3DProTab = React.lazy(() => import('./statustical_tabs/StatisticalMax3DProTab'));

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

export const StatisticalScreen = React.memo(() => {

  useBackButtonWithNavigation(
    React.useCallback(() => {
      return true;
    }, []),
  );

  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();

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


  return (
    <View style={styles.container}>
      <ImageHeader title={"Thống kê"} />

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
          {renderedPages.includes(0) ? <StatisticalKenoTab key={LotteryType.Keno} navigation={navigation} /> : <View key={LotteryType.Keno}></View>}
          {renderedPages.includes(1) ? <StatisticalMegaTab key={LotteryType.Mega} navigation={navigation} /> : <View key={LotteryType.Mega}></View>}
          {renderedPages.includes(2) ? <StatisticalPowerTab key={LotteryType.Power} navigation={navigation} /> : <View key={LotteryType.Power}></View>}
          {renderedPages.includes(3) ? <StatisticalMax3DTab key={LotteryType.Max3D} navigation={navigation} /> : <View key={LotteryType.Max3D}></View>}
          {renderedPages.includes(4) ? <StatisticalMax3DProTab key={LotteryType.Max3DPro} navigation={navigation} /> : <View key={LotteryType.Max3DPro}></View>}
        </AnimatedPager>
      </View>
    </View>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1, padding: 10
  },
  pagerView: {
    flex: 1
  }
})