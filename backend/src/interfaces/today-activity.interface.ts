import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";

export interface ITodayActivity extends IBase {
    _id: ObjectId;
    date: Date;
    waterBalance: number;
    habits: ObjectId[];
    goals: ObjectId[];
    plans: ObjectId[];
    meetings: ObjectId[];
}
