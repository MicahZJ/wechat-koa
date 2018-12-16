import axios from "axios";
import webConfig from '../views/webConfig'

export function getLoginInfo (userInfo) {
  let url = webConfig.apiPath + '/api/login'
  let data = {
    userEmail: userInfo.userEmail,
    passWord: userInfo.passWord
  }
  
  console.log('数据2', data)
  return axios.post(url, {
    userEmail: userInfo.userEmail,
    passWord: userInfo.passWord
  })
    .then((res) => {
    return Promise.resolve (res.data)
    })
    .catch((ERR) => {
      console.log('登录报错', ERR)
    })
}
