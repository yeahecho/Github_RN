import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';

type Props = {};
export default class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.tabNames = [
      'Java',
      'Android',
      'iOS',
      'React',
      'React Navive',
      'Python'
    ];
  }
  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTab {...props} tabLabel={item} />, //传递参数
        navigationOptions: {
          title: item
        }
      };
    });
    return tabs;
  }
  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true, //是否支持选项卡滚动，默认false
          style: {
            backgroundColor: '#678' //TabBar 的背景色
          },
          indicatorStyle: styles.indicatorStyle, //标签指示器的样式
          labelStyle: styles.labelStyle //文字样式
        }
      })
    );
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <TabNavigator />
      </View>
    );
  }
}
class PopularTab extends Component<Props> {
  render() {
    const { tabLabel } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabLabel}</Text>
        <Text
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'DetailPage'
            );
          }}
        >
          跳转到详情页
        </Text>
        <Button
          title={'Fetch usage'}
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'FetchDemoPage'
            );
          }}
        />
        <Button
          title={'AsyncStorage usage'}
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'AsyncStorageDemoPage'
            );
          }}
        />
        <Button
          title={'DataStore usage离线缓存框架'}
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'DataStoreDemoPage'
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  tabStyle: {
    minWidth: 50
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  }
});
