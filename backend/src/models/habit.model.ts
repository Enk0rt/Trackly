import { model, Schema } from "mongoose";

import { IHabit } from "../interfaces/habit.interface";

const habitSchema = new Schema(
    {
        title: { type: String, required: true },
        _userId: { type: Schema.Types.ObjectId, ref: "user" },
        description: { type: String, required: false },
        deadline: { type: String },
        time: { type: String, required: true },
        streak: { type: Number, default: 0 },
        targetValue: { type: Number },
        targetUnit: { type: String, required: true },
        category: { type: String, required: true },
        frequency: { type: [String], required: true },
        icon: { type: String, default: null },
        history: {
            type: Schema.Types.ObjectId,
            ref: "habit",
        },
        reminders: { type: Boolean, default: true },
        isSettled: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Habit = model<IHabit>("habit", habitSchema);
