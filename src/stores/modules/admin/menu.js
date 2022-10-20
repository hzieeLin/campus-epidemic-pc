import { defineStore} from "pinia";

export default defineStore('menu', {
  state: () => {
    return {
      // 是否隐藏
      isSide: true,
      // 默认侧边栏宽度
      sideWidth: '13vw',
      BreadCrumbList: [],
      menuList: JSON.parse(localStorage.getItem('menuList') || '[]')
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
      this.menuList = res
      localStorage.setItem('menuList', JSON.stringify(res))
    },
  }
})
