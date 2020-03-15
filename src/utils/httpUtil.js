import axios from "axios";
import webConfig from "../views/webConfig";

class Http {
  constructor() {}

  async axiosGet(url, params) {
    axios.defaults.headers.common["Authorization"] =
      "token " + localStorage.getItem("token");
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

  async axiosPost(url, params) {
    axios.defaults.headers.common["Authorization"] =
      "token " + localStorage.getItem("token");
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
}

export default new Http();
