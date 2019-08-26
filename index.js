/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Ignore in-app yellow box warning
console.disableYellowBox = true;
// console.ignoredYellowBox = ['Warning: View.propTypes', 'Warning: BackAndroid'];

AppRegistry.registerComponent(appName, () => App);
