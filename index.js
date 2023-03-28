/**
 * @format
 */

import App from './App';
import {PureComponent} from 'react';
import {AppRegistry,LogBox} from 'react-native';
// import MainApplication from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

console.reportErrorsAsExceptions = false;

// export default class LuckyKing extends PureComponent {
//   render() {
//     return <MainApplication />;
//   }
// }

AppRegistry.registerComponent(appName, () => App);
