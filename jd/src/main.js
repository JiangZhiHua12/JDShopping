import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import Store from './store'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import 'font-awesome/css/font-awesome.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import Region from 'v-region'
import eventBus from 'vue3-eventbus'







Axios.defaults.baseURL='/api'
Axios.defaults.headers.post['Content-Type']='application//json'

createApp(App).use(router).use(ElementPlus,{locale}).use(Store).use(eventBus).use(Region).mount('#app')
