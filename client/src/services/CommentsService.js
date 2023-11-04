import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{
    async createComment(commentData){
        const res = await api.post("api/comments", commentData)
        logger.log('this is the comment', res.data)
        const newComment = new Comment(res.data)
        AppState.comments.push(newComment)
        return newComment
    }
    async deleteComment(commentId){
const res = await api.delete(`api/comments/${commentId}`)
logger.log("deleted this comment", res.data)
    }

    async getCommentsOnEvent(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log("all comments on event",res.data)
        AppState.comments = res.data.map((comment) => new Comment(comment))
    }
}

export const commentsService = new CommentsService()