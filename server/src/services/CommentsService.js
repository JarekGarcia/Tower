import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsService {
    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (comment.creatorId != userId) {
            throw new Forbidden("not your comment to delete!")
        }
        await comment.delete()
        return "comment has been deleted!"
    }
    async getCommentsByEventId(eventId) {
        const comments = await dbContext.Comments.find({ eventId: eventId })
            .populate('creator', 'name picture')
        return comments
    }
    async createComment(commentData) {
        const event = await eventsService.getEventById(commentData.eventId)

        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }

}

export const commentsService = new CommentsService()