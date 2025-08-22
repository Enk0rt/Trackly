import { model, Schema } from "mongoose";

import { IPlan } from "../interfaces/plan.interface";
import { UserActivity } from "./user-activity.model";

const planSchema = new Schema(
    {
        name: { type: String, required: true },
        _userId: { type: Schema.Types.ObjectId, required: false },
        type: { type: String, required: true },
        description: { type: String, required: false },
        date: { type: String, required: true },
        startTime: { type: String, required: false },
        finishTime: { type: String, required: false },
        repeat: { type: Boolean, required: false, default: false },
        linkedHabits: { type: Schema.Types.ObjectId, required: false },
        isDone: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

planSchema.post("findOneAndDelete", async function (doc) {
    if (!doc) return;

    await UserActivity.updateMany(
        { plans: doc._id },
        { $pull: { plans: doc._id } },
    );
});

export const Plan = model<IPlan>("plan", planSchema);
