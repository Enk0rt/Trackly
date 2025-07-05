import { ObjectId } from "mongodb";

export interface IGoal {
    _id: ObjectId;
    userId: ObjectId;
    name: string;
    description: string;
    deadline: Date;
    isSucceeded: boolean;
}
