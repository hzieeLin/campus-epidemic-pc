import Cookies from 'js-cookie'
const cookies = {}
/**
 * @description 存储 cookie 值
 * @param name
 * @param value
 * @param cookieSetting
 */
cookies.set = function (name='default', value = '', cookieSetting = {}) {
  // Cookies 默认保存时间，单位：天
  const days = 1
  Object.assign(days, cookieSetting)
  Cookies.set(`admin-${name}`, value, days)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default') {
  return Cookies.get(`admin-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
  return Cookies.remove(`admin-${name}`)
}

export default cookies
