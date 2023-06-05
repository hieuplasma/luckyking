import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomTabNavigator } from "./BottomTabNavigator";
import DrawerCustom from "./CustomDrawer";
import { RechargeNavigation } from "./drawer/RechargeNavigation";
import { UserNavigation } from "./drawer/UserNavigation";
import { WithDrawNavigation } from "./drawer/WithDrawNavigation";
import { HistoryKenoNavigation } from "./drawer/HistoryKenoNavigation";
import { HistoryBasicNavigation } from "./drawer/HistoryBasicNavigation";
import { useCallback, useEffect } from "react";
import { userApi } from "@api";
import messaging from '@react-native-firebase/messaging'
import auth from '@react-native-firebase/auth'
import DeviceInfo from 'react-native-device-info';
import { useSelector } from "react-redux";
import { doNotExits } from "@utils";

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

    const token = useSelector((state: any) => state.authReducer.accessToken)

    const checkApplicationPermission = async () => {
        const authorizationStatus = await messaging().requestPermission();

        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            console.log('User has notification permissions enabled.');

        } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
            console.log('User has provisional notification permissions.');
        } else {
            console.log('User has notification permissions disabled');
        }
    }

    useEffect(() => {
        const registerFCM = async () => {
            if (!messaging().isDeviceRegisteredForRemoteMessages) {
                await messaging().registerDeviceForRemoteMessages();
            }
            // const firebaseToken = await userApi.getFirebaseToken()
            // if (firebaseToken) {
            // await auth().signInWithCustomToken(firebaseToken.data).then(async (res) => {
            await checkApplicationPermission()
            await messaging()
                .hasPermission()
                .then(async (enabled) => {
                    if (enabled) {
                        const fcmToken = await messaging().getToken()
                        const resFCM = await userApi.updateFCMToken({
                            deviceId: DeviceInfo.getDeviceId(),
                            deviceToken: fcmToken
                        })
                        if (resFCM) {
                            console.log("regist FCM token success", fcmToken)
                        }
                    }
                })
            // })
        }
        //     else {
        //         // Alert.alert("Lỗi không xác định!")
        //     }
        // }
        if (!doNotExits(token)) registerFCM()
    }, [token])

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