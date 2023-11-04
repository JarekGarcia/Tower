import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
    async createTicket(ticketData) {
        const event = await eventsService.getEventById(ticketData.eventId)
        event.capacity--
        event.save()
        if (event.isCanceled) {
            throw new Forbidden(`${event.name} Has been canceled sorry for inconvenience`)
        }

        const tickets = await dbContext.Tickets.create(ticketData)
        await tickets.populate('profile')
        await tickets.populate('event')
        return tickets
    }


    async refundTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (ticket.accountId.toString() != userId) {
            throw new Forbidden("not your ticket to delete")
        }
        await ticket.delete()
        return "Ticket Refunded!"
    }

    async getMyEventTickets(userId) {
        const tickets = await dbContext.Tickets.find({ accountId: userId })
            .populate({
                path: 'event',
                populate: {
                    path: 'ticketCount'
                }
            })
        return tickets
    }
    async getTicketsByEventId(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture')
        return tickets
    }
}

export const ticketsService = new TicketsService()