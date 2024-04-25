import httpFile from '@/services/httpFile'
import { NewsAPI } from '@/constants/API'
import http from '@/services/http'

export const createNews = async (payload: any) => {
    return (await httpFile.post(NewsAPI.CREATE_NEWS, payload)).data
}

export const getAllNews = async () => {
    return (await http.get(NewsAPI.ALL_NEWS)).data
}