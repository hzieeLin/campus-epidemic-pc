import axios from 'axios'
import util from '../../util/index.js'
import { ElMessage } from "element-plus";
import router from "../../router";
const service = axios.create({
  baseURL: 'http://127.0.0.1:8080/campus-epidemic-system/pc',
  // baseURL: 'https://49t17g0193.zicp.fun/campus-epidemic-system/pc',
  timeout: 5000
})

service.interceptors.request.use(config => {
      console.log(config.data)
  config.headers.Authorization = util.cookies.get('token')
  // config.headers['Content-Type'] = 'application/json'
  return config
},
    error => {
      // 发送失败
      Promise.reject(error)
    }
)

service.interceptors.response.use(response => {
  console.log(response)
  const dataAxios = response.data
  const { code } = dataAxios
  switch (code) {
    case 200:
      return dataAxios.data
    case 300:
      ElMessage.success(`${dataAxios.message}`)
      break
    case 400:
      // [ 示例 ] 其它和后台约定的 code
      ElMessage.error(`${dataAxios.message}`)
      break
    case 401:
      ElMessage.error(`${dataAxios.message}`)
      router.replace('/login')
  }
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        if (error.response.data.error_description) {
          error.message = error.response.data.error_description; break
        }
        error.message = error.response.data.msg; break
      case 401: ElMessage.error = '未授权，请登录'; break
      case 403: ElMessage.error = '拒绝访问'; break
      case 404: ElMessage.error = `请求地址出错: ${error.response.config.url}`; break
      case 408: ElMessage.error = '请求超时'; break
      case 500: ElMessage.error = '服务器内部错误'; break
      case 501: ElMessage.error = '服务未实现'; break
      case 502: ElMessage.error = '网关错误'; break
      case 503: ElMessage.error = '服务不可用'; break
      case 504: ElMessage.error = '网关超时'; break
      case 505: ElMessage.error = 'HTTP版本不受支持'; break
      default: break
    }
  }
  return Promise.reject(error)
})
export default service
