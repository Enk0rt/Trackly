import { model, Schema } from "mongoose";

import { ImportanceEnum } from "../enums/importance.enum";
import { IMeeting } from "../interfaces/meeting.interface";

const meetingSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        time: { type: Date, required: true },
        description: { type: String, required: false },
        importance: { type: ImportanceEnum, required: true },
        isDone: { type: Boolean },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Meeting = model<IMeeting>("meeting", meetingSchema);
