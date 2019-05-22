import * as types from './mutation-types';

export const actionsSetUserInfo = ({ commit, state }, userInfo) => {
  commit(types.SET_USERINFO, userInfo);
}