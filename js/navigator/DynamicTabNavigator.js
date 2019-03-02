import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { DeviceInfo } from 'react-native';
import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtil from './NavigationUtil';
import { BottomTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';

const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={'md-trending-up'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'favorite'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我',
      tabBarIcon: ({ tintColor, focused }) => (
        <Entypo name={'user'} size={26} style={{ color: tintColor }} />
      )
    }
  }
};

type Props = {};
class DynamicTabNavigator extends Component<Props> {
  constructor(props) {
    super(props);
    console.disableYellowBox = true; //禁止警告弹框
  }

  _tabNavigator() {
    if (this.Tabs) {
      return this.Tabs;
    }
    const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS;
    const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }; //根据需要显示想要的tab

    PopularPage.navigationOptions.tabBarLabel = 'Popular'; //给底部标签改名
    return (this.Tabs = createBottomTabNavigator(tabs, {
      tabBarComponent: props => {
        return <TabBarComponent theme={this.props.theme} {...props} />;
      }
    }));
  }
  render() {
    const Tab = this._tabNavigator();
    const AppContainer = createAppContainer(Tab); // react-navigation 3.X以后要用createAppContainer(）包裹
    return <AppContainer />;
  }
}

class TabBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: this.props.activeTintColor,
      updateTime: new Date().getTime() //取标志位
    };
  }

  render() {
    // const { routes, index } = this.props.navigation.state;
    // if (routes[index].params) {
    //   const { theme } = routes[index].params;
    //   //以最新的更新时间为主，防止被其他tab之前的修改覆盖掉
    //   if (theme && theme.updateTime > this.theme.updateTime) {
    //     this.theme = theme;
    //   }
    // }
    return (
      <BottomTabBar
        {...this.props}
        // activeTintColor={this.theme.tintColor || this.props.activeTintColor}
        activeTintColor={this.props.theme}
      />
    );
  }
}
const mapStateToProps = state => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps)(DynamicTabNavigator);
