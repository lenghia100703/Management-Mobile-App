export const AuthAPI = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
}

export const NewsAPI = {
    ALL_NEWS: `/news`,
    LIST_NEWS: (page: any) => `/news?page=${page}`,
    EDIT_NEWS: (newsId: any) => `/news/${newsId}`,
    DELETE_NEWS: (newsId: any) => `/news/${newsId}`,
    CREATE_NEWS: '/news',
    NEWS_BY_ID: (newsId: any) => `/news/${newsId}`,
}

export const UserAPI = {
    GET_CURRENT_USER: '/user/me',
    ALL_USERS: '/user',
    LIST_USERS: (page: any) => `/user?page=${page}`,
    EDIT_USER: (userId: any) => `/user/${userId}`,
    DELETE_USER: (userId: any) => `/user/${userId}`,
    CREATE_USER: '/user',
    USER_BY_ID: (userId: any) => `/user/${userId}`,
    CHANGE_PASSWORD: (userId: any) => `/user/change-password/${userId}`,
}

export const ExhibitionAPI = {
    ALL_EXHIBITIONS: '/exhibition',
    LIST_EXHIBITIONS: (page: any) => `/exhibition?page=${page}`,
    EDIT_EXHIBITION: (exhibitionId: any) => `/exhibition/${exhibitionId}`,
    DELETE_EXHIBITION: (exhibitionId: any) => `/exhibition/${exhibitionId}`,
    CREATE_EXHIBITION: '/exhibition',
    EXHIBITION_BY_ID: (exhibitionId: any) => `/exhibition/${exhibitionId}`,
}