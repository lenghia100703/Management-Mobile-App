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

export const QuestionAPI = {
    LIST_QUESTIONS: (page: any) => `/question?page=${page}`,
    EDIT_QUESTION: (questionId: any) => `/question/${questionId}`,
    DELETE_QUESTION: (questionId: any) => `/question/${questionId}`,
    CREATE_QUESTION: '/question',
    QUESTION_BY_ID: (questionId: any) => `/question/${questionId}`,
}

export const LocationAPI = {
    LIST_LOCATIONS: (page: any) => `/location?page=${page}`,
    EDIT_LOCATION: (locationId: any) => `/location/${locationId}`,
    DELETE_LOCATION: (locationId: any) => `/location/${locationId}`,
    CREATE_LOCATION: '/location',
    LOCATION_BY_ID: (locationId: any) => `/location/${locationId}`,
}

export const PostAPI = {
    LIST_POSTS: (page: any) => `/post?page=${page}`,
    EDIT_POST: (postId: any) => `/post/${postId}`,
    DELETE_POST: (postId: any) => `/post/${postId}`,
    CREATE_POST: '/post',
    POST_BY_ID: (postId: any) => `/post/${postId}`,
}

export const TransactionAPI = {
    LIST_TRANSACTIONS: (page: any) => `/transaction?page=${page}`,
    EDIT_TRANSACTION: (transactionId: any) => `/transaction/${transactionId}`,
    DELETE_TRANSACTION: (transactionId: any) => `/transaction/${transactionId}`,
    CREATE_TRANSACTION: '/transaction',
    TRANSACTION_BY_ID: (transactionId: any) => `/transaction/${transactionId}`,
}