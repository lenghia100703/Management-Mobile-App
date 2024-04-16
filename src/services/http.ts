import axios from 'axios'
import { LocalStorageKeys } from '@/constants'
import { getLocalStorage } from '@/helper/LocalStorageHelper'
import { RequestHeaders } from '@/constants'

const http = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_APP_ROOT_API,
    transformRequest: [
        function (data: any, headers: any) {
            headers[RequestHeaders.TOKEN] = getLocalStorage(
                LocalStorageKeys.AUTHENTICATION_TOKEN
            )
            return JSON.stringify(data)
        },
    ],
    headers: {
        'Content-Type': 'application/json',
    },
})

http.interceptors.response.use(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    null,
    (error: any) => {
        if ([401, 403].includes(error.response.status)) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            logout().then((r) => {})
        }
        return Promise.reject(error)
    }
)

export default http
