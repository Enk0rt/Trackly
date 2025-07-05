import { ObjectId } from "mongodb";

export interface IExerciseResult {
    _id: ObjectId;
    userId: ObjectId;
    name: string;
    weightValue: number;
    reps: number;
}
