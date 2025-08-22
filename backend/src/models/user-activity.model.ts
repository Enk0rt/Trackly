import { model, Schema } from "mongoose";

import { IUserActivity } from "../interfaces/user-activity.interface";

const userActivitySchema = new Schema(
    {
        _userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
        date: { type: String, required: true },
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

export const UserActivity = model<IUserActivity>(
    "todayActivity",
    userActivitySchema,
);
