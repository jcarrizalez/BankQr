/**
 * @format
 */

import {AppRegistry, ignoreWarnings } from './src/lib/react-native';
import App from './src/components/App';
import {name as appName} from './app.json';

ignoreWarnings();
AppRegistry.registerComponent(appName, () => App);
