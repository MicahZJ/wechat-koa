import * as types from './mutation-types'

const mutations = {
  [types.SET_USERINFO](state, data) {
    state.userInfo = data;
  },

  [types.SET_TOKEN](state, data) {
    state.token = data
  },

  [types.SET_TOKEN_ERR](state, data) {
    state.token_err = data
  }
}

export default mutations