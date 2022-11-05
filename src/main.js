import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { globalRegister } from '@/plugins'
// import socket from '@/plugins/socketIo'

import "./assets/iconfont/iconfont.css"


const app = createApp(App)
app.use(router)
app.use(store)
app.use(globalRegister)
app.mount('#app')
// app.config.globalProperties.$socket = socket;
