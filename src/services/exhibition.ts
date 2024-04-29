import http from '@/services/http'
import { ExhibitionAPI } from '@/constants/API'
import httpFile from '@/services/httpFile'



export const getAllExhibition = async (page: any) => {
    return (await http.get(ExhibitionAPI.LIST_EXHIBITIONS(page))).data
}

export const createExhibition = async (payload: any) => {
    await httpFile.post(ExhibitionAPI.CREATE_EXHIBITION, payload)
}

export const deleteExhibition = async (exhibitionId: any) => {
    await http.delete(ExhibitionAPI.DELETE_EXHIBITION(exhibitionId))
}

export const editExhibition = async (exhibitionId: any, payload: any) => {
    await httpFile.put(ExhibitionAPI.EDIT_EXHIBITION(exhibitionId), payload)
}