import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomTabNavigator } from "./BottomTabNavigator";
import DrawerCustom from "./CustomDrawer";
import { RechargeNavigation } from "./drawer/RechargeNavigation";
import { UserNavigation } from "./drawer/UserNavigation";
import { WithDrawNavigation } from "./drawer/WithDrawNavigation";
import { HistoryKenoNavigation } from "./drawer/HistoryKenoNavigation";
import { HistoryBasicNavigation } from "./drawer/HistoryBasicNavigation";
import { useCallback } from "react";

export type MainDrawerParamList = {
    BottomTab: {}
    UserStack: {},
    RechargeStack: {},
    WithdrawStack: {},
    HistoryKenoStack: {},
    HistoryBasicStack: {}
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export function MainNavigation(props: any) {

    const renderCustom = useCallback((props: any) => {
        return (<DrawerCustom {...props} />)
    }, [])
    return (
        <Drawer.Navigator
            drawerContent={renderCustom}
            screenOptions={{ headerShown: false, drawerType: 'front' }}
        >
            <Drawer.Screen name={'BottomTab'} component={BottomTabNavigator} />
            <Drawer.Screen name={'UserStack'} component={UserNavigation} />
            <Drawer.Screen name={'RechargeStack'} component={RechargeNavigation} />
            <Drawer.Screen name={'WithdrawStack'} component={WithDrawNavigation} />
            <Drawer.Screen name={'HistoryKenoStack'} component={HistoryKenoNavigation} />
            <Drawer.Screen name={'HistoryBasicStack'} component={HistoryBasicNavigation} />
        </Drawer.Navigator>
    )
}