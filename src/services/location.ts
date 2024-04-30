import http from '@/services/http'
import { LocationAPI } from '@/constants/API'

export const getAllLocation = async (page: any) => {
    return (await http.get(LocationAPI.LIST_LOCATIONS(page))).data
}

export const createLocation = async (payload: any) => {
    await http.post(LocationAPI.CREATE_LOCATION, payload)
}

export const deleteLocation = async (locationId: any) => {
    await http.delete(LocationAPI.DELETE_LOCATION(locationId))
}

export const editLocation = async (locationId: any, payload: any) => {
    await http.put(LocationAPI.EDIT_LOCATION(locationId), payload)
}