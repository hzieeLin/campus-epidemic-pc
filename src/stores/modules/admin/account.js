import { defineStore } from 'pinia'
import util from '../../../util/index.js'

// import { useUserStore } from "../../index.js"
// const user = useUserStore()
export default defineStore('account', {
  state: () => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
  })
})
