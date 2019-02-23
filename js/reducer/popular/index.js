import Types from '../../action/types';

const defaultState = {};
/**
 *  popular:{
 *    java:{
 *      items[],
 *      isLoading:false
 *      },
 *    iOS:{
 *      items[],
 *      isLoading:false
 * }
 * }
 * 0.state树，横向扩展
 * 1.如何动态的设置store，和动态获取store（难点：storekey不固定）
 * @param
 * @param {*} action
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.LOAD_POPULAR_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName], //action树真正包含的
          items: action.items,
          isLoading: false
        }
      };
    case Types.POPULAR_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName], //action树真正包含的
          isLoading: true
        }
      };
    case Types.LOAD_POPULAR_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName], //action树真正包含的
          isLoading: false
        }
      };
    default:
      return state;
  }
}
