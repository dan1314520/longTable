/* 引入vuex */
import Vue from 'vue'
import Vuex from 'vuex'
/**
 * 引入模块
 * 1.getters
 * 2.modules
 * 3.插件 */
import getters from './getters'// 引入getters
import HandleLoaclStore from './plugin'// 数据持久化储存
// 引入modules
const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
// 挂载
Vue.use(Vuex)
const arr = ['tagsView', 'configOptions']// 不需要储存的模块
const plugin = new HandleLoaclStore(arr)
// 实例化
const store = new Vuex.Store({
  plugins: [plugin.Plugin], // 插件
  modules,
  getters
})
export default store
