import { model, Schema } from "mongoose";

import { IAchievement } from "../interfaces/achievement.interface";

const achievementSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        currentValue: { type: Date, required: false, default: 0 },
        targetValue: { type: Boolean, default: true },
    },
    { timestamps: true, versionKey: false },
);

export const Achievement = model<IAchievement>(
    "achievement",
    achievementSchema,
);
