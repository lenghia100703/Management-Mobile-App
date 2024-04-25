import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import { PATHS } from '@/router/paths.ts'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
