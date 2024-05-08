import http from '@/services/http'
import { TicketAPI } from '@/constants/API'

export const getAllTicket = async (page: any) => {
    return (await http.get(TicketAPI.LIST_TICKETS(page))).data
}

export const createTicket = async (payload: any) => {
    await http.post(TicketAPI.CREATE_TICKET, payload)
}

export const deleteTicket = async (ticketId: any) => {
    await http.delete(TicketAPI.DELETE_TICKET(ticketId))
}