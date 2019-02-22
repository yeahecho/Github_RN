import { AppRegistry } from 'react-native';
// import AppNavigator from './js/navigator/AppNavigator';
import App from './js/App';
// import WelcomePage from './js/page/WelcomePage';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
