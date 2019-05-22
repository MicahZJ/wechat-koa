import Vue from "vue";
import Vuex from "vuex";
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // 打印日志

Vue.use(Vuex);

// 设置只有在开发环境的时候才打印日志
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
	getters,
	state,
	mutations,
	strict: debug,
	plugins: debug ? [createLogger()] : []
});
