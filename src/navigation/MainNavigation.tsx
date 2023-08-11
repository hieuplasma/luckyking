import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomTabNavigator } from "./BottomTabNavigator";
import DrawerCustom from "./CustomDrawer";
import { RechargeNavigation } from "./drawer/RechargeNavigation";
import { UserNavigation } from "./drawer/UserNavigation";
import { WithDrawNavigation } from "./drawer/WithDrawNavigation";
import { HistoryKenoNavigation } from "./drawer/HistoryKenoNavigation";
import { HistoryBasicNavigation } from "./drawer/HistoryBasicNavigation";
import { useCallback, useEffect, useRef } from "react";
import { authApi, userApi } from "@api";
import messaging from '@react-native-firebase/messaging'
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from "react-redux";
import { NavigationUtils, doNotExits } from "@utils";
import { ScreenName } from "./ScreenName";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { InstructionNavigation, RootStackParamsList, SupportNavigation, TermsNavigation } from "@navigation";

import { AppState, PermissionsAndroid, Platform } from 'react-native';
import { updateToken, updateUser } from "@redux";

export type MainDrawerParamList = {
    BottomTab: {}
    UserStack: {},
    RechargeStack: {},
    WithdrawStack: {},
    HistoryKenoStack: {},
    HistoryBasicStack: {},
    SupportStack: {},
    TermsStack: {},
    InstructionStack: {}
};

type NavigationProp = StackNavigationProp<RootStackParamsList, 'Main'>;

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export function MainNavigation(props: any) {

    const navigation = useNavigation<NavigationProp>();

    const dispatch = useDispatch()

    const token = useSelector((state: any) => state.authReducer.accessToken)
    const phoneNumber = useSelector((state: any) => state.authReducer.phoneNumber)
    const password = useSelector((state: any) => state.authReducer.password)

    const checkApplicationPermission = async () => {
        if (Platform.OS == 'android') {
            const authorizationStatus = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        }
        else {
            const authorizationStatus = await messaging().requestPermission();
            if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
                console.log('User has notification permissions enabled.');
            } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
                console.log('User has provisional notification permissions.');
            } else {
                console.log('User has notification permissions disabled');
            }
        }
    }

    const getNewToken = useCallback(async () => {
        if (!doNotExits(token)) {
            const res = await authApi.login({
                phoneNumber: phoneNumber,
                password: password,
                deviceId: await DeviceInfo.getUniqueId()
            })

            if (res?.data?.accessToken) {
                dispatch(updateToken({ token: res.data.accessToken }))
            }
        }
    }, [doNotExits(token), phoneNumber, password])


    const registerFCM = useCallback(async () => {
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
                        deviceId: await DeviceInfo.getUniqueId(),
                        deviceToken: fcmToken
                    })
                    if (resFCM) {
                        console.log("regist FCM token success", fcmToken)
                    }
                }
            })
        // })
    }, [])

    useEffect(() => {
        if (!doNotExits(token)) {
            registerFCM()
            getNewToken()
        }
        else NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication)
    }, [doNotExits(token)])

    const syncBalance = useCallback(async () => {
        if (!doNotExits(token)) {
            const resBalance = await userApi.getBalance()
            if (resBalance) {
                dispatch(updateUser(resBalance.data))
            }
        }
    }, [doNotExits(token)])

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log("remoteMessage", remoteMessage)
            if (!doNotExits(token)) {
                const resBalance = await userApi.getBalance()
                if (resBalance) {
                    dispatch(updateUser(resBalance.data))
                }
            }
        });

        return unsubscribe
    }, [])

    const appState = useRef(AppState.currentState);
    let subscription: any
    useEffect(() => {
        subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                console.log('App has come to the foreground!');
                syncBalance()
            }

            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, [doNotExits(token)]);

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
            <Drawer.Screen name={'SupportStack'} component={SupportNavigation} />
            <Drawer.Screen name={'TermsStack'} component={TermsNavigation} />
            <Drawer.Screen name={'InstructionStack'} component={InstructionNavigation} />
        </Drawer.Navigator>
    )
}