import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { PATHS } from '@/router/paths.ts'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: PATHS.HOME,
            component: DefaultLayout,
            children: [
                {
                    path: PATHS.HOME,
                    component: HomeView,
                },
            ],
        },
    ],
})