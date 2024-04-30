import http from '@/services/http'
import { QuestionAPI } from '@/constants/API'

export const getAllQuestion = async (page: any) => {
    return (await http.get(QuestionAPI.LIST_QUESTIONS(page))).data
}

export const createQuestion = async (payload: any) => {
    await http.post(QuestionAPI.CREATE_QUESTION, payload)
}

export const deleteQuestion = async (questionId: any) => {
    await http.delete(QuestionAPI.DELETE_QUESTION(questionId))
}

export const editQuestion = async (questionId: any, payload: any) => {
    await http.put(QuestionAPI.EDIT_QUESTION(questionId), payload)
}