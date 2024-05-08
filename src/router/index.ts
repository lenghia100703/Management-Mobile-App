import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/main/HomeView.vue'
import { PATHS } from '@/router/paths'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ManageNewsView from '@/views/news/ManageNewsView.vue'
import LoginView from '@/views/main/LoginView.vue'
import RegisterView from '@/views/main/RegisterView.vue'
import ManageUsersView from '@/views/users/ManageUsersView.vue'
import ManageExhibitionsView from '@/views/exhibitions/ManageExhibitionsView.vue'
import ProfileView from '@/views/main/ProfileView.vue'
import NotAuthenticationLayout from '@/layouts/NotAuthenticationLayout.vue'
import ManageQuestionsView from '@/views/questions/ManageQuestionsView.vue'
import ManageLocationsView from '@/views/locations/ManageLocationsView.vue'
import ManagePostsView from '@/views/posts/ManagePostsView.vue'
import ManageTransactionsView from '@/views/transactions/ManageTransactionsView.vue'
import ManageTicketsView from '@/views/tickets/ManageTicketsView.vue'
import SettingView from '@/views/main/SettingView.vue'
import ManageBannersView from '@/views/banners/ManageBannersView.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'


export const router = createRouter({
    // @ts-ignore
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: PATHS.HOME,
            component: HomeLayout,
            children: [
                {
                    path: PATHS.HOME,
                    component: HomeView,
                    name: 'home',
                },
            ]
        },
        {
            path: PATHS.HOME,
            component: DefaultLayout,
            children: [
                {
                    path: PATHS.ADMIN_MANAGE_NEWS,
                    component: ManageNewsView,
                    name: 'manage-news',
                },
                {
                    path: PATHS.ADMIN_MANAGE_USER,
                    component: ManageUsersView,
                    name: 'manage-users',
                },
                {
                    path: PATHS.ADMIN_MANAGE_EXHIBITION,
                    component: ManageExhibitionsView,
                    name: 'manage-exhibitions',
                },
                {
                    path: PATHS.ADMIN_MANAGE_QUESTION,
                    component: ManageQuestionsView,
                    name: 'manage-questions',
                },
                {
                    path: PATHS.ADMIN_MANAGE_LOCATION,
                    component: ManageLocationsView,
                    name: 'manage-locations',
                },
                {
                    path: PATHS.ADMIN_MANAGE_POST,
                    component: ManagePostsView,
                    name: 'manage-posts',
                },
                {
                    path: PATHS.ADMIN_MANAGE_TICKET,
                    component: ManageTicketsView,
                    name: 'manage-tickets',
                },
                {
                    path: PATHS.ADMIN_MANAGE_TRANSACTION,
                    component: ManageTransactionsView,
                    name: 'manage-transactions',
                },
                {
                    path: PATHS.ADMIN_MANAGE_BANNER,
                    component: ManageBannersView,
                    name: 'manage-banners',
                },
                {
                    path: PATHS.PROFILE,
                    component: ProfileView,
                    name: 'profile',
                },
                {
                    path: PATHS.SETTING,
                    component: SettingView,
                    name: 'setting',
                },
            ],
        },
        {
            path: PATHS.HOME,
            component: NotAuthenticationLayout,
            children: [
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
            ],
        },

    ],
})