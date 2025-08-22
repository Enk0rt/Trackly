import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";

export interface IUserActivity extends IBase {
    _id: ObjectId;
    _userId: ObjectId;
    date: string;
    waterBalance: number;
    habits: ObjectId[];
    goals: ObjectId[];
    plans: ObjectId[];
}
