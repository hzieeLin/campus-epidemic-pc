<template>
  <div class="bread-container">
    <a-breadcrumb>
      <a-breadcrumb-item><span style="color: #919191">校园疫情防控系统</span></a-breadcrumb-item>
      <a-breadcrumb-item>{{menu.BreadCrumbList[0]}}</a-breadcrumb-item>
      <a-breadcrumb-item v-if="menu.BreadCrumbList.length>1">{{menu.BreadCrumbList[1]}}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup>
import { useMenuStore} from '../../stores/index.js'
const menu = useMenuStore()
</script>

<style lang="less" scoped>
.bread-container {
  width: 100%;
  height: 4.8vh;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  padding-left: 20px;
  user-select: none;
  :deep(.ant-breadcrumb-link) {
    font-size: 16px;
    color: #000000;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  :deep(.ant-breadcrumb-separator) {
    font-size: 16px;
    color: #000000;
  }
}
</style>
