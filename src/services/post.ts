import http from '@/services/http'
import { PostAPI } from '@/constants/API'
import httpFile from '@/services/httpFile'

export const getAllPost = async (page: any) => {
    return (await http.get(PostAPI.LIST_POSTS(page))).data
}

export const createPost = async (payload: any) => {
    await httpFile.post(PostAPI.CREATE_POST, payload)
}

export const deletePost = async (postId: any) => {
    await http.delete(PostAPI.DELETE_POST(postId))
}

export const editPost = async (postId: any, payload: any) => {
    await httpFile.put(PostAPI.EDIT_POST(postId), payload)
}