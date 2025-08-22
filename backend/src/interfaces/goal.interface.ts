import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";

export interface IGoal extends IBase {
    _id: ObjectId;
    userId: ObjectId;
    name: string;
    description: string;
    deadline: Date;
    isSucceeded: boolean;
}
