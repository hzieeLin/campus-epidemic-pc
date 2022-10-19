<template>
  <div class="header">
    <div class="title">校园疫情防控系统</div>
    <div class="user-info cursor" @mousemove="showSelect = true" @mouseleave="showSelect = false">
      <img class="user-avatar" src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" alt="">
      <p class="user-name">{{user.info.account === undefined ? user.info.name: user.info.account}}</p>
      <transition name="el-zoom-in-top">
        <div class="select-box" v-show="showSelect">
          <p class="select-item" @click="changeItem(1)">个人中心</p>
          <p class="select-item" @click="changeItem(2)">退出登录</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {LoginOut} from "../../api/account";
import util from "../../util";
import {useRouter} from "vue-router";
import { useUserStore, useMenuStore } from '../../stores/index.js'
const user = useUserStore()
console.log(user.info.name)
const menu = useMenuStore()
const router = useRouter()
const showSelect = ref(false)
const changeItem = (i) => {
  if (i === 1) {
    router.replace('/myInfo')
  } else if (i === 2) {
    LoginOut().then(() => {
      util.cookies.remove('token')
      router.replace('/login')
      user.setInfo([])
      menu.setMenus([])
    })
  }
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  height: 55px;
  background: #4A7EFE;
  display: flex;
  align-items: center;
  .title {
    margin-left: 20px;
    font-size: 20px;
    color: #FFFFFF;
  }
  .user-info {
    position: absolute;
    z-index: 99;
    right: 5%;
    width: 140px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 18px;
    .user-avatar {
      height: 60%;
      border-radius: 50%;
    }
    .user-name {
      color: #fff;
      margin: 0 0 0 10px;
      height: 5.3vh;
      line-height: 5.3vh;
    }
    .select-box {
      position: absolute;
      transform: translate(0,85%);
      width: 140px;
      height: 80px;
      background: #F3F3F3;
      .select-item {
        width: 100%;
        height: 40px;
        margin:0;
        text-align: center;
        line-height: 40px;
        &:hover {
          background: #f9f9f9;
        }
      }
    }
  }
}
</style>
