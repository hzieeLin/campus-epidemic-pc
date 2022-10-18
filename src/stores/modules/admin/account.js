import { defineStore } from 'pinia'
import util from '../../../util/index.js'

// import { useUserStore } from "../../index.js"
// const user = useUserStore()
export default defineStore('account', {
  state: () => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
  }),
  actions: {
    /**
     * @description 登录数据本地化存储
     * @param users
     */
    login(users) {
      util.cookies.set('token', users.token)
      // const info = { name: null,
      //                avatar: 'https://image.meiye.art/FiBHIATi4aCF_UwrUWq0tINQeVED?imageMogr2/thumbnail/450x/interlace/1'
      // }
      // user.setInfo(info)
      this.userInfo = users
    }
  }
})
