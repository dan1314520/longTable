// el-form的验证一系列
// 1-名字验证（2字中文）
// 2-银行卡验证
// 3-数字验证
// 4-身份证
// 5-手机号验证-忽略空格
// 6-验证日期-但总专用
// 7-密码验证-但总专用
// 8-车牌验证
// 9.整数验证
// 10.小数
// 11.联系电话-座机或手机
// 12.保留小数点后两位
const regular = {
  Number: /^[0-9]*$/, // 数字
  Integer: /^[0-9]\d*$/, // 整数
  Dot: /^(-?\d+)(\.\d+)?$/, // 数字可以是小数
  Tel: /^(((|\()\s*0\s*(\d\s*){2,3}(-|\)|\s*)\s*(\d\s*){7,8})|(1\s*[34578]\s*(\d\s*){9}))$/, // 联系电话，可以是手机号或者座机，并忽略空格
  Phone: /^1\s*[345789]\s*(\d\s*){9}$/, // 手机号忽略空格
  Id: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
}
// 000.正则表达式
export default regular
// 1.名字验证
export const isName = (rule, value, callback) => {
  const reg = /^[\u4E00-\u9FA5]+$/
  if (value === '') {
    callback(new Error('名字不能为空！'))
  } else if (value.length < 2) {
    callback(new Error('名字长度不能小于2！'))
  } else if (!reg.test(value)) {
    callback(new Error('名字必须是汉字，请重新添写！'))
  } else if (value.length > 10) {
    callback(new Error('名字不超过十个汉字！'))
  } else {
    callback()
  }
}
// 2.银行卡验证
export const isBankCode = (rule, value, callback) => {
  const num = /^\d*$/
  const strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
  if (value.length < 16 || value.length > 19) {
    callback(new Error('银行卡号长度必须在16到19位之间！'))
  } else if (!num.exec(value)) {
    callback(new Error('银行卡号必须全为数字！'))
  } else if (strBin.indexOf(value.substring(0, 2)) === -1) {
    callback(new Error('银行卡号开头6位不符合规范'))
  } else {
    callback()
  }
}
// 3.数字验证
export const isNum = (rule, value, callback) => {
  if (!regular.Number.test(value)) {
    callback(new Error('请输入数字'))
  } else {
    callback()
  }
}
// 4.身份证
export const isId = (rule, value, callback) => {
  if (value && !regular.Id.test(value)) {
    callback(new Error('身份证号格式错误！'))
  } else {
    callback()
  }
}

// 5.手机号验证忽略空格
export const isPhone = (rule, value, callback) => {
  if (!regular.Phone.test(value)) {
    callback(new Error('请输入正确的手机号！'))
  } else {
    callback()
  }
}
// 6.验证日期
export const dateVaild = (rule, value, callback) => {
  const today = new Date()
  if (value === '') {
    callback(new Error('请选择日期'))
  } else if (new Date(Date.parse(value)) < today) {
    callback(new Error('选择的日期不能在今天之前'))
  } else {
    callback()
  }
}
// 7.密码验证
export const validatePass = (rule, value, callback) => {
  const pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/
  if (value === ' ') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6) {
    callback(new Error('密码不少于6位'))
  } else if (value.length > 14) {
    callback(new Error('密码长度不能超出14'))
  } else if (!pwd.test(value)) {
    callback(new Error('密码必须由数字和字母组成'))
  } else {
    callback()
  }
}
// 8.车牌验证
export const isPlateNum = (rule, value, callback) => {
  const reg = /(^[\u4e00-\u9fa5]{1}[A-Z]{1}(([A-Z_0-9]){5,6})$)/
  if (!reg.test(value)) {
    callback(new Error('请输入正确格式的车牌号码'))
  } else {
    callback()
  }
}

// 9.整数验证
export const isInteger = (rule, value, callback) => {
  if (!regular.Integer.test(value)) {
    callback(new Error('请输入整数'))
  } else {
    callback()
  }
}
// 10.小数-保包括整数和小数
export const isDot = (rule, value, callback) => {
  if (!regular.Dot.test(value)) {
    callback(new Error('请输入数字，若为小数请保留小数点后三位'))
  } else {
    callback()
  }
}
// 11.联系电话 -包括手机和座机
export const isTel = (rule, value, callback) => {
  if (value && !regular.Tel.test(value)) {
    callback(new Error('请输入正确的联系电话！'))
  } else {
    callback()
  }
}
// 12. 保留小数点后两位
export const afterTwoDot = (rule, value, callback) => {
  const str = value + ''
  const a = str.indexOf('.') + 1
  if (str && a !== 0) {
    const b = str.length; const c = b - a
    if (c > 2) {
      callback(new Error('请保留小数点后两位'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 13.0~100 最多两位小数
export const validateRate = (rule, value, callback) => {
  const reg = /^\d+(\.\d{1,2})?$/
  if (!reg.test(value)) {
    callback(new Error('数字需大于等于0，最多2位小数'))
  } else if (Number(value) > 100) {
    callback(new Error('不能大于100'))
  } else {
    callback()
  }
}
// 13.0+ 最多两位小数
export const validateMoney = (rule, value, callback) => {
  const reg = /^\d+(\.\d{1,2})?$/
  if (Number(value) <= 0) {
    callback(new Error('数字需大于0'))
  } else if (!reg.test(value)) {
    callback(new Error('数字需大于0，最多2位小数'))
  } else {
    callback()
  }
}
