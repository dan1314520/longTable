// 1.获取地址栏参数
// 2.获取静态资源地址，生产和开发环境通用。（怕地址出错以防万一）
// 3.日期格式化
// 4.距离格式化

/** 1.获取地址栏参数
 * @description ： 获取地址栏参数
 * @author ： dyp
 * @param {name} string 获取参数的名称
 */
export const GetQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/** 2.获取打包后的资源地址
 *  @description 获取打包后的资源地址
 *  @author dyp
 *  @param null
 */
export const urlParse = () => {
  const url = window.location
  // const path = url.pathname
  let str
  if (url.port) {
    str = 'http://' + url.hostname + ':' + url.port
  } else {
    str = 'http://' + url.hostname
  }
  return str
}

/** 3.日期格式化
 *  @description 日期格式化
 *  @author hxy
 *  @param {string} fmt 格式
 */
export const dateFormat = (date, str = 'yyyy-MM-dd') => {
  if (date === '' || date === null || undefined === date) {
    return null
  }
  const o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  }
  let format = str
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  }

  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length))
    }
  })
  return format
}

/** 4.距离格式化
 *  @description 距离格式化，大于1千米的按1km计数，小于1千米安米计数
 *  @author dyp
 *  @param {number} distance 距离
 */
export const distanceToStr = (distance) => {
  if (!distance) {
    return ''
  } else if (distance < 1000) {
    return distance + 'm'
  } else if (distance >= 1000 && distance < 100000) {
    return (distance / 1000.0).toFixed(1) + 'km'
  } else if (distance > 100000) {
    return (distance / 1000.0).toFixed(0) + 'km'
  }
  return ''
}
/**
 * @description 5.下载
 * @export const downLoad
 * @author dyp
 * @param {string} url //下载地址
 * @param {string} fileName //文件名
 * @param {string} type //文件名类型-后缀
 */
export const downLoad = (url, fileName, type) => {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const name = `${fileName}${type ? '.' + type : ''}`
  link.setAttribute('download', `${name}`)
  document.body.appendChild(link)
  link.click()
}
