/* vuex 数据持久化储存 ，在每一次mutation时把state存入 sessionStorage ，在刷新时从本地储存中获取state并替换 */
// const handleStore = (store) => {
//   if (sessionStorage.store) {
//     const state = JSON.parse(sessionStorage.store)
//     state.tagsView = store.state.tagsView
//     state.configOptions = store.state.configOptions
//     store.replaceState(state)
//   } // 初始化store
//   store.subscribe((mutation, state) => {
//     const obj = JSON.parse(JSON.stringify(state))
//     delete obj.tagsView
//     delete obj.configOptions
//     sessionStorage.setItem('store', JSON.stringify(obj))
//   })
// }
/**
 * @description  vuex 数据持久化储存
 * @param {Array} arr 不需要持久化储存的模块名
 * */
const HandleLoaclStore = function (arr) {
  this.arr = arr
  this.Plugin = (store) => {
    if (sessionStorage.store) {
      const state = JSON.parse(sessionStorage.store)
      arr.forEach((key) => {
        state[key] = store.state[key]
      })
      store.replaceState(state)
    } // 初始化store
    store.subscribe((mutation, state) => {
      const obj = JSON.parse(JSON.stringify(state))
      arr.forEach((key) => {
        delete obj[key]
      })
      sessionStorage.setItem('store', JSON.stringify(obj))
    })
  }
}
export default HandleLoaclStore
