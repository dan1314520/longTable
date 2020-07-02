import router from '@/router'
import store from '@/store'
import { MessageBox } from 'element-ui'
// 跳转路由
export const toPath = (p) => {
  store.dispatch('delCachedView', p).then(() => {
    router.replace({
      path: '/redirect/' + p.name,
      query: p.query
    })
  })
}
// 去登录
export const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
// 退出
export const layout = (message) => {
  // 退出提示
  MessageBox.confirm(
    message,
    '退出登录',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      // 清除登录信息
      sessionStorage.removeItem('store')
      store.dispatch('layOut')
      store.dispatch('delAllViews')
      // 去登录页面
      toLogin()
    })
    .catch(() => {})
}
// 去404页面
export const to404Page = () => {
  router.push('/404')
}
