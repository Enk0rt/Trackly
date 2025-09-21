import { model, Schema } from "mongoose";

import { IGoal } from "../interfaces/goal.interface";

const goalSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        deadline: { type: Date, required: true },
        isSucceeded: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

export const Goal = model<IGoal>("goal", goalSchema);
