import { defineStore} from "pinia";

export default defineStore('other', {
  state: () => {
    return {
      riskAreaNum: 0
    }
  },
  actions: {
    editRiskAreaNum(num) {
      this.riskAreaNum = num
    },
    emptyRiskAreaNum() {
      this.riskAreaNum = 0
    }
  }
})
