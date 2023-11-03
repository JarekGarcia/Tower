import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js";

class EventsService {
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator', 'name picture')
        await event.populate('ticketCount')
        event.save()
        return event;
    }
    async editEvent(eventId, userId, eventData) {
        const eventToBeUpdated = await this.getEventById(eventId)

        if (eventToBeUpdated.creatorId != userId) {
            throw new Forbidden('not your event to edit!')
        }

        eventToBeUpdated.name = eventData.name || eventToBeUpdated.name
        eventToBeUpdated.description = eventData.description || eventToBeUpdated.description
        eventToBeUpdated.isCanceled = eventData.isCanceled != undefined ? eventData.isCanceled : eventToBeUpdated.isCanceled

        await eventToBeUpdated.save()

        return eventToBeUpdated
    }
    async cancelEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId != userId) {
            throw new Forbidden('this is not your event to cancel!')
        }

        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }
    async getEvents() {
        const events = await dbContext.Events.find()
            .populate('creator', 'name picture')
            .populate('ticketCount')
        return events
    }

    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId)
            .populate('ticketCount')
            .populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest(`${eventId} is not a valid event ID`)
        }
        return event
    }
}

export const eventsService = new EventsService()