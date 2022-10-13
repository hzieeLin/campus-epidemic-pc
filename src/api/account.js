import request from "../plugins/request";

export function AccountLogin(data) {
  return request({
    url: `/user/loginByPassword`,
    method: 'post',
    data
  })
}

// 退出登录
export function LoginOut() {
  return request({
    url: `/user/loginOut`,
    method: 'get'
  })
}
