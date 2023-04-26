import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomTabNavigator } from "./BottomTabNavigator";
import DrawerCustom from "./CustomDrawer";
import { RechargeNavigation } from "./drawer/RechargeNavigation";
import { UserNavigation } from "./drawer/UserNavigation";
import { WithDrawNavigation } from "./drawer/WithDrawNavigation";
import { HistoryKenoNavigation } from "./drawer/HistoryKenoNavigation";

export type MainDrawerParamList = {
    BottomTab: {}
    UserStack: {},
    RechargeStack: {},
    WithdrawStack: {},
    HistoryKenoStack: {}
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export function MainNavigation(props: any) {
    return (
        <Drawer.Navigator
            drawerContent={(props) => {
                return (
                    <DrawerCustom {...props} />
                )
            }}
            screenOptions={{ headerShown: false, drawerType: 'front' }}
        >
            <Drawer.Screen name={'BottomTab'} component={BottomTabNavigator} />
            <Drawer.Screen name={'UserStack'} component={UserNavigation} />
            <Drawer.Screen name={'RechargeStack'} component={RechargeNavigation} />
            <Drawer.Screen name={'WithdrawStack'} component={WithDrawNavigation} />
            <Drawer.Screen name={'HistoryKenoStack'} component={HistoryKenoNavigation} />
        </Drawer.Navigator>
    )
}