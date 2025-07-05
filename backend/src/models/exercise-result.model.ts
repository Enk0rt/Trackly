import { model, Schema } from "mongoose";

import { IExerciseResult } from "../interfaces/exercise-result.interface";

const exerciseResultSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        weightValue: { type: Number, required: true },
        reps: { type: Number, required: false },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const ExerciseResult = model<IExerciseResult>(
    "exerciseResult",
    exerciseResultSchema,
);
