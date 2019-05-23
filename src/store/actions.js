import * as types from "./mutation-types";
import axios from "axios";
import webConfig from "../views/webConfig";

export const actionsSetdataInfo = ({ commit }, data) => {
  commit(types.SET_USERINFO, data);
};

export const loginToken = async ({ commit }, data) => {
  commit(types.SET_TOKEN, data);
};

export const login = ({commit}, data) => {
  return new Promise((resolve, reject) => {
    commit(types.SET_STATUS, 'loading')
    let url = webConfig.apiPath + "/api/login";
    let params = data
    axios
    .post(url, params)
    .then(res => {
      let resP = res.data
      if (resP.code === 200) {
        console.log('token', resP)
        localStorage.setItem('token', resP.data.loginToken)
        // axios.defaults.headers.common['Authorization'] = loginToken
        let token = Object.assign({}, resP.data.loginToken);
        commit(types.SET_TOKEN, token)
      }
      resolve(resP)
    })
    .catch(err => {
      commit(types.SET_TOKEN_ERR, 'err');
      localStorage.removeItem('token')
      reject(err)
    })
  });
};
