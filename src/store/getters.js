const getters = {
  collapse: (state) => state.app.collapse,
  size: (state) => state.app.size,
  theme: (state) => state.app.theme,
  primaryColor: (state) => state.app.primaryColor,
  visiableTags: (state) => state.tagsView.visiableTags,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => (isLogin(state) ? state.login.user.token : ''),
  user: (state) => state.login.user,
  layout: (state) => state.login.layout,
  memberId: (state) => (isLogin(state) ? state.login.user.memberId : ''),
  userType: (state) => (state.login.user === null ? undefined : state.login.user.userType),
  role: (state) => (state.login.user ? ['货主', '承运商', '司机', '收货人', '操作员', '运营服务商', '产品服务商'][state.login.user.userType] : '')
}
export default getters
const isLogin = (state) => state.login.user && state.login.user.token
