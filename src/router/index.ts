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


export const router = createRouter({
    // @ts-ignore
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
                    path: PATHS.ADMIN_MANAGE_TRANSACTION,
                    component: ManageTransactionsView,
                    name: 'manage-transactions',
                },
                {
                    path: PATHS.PROFILE,
                    component: ProfileView,
                    name: 'profile',
                }
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
            ]
        }
    ],
})