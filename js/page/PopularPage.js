import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
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
import { DeviceInfo } from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import PopularItem from '../common/PopularItem';
import actions from '../action/index';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import FavoriteDao from '../expand/dao/FavoriteDao';
import { FLAG_STORAGE } from '../expand/dao/DataStore';
import FavoriteUtil from '../util/FavoriteUtil';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars'; //按点赞数排序
const THEME_COLOR = '#678';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

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
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    };
    let navigationBar = (
      <NavigationBar
        title={'最热'}
        statusBar={statusBar}
        style={{ backgroundColor: THEME_COLOR }}
      />
    );
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true, //是否支持选项卡滚动，默认false
          style: {
            backgroundColor: '#678', //TabBar 的背景色
            height: 30 //fix 开启scrollEnabled后再Android上初次加载时闪烁问题
          },
          indicatorStyle: styles.indicatorStyle, //标签指示器的样式
          labelStyle: styles.labelStyle //文字样式
        }
      })
    );
    return (
      <View
        style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0 }}
      >
        {navigationBar}
        <TabNavigator />
      </View>
    );
  }
}
const pageSize = 10; //设为常量，防止修改
class PopularTab extends Component<Props> {
  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.storeName = tabLabel;
  }
  componentDidMount() {
    this.loadData();
  }
  loadData(loadMore) {
    const { onRefreshPopular, onLoadMorePopular } = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMorePopular(
        this.storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        favoriteDao,
        callBack => {
          this.refs.toast.show('没有更多了');
        }
      );
    } else {
      onRefreshPopular(this.storeName, url, pageSize, favoriteDao);
    }
  }
  /**
   * 获取与当前页面有关的数据
   * @return {*}
   * @private
   */
  _store() {
    const { popular } = this.props;
    let store = popular[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [], //要显示的数据
        hideLoadingMore: true //默认隐藏加载更多
      };
    }
    return store;
  }
  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }
  renderItem(data) {
    const item = data.item;
    return (
      <PopularItem
        projectModel={item}
        onSelect={() => {
          NavigationUtil.goPage(
            {
              projectModel: item
            },
            'DetailPage'
          );
        }}
        onFavorite={(item, isFavorite) =>
          FavoriteUtil.onFavorite(
            favoriteDao,
            item,
            isFavorite,
            FLAG_STORAGE.flag_popular
          )
        }
      />
    );
    // return (
    //   <View style={{ marginBottom: 10 }}>
    //     <Text style={{ backgroundColor: '#faa' }}>{JSON.stringify(item)}</Text>
    //   </View>
    // );
  }
  genIndicator() {
    return this._store().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>正在加载更多</Text>
      </View>
    );
  }
  render() {
    let store = this._store();
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={THEME_COLOR}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            setTimeout(() => {
              if (this.canLoadMore) {
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true;
            console.log('-----onMomentumScrollBegin-----');
          }}
        />
        <Toast ref={'toast'} position={'center'} />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  popular: state.popular
});
const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url, pageSize, favoriteDao) =>
    dispatch(actions.onRefreshPopular(storeName, url, pageSize, favoriteDao)),
  onLoadMorePopular: (
    storeName,
    pageIndex,
    pageSize,
    items,
    favoriteDao,
    callBack
  ) =>
    dispatch(
      actions.onLoadMorePopular(
        storeName,
        pageIndex,
        pageSize,
        items,
        favoriteDao,
        callBack
      )
    )
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
    // minWidth: 50,
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});
