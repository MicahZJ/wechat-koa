import axios from "axios";
import webConfig from "../views/webConfig";

export function axiosGet(url, params) {
  url = webConfig.apiPath + url;

  return axios
    .get(url, params)
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(ERR => {
      alert(ERR);
      console.log("接口报错", ERR);
    });
}

export function axiosPost(url, params) {
  url = webConfig.apiPath + url;

  return axios
    .post(url, params)
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(ERR => {
      alert(ERR);
      console.log("接口报错", ERR);
    });
}
