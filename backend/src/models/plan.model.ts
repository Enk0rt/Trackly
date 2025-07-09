import { model, Schema } from "mongoose";

import { ImportanceEnum } from "../enums/importance.enum";
import { IPlan } from "../interfaces/plan.interface";
import { UserActivity } from "./user-activity.model";

const planSchema = new Schema(
    {
        name: { type: String, required: true },
        _userId: { type: Schema.Types.ObjectId, required: false },
        time: { type: String, required: true },
        importance: { type: String, enum: ImportanceEnum, required: true },
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
