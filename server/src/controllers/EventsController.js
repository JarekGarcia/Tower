import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent())
    }
    async createEvent(req, res, next) {

    }
}
