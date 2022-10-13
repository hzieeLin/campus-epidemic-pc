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
      menuList:[]
    }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: sessionStorage, paths: ['menuList'] },
    ],
  },
  actions: {
    toggleSide() {
      this.isSide = this.isSide !== true
      this.sideWidth = this.isSide === false ? '4vw' : '15vw'
    },
    setBreadCrumbList(info) {
      this.BreadCrumbList = info
    },
    setMenus() {
      this.menuList = []
      window.sessionStorage.clear()
    },
    getMenus() {
      GetMenus().then((res) => {
        this.menuList = res
      })
    }
  }
})
