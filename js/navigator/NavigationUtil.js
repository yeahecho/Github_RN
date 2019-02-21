/**
 * 全局导航跳转工具类
 */
export default class NavigationUtil {
  /**
   * 返回上一页
   * @param  params 要传递的参数
   * @param  page 要跳转的页面名（路由名）
   */
  static goPage(params, page) {
    const navigation = NavigationUtil.navigation;
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null');
      return;
    }
    navigation.navigate(page, { ...params });
  }
  /**
   * 返回上一页
   * @param  navigation
   */
  static goBack(navigation) {
    navigation.goBack();
  }
  /**
   * 返回首页
   * @param  navigation
   */
  static resetToHomePage(params) {
    const { navigation } = params;
    navigation.navigate('Main');
  }
}
