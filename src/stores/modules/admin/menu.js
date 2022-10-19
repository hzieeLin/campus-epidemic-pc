import { defineStore} from "pinia";
import {GetMenus} from "../../../api/system/menu";

export default defineStore('menu', {
  state: () => {
    return {
      // 是否隐藏
      isSide: true,
      // 默认侧边栏宽度
      sideWidth: '13vw',
      BreadCrumbList: [],
      menuList: []
    }
  },
  actions: {
    toggleSide() {
      this.isSide = this.isSide !== true
      this.sideWidth = this.isSide === false ? '4vw' : '15vw'
    },
    setBreadCrumbList(info) {
      this.BreadCrumbList = info
    },
    setMenus(res) {
      console.log('setMenu', res)
      this.menuList = res
    },
    getMenus() {

    }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: sessionStorage, paths: ['menuList'] }
    ]
  }
})
