import httpFile from '@/services/httpFile'
import { BannerAPI } from '@/constants/API'
import http from '@/services/http'

export const createBanner = async (payload: any) => {
    return (await httpFile.post(BannerAPI.CREATE_BANNER, payload)).data
}

export const getAllBanner = async (page: any) => {
    return (await http.get(BannerAPI.LIST_BANNERS(page))).data
}

export const editBanner = async (bannerId: any, payload: any) => {
    await httpFile.put(BannerAPI.EDIT_BANNER(bannerId), payload)
}

export const deleteBanner = async (payload: any) => {
    await http.delete(BannerAPI.DELETE_BANNER(payload))
}

export const getBannerIsActive = async () => {
    return (await http.get(BannerAPI.BANNER_IS_ACTIVE)).data
}