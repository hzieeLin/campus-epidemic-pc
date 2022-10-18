<template>
  <div class="common-layout flex-column">
      <HeaderNav></HeaderNav>
      <div style="flex: 1;display: flex;">
        <div class="aside">
          <SideBar></SideBar>
        </div>
        <div class="right-main flex-column">
          <BreadCrumb/>
          <RouterView/>
        </div>
      </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import BreadCrumb from '../../components/breadCrumb/bread-crumb.vue'
import HeaderNav from "../../components/header/HeaderNav.vue";
import SideBar from '../../components/sideBar/SideBar.vue'
</script>

<style lang="less" scoped>
.common-layout {
  width: 100vw;
  min-height: 100vh;
  .aside {
    background: #fcfdff;
  }
  .right-main {
    background: #f2f7f9;
    flex: 1;
  }
}
</style>
