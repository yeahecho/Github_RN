/**
 * 全局导航跳转工具类
 */
export default class NavigationUtil {
  /**
   * 返回上一页
   * @param  navigation
   */
  static resetToHomePage(navigation) {
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
