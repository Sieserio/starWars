import { createApp } from 'vue'
//import { createPinia } from 'pinia'
import '@/router/index.js'
import App from './App.vue'

import '@/style/index.css'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/containers/HomePage/HomePage.vue";
import PeoplePage from "@/containers/PeoplePage/PeoplePage.vue";
import Test from "@/containers/Test/Test.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        },
        {
            path: '/people',
            name: 'people',
            component: PeoplePage
        }
    ]
})


const app = createApp(App)


//app.use(createPinia())
app.use(router)
app.mount('#app')
export default router
