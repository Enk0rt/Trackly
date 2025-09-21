import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";

export interface IAchievement extends IBase {
    _id: ObjectId;
    _userId: ObjectId;
    icon: string;
    title: string;
    description: string;
    currentValue: number;
    targetValue: number;
}
