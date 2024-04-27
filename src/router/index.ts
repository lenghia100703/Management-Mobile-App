import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { PATHS } from '@/router/paths'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ManageNewsView from '@/views/news/ManageNewsView.vue'
import LoginView from '@/views/main/LoginView.vue'
import RegisterView from '@/views/main/RegisterView.vue'
import ManageUsersView from '@/views/users/ManageUsersView.vue'


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
                    name: 'home',
                },
                {
                    path: PATHS.ADMIN_MANAGE_NEWS,
                    component: ManageNewsView,
                    name: 'manage-news',
                },
                {
                    path: PATHS.LOGIN,
                    component: LoginView,
                    name: 'login',
                    // beforeEnter: (to, from, next) => {
                    //     const authenticationStore = useAuthenticationStore()
                    //     const { authenticated } = storeToRefs(authenticationStore)
                    //     if (authenticated) {
                    //         next(PATHS.HOME);
                    //     } else {
                    //         next();
                    //     }
                    // }
                },
                {
                    path: PATHS.REGISTER,
                    component: RegisterView,
                    name: 'register',
                    // beforeEnter: (to, from, next) => {
                    //     const authenticationStore = useAuthenticationStore()
                    //     const { authenticated } = storeToRefs(authenticationStore)
                    //     if (authenticated) {
                    //         next(PATHS.HOME);
                    //     } else {
                    //         next();
                    //     }
                    // }
                },
                {
                    path: PATHS.ADMIN_MANAGE_USER,
                    component: ManageUsersView,
                    name: 'manage-user',
                }
            ],
        },
    ],
})