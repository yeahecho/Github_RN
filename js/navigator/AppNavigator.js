import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createNavigationContainer,
  createAppContainer
} from 'react-navigation';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null //隐藏顶部navigationbar
    }
  }
});
const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null //隐藏navigationbar
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: null //隐藏navigationbar
    }
  }
});

const AppNavigator = createSwitchNavigator(
  {
    Init: InitNavigator,
    Main: MainNavigator
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

// const AppContainer = createAppContainer(AppNavigator);
// // const AppContainer = createAppContainer(InitNavigator);

// export default AppContainer;

export default createAppContainer(
  createSwitchNavigator(
    {
      Init: InitNavigator,
      Main: MainNavigator
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  )
);
