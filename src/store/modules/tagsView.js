/**
  * @description: 标签导航
  * @author dyp
  * @param {visiableTags}   array  可视标签
  * @param {cachedViews}    array  缓存标签
  */
const tagsView = {
  state: {
    visiableTags: [],
    cachedViews: []
  },
  mutations: {
    SET_VISIABLE_TAGS: (state, view) => {
      if (state.visiableTags.some(v => v.path === view.path)) return
      state.visiableTags.push(view)
    },
    SET_CACHED_VIEWS: (state, view) => {
      if (state.cachedViews.includes(view.name)) return
      if (view.name) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISIABLE_TAGS: (state, view) => {
      for (const [i, v] of state.visiableTags.entries()) {
        if (v.path === view.path) {
          state.visiableTags.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_OTHERS_VISIABLE_TAGS: (state, view) => {
      for (const [i, v] of state.visiableTags.entries()) {
        if (v.path === view.path) {
          state.visiableTags = state.visiableTags.slice(i, i + 1)
          break
        }
      }
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, index + 1)
          break
        }
      }
    },
    DEL_ALL_VISIABLE_TAGS: state => {
      state.visiableTags = []
    },
    DEL_ALL_CACHED_VIEWS: state => {
      state.cachedViews = []
    },
    UPDATE_VISIABLE_TAGS: (state, view) => {
      for (let v of state.visiableTags) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  },
  actions: {
    addView ({ commit }, view) {
      commit('SET_VISIABLE_TAGS', view)
      commit('SET_CACHED_VIEWS', view)
    },
    delView ({ commit }, view) {
      commit('DEL_VISIABLE_TAGS', view)
      commit('DEL_CACHED_VIEW', view)
    },
    delCachedView ({ commit }, view) {
      commit('DEL_CACHED_VIEW', view)
    },
    delOthersViews ({ commit }, view) {
      commit('DEL_OTHERS_VISIABLE_TAGS', view)
      commit('DEL_OTHERS_CACHED_VIEWS', view)
    },
    delAllViews ({ commit }) {
      commit('DEL_ALL_VISIABLE_TAGS')
      commit('DEL_ALL_CACHED_VIEWS')
    },
    delAllCachedViews ({ commit }) {
      commit('DEL_ALL_CACHED_VIEWS')
    },
    updateVisitedView ({ commit }, view) {
      commit('UPDATE_VISIABLE_TAGS', view)
    }
  }
}
export default tagsView
