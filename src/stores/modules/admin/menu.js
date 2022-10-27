import { defineStore} from "pinia";

export default defineStore('menu', {
  state: () => {
    return {
      // 是否隐藏
      isSide: false,
      // 默认侧边栏宽度
      sideWidth: '3vw',
      BreadCrumbList: [],
      menuList: JSON.parse(localStorage.getItem('menuList') || '[]')
    }
  },
  actions: {
    toggleSide() {
      this.isSide = !this.isSide
      this.sideWidth = this.isSide === false ? '3vw' : '11vw'
    },
    setBreadCrumbList(info) {
      this.BreadCrumbList = info
    },
    setMenus(res) {
      this.menuList = res
      localStorage.setItem('menuList', JSON.stringify(res))
    },
  }
})
