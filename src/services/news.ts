import httpFile from '@/services/httpFile'
import { NewsAPI } from '@/constants/API'
import http from '@/services/http'

export const createNews = async (payload: any) => {
    return (await httpFile.post(NewsAPI.CREATE_NEWS, payload)).data
}

export const getAllNews = async () => {
    return (await http.get(NewsAPI.ALL_NEWS)).data
}

export const editNews = async (newsId: any, payload: any) => {
    await httpFile.put(NewsAPI.EDIT_NEWS(newsId), payload)
}

export const deleteNews = async (payload: any) => {
    await http.delete(NewsAPI.DELETE_NEWS(payload))
}