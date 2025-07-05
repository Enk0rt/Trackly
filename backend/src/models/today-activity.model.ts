import { model, Schema } from "mongoose";

import { ITodayActivity } from "../interfaces/today-activity.interface";

const todayActivitySchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
        date: { type: Date, required: true },
        waterBalance: { type: Number, default: 0 },
        habits: [{ type: Schema.Types.ObjectId, ref: "habit" }],
        goals: [{ type: Schema.Types.ObjectId, ref: "goal" }],
        plans: [{ type: Schema.Types.ObjectId, ref: "plan" }],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const TodayActivity = model<ITodayActivity>(
    "todayActivity",
    todayActivitySchema,
);
