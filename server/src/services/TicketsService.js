import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
    async createTicket(ticketData) {
        const event = await eventsService.getEventById(ticketData.eventId)

        if (event.isCanceled) {
            throw new Forbidden(`${event.name} Has been canceled sorry for inconvenience`)
        }

        const tickets = await dbContext.Tickets.create(ticketData)
        await tickets.populate('profile', 'name picture')
        await tickets.populate('event')
        return tickets
    }

}

export const ticketsService = new TicketsService()