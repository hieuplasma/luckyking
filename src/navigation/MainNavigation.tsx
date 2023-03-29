import { HomeNavigation, RootStackParamsList, LiveNavigation } from '@navigation';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer, RouteProp, useRoute } from '@react-navigation/native';
import { ResultScreen, ScanScreen, StatisticalScreen } from '@screen';
import { Icon, Label, LineSeparator, translate } from '@shared';
import { Color, Dimension, Style } from '@styles';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DrawerCustom from './CustomDrawer';

export type MainBottomTabParamList = {
  Home: {};
  Live: {};
  Result: {};
  Scan: {};
  Statistical: {};
};

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();
const Drawer = createDrawerNavigator();

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
type NavigationRoute = RouteProp<RootStackParamsList, 'Main'>;
function BottonTabNavigator() {
  const insets = useSafeAreaInsets();
  const route = useRoute<NavigationRoute>();
  return (
    <>
      <BottomTab.Navigator
        initialRouteName={'Home'}
        tabBar={props => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 64 + insets.bottom,
            ...Style.Background.PrimaryBackground,
            ...Style.Content.CenterInVertical,
          },
        }}>
        <BottomTab.Screen
          name="Live"
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
          name="Result"
          component={ResultScreen}
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
          name="Home"
          component={HomeNavigation}
          options={{
            tabBarIcon: ({ focused }) =>
              getTabBarIcon({
                title: translate('tab.home'),
                activeIconName: 'ic_home',
                inactiveIconName: 'ic_home',
                focused,
              }),
          }}
        />
        <BottomTab.Screen
          name="Scan"
          component={ScanScreen}
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
          name="Statistical"
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
    </>
  );
}

export function MainNavigation(props: any) {

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerCustom {...props} />}
      screenOptions={{ headerShown: false, drawerType: 'front' }}
    >
      <Drawer.Screen name="BottomTabb" component={BottonTabNavigator} />
    </Drawer.Navigator>
  )
}

export const TabBar = (props: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const renderTabsComponent = () => {
    const state = props.state;
    const descriptors = props.descriptors;
    const navigation = props?.navigation;
    const focusedName =
      props?.state?.routes[props?.state?.index]?.name ?? 'Home';

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
