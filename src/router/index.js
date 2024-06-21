import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/containers/HomePage/HomePage.vue";
import PeoplePage from "@/containers/PeoplePage/PeoplePage.vue";
import NotFoundPage from '@/containers/NotFoundPage/NotFoundPage.vue'
import HookPeoplePage from "@/containers/PeoplePage/HookPeoplePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },

        {
            path: '/people',
            name: 'people',
            component: PeoplePage,
        },
        {
            path: '/test/people',
            name: 'test-people',
            component: HookPeoplePage,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage
        },
    ]
})
export default router