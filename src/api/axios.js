import axios from 'axios'
// 设置请求超时的时间
axios.defaults.timeout = 10000
// 设置header
axios.defaults.headers.post['Content-Type'] = 'application/json'

/** axios
 * @description 对axios的一些封装
 * @author dyp
 * 1，环境变化
 * 2，请求拦截
 * 3，响应拦截
 * 4，get和post请求
 */
/** get
 *  @module  get请求封装
 *  @description get方法，对应get请求
 *  @author dyp
 *  @param {String} url [请求的url地址]
 *  @param {Object} params [请求时携带的参数] {params:params}
 */
export const get = (url, params) => new Promise((resolve, reject) => {
  axios.get(url, { params })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err.data)
    })
})
/** post
 * @module post请求封装
 * @description post方法，对应post请求
 * @author dyp
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const post = (url, params = {}) => new Promise((resolve, reject) => {
  console.log('pst', url)
  axios.post(url, params)
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err.data)
    })
})

/* request
 * @description axios请求封装
 * @author dyp
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} responseType [返回的数据类型]
 * */
export const request = (url, params, responseType, method = 'get') => new Promise((resolve, reject) => {
  axios({
    method,
    url,
    data: params,
    responseType
  }).then((res) => {
    resolve(res)
  })
    .catch((err) => {
      reject(err)
    })
})
