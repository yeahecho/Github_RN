import Types from '../../action/types';

const defaltState = {
  theme: 'blue'
};
export default function onAction(state = defaltState, action) {
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
}
