import * as types from "./mutation-types";

const mutations = {
  [types.SET_USERINFO](state, payload) {
    state.userInfo = payload;
  },

  [types.SET_TOKEN](state, payload) {
    state.token = payload;
  },

  [types.SET_TOKEN_ERR](state, payload) {
    state.token_err = payload;
  }
};

export default mutations;
