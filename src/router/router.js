// 路由守卫
import router from '@/router'
import store from '@/store'
import {MessageBox} from 'element-ui'

/** 路由前置守卫
 * 1.判断路由是否需要登录权限--是 判断2;  否 next()
 * 2.判断用户是否登录--是 判断3;  否 去登录页面 next(login)
 * 3.判断账号是否是运营平台账号--是 next();  否 判断4（删）
 * 4.判断用户是否是认证通过状态--是 next();  否 判断5
 * 5.判断用户是否是去认证页面--是 next();  否 去认证页面 next(verification)
 */
router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) { // 判断该路由是否不需要登录权限
    next()
  } else if (isLogin() && isPass()) { // 判断用户是否是认证通过状态
    next()
  } else if (isLogin() && !isPass() && to.name === 'verification') { // 判断用户是否是去认证页面
    next()
  } else if (isLogin() && !isPass() && to.name !== 'verification') { // 判断用户是否是去认证页面
    const msg = ['您还未认证，无法使用此功能，是否现在认证',
      '您的信息正在审核中，无法使用此功能', '认证通过',
      '你的信息未通过认证，请重新提交认证']
    MessageBox.alert(msg[store.getters.user.state - 0], '认证', {
      confirmButtonText: '确定',
      callback: (action) => {
        next({name: 'verification'})
      }
    })
  } else { // 未登录
    next({
      path: '/login',
      query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }
})
const isLogin = () => store.getters.token
const isPass = () => store.getters.user.state === '2'
