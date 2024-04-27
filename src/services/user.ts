import http from '@/services/http'
import { UserAPI } from '@/constants/API'
import httpFile from '@/services/httpFile'

export const getCurrentUser = async () => {
    return (await http.get(UserAPI.GET_CURRENT_USER)).data
}

export const getAllUsers = async () => {
    return (await http.get(UserAPI.ALL_USERS)).data
}

export const createUser = async (payload: any) => {
    await http.post(UserAPI.CREATE_USER, payload)
}

export const deleteUser = async (userId: any) => {
    await http.delete(UserAPI.DELETE_USER(userId))
}

export const editUser = async (userId: any, payload: any) => {
    await httpFile.put(UserAPI.EDIT_USER(userId), payload)
}