import { model, Schema } from "mongoose";

import { HabitHistoryTypeEnum } from "../enums/habit-history-type.enum";
import { IHabitHistory } from "../interfaces/habit-history.interface";

const habitHistorySchema = new Schema(
    {
        _habitId: { type: Schema.Types.ObjectId, ref: "habit" },
        type: { type: String, default: HabitHistoryTypeEnum.CREATED },
        isChecked: { type: Boolean, default: false },
        currentValue: { type: Number },
        date: { type: Date, default: Date.now() },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const HabitHistory = model<IHabitHistory>(
    "habitHistory",
    habitHistorySchema,
);
