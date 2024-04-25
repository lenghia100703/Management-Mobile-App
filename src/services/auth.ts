import http from '@/services/http.ts'
import { AuthAPI } from '@/constants/API.ts'

export const login = async (payload: any) => {
    return await http.post(AuthAPI.LOGIN, payload)
}

export const logout = async () => {
    return await http.post(AuthAPI.LOGOUT)
}

export const register = async (payload: any) => {
    return await http.post(AuthAPI.REGISTER, payload)
}