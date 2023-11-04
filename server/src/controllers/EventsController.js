import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('/:eventId/comments', this.getCommentsByEventId)
            .get('/:eventId/tickets', this.getTicketsByEventId)
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }
    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            const userId = req.userInfo.id
            eventData.creatorId = userId
            const event = await eventsService.createEvent(eventData)
            return res.send(event)
        } catch (error) {
            next(error)
        }

    }

    async editEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const eventData = req.body

            const editedEvent = await eventsService.editEvent(eventId, userId, eventData)
            return res.send(editedEvent)
        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const event = await eventsService.cancelEvent(eventId, userId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEvents(req, res, next) {
        try {
            const events = await eventsService.getEvents()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const event = await eventsService.getEventById(eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getTicketsByEventId(req, res, next) {
        try {
            const eventId = req.params.eventId
            const tickets = await ticketsService.getTicketsByEventId(eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getCommentsByEventId(req, res, next) {
        try {
            const eventId = req.params.eventId
            const comments = await commentsService.getCommentsByEventId(eventId)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }
}
