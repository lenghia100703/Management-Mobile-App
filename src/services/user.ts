import http from '@/services/http.ts'
import { UserAPI } from '@/constants/API.ts'

export const getCurrentUser = async () => {
    return (await http.get(UserAPI.GET_CURRENT_USER)).data
}