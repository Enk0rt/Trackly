import { model, Schema } from "mongoose";

import { IHabit } from "../interfaces/habit.interface";

const habitSchema = new Schema(
    {
        name: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, required: true },
        description: { type: String, required: false },
        deadline: { type: Date },
        isChecked: { type: Boolean },
        isSettled: { type: Boolean },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Habit = model<IHabit>("habit", habitSchema);
