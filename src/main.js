import Vue from "vue";
import App from "./App.vue";
import Http from "./utils/httpUtil";
import axios from "axios";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

Vue.config.productionTip = false;
Vue.prototype.$Axios = axios;
Vue.prototype.$Http = Http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
