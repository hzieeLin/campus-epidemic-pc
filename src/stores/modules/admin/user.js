import { defineStore} from "pinia";

export default defineStore('user', {
  state: () => ({
    info: JSON.parse(localStorage.getItem('info')|| '{}')
  }),
  actions: {
    setInfo(infos) {
      this.info = infos
      localStorage.setItem('info', JSON.stringify(infos))
    }
  },
})
