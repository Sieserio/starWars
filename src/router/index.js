import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/containers/HomePage/HomePage.vue";
import PeoplePage from "@/containers/PeoplePage/PeoplePage.vue";
import NotFoundPage from '@/containers/NotFoundPage/NotFoundPage.vue'
import HookPeoplePage from "@/containers/PeoplePage/HookPeoplePage.vue";
import PersonPage from "@/containers/PersonPage/PersonPage.vue";
import PlanetsPage from "@/containers/PlanetsPage/PlanetsPage.vue";
import PlanetPage from "@/containers/PlanetPage/PlanetPage.vue";

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
            path: '/planets',
            name: 'planets',
            component: PlanetsPage,
        },
        {
            path: '/planets/:id',
            name: 'planet-id',
            component: PlanetPage,
        },
        {
            path: '/people/:id',
            name: 'people-id',
            component: PersonPage,
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