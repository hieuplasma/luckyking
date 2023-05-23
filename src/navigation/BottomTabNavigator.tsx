import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
   StatisticalScreen,
} from '@screen';
import { Label, LineSeparator, translate } from '@shared';
import { Icon } from '@assets'
import { Color, Dimension, Style } from '@styles';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenName } from './ScreenName';
import { LiveNavigation } from './tab/LiveNavigation';
import { HomeNavigation } from './tab/HomeNavigation';
import { ResultNavigation } from './tab/ResultNavigation';
import { ScanNavigation } from './tab/ScanNavigation';

type MainBottomTabParamList = {
  HomeStack: {};
  LiveStack: {};
  ResultStack: {};
  ScanStack: {};
  StatisticalStack: {};
};

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

const getTabBarIcon = (args?: {
  activeIconName: string;
  inactiveIconName: string;
  focused: boolean;
  title: string;
}) => {
  return (
    <View style={[Style.Content.CenterInParent, Style.Background.White]}>
      <Icon.Default
        name={args?.focused ? args?.activeIconName : args?.inactiveIconName}
        size={Dimension.tabIcon}
        color={args?.focused ? Color.orange : Color.tabInActive}
        style={[Style.Space.Padding.Zero]}
      />
      {getTabBarLabel(args?.title, args?.focused)}
    </View>
  );
};

const getTabBarLabel = (label?: string, focused?: boolean) => {
  return (
    <Label.Static
      numberOfLines={1}
      ellipsizeMode="tail"
      style={[
        focused ? Style.Label.Tab.active : Style.Label.Tab.inActive,
        { color: focused ? Color.orange : Color.tabInActive },
        Style.Space.MarginTop.tiny_4,
      ]}
      autoTranslate={false}>
      {label}
    </Label.Static>
  );
};

const TabBar = (props: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const renderTabsComponent = () => {
    const state = props.state;
    const descriptors = props.descriptors;
    const navigation = props?.navigation;
    const focusedName = props?.state?.routes[props?.state?.index]?.name ?? 'Home';

    if (props?.state?.routeNames?.includes(focusedName) === false) {
      return null;
    } else {
      return (
        <View
          style={[
            Style.Size.FlexRow,
            Style.Background.White,
            Style.Space.PaddingTop.small_8,
            {
              paddingBottom: insets.bottom / 2 + Dimension.smallMargin,
            },
          ]}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation?.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation?.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={`tab-${index}`}
                activeOpacity={1}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[Style.Size.MatchParent]}>
                {options?.tabBarIcon?.({
                  focused: state.index === index,
                  color: Color.orange,
                  size: Dimension.content,
                })}
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
  };

  return (
    <>
      <LineSeparator />
      {renderTabsComponent()}
    </>
  );
};

const hideTabBar = [
  ScreenName.HomeChild.KenoScreen,
  ScreenName.HomeChild.PowerScreen,
  ScreenName.HomeChild.MegaScreen,
  ScreenName.HomeChild.Max3dScreen,
  ScreenName.HomeChild.Max3dProScreen,
  ScreenName.HomeChild.CartScreen,
  ScreenName.HomeChild.OrderScreen,

  ScreenName.Drawer.RechargeStack,

  ScreenName.ResultChild.DetailKeno,
  ScreenName.ResultChild.DetailMega,
  ScreenName.ResultChild.DetailPower,
  ScreenName.ResultChild.DetailMax3d,

  ScreenName.ScanChild.ScanResult
]

export function BottomTabNavigator() {
  const insets = useSafeAreaInsets();

  const renderTabbar = useCallback((props: any) => {
    const index = props.navigation.getState().index
    const routeName = getFocusedRouteNameFromRoute(props.state.routes[index]) ?? ""
    console.log("current screen::::" + index + ":::::=> " + routeName)
    return hideTabBar.includes(routeName) ? null : <TabBar {...props} />
  }, [])

  return (
    <BottomTab.Navigator
      initialRouteName={'HomeStack'}
      tabBar={renderTabbar}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'none',
          height: 64 + insets.bottom,
          ...Style.Background.PrimaryBackground,
          ...Style.Content.CenterInVertical,
        }
      }}>
      <BottomTab.Screen
        name='LiveStack'
        component={LiveNavigation}
        options={{
          tabBarIcon: ({ focused }) =>
            getTabBarIcon({
              title: translate('tab.live'),
              activeIconName: 'ic_live',
              inactiveIconName: 'ic_live',
              focused,
            }),
        }}
      />
      <BottomTab.Screen
        name='ResultStack'
        component={ResultNavigation}
        options={{
          tabBarIcon: ({ focused }) =>
            getTabBarIcon({
              title: translate('tab.result'),
              activeIconName: 'ic_result',
              inactiveIconName: 'ic_result',
              focused,
            }),
        }}
      />
      <BottomTab.Screen
        name='HomeStack'
        component={HomeNavigation}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) =>
            getTabBarIcon({
              title: translate('tab.home'),
              activeIconName: 'ic_home',
              inactiveIconName: 'ic_home',
              focused,
            }),
        })}
      />
      <BottomTab.Screen
        name='ScanStack'
        component={ScanNavigation}
        options={{
          tabBarIcon: ({ focused }) =>
            getTabBarIcon({
              title: translate('tab.scan'),
              activeIconName: 'ic_scan',
              inactiveIconName: 'ic_scan',
              focused,
            }),
        }}
      />
      <BottomTab.Screen
        name='StatisticalStack'
        component={StatisticalScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            getTabBarIcon({
              title: translate('tab.statistical'),
              activeIconName: 'ic_statistical',
              inactiveIconName: 'ic_statistical',
              focused,
            }),
        }}
      />
    </BottomTab.Navigator>
  );
}
