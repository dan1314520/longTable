/** @module app
 * @description: 整个项目公用数据，与模块无关的其他数据
 * @author dyp
 * @param  {boolean} isTopbar   是否是顶部菜单（用于切换菜单的布局是顶部还是左边）
 * @param  {boolean} collapse   是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
 * @param  {string}  device     设备的类型，可用宽度在1200px以下切换为移动端类型mobile，1200以上pc端类型desktop
 * @param  {string}  size       字体大小（mini,small，medium，default）
 * @param  {number}  theme      主题
 * @param  {string}  primaryColor    替换elementUI的主题颜色
 * @param  {number}  clientHeight   列表最大默认高度
 */
const app = {
  state: {
    isTopbar: false,
    collapse: false,
    device: 'desktop',
    size: 'mini',
    theme: 1,
    primaryColor: '#4076FF',
    clientHeight: 960
  },
  mutations: {
    SET_CLIENT_HEIGHT: (state, v) => {
      state.clientHeight = v
    },
    SET_IS_TOPBAR: (state, isTopbar) => {
      state.isTopbar = isTopbar
    },
    SET_COLLAPSE: (state, collapse) => {
      state.isTopbar = collapse
    },
    TAGGLE_IS_TOPBAR: (state) => {
      state.isTopbar = !state.isTopbar
    },
    TAGGLE_COLLAPSE: (state) => {
      state.collapse = !state.collapse
    },
    SET_DEVICE: (state, device) => {
      state.device = device
    },
    SET_SIZE: (state, size) => {
      state.size = size
    },
    SET_THEME: (state, theme) => {
      state.theme = theme
    },
    SET_PRIMARY_COLOR: (state, color) => {
      state.primaryColor = color
    }
  },
  actions: {
    setIsTopbar ({ commit }, isTopbar) {
      commit('SET_IS_TOPBAR', isTopbar)
    },
    taggleIsTopbar ({ commit }) {
      commit('TAGGLE_IS_TOPBAR')
    },
    setCollapse ({ commit }, collapse) {
      commit('SET_COLLAPSE', collapse)
    },
    taggleCollapse ({ commit }) {
      commit('TAGGLE_COLLAPSE')
    },
    set_device ({ commit }, device) {
      commit('SET_DEVICE', device)
    },
    setSize ({ commit }, size) {
      commit('SET_SIZE', size)
    },
    setTheme ({ commit }, theme) {
      commit('SET_THEME', theme)
    },
    setPrimaryColor ({ commit }, color) {
      commit('SET_PRIMARY_COLOR', color)
    },
    getClientHeight ({ commit }) {
      const sh = document.body.clientHeight // 可用区域
      const defaultH = 20
      const titleTabH = getH('title-tab', true) // tab
      const headH = getH('el-header', false) // header
      const searchH = getH('page-search', false) // 查询条件
      const tagH = getH('tagview', false) // 标签
      const btnH = getH('page-buttons', false) // 列表上方操作按钮
      const pageH = getH('page-pagination', false) // 分页
      const pageTitleH = getH('page-title', false)
      // console.log('titleTabH:', titleTabH)
      // console.log('headH:', headH)
      // console.log('searchH:', searchH)
      // console.log('tagH:', tagH)
      // console.log('btnH:', btnH)
      // console.log('pageH:', pageH)
      // console.log('pageTitleH:', pageTitleH)
      // console.log(sh - titleTabH - searchH - btnH - pageH - headH - tagH - defaultH - pageTitleH)
      commit('SET_CLIENT_HEIGHT', sh - titleTabH - searchH - btnH - pageH - headH - tagH - defaultH - pageTitleH)
    }
  }
}
export default app
const getH = (name, isId) => {
  let dom
  if (isId) {
    dom = document.getElementById(name)
  } else {
    [dom] = document.getElementsByClassName(name)
  }
  return dom ? dom.clientHeight : 0
}
