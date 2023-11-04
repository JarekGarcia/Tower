import { Schema } from "mongoose";

export const CommentSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true },
        eventId: { type: Schema.Types.ObjectId, required: true },
        body: { type: String, required: true },
    },

    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})