import { defineStore} from "pinia";

export default defineStore('user', {
  state: () => ({
    info: {}
  }),
  actions: {
    setInfo(infos) {
      this.info = infos
    }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: sessionStorage, paths: ['info'] }
    ]
  }
})
