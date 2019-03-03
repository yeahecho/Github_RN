import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import FavoritePage from './FavoritePage';
import MyPage from './MyPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import actions from '../action';
import { BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import connect from 'react-redux/es/connect/connect';
import BackPressCompent from '../common/BackPressComponent';

type Props = {};
class HomePage extends Component<Props> {
  constructor(props) {
    super(props);
    this.backPress = new BackPressCompent({ backPress: this.onBackPress() });
  }

  componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.backPress.componentDidMount();
  }
  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.backPress.componentWillUnmount();
  }
  /**
   * 处理Android 中的物理返回键
   *
   * @returns {boolean}
   */
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.routes[1].index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(HomePage);
