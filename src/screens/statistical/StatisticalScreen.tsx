import { LotteryType } from '@common';
import { IText, ImageHeader } from '@components';
import { useBackButtonWithNavigation } from '@hooks';
import { ScreenName, StatisticalStackParamList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import PagerView from 'react-native-pager-view';
// import Animated from 'react-native-reanimated';
import { Image, Images } from '@assets';
import { NavigationUtils, getColorLott } from '@utils';
import { Color } from '@styles';

type NavigationProp = StackNavigationProp<StatisticalStackParamList, 'Statistical'>;
type NavigationRoute = RouteProp<StatisticalStackParamList, 'Statistical'>;

export interface StatisticalScreenParamsList { }

const list_type = [
  {
    type: [LotteryType.Keno],
    title: "Keno",
    logo: Images.keno_logo
  },
  {
    type: [LotteryType.Mega],
    title: "Mega",
    logo: Images.mega_logo
  },
  {
    type: [LotteryType.Power],
    title: "Power",
    logo: Images.power_logo
  },
  {
    type: [LotteryType.Max3D, LotteryType.Max3DPlus],
    title: "Max3D/3D+",
    logo: Images.max3d_logo
  },
  {
    type: [LotteryType.Max3DPro],
    title: "Max3DPro",
    logo: Images.max3dpro_logo
  }
]

// const StatisticalKenoTab = React.lazy(() => import('./statustical_tabs/StatisticalKenoTab'));
// const StatisticalMegaTab = React.lazy(() => import('./statustical_tabs/StatisticalMegaTab'));
// const StatisticalPowerTab = React.lazy(() => import('./statustical_tabs/StatisticalPowerTab'));
// const StatisticalMax3DTab = React.lazy(() => import('./statustical_tabs/StatisticalMax3DTab'));
// const StatisticalMax3DProTab = React.lazy(() => import('./statustical_tabs/StatisticalMax3DProTab'));

// const AnimatedPager = Animated.createAnimatedComponent(PagerView);

export const StatisticalScreen = React.memo(() => {

  useBackButtonWithNavigation(
    React.useCallback(() => {
      return true;
    }, []),
  );

  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NavigationRoute>();
  const safeAreaInsets = useSafeAreaInsets();

  // const pagerRef = useRef<PagerView>(null)

  // const [currentPage, setCurrentPage] = useState(0)
  // const [renderedPages, setRenderedPages] = useState<number[]>([]);

  // const setPage = useCallback((page: number) => {
  //   pagerRef.current?.setPage(page)
  //   setCurrentPage(page)
  // }, [])

  // const onPageSelected = useCallback((e: any) => {
  //   const position = e.nativeEvent.position
  //   setCurrentPage(position)
  //   if (!renderedPages.includes(position)) {
  //     setRenderedPages([...renderedPages, position]);
  //   }
  // }, [renderedPages])

  const navigateTo = useCallback((type: LotteryType) => {
    let destination = ScreenName.StatisticalChild.StatisticalKeno
    NavigationUtils.navigate(navigation, destination)
  }, [navigation])

  return (
    <View style={styles.container}>
      <ImageHeader title={"Thống kê"} />

      <ScrollView style={styles.body}>
        <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
          {/* {
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
          } */}
          {
            list_type.map(item => {
              return (
                <TouchableOpacity style={styles.borderItem} key={item.title} onPress={() => navigateTo(item.type[0])}>
                  <Image source={item.logo} style={{ width: '100%', height: 60 }} resizeMode='contain' />
                  <IText style={{ fontWeight: 'bold', fontSize: 20, marginTop: 16, color: getColorLott(item.type[0]) }}>{item.title}</IText>
                  <IText style={{ color: Color.blue, marginTop: 12, textAlign: 'center', fontStyle: 'italic' }}>
                    {"Nhấn để xem thống kê"}
                  </IText>
                </TouchableOpacity>
              )
            })
          }
        </View>

        {/* <AnimatedPager
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
        </AnimatedPager> */}
      </ScrollView>
    </View>
  )
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1, padding: 12, paddingHorizontal: 6
  },
  pagerView: {
    flex: 1
  },
  borderItem: {
    width: (windowWidth - 36) / 2,
    height: (windowWidth - 36) / 2,
    marginHorizontal: 6,

    // shadow
    shadowOffset: { width: 6, height: 5 },
    shadowRadius: 15,
    shadowColor: '#EC6C3C',
    shadowOpacity: 0.2,
    elevation: 3,
    // borderWidth: 1,
    borderColor: '#A0A0A0',
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: 'white',

    justifyContent: 'center', alignItems: 'center'
  },
})