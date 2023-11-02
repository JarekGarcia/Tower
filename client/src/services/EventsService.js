import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService{
    async getEvents(){
        const res = await api.get('api/events')
        // logger.log('events:',res.data)
        AppState.events = res.data.map((eventPojo) => new Event(eventPojo))
        logger.log("events in appstate:", AppState.events)
    }

    async getEventById(eventId){
        AppState.activeEvent = null
        const res = await api.get(`api/events/${eventId}`)
        logger.log(res.data)
        AppState.activeEvent = res.data
    }
}

export const eventsService = new EventsService()