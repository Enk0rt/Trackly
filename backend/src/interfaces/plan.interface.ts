import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";

export interface IPlan extends IBase {
    _id: ObjectId;
    _userId: ObjectId;
    name: string;
    type: string;
    description: string;
    linkedHabits: ObjectId[];
    date: string;
    startTime: string;
    finishTime: string;
    repeat: boolean;
    isDone: boolean;
}
