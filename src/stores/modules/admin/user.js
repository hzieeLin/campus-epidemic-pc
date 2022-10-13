import { defineStore} from "pinia";

export default defineStore('user', {
  state: () => ({
    info: {}
  }),
  persist: {
    enabled: true,
    strategies: [
      { storage: sessionStorage, paths: ['info'] }
    ]
  },
  actions: {
    setInfo(infos) {
      this.info = infos
    }
  }
})
