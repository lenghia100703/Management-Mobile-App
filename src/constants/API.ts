export const AuthAPI = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register'
}

export const NewsAPI = {
    LIST_NEWS: (page: any) =>  `/news?page=${page}`,
    EDIT_NEWS: (newsId: any) => `/news/${newsId}`,
    DELETE_NEWS: (newsId: any) => `/news/${newsId}`,
    CREATE_NEWS: '/news',
    NEWS_BY_ID: (newsId: any) => `/news/${newsId}`,
}

export const UserAPI = {
    GET_CURRENT_USER: '/user/me',
}