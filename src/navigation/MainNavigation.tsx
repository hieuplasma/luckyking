import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomTabNavigator } from "./BottomTabNavigator";
import DrawerCustom from "./CustomDrawer";
import { RechargeNavigation } from "./drawer/RechargeNavigation";
import { UserNavigation } from "./drawer/UserNavigation";
import { WithDrawNavigation } from "./drawer/WithDrawNavigation";
import { HistoryKenoNavigation } from "./drawer/HistoryKenoNavigation";
import { HistoryBasicNavigation } from "./drawer/HistoryBasicNavigation";
import { useCallback, useEffect, useRef } from "react";
import { authApi, lotteryApi, userApi } from "@api";
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from "react-redux";
import { NavigationUtils, doNotExits } from "@utils";
import { ScreenName } from "./ScreenName";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { InstructionNavigation, RootStackParamsList, SupportNavigation, TermsNavigation } from "@navigation";

import { AppState, PermissionsAndroid, Platform } from 'react-native';
import { getKenoDraw, updateToken, updateUser } from "@redux";
import { LIST_STATUS, LotteryType, RemoteMessageType } from "@common";

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
    const kenoListDraw = useSelector((state: any) => state.drawReducer.kenoListDraw)

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

    useEffect(() => {
        // Assume a message-notification contains a "type" property in the data payload of the screen to open
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            navigateBackground(remoteMessage)
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    navigateBackground(remoteMessage)
                }
            });
    }, []);

    const navigateBackground = useCallback(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        if (remoteMessage.data?.type == RemoteMessageType.DETAIL_ORDER) {
            const res = await lotteryApi.getOrderById({ orderId: remoteMessage.data.orderId })
            if (res) {
                const order = res.data
                if (order.ticketType == 'basic') {
                    let status = 'pending'
                    if (LIST_STATUS.PRINTED.includes(order.status)) status = 'complete'
                    else if (LIST_STATUS.ERROR.includes(order.status)) status = 'returned'
                    NavigationUtils.navigate(navigation, ScreenName.Drawer.HistoryBasicStack, {
                        screen: ScreenName.Drawer.HistoryBasicScreen,
                        params: { navDetailOrder: { order: order, status: status } }
                    })
                }
                if (order.ticketType == 'keno') {
                    // let status = 'booked'
                    // if (LIST_STATUS.ERROR.includes(order.status)) status = 'returned'
                    NavigationUtils.navigate(navigation, ScreenName.Drawer.HistoryKenoStack, {
                        screen: ScreenName.Drawer.HistoryKenoScreen,
                        params: { navDetailOrder: { order: order } }
                    })
                }
            }
        }

        else if (remoteMessage.data?.type == RemoteMessageType.LUCKYKING_WALLET) {
            NavigationUtils.navigate(navigation, ScreenName.Drawer.RechargeStack, {
                screen: ScreenName.Drawer.RechargeScreen,
                params: { expandHistory: true }
            })
        }

        else if (remoteMessage.data?.type == RemoteMessageType.REWARD_WALLET) {
            NavigationUtils.navigate(navigation, ScreenName.Drawer.WithDrawStack, {
                screen: ScreenName.Drawer.WithDrawScreen,
                params: { expandHistory: true }
            })
        }

        else if (remoteMessage.data?.type == RemoteMessageType.RESULT_DRAW) {
            NavigationUtils.navigate(navigation, ScreenName.BottomTab, {
                screen: ScreenName.Tabs.ResultStack,
                params: {
                    screen: ScreenName.ResultChild.Result,
                    params: { tab: remoteMessage.data.lotteryType }
                }
            })
        }
    }, [])

    const syncBalance = useCallback(async () => {
        if (!doNotExits(token)) {
            const resBalance = await userApi.getBalance()
            if (resBalance) {
                dispatch(updateUser(resBalance.data))
            }
        }
        if (kenoListDraw.length <= 10) {
            lotteryApi.getScheduleKeno({ type: LotteryType.Keno, take: 40, skip: 0 })
                .then(listKeno => { if (listKeno?.data?.length > 0) dispatch(getKenoDraw(listKeno.data)) })
        }
    }, [doNotExits(token), kenoListDraw.length])

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