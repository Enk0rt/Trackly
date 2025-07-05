import { model, Schema } from "mongoose";

import { ImportanceEnum } from "../enums/importance.enum";
import { IPlan } from "../interfaces/plan.interface";

const planSchema = new Schema(
    {
        name: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, required: true },
        time: { type: Date, required: true },
        importance: { type: ImportanceEnum, required: true },
        isDone: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Plan = model<IPlan>("plan", planSchema);
