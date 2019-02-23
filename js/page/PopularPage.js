import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  RefreshControl
} from 'react-native';
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import PopularItem from '../common/PopularItem';
import actions from '../action/index';
import { connect } from 'react-redux';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars'; //按点赞数排序
const THEME_COLOR = 'red';

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
        screen: props => <PopularTabPage {...props} tabLabel={item} />, //传递参数
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
  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.storeName = tabLabel;
  }
  componentDidMount() {
    this.lodData();
  }
  lodData() {
    const { onLoadPopularData } = this.props;
    const url = this.genFetchUrl(this.storeName);
    onLoadPopularData(this.storeName, url);
  }
  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }
  renderItem(data) {
    const item = data.item;
    // return <PopularItem item={item} onSelect={() => {}} />;
    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={{ backgroundColor: '#faa' }}>{JSON.stringify(item)}</Text>
      </View>
    );
  }
  render() {
    const { popular } = this.props;
    let store = popular[this.storeName]; //动态获取state
    if (!store) {
      store = {
        items: [],
        isLoading: false
      };
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={store.items}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.lodData()}
              tintColor={THEME_COLOR}
            />
          }
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  popular: state.popular
});
const mapDispatchToProps = dispatch => ({
  onLoadPopularData: (storeName, url) =>
    dispatch(actions.onLoadPopularData(storeName, url))
});
const PopularTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularTab);

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
