import http from '@/services/http.ts'
import { UserAPI } from '@/constants/API.ts'

export const getCurrentUser = async () => {
    return (await http.get(UserAPI.GET_CURRENT_USER)).data
}

export const getAllUsers = async () => {
    return (await http.get(UserAPI.ALL_USERS)).data
}

export const deleteUser = async () => {
    await http.delete(UserAPI.DELETE_USER)
}