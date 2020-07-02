// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css'
import './api/axios'
// 分页 , by dyp
import pagePagination from './components/pagination'
// 切换主题 ，  by dyp
import changeTheme from '@/assets/js/themeChange'
// 加载更多 by dyp
import loadmore from '@/components/load-more'
require('./mock')
Vue.directive('loadmore', loadmore)
// 文本复制
// 挂载组件
Vue.use(pagePagination)
Vue.use(Element, { size: store.getters.size })
Element.Dialog.props.closeOnClickModal.default = false
// 执行切换主题的方法，主题颜色取store中的值
changeTheme(store.getters.primaryColor)
Vue.config.productionTip = false
Vue.config.devtools = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
