import { createApp } from 'vue'
//import { createPinia } from 'pinia'
import '@/router/index.js'
import App from './App.vue'
import '@/style/index.css'
import router from "@/router/index.js";


const app = createApp(App)


//app.use(createPinia())
app.use(router)
app.mount('#app')
export default router
