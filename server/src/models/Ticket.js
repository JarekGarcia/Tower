import { Schema } from "mongoose";

export const TicketSchema = new Schema(
    {
        eventId: { type: Schema.Types.ObjectId, required: true },
        accountId: { type: Schema.Types.ObjectId, required: true },

    },
)

TicketSchema.virtual('profile', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: 'id',
    justOne: true,
})


