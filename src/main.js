import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'

import plugins from '../src/plugins/request/index.js'
// 图标
import  DatePicker  from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as Icons from '@ant-design/icons-vue';
import '../src/assets/iconfont/iconfont.css'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './util/index'
import './util/date'
// 全局样式
import './style/index.less'
const app = createApp(App)
app.use(DatePicker);
app.use(ElementPlus)
// app.use(plugins)
app.config.globalProperties.$axios = plugins
app.use(createPinia().use(piniaPersist))
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const icons = Icons;
for (const i in icons) {
  // 全局注册一下组件
  app.component(i, icons[i])
}
app.mount('#app')
