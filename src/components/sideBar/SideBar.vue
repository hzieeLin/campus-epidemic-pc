<template>
  <div class="side-container">
    <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        style="background: #FFFFFF; width: 12vw;"
        v-for="(item, i0) in menuList"
        :key="i0"
    >
      <a-menu-item :key="item.countId"	 v-if="item.children === null" @click="replaceByPath(item.path)">
        <template #icon>
          <em :class="item.icon" style="font-size: 16px"></em>
        </template>
        <span>{{item.title}}</span>
      </a-menu-item>
      <a-sub-menu :key="item.countId" v-else>
        <template #icon>
          <em :class="item.icon" ></em>
        </template>
        <template #title ><span>{{item.title}}</span></template>
        <div v-for="(child,index) in item.children" :key="index">
          <a-menu-item :key="child.countId" @click="replaceByPath(child.path)">
            <template #icon>
              <em  :class="child.icon"></em>
            </template>
            <span>{{child.title}}</span>
          </a-menu-item>
        </div>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup>
import { ref, onMounted, watch} from "vue";
import { useMenuStore} from '../../stores/index.js'
const menuList = ref([])
const menu = useMenuStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
watch(() => route.matched, (newVal) => {
  if (newVal.length === 2) {
    menu.setBreadCrumbList([newVal[1].name])
  } else if (newVal.length === 3) {
    const list = [newVal[1].name,newVal[2].name]
      menu.setBreadCrumbList(list)
  }
},
    {
      immediate: true
    })
const selectedKeys = ref([])
onMounted(() => {
  findRouter()
})
watch(() => menu.menuList, (newVal) => {
  menuList.value = newVal
}, { immediate: true})
const replaceByPath = (path) => {
  router.push(path)
}
const findRouter = () => {
  let currentIndex;
  const routerPath = router.currentRoute.value.path
  for (let i = 0; i < menuList.value.length; i++) {
    if (menuList.value[i].path === routerPath) {
      currentIndex = menuList.value[i].countId
    }
    if (menuList.value[i].children !== null) {
      for (let j = 0; j < menuList.value[i].children.length; j++) {
        if (menuList.value[i].children[j].path === routerPath) {
          currentIndex = menuList.value[i].children[j].countId
        }
      }
    }
  }
  selectedKeys.value[0] = currentIndex
}
</script>

<style lang="less" scoped>
.side-container {
  margin-top: 10px;
}
</style>
