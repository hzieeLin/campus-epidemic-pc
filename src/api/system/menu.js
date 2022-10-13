import request from '../../plugins/request/index.js'

export function GetMenus() {
  return request({
    url: `/system/menu`,
    method: 'get'
  })
}
