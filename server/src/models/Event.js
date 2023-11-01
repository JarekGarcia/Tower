import { Schema } from "mongoose";

export const EventSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true, maxLength: 50 },
        description: { type: String, required: true, maxLength: 500 },
        coverImg: { type: String, required: false, maxLength: 500 },
        location: { type: String, required: true, maxLength: 50 },
        capacity: { type: Number, required: true, },
        startDate: { type: Date, required: true, },
        isCanceled: { type: Boolean, required: true, default: false },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, default: 'digital' }
    },

    {
        timestamps: true,
        toJSON: { virtuals: true }
    }

)

EventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true,

})


