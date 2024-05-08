import http from '@/services/http'
import { TransactionAPI } from '@/constants/API'

export const getAllTransaction = async (page: any) => {
    return (await http.get(TransactionAPI.LIST_TRANSACTIONS(page))).data
}

export const createTransaction = async (payload: any) => {
    await http.post(TransactionAPI.CREATE_TRANSACTION, payload)
}

export const deleteTransaction = async (transactionId: any) => {
    await http.delete(TransactionAPI.DELETE_TRANSACTION(transactionId))
}