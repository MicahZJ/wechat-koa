import * as types from './mutation-types';
import * as API from '../api/config'
import {axiosPost} from '../api/api'

export const actionsSetUserInfo = ({ commit, state }, userInfo) => {
  commit(types.SET_USERINFO, userInfo);
}

export const loginToken = async ({ commit, state }, data) => {
  let Api = API.login
      let requestData = {
        userEmail: data.username,
        passWord: data.pass
      };
  console.log('登录数据', requestData)
  let res = await axiosPost(Api, requestData)
  if (res.code === 200) {
    commit(types.SET_TOKEN, res.data);
    this.$router.push({
          path: "/homepage"
    })
  } else {
    commit(types.SET_TOKEN_ERR, res.data);
  }
}