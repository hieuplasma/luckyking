/**
 * @format
 */

import App from './App';
import { PureComponent } from 'react';
import { AppRegistry, LogBox } from 'react-native';
// import MainApplication from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreLogs(['Warning: ...', 'Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.`']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
console.reportErrorsAsExceptions = false;

// export default class LuckyKing extends PureComponent {
//   render() {
//     return <MainApplication />;
//   }
// }

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
