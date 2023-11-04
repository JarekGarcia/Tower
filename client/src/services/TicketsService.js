import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
async createTicket(eventId){
    const eventData = {eventId: eventId}
const res = await api.post('api/tickets', {eventId})
// logger.log("ticket for event!", res.data)
AppState.tickets.push(new Ticket (res.data))
}

async deleteTicket(ticketId){
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log('deleted this ticket', res.data)
}


}

export const ticketsService = new TicketsService